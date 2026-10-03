import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import cores from '../estilos/cores';

export default function Pagina({ children, style }) {
  return (
    <SafeAreaView style={[styles.pagina, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pagina: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
});
