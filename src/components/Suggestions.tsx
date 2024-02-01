import React from 'react';
import { FeatureProps, SuggestionsProps } from '../../types/Nominatim-Types';
import { Button, Text, TouchableOpacity, View } from 'react-native';

interface SuggestionProps {
  suggestions: SuggestionsProps;
  onLocationSuggestionClick: (
    locationSuggestion: FeatureProps
  ) => Promise<void>;
}
function Suggestions(props: SuggestionProps) {
  const { suggestions, onLocationSuggestionClick } = props;
  return (
    <View className="bg-gray-200 border-1">
      {suggestions.map((locationSuggestion) => (
        <View
          key={
            locationSuggestion.properties.geocoding.osm_type +
            locationSuggestion.properties.geocoding.osm_id
          }
          className="flex justify-center font-bold border-b-1 border-b-gray-100"
        >
          <TouchableOpacity
            onPress={(): Promise<void> =>
              onLocationSuggestionClick(locationSuggestion)
            }
            className="flex justify-center font-bold py-2 px-4"
          >
            <Text>{locationSuggestion.properties.geocoding.label}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

export default Suggestions;