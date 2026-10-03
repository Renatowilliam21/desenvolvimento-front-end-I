import { ScrollView, View, Text, StyleSheet } from 'react-native';

import cores from '../estilos/cores';
import Pagina from '../componentes/Pagina';
import Topo from '../componentes/Topo';
import Botao from '../componentes/Botao';
import ImagemImovel from '../componentes/ImagemImovel';
import { useImoveis } from '../contexto/ImoveisContext';
import { formatarValor } from '../utilitarios';
import { confirmar } from '../mensagens';

export default function PaginaImovel({ route, navigation }) {
  const { buscarImovel, removerImovel } = useImoveis();
  const imovel = buscarImovel(route.params?.id);

  // Caso o imóvel não exista mais (ex.: página recarregada após exclusão)
  if (!imovel) {
    return (
      <Pagina>
        <ScrollView>
          <Topo titulo="Detalhes do imóvel:" />
          <View style={estilos.conteudo}>
            <Text style={estilos.descricao}>Imóvel não encontrado.</Text>
            <Botao titulo="Voltar ao início" onPress={() => navigation.popToTop()} />
          </View>
        </ScrollView>
      </Pagina>
    );
  }

  function excluir() {
    confirmar(
      'Excluir imóvel',
      `Deseja realmente excluir "${imovel.titulo}"?`,
      () => {
        navigation.popToTop();
        removerImovel(imovel.id);
      }
    );
  }

  return (
    <Pagina>
      <ScrollView>
        <Topo titulo="Detalhes do imóvel:" />

        <ImagemImovel imagem={imovel.imagem} style={estilos.imagem} />

        <View style={estilos.conteudo}>
          <Text style={estilos.titulo}>{imovel.titulo.toUpperCase()}</Text>
          <Text style={estilos.descricao}>{imovel.descricao}</Text>
          <Text style={estilos.valor}>{formatarValor(imovel.valor)}</Text>

          <View style={estilos.acoes}>
            <Botao titulo="Excluir imóvel" variante="perigo" onPress={excluir} />
            <Botao
              titulo="Voltar ao início"
              variante="contorno"
              onPress={() => navigation.popToTop()}
              style={estilos.botaoVoltar}
            />
          </View>
        </View>
      </ScrollView>
    </Pagina>
  );
}

const estilos = StyleSheet.create({
  imagem: {
    width: '100%',
    height: 260,
  },
  conteudo: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 16,
    color: cores.preto,
    marginLeft: 4,
    marginBottom: 16,
  },
  descricao: {
    fontSize: 15,
    color: cores.preto,
    textAlign: 'justify',
    lineHeight: 21,
    marginBottom: 30,
  },
  valor: {
    fontSize: 28,
    color: cores.preto,
    textAlign: 'center',
    marginBottom: 30,
  },
  acoes: {
    alignItems: 'center',
  },
  botaoVoltar: {
    marginTop: 14,
  },
});
