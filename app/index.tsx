import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import * as Location from 'expo-location';
import { Text } from 'react-native';
import useUserStore from '../store/useUserStore';

export default function Index() {
  const { currentLocation, actions, calibration } = useUserStore();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
      const watchPosition = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (locationObject) => {
          const position = {
            coords: {
              speed: locationObject.coords.speed,
              heading: locationObject.coords.heading,
              accuracy: locationObject.coords.accuracy,
              altitudeAccuracy: locationObject.coords.altitudeAccuracy,
              altitude: locationObject.coords.altitude,
              longitude: locationObject.coords.longitude,
              latitude: locationObject.coords.latitude,
            },
            timestamp: locationObject.timestamp,
          };
          actions.setCurrentLocation(position);
        }
      );
      return () => watchPosition.remove();
    })();
  }, [actions, actions.setCurrentLocation]);

  if (currentLocation === null || currentLocation === undefined) {
    return <Text>Loading</Text>;
  }
  // if (calibration.start === null || calibration.end === null) {
  //   return <Redirect href="/calibration" />;
  // }
  return <Redirect href="/calibration" />;
}
