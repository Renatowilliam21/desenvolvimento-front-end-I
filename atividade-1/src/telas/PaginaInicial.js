import { useRef } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

import cores from '../estilos/cores';
import Pagina from '../componentes/Pagina';
import Topo from '../componentes/Topo';
import Botao from '../componentes/Botao';
import CardImovel from '../componentes/CardImovel';
import { useImoveis } from '../contexto/ImoveisContext';

export default function PaginaInicial({ navigation }) {
  const { imoveis } = useImoveis();
  const lista = useRef(null);

  // Já estamos na página inicial: o botão "Início" rola a lista de volta ao topo
  function voltarAoTopo() {
    lista.current?.scrollToOffset({ offset: 0, animated: true });
  }

  const cabecalho = (
    <Topo titulo="3 Cores Imobiliária" aoIrParaInicio={voltarAoTopo}>
      <Botao
        titulo="Cadastrar novo imóvel"
        onPress={() => navigation.navigate('Cadastro')}
        style={estilos.botaoCadastrar}
      />
      <Text style={estilos.subtitulo}>Nossos Imóveis:</Text>
    </Topo>
  );

  const listaVazia = (
    <View style={estilos.vazio}>
      <Text style={estilos.textoVazio}>Nenhum imóvel cadastrado no momento.</Text>
    </View>
  );

  return (
    <Pagina>
      <FlatList
        ref={lista}
        data={imoveis}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={cabecalho}
        ListEmptyComponent={listaVazia}
        renderItem={({ item }) => (
          <CardImovel
            imovel={item}
            onPress={() => navigation.navigate('Imovel', { id: item.id })}
          />
        )}
      />
    </Pagina>
  );
}

const estilos = StyleSheet.create({
  botaoCadastrar: {
    marginTop: 18,
  },
  subtitulo: {
    marginTop: 18,
    fontSize: 16,
    color: cores.escuro,
  },
  vazio: {
    padding: 30,
    alignItems: 'center',
  },
  textoVazio: {
    fontSize: 16,
    color: cores.escuro,
    textAlign: 'center',
  },
});
