import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { cores } from '../estilos/tema';
import { useApp } from '../contexto/AppContext';
import Painel from '../telas/Painel';
import DetalheEstacao from '../telas/DetalheEstacao';
import ListaAlertas from '../telas/ListaAlertas';
import FormularioAlerta from '../telas/FormularioAlerta';
import Indices from '../telas/Indices';
import Sobre from '../telas/Sobre';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const opcoesCabecalho = {
  headerStyle: { backgroundColor: cores.primaria },
  headerTintColor: cores.branco,
  headerTitleStyle: { fontWeight: '700' },
};

// Aba Painel: lista de estações -> detalhe da estação
function PilhaPainel() {
  return (
    <Stack.Navigator screenOptions={{ ...opcoesCabecalho, cardStyle: { backgroundColor: cores.fundo } }}>
      <Stack.Screen name="Painel" component={Painel} options={{ title: 'Arrojado Campo' }} />
      <Stack.Screen name="DetalheEstacao" component={DetalheEstacao} options={{ title: 'Estação' }} />
    </Stack.Navigator>
  );
}

// Aba Alertas: lista -> formulário (criar/editar/excluir)
function PilhaAlertas() {
  return (
    <Stack.Navigator screenOptions={{ ...opcoesCabecalho, cardStyle: { backgroundColor: cores.fundo } }}>
      <Stack.Screen name="ListaAlertas" component={ListaAlertas} options={{ title: 'Alertas' }} />
      <Stack.Screen name="FormularioAlerta" component={FormularioAlerta} options={{ title: 'Novo alerta' }} />
    </Stack.Navigator>
  );
}

const icones = {
  InicioTab: ['speedometer', 'speedometer-outline'],
  AlertasTab: ['notifications', 'notifications-outline'],
  Indices: ['calculator', 'calculator-outline'],
  Sobre: ['information-circle', 'information-circle-outline'],
};

// Navegação principal com Bottom Tabs (requisito 4)
export default function Abas() {
  const { totalDisparados } = useApp();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...opcoesCabecalho,
        tabBarActiveTintColor: cores.primaria,
        tabBarInactiveTintColor: cores.textoSuave,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarIcon: ({ focused, color, size }) => {
          const [ativo, inativo] = icones[route.name];
          return <Ionicons name={focused ? ativo : inativo} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="InicioTab" component={PilhaPainel} options={{ title: 'Painel', headerShown: false }} />
      <Tab.Screen
        name="AlertasTab"
        component={PilhaAlertas}
        options={{
          title: 'Alertas',
          headerShown: false,
          tabBarBadge: totalDisparados > 0 ? totalDisparados : undefined,
          tabBarBadgeStyle: { backgroundColor: cores.perigo },
        }}
      />
      <Tab.Screen name="Indices" component={Indices} options={{ title: 'Índices' }} />
      <Tab.Screen name="Sobre" component={Sobre} />
    </Tab.Navigator>
  );
}
