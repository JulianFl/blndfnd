import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';

interface IconButtonProps {
  icon: React.ReactNode;
  iconName: string;
  onPress: () => void;
  disabled?: boolean;
  classes?: string;
  buttonType: 'accent' | 'accentOutline' | 'primary' | 'primaryOutline';
}
export function IconButton({
  icon,
  disabled,
  onPress,
  classes,
  buttonType,
  iconName,
}: IconButtonProps) {
  const { theme } = useContext(ThemeContext);

  const variant = {
    accent: {
      fill: themes.external['--pure-white'],
      button: 'bg-accent border border-8 border-orange-accent',
    },
    accentOutline: {
      button: 'bg-transparent border border-8 border-solid border-accent',
      fill: themes.external['--accent'],
    },
    primary: {
      button: 'bg-primary border border-8 border-primary',
      fill: themes.external[`--${theme}-mode-primary-inverted`],
    },
    primaryOutline: {
      button:
        'bg-transparent border border-solid border-solid border-primary border-8',
      fill: themes.external[`--${theme}-mode-primary`],
    },
  };

  return (
    <View className={`flex justify-center items-center ${classes}`}>
      <TouchableOpacity
        accessibilityHint={disabled ? 'Nicht nutzbar' : ''}
        className={`p-4 flex b justify-center items-center rounded-[35px] ${variant[buttonType].button} ${disabled && 'opacity-50'}`}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={
          disabled ? `${iconName} nicht nutzbar` : `${iconName}`
        }
        disabled={disabled}
        testID={`IconButton-${buttonType}`}
      >
        <View>{icon}</View>
      </TouchableOpacity>
    </View>
  );
}
