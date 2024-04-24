import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import styling from '@/stylings';

interface NavbarProps {
  icons: {
    heart: (props: { color: string }) => React.JSX.Element;
    person: (props: { color: string }) => React.JSX.Element;
    navigationArrow: (props: { color: string }) => React.JSX.Element;
  };
}

export function Navbar({ icons }: NavbarProps) {
  const colorscheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 118,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor:
            colorscheme === 'light'
              ? styling.colors['background-light']
              : styling.colors['background-dark'],
        },

        tabBarShowLabel: false,
        tabBarActiveTintColor:
          colorscheme === 'light'
            ? styling.colors['orange-accent']
            : styling.colors['orange-accent'],
        tabBarInactiveTintColor:
          colorscheme === 'light'
            ? styling.colors['primary-color-light']
            : styling.colors['primary-color-dark'],
        tabBarIconStyle: {
          justifyContent: 'center',
          alignContent: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="favorites"
        options={{
          headerTitle: 'Meine Favoriten',
          tabBarLabel: 'Favoriten',
          tabBarIcon: ({ color }) => icons.heart({ color }),
          tabBarAccessibilityLabel: 'Navigation',
          tabBarItemStyle: {
            backgroundColor:
              colorscheme === 'light'
                ? styling.colors['primary-color-dark']
                : styling.colors['primary-color-light'],
            borderTopLeftRadius: 40,
            height: 118,
          },
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: 'Navigation',
          tabBarLabel: 'Navigation',
          tabBarIcon: ({ color }) => icons.navigationArrow({ color }),

          tabBarAccessibilityLabel: 'Favoriten',
          tabBarItemStyle: {
            backgroundColor:
              colorscheme === 'light'
                ? styling.colors['primary-color-dark']
                : styling.colors['primary-color-light'],
            height: 118,
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'Mein Profil',
          tabBarLabel: 'Profil',

          tabBarIcon: ({ color }) => icons.person({ color }),
          tabBarAccessibilityLabel: 'Profil',
          tabBarItemStyle: {
            backgroundColor:
              colorscheme === 'light'
                ? styling.colors['primary-color-dark']
                : styling.colors['primary-color-light'],
            borderTopRightRadius: 40,
            height: 118,
          },
        }}
      />
    </Tabs>
  );
}
