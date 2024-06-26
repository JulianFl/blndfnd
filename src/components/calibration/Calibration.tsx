import { Audio } from 'expo-av';
import { Pedometer } from 'expo-sensors';
import * as Speech from 'expo-speech';
import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import Song from '@/assets/calibration.wav';
import { Button } from '@/components/atoms/Button';
import { CalibrationHeader } from '@/components/calibration/CalibrationHeader';
import { CalibrationMode } from '@/components/calibration/CalibrationMode';
import { CalibrationNavigation } from '@/components/calibration/CalibrationNavigation';
import { calibrationSteps } from '@/components/calibration/calibrationSteps';
import { getDistanceInMeter } from '@/functions/getDistanceInMeter';
import { useCurrentLocation } from '@/mutations/useCurrentLocation';
import { usePedometerAvailable } from '@/mutations/usePedometerAvailable';
import { useSpeak } from '@/mutations/useSpeak';
import { useStartSound } from '@/mutations/useStartSound';
import { useStopSound } from '@/mutations/useStopSound';
import { useCalibrationStore } from '@/store/useCalibrationStore';
import { CurrentLocationType } from '@/types/Types';

const STOP_CALIBRATION_COUNT = 30;
const UNREALISTIC_CALIBRATION = 10;
export const SPEECH_CONFIG = {
  language: 'de',
};
interface CalibrationProps {
  isFromIntro?: boolean;
}
export function Calibration({ isFromIntro = false }: CalibrationProps) {
  const { addCalibration } = useCalibrationStore((state) => state.actions);
  const calibration = useCalibrationStore((state) => state.calibration);
  const [index, setIndex] = React.useState(0);
  const [steps, setSteps] = useState(0);
  const pedometerSubscription = useRef<Pedometer.Subscription | null>();
  const audioSound = useRef<Audio.Sound>();
  const fallback = useRef<CurrentLocationType>();
  const currentLocationMutation = useCurrentLocation();
  const pedometerAvailableMutation = usePedometerAvailable();
  const startSoundMutation = useStartSound();
  const stopSoundMutation = useStopSound();
  const speakMutation = useSpeak();
  const calSteps = calibrationSteps(calibration.factors);
  const currentStep = calSteps[index];
  const isLastStep = calSteps.length - 1 === index;
  const stopPedometer = async () => {
    pedometerSubscription.current?.remove();
    pedometerSubscription.current = undefined;

    if (audioSound.current) {
      await stopSoundMutation.mutateAsync(audioSound.current);
      audioSound.current = undefined;
    }
  };

  const fallbackStop = async (_start?: CurrentLocationType, _steps = 30) => {
    await stopPedometer();
    Speech.speak(
      'Kalibrierung abgeschlossen. Warte bis zum nächsten Audiosignal, wir berechnen deinen Umrechnungsfaktor',
      SPEECH_CONFIG
    );
    const currentPositionData = await currentLocationMutation.mutateAsync();
    const distanceInMeter = getDistanceInMeter(
      fallback.current || _start,
      currentPositionData
    );

    if (
      distanceInMeter === null ||
      distanceInMeter <= UNREALISTIC_CALIBRATION
    ) {
      Speech.speak(
        `Es ist ein Fehler aufgetreten, bitte versuche es erneut oder fahre ohne Kalibrierung fort.`,
        SPEECH_CONFIG
      );

      return;
    }

    addCalibration(distanceInMeter, _steps);
    setIndex((prevState) => prevState + 1);
    Speech.speak(
      `Du bist ${_steps} Schritte und ${distanceInMeter.toFixed(2)} Meter gegangen. Der Umrechnungsfaktor beträgt ${(distanceInMeter / _steps).toFixed(2)}. Du kannst nun mit dem nächsten Schritt fortfahren.`,
      SPEECH_CONFIG
    );

    if (fallback.current) {
      fallback.current = undefined;
    }
  };

  const handlePedometerUpdate = async (
    start: CurrentLocationType,
    result: Pedometer.PedometerResult
  ) => {
    setSteps(result.steps);

    if (result.steps >= STOP_CALIBRATION_COUNT) {
      await fallbackStop(start, result.steps);
    }
  };
  const startPedometer = async () => {
    await speakMutation.mutateAsync(
      'Kalibrierung gestartet. Warte einen Moment bis die Musik startet.'
    );

    setSteps(0);
    const pedometerAvailable = await pedometerAvailableMutation.mutateAsync();
    const currentPositionData = await currentLocationMutation.mutateAsync();
    // TODO Accuracy
    if (!pedometerAvailable) {
      // Speech.speak('Gehe 30 Schritte und klicke dann auf Stopp.');
      await speakMutation.mutateAsync(
        'Gehe 30 Schritte und klicke dann auf Stopp.'
      );
    }
    const sound = await startSoundMutation.mutateAsync(Song);
    if (!sound) {
      Speech.speak('Die Musik kann leider nicht abgespielt werden.');
    }
    if (pedometerAvailable) {
      pedometerSubscription.current = Pedometer.watchStepCount((result) =>
        handlePedometerUpdate(currentPositionData, result)
      );
    } else {
      fallback.current = currentPositionData;
    }
    audioSound.current = sound;
  };
  const isLoading =
    currentLocationMutation.isPending ||
    pedometerAvailableMutation.isPending ||
    speakMutation.isPending ||
    startSoundMutation.isPending;

  const isInCalibrationMode =
    !!(pedometerSubscription.current && audioSound.current) ||
    !!(
      pedometerSubscription.current === undefined &&
      audioSound.current &&
      fallback.current
    ) ||
    isLoading;
  const buttonOutput = () => {
    if (pedometerSubscription.current && audioSound.current) {
      return (
        <Button buttonType="primary" onPress={() => stopPedometer()}>
          Abbrechen
        </Button>
      );
    }
    if (
      pedometerSubscription.current === undefined &&
      audioSound.current &&
      fallback.current
    ) {
      return (
        <Button buttonType="primary" onPress={fallbackStop}>
          Stopp
        </Button>
      );
    }

    return (
      <Button
        buttonType="primary"
        disabled={isLoading}
        isLoading={isLoading}
        onPress={startPedometer}
      >
        Start Kalibrierung
      </Button>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" testID="calibrationID">
      <ScrollView className="px-8 mt-8">
        <CalibrationHeader currentStep={currentStep} />
        {currentStep.forwardButtonText === undefined ? (
          <CalibrationMode steps={steps} />
        ) : null}
      </ScrollView>
      <CalibrationNavigation
        setIndex={setIndex}
        calibrationModeButtons={buttonOutput}
        isFromIntro={isFromIntro}
        isLastStep={isLastStep}
        currentElement={currentStep}
        isInCalibrationMode={isInCalibrationMode}
        isFirstStep={index === 0}
        stepText={`Schritt ${index + 1} / ${calSteps.length}`}
      />
    </SafeAreaView>
  );
}
