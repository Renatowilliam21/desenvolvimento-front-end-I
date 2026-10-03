import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { cores, raio } from '../estilos/tema';
import { useApp } from '../contexto/AppContext';
import SeletorOpcoes from './SeletorOpcoes';

const HORARIOS = [
  { valor: null, rotulo: 'Agora' },
  { valor: '03:00', rotulo: '03h' },
  { valor: '09:00', rotulo: '09h' },
  { valor: '15:00', rotulo: '15h' },
  { valor: '21:00', rotulo: '21h' },
];

// Os dados são de um ciclo diário simulado. Esta barra deixa ver o app em
// qualquer horário (útil para demonstrar os estados normal, alerta e perigo).
export default function BarraSimulacao() {
  const { horaSimulada, setHoraSimulada } = useApp();

  return (
    <View style={estilos.caixa}>
      <Text style={estilos.titulo}>
        <Ionicons name="flask-outline" size={14} /> Dados simulados · ver horário
      </Text>
      <SeletorOpcoes
        opcoes={HORARIOS}
        valor={horaSimulada}
        onChange={setHoraSimulada}
        rotuloAcessivel="Horário da simulação"
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  caixa: {
    backgroundColor: '#EFE8DA',
    borderRadius: raio,
    padding: 12,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 13,
    color: cores.textoSuave,
    marginBottom: 8,
    fontWeight: '600',
  },
});
