import React from 'react';
import { ColorSchemeName, Text, View } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { Logo } from '@/components/atoms/icons/Logo';
import { CalibrationStepsProps } from '@/components/calibration/calibrationSteps';

interface CalibrationHeaderProps {
  currentStep: CalibrationStepsProps;
  colorscheme: ColorSchemeName;
}
export function CalibrationHeader({
  currentStep,
  colorscheme,
}: CalibrationHeaderProps) {
  const { calibrationValueNode } = currentStep;

  return (
    <>
      <View className="flex items-center pb-6">
        <Logo colorscheme={colorscheme} width={85} height={85} />
      </View>
      <Header
        classes={`${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
      >
        Schrittlänge konfigurieren
      </Header>
      <View>
        <Text
          className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
        >
          {currentStep.text}
        </Text>
        {calibrationValueNode && calibrationValueNode}
      </View>
    </>
  );
}
