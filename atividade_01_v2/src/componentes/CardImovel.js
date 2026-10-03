import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import ImagemImovel from './ImagemImovel';
import cores from '../estilos/cores';
import { formatarValor } from '../utilitarios';

export default function CardImovel({ imovel, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <ImagemImovel
        imagem={imovel.imagem}
        style={styles.imagem}
      />

      <View style={styles.informacoes}>
        <Text style={styles.titulo}>
          {imovel.titulo}
        </Text>

        <Text
          style={styles.descricao}
          numberOfLines={3}
        >
          {imovel.descricao}
        </Text>

        <Text style={styles.valor}>
          {formatarValor(imovel.valor)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: cores.card,
    marginBottom: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },

  imagem: {
    width: 120,
    height: 130,
  },

  informacoes: {
    flex: 1,
    padding: 10,
  },

  titulo: {
    color: cores.escuro,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  descricao: {
    color: cores.preto,
    fontSize: 13,
    marginBottom: 8,
  },

  valor: {
    color: cores.escuro,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
