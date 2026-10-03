import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import topo from '../imagens/topo.png';
import cores from '../estilos/cores';

export default function Topo() {
  return (
    <View>
      <Image
        source={topo}
        style={styles.imagem}
        resizeMode="cover"
      />

      <Text style={styles.titulo}>
        3 Cores Imobiliária
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imagem: {
    width: '100%',
    height: 180,
  },

  titulo: {
    color: cores.escuro,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
});
