import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

import cores from '../estilos/cores';

export default function ImagemImovel({ imagem, style }) {
  if (!imagem) {
    return <View style={[styles.placeholder, style]} />;
  }

  return (
    <Image
      source={imagem}
      style={[styles.imagem, style]}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  imagem: {
    backgroundColor: cores.placeholder,
  },

  placeholder: {
    backgroundColor: cores.placeholder,
  },
});
