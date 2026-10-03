import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

import Pagina from '../componentes/Pagina';
import Topo from '../componentes/Topo';
import Botao from '../componentes/Botao';
import CardImovel from '../componentes/CardImovel';

import { useImoveis } from '../contexto/ImoveisContext';
import cores from '../estilos/cores';

export default function PaginaInicial({ navigation }) {
  const { imoveis } = useImoveis();

  function abrirCadastro() {
    navigation.navigate('Cadastro');
  }

  function abrirImovel(imovel) {
    navigation.navigate('Imovel', {
      imovel,
    });
  }

  return (
    <Pagina>
      <FlatList
        data={imoveis}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.conteudo}
        ListHeaderComponent={
          <>
            <Topo />

            <View style={styles.areaBotao}>
              <Botao
                titulo="Cadastrar novo imóvel"
                onPress={abrirCadastro}
              />
            </View>

            <Text style={styles.subtitulo}>
              Nossos Imóveis:
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <CardImovel
            imovel={item}
            onPress={() => abrirImovel(item)}
          />
        )}
      />
    </Pagina>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    paddingBottom: 20,
  },

  areaBotao: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  subtitulo: {
    color: cores.escuro,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 12,
  },
});
