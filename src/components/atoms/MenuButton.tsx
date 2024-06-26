import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface MenuButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  icon: React.ReactNode;
}

export function MenuButton({ children, onPress, icon }: MenuButtonProps) {
  return (
    <TouchableOpacity
      testID="MenuButton"
      accessibilityRole="button"
      accessibilityHint=""
      accessibilityLabel={`${children}`}
      onPress={onPress}
      className="flex flex-row items-center
            border-[3px] rounded-[25px] h-36 mb-5 py-3 px-2 border-primary"
    >
      <View testID="MenuButtonIcon" className="pl-2">
        {icon}
      </View>
      <Text
        testID="MenuButtonText"
        className="font-generalSansSemi text-2xl pl-4 text-primary"
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
