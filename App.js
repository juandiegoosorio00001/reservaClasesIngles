import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabsNavigator from './src/navigation/TabsNavigator';
import { ReservaProvider } from './src/context/ReservasContext';
import { colors } from './src/theme';

const temaNavigation = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.fondo,
    card: colors.superficie,
    primary: colors.primario,
    text: colors.texto,
    border: colors.borde,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ReservaProvider>
        <NavigationContainer theme={temaNavigation}>
          <TabsNavigator />
        </NavigationContainer>
      </ReservaProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
