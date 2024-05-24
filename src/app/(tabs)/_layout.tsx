import { Tabs, usePathname } from 'expo-router';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { Icon } from '@/components/atoms/Icon';
import styling from '@/stylings';

const iconsArray = {
  heart: ({ color }: { color: string }) => (
    <Icon color={color} icon="heart" size={48} />
  ),
  navigationArrow: ({ color }: { color: string }) => (
    <Icon color={color} icon="navigationArrow" size={41} />
  ),
  person: ({ color }: { color: string }) => (
    <Icon color={color} icon="person" size={48} />
  ),
};
export default function Layout() {
  const colorscheme = useColorScheme();
  const currentPath = usePathname();
  const [isTripPath, setIsTripPath] = React.useState(false);
  useEffect(() => {
    if (currentPath.includes('trip')) {
      setIsTripPath(true);
    } else {
      setIsTripPath(false);
    }
  }, [currentPath]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: isTripPath ? 'none' : undefined,
          height: 110,
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
            : styling.colors['background-dark'],
        tabBarIconStyle: {
          justifyContent: 'center',
          alignContent: 'center',
        },
      }}
    >
      <Tabs.Screen
        key="favorites"
        name="favorites"
        options={{
          headerTitle: 'Meine Favoriten',
          tabBarLabel: 'Favoriten',
          tabBarIcon: ({ color }) => iconsArray.heart({ color }),
          tabBarAccessibilityLabel: 'Navigation',
          tabBarItemStyle: {
            backgroundColor:
              colorscheme === 'light'
                ? styling.colors['primary-color-dark']
                : styling.colors['primary-color-light'],
            borderTopLeftRadius: 40,
            height: 110,
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: 'Navigation',
          tabBarLabel: 'Navigation',
          tabBarIcon: ({ color }) => iconsArray.navigationArrow({ color }),
          href: '/home',
          tabBarAccessibilityLabel: 'Favoriten',
          tabBarItemStyle: {
            backgroundColor:
              colorscheme === 'light'
                ? styling.colors['primary-color-dark']
                : styling.colors['primary-color-light'],
            height: 110,
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'Mein Profil',
          tabBarLabel: 'Profil',

          tabBarIcon: ({ color }) => iconsArray.person({ color }),
          tabBarAccessibilityLabel: 'Profil',
          tabBarItemStyle: {
            backgroundColor:
              colorscheme === 'light'
                ? styling.colors['primary-color-dark']
                : styling.colors['primary-color-light'],
            borderTopRightRadius: 40,
            height: 110,
          },
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
