import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { Text } from 'react-native';
import { getCurrentPosition } from '../src/functions/functions';
import useUserStore from '../store/useUserStore';

export default function Index() {
  const { currentLocation, actions } = useUserStore();
  useEffect(() => {
    (async () => {
      const position = await getCurrentPosition();
      actions.setCurrentLocation(position);
    })();
  }, [actions, actions.setCurrentLocation]);
  /*if (calibration.start === null || calibration.end === null) {
    return <Redirect href="/home" />;
  }*/
  return <Redirect href="/calibration" />;
}
