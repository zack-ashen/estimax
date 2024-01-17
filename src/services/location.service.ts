import db from '@/db';
import { addresses } from '@/db/schema/addresses.schema';
import { Address, NewAddress, NewPlace } from '@/types/location.types';
import {
  Client,
  PlaceAutocompleteRequest,
  PlaceAutocompleteResponseData,
  PlaceAutocompleteType,
  PlaceData,
} from '@googlemaps/google-maps-services-js';
import { LRUCache } from 'lru-cache';

export class LocationService {
  private cache: LRUCache<string, PlaceAutocompleteResponseData>;
  googleMapsClient: Client;
  apiKey: string;

  constructor() {
    this.cache = new LRUCache<string, PlaceAutocompleteResponseData>({
      max: 2000, // max number of items
      ttl: 1209600000, // items expire after 2 weeks
    });
    this.googleMapsClient = new Client({});
    this.apiKey = process.env.GOOGLE_MAPS_API!;
  }

  async search(limit: number, type: string, value: string) {
    const cacheKey = `limit=${limit}-type=${type}-value=${value}`;
    const cachedLocation = this.cache.get(cacheKey);

    if (cachedLocation) {
      console.log('Cache hit');
      return cachedLocation.predictions.slice(0, limit);
    }

    const suggestions = await this.getPlaceSuggestions(value, type);

    this.cache.set(cacheKey, suggestions);

    return suggestions.predictions.slice(0, limit);
  }

  public async getPlaceSuggestions(
    value: string,
    type: string
  ): Promise<PlaceAutocompleteResponseData> {
    const params: PlaceAutocompleteRequest = {
      params: {
        input: value,
        components: ['country:us'],
        key: this.apiKey,
        types:
          type === 'cities'
            ? PlaceAutocompleteType.cities
            : PlaceAutocompleteType.address,
      },
    };

    const response = await this.googleMapsClient.placeAutocomplete(params);

    return response.data;
  }

  public async getPlaceDetails(placeId: string): Promise<Partial<PlaceData>> {
    const placeDetails = await this.googleMapsClient.placeDetails({
      params: {
        key: this.apiKey,
        place_id: placeId,
        fields: ['name', 'geometry', 'address_components'],
      },
    });

    return placeDetails.data.result;
  }

  public async parsePlace(placeId: string): Promise<NewPlace> {
    const { name, geometry } = await this.getPlaceDetails(placeId);
    if (!name || !geometry) {
      throw new Error('Invalid place');
    }

    return {
      placeId,
      name: name,
      neLat: geometry.viewport.northeast.lat,
      neLong: geometry.viewport.northeast.lng,
      swLat: geometry.viewport.southwest.lat,
      swLong: geometry.viewport.southwest.lng,
    };
  }

  public async parseAddress(placeId: string): Promise<NewAddress> {
    const { address_components, geometry } =
      await this.getPlaceDetails(placeId);

    if (!address_components || !geometry) {
      throw new Error('Invalid place');
    }

    const location = geometry.location;

    const address = {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: '',
    };

    const ShouldBeComponent: { [key: string]: string[] } = {
      street_number: ['street_number'],
      route: ['route'],
      locality: [
        'locality',
        'sublocality',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4',
      ],
      administrative_area: ['administrative_area_level_1'],
      postal_code: ['postal_code'],
    };

    address_components.forEach((component) => {
      for (let shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].includes(component.types[0])) {
          switch (shouldBe) {
            case 'street_number':
              address.addressLine1 =
                component.long_name + ' ' + address.addressLine1.trim();
              break;
            case 'route':
              address.addressLine1 += component.long_name;
              break;
            case 'locality':
              address.city = component.long_name;
              break;
            case 'administrative_area':
              address.state = component.short_name;
              break;
            case 'postal_code':
              address.zip = component.long_name;
              break;
          }
        }
      }
    });

    return {
      placeId: placeId,
      lat: location.lat.toString(),
      long: location.lng.toString(),
      ...address,
    };
  }

  public async createAddress(placeId: string): Promise<Address> {
    const newAddress: NewAddress = await this.parseAddress(placeId);
    const [address] = await db.insert(addresses).values(newAddress).returning();

    return address;
  }
}

const locationService = new LocationService();

export default locationService;
