import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ValhallaManeuverProps } from '../../types/Valhalla-Types';
import useUserStore from '../../store/useUserStore';
import decodePolyline from '../functions/decodePolyline';
import Button from '../components/atoms/Button';
import ListItem from '../components/atoms/ListItem';
import { router } from 'expo-router';
import { getCalibrationValue, valueOutput } from '../functions/functions';
import { PhotonFeature } from '../../types/api-photon';

function TripList() {
  const { trip, calibration, currentLocation } = useUserStore();
  const factor = getCalibrationValue(calibration.factors);

  const createKey = (maneuver: ValhallaManeuverProps, index: number) => {
    if (maneuver.begin_shape_index && maneuver.end_shape_index) {
      return (
        maneuver.begin_shape_index.toString() +
        maneuver.end_shape_index.toString() +
        index
      );
    }
    return maneuver.begin_shape_index.toString() + index.toString();
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mx-5 my-5">
        {trip &&
          currentLocation &&
          trip.trip &&
          trip.trip.legs[0].maneuvers.map((maneuver, index) => (
            <ListItem key={createKey(maneuver, index)}>
              {index + 1}. {valueOutput(maneuver, factor)}
            </ListItem>
          ))}
      </ScrollView>
      <View className="mx-5">
        <Button onPress={() => router.back()} buttonType="secondary">
          <Text>Beenden</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default TripList;
