import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ImoveisProvider } from './src/contexto/ImoveisContext';
import PaginaInicial from './src/telas/PaginaInicial';
import CadastroImovel from './src/telas/CadastroImovel';
import PaginaImovel from './src/telas/PaginaImovel';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ImoveisProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#EDC4B3' },
            }}
          >
            <Stack.Screen name="Inicio" component={PaginaInicial} options={{ title: '3 Cores Imobiliária' }} />
            <Stack.Screen name="Cadastro" component={CadastroImovel} options={{ title: 'Cadastrar Imóvel' }} />
            <Stack.Screen name="Imovel" component={PaginaImovel} options={{ title: 'Detalhes do imóvel' }} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </ImoveisProvider>
    </SafeAreaProvider>
  );
}
