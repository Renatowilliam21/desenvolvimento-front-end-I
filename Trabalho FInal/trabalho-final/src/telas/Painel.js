import { useCallback, useMemo, useState } from 'react';
import { FlatList, View, Text, RefreshControl, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatarNumero } from '../formatacao';

import { cores, coresClassificacao, raio } from '../estilos/tema';
import useResponsivo from '../hooks/useResponsivo';
import { useApp } from '../contexto/AppContext';
import { listarEstacoes, buscarEstacao } from '../servicos/leituras';
import { descreverAlerta } from '../servicos/alertas';
import CartaoEstacao from '../componentes/CartaoEstacao';
import BarraSimulacao from '../componentes/BarraSimulacao';

export default function Painel({ navigation }) {
  const { leiturasAtuais, alertas, avaliacoes, atualizar } = useApp();
  const { colunas, paddingTela } = useResponsivo();
  const [atualizando, setAtualizando] = useState(false);
  const estacoes = listarEstacoes();
  const numColunas = Math.min(colunas, 2);

  const disparadosPorEstacao = useMemo(() => {
    const contagem = {};
    for (const alerta of alertas) {
      if (avaliacoes[alerta.id]?.estado === 'disparado') {
        contagem[alerta.estacao_id] = (contagem[alerta.estacao_id] || 0) + 1;
      }
    }
    return contagem;
  }, [alertas, avaliacoes]);

  const disparados = useMemo(
    () => alertas.filter((a) => avaliacoes[a.id]?.estado === 'disparado'),
    [alertas, avaliacoes]
  );

  const aoAtualizar = useCallback(() => {
    setAtualizando(true);
    atualizar();
    setTimeout(() => setAtualizando(false), 400);
  }, [atualizar]);

  const abrirEstacao = useCallback(
    (estacao) => navigation.navigate('DetalheEstacao', { id: estacao.id, nome: estacao.nome }),
    [navigation]
  );

  const cabecalho = (
    <View>
      <Text style={estilos.saudacao}>Condições das estações</Text>
      <Text style={estilos.subtitulo}>Monitoramento de conforto térmico animal · Boa Viagem-CE</Text>
      <BarraSimulacao />
    </View>
  );

  const rodape = (
    <View style={estilos.secao}>
      <Text style={estilos.tituloSecao}>
        <Ionicons name="notifications-outline" size={16} /> Alertas disparados agora
      </Text>
      {disparados.length === 0 ? (
        <Text style={estilos.nenhum}>Nenhum alerta disparado neste horário.</Text>
      ) : (
        disparados.map((alerta) => (
          <View key={alerta.id} style={estilos.alerta}>
            <Ionicons name="warning" size={18} color={coresClassificacao.perigo.forte} />
            <View style={{ flex: 1 }}>
              <Text style={estilos.alertaTitulo}>{descreverAlerta(alerta)}</Text>
              <Text style={estilos.alertaSub}>
                {buscarEstacao(alerta.estacao_id)?.nome} · valor atual {formatarNumero(avaliacoes[alerta.id].valor)}
              </Text>
            </View>
          </View>
        ))
      )}
    </View>
  );

  return (
    <FlatList
      key={`painel-${numColunas}`}
      style={estilos.lista}
      contentContainerStyle={[estilos.conteudo, { padding: paddingTela }]}
      data={estacoes}
      numColumns={numColunas}
      columnWrapperStyle={numColunas > 1 ? { gap: 16 } : undefined}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={cabecalho}
      ListFooterComponent={rodape}
      refreshControl={<RefreshControl refreshing={atualizando} onRefresh={aoAtualizar} tintColor={cores.primaria} />}
      renderItem={({ item }) => (
        <CartaoEstacao
          estacao={item}
          leitura={leiturasAtuais[item.id]}
          alertasDisparados={disparadosPorEstacao[item.id] || 0}
          onPress={() => abrirEstacao(item)}
        />
      )}
    />
  );
}

const estilos = StyleSheet.create({
  lista: {
    backgroundColor: cores.fundo,
  },
  conteudo: {
    width: '100%',
    maxWidth: 1000,
    alignSelf: 'center',
  },
  saudacao: {
    fontSize: 22,
    fontWeight: '700',
    color: cores.texto,
  },
  subtitulo: {
    fontSize: 14,
    color: cores.textoSuave,
    marginTop: 2,
    marginBottom: 16,
  },
  secao: {
    marginTop: 8,
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: '700',
    color: cores.texto,
    marginBottom: 10,
  },
  nenhum: {
    color: cores.textoSuave,
    fontSize: 14,
  },
  alerta: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: coresClassificacao.perigo.fundo,
    borderRadius: raio,
    padding: 12,
    marginBottom: 8,
  },
  alertaTitulo: {
    fontWeight: '700',
    color: coresClassificacao.perigo.texto,
  },
  alertaSub: {
    fontSize: 13,
    color: coresClassificacao.perigo.texto,
    marginTop: 2,
  },
});
