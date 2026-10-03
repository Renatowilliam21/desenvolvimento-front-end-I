import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider } from './src/contexto/AppContext';
import Abas from './src/navegacao/Abas';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer documentTitle={{ formatter: (opcoes) => `${opcoes?.title ?? 'Arrojado Campo'} · Arrojado Campo` }}>
          <Abas />
        </NavigationContainer>
        <StatusBar style="light" />
      </AppProvider>
    </SafeAreaProvider>
  );
}
