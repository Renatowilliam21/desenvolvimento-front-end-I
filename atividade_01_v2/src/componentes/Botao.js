import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import cores from '../estilos/cores';

export default function Botao({
  titulo,
  onPress,
  perigo = false,
  style,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.botao,
        perigo && styles.botaoPerigo,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: cores.escuro,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },

  botaoPerigo: {
    backgroundColor: cores.perigo,
  },

  texto: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
