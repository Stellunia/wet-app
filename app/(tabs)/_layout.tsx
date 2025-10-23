import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Book, Cat, Home } from "lucide-react-native";
import { Appearance, Switch } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'Bookmarks',
          tabBarIcon: ({ color }) => <Book size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Cat size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}

const headerRight = () => {
        const colorScheme = useColorScheme();

        return (<Switch value={colorScheme === 'dark'} onChange={() => {
          Appearance.setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}} />)}