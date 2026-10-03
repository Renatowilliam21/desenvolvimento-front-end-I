import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { cores } from '../estilos/tema';

export default function EstadoVazio({ icone = 'file-tray-outline', mensagem }) {
  return (
    <View style={estilos.container}>
      <Ionicons name={icone} size={56} color={cores.textoSuave} />
      <Text style={estilos.texto}>{mensagem}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 40,
  },
  texto: {
    marginTop: 12,
    fontSize: 16,
    color: cores.textoSuave,
    textAlign: 'center',
  },
});
