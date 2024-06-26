import React, { ReactElement } from 'react';
import { Text } from 'react-native';

import { getCalibrationValue } from '@/functions/getCalibrationValue';

export interface CalibrationStepsProps {
  text: string;
  forwardButtonText?: string;
  backButtonText?: string | false;
  calibrationValueNode?: ReactElement;
  testID?: string;
}
export const calibrationSteps = (
  factors: number[] | undefined
): CalibrationStepsProps[] => [
  {
    forwardButtonText: 'Kalibrieren',
    text: `Deine kalibrierte Schrittlänge beträgt`,
    backButtonText: 'Zurücksetzen',
    calibrationValueNode: (
      <Text
        className="text-4xl font-generalSansSemi pt-4 text-primary"
        testID="calibrationValue"
      >
        {factors && getCalibrationValue(factors)
          ? `${getCalibrationValue(factors)} m`
          : '-'}
      </Text>
    ),
  },
  {
    forwardButtonText: 'Weiter',
    text: 'Nun kalibrieren wir gemeinsam deine Schrittlänge, damit wir dich so genau wie möglich an dein Ziel bringen können.',
    backButtonText: 'Zurück',
  },
  {
    forwardButtonText: 'Weiter',
    text: 'Bitte stelle sicher, dass du deine Schritte auf einer möglichst geraden Strecke ohne Hindernisse kalibriert.\nSolltest du dir unsicher sein, bitte eine vertraute Person um Hilfe.',
    backButtonText: 'Zurück',
  },
  {
    forwardButtonText: 'Weiter',
    text: 'Wenn du dir sicher bist deine Schritte konfigurieren zu können, können wir starten!',
    backButtonText: 'Zurück',
  },
  {
    text: 'Wenn du auf Start Kalibrierung klickst, ertönt eine Melodie. Laufe so lange geradeaus, bis die Melodie stoppt.',
    backButtonText: 'Zurück',
  },
  {
    forwardButtonText: 'Fertig',
    text: `Deine kalibrierte Schrittlänge beträgt ${
      factors && getCalibrationValue(factors)
        ? `${getCalibrationValue(factors)} m`
        : '-'
    }.\nDu kannst deine Schrittlänge jederzeit unter deinen Profileinstellungen neu Kalibrieren!`,
    backButtonText: 'Zurück',
  },
];
