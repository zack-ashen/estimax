import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js';
import { forwardRef } from 'react';
import Select, { OptionType } from './Base/Select';

interface LocationSelectProps {
  type: 'cities' | 'address';
  onChange?: (...event: any[]) => void;
  placeholder?: string;
  error?: string;
  currentOption?: OptionType | OptionType[] | null;
  className?: string;
}

const LocationSelect = forwardRef(
  (
    {
      type,
      onChange,
      className,
      placeholder,
      currentOption,
      error,
    }: LocationSelectProps,
    ref: React.Ref<any>
  ) => {
    const fetchLocations = async (
      inputValue: string
    ): Promise<OptionType[]> => {
      if (inputValue.length < 3) return [];
      try {
        const params = new URLSearchParams({
          input: inputValue,
          type,
          limit: '5',
        });
        const response = await fetch(`/api/locations/search?${params}`, {
          method: 'GET',
        }).then((res) => res.json());

        if (!response.success) {
          throw new Error('Network response was not ok');
        }

        return response.data.map((location: PlaceAutocompleteResult) => ({
          value: location.place_id,
          label: location.description,
        }));
      } catch (error) {
        console.error('Error:', error);
        return [];
      }
    };

    return (
      <Select
        isAsync
        defaultOptions
        loadOptions={fetchLocations}
        onChange={onChange}
        placeholder={placeholder}
        currentOption={currentOption}
        className={className}
        error={error}
        ref={ref}
      />
    );
  }
);

LocationSelect.displayName = 'LocationSelect';

export default LocationSelect;
