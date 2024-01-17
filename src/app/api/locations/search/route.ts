import locationService from '@/services/location.service';
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js';

// TODO: Use this to validate request params
type RequestParams = {
  input: string;
  type: string;
  limit: number;
};

type ResponseData = {
  success: boolean;
  data: PlaceAutocompleteResult[];
};

export async function GET(request: Request) {
  // TODO Validate request params
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());
  const { input, type, limit } = params;

  const locations = await locationService.search(+limit, type, input);

  const data: ResponseData = {
    success: true,
    data: locations,
  };
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' },
  });
}
