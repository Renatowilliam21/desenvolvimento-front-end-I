import { useCallback, useLayoutEffect } from 'react';
import { FlatList, View, Text, Switch, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatarNumero } from '../formatacao';

import { cores, coresClassificacao, raio } from '../estilos/tema';
import useResponsivo from '../hooks/useResponsivo';
import { useApp } from '../contexto/AppContext';
import { buscarEstacao } from '../servicos/leituras';
import { descreverAlerta } from '../servicos/alertas';
import Selo from '../componentes/Selo';
import Botao from '../componentes/Botao';
import EstadoVazio from '../componentes/EstadoVazio';

const ESTADOS = {
  disparado: { classificacao: 'perigo', texto: 'Disparado' },
  normal: { classificacao: 'normal', texto: 'Normal' },
  inativo: { classificacao: 'neutro', texto: 'Inativo' },
  sem_dado: { classificacao: 'neutro', texto: 'Sem dado' },
};

// Leitura do CRUD (R): lista as configurações e o estado de cada uma
export default function ListaAlertas({ navigation }) {
  const { alertas, avaliacoes, carregandoAlertas, atualizarAlerta } = useApp();
  const { paddingTela } = useResponsivo();

  const novoAlerta = useCallback(() => navigation.navigate('FormularioAlerta'), [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={novoAlerta} style={{ marginRight: 16 }} accessibilityLabel="Nova configuração de alerta">
          <Ionicons name="add-circle" size={30} color={cores.branco} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, novoAlerta]);

  if (carregandoAlertas) {
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" color={cores.primaria} />;
  }

  // Ordena: disparados primeiro
  const ordenados = [...alertas].sort(
    (a, b) => (avaliacoes[b.id]?.estado === 'disparado') - (avaliacoes[a.id]?.estado === 'disparado')
  );

  return (
    <FlatList
      style={{ backgroundColor: cores.fundo }}
      contentContainerStyle={[estilos.conteudo, { padding: paddingTela }]}
      data={ordenados}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Text style={estilos.intro}>
          Defina limites por estação. O app compara cada configuração com a leitura mais recente.
        </Text>
      }
      ListEmptyComponent={
        <View>
          <EstadoVazio icone="notifications-off-outline" mensagem="Nenhuma configuração de alerta cadastrada." />
          <Botao titulo="Criar primeira configuração" onPress={novoAlerta} />
        </View>
      }
      renderItem={({ item }) => {
        const avaliacao = avaliacoes[item.id] || { estado: 'sem_dado' };
        const estado = ESTADOS[avaliacao.estado];
        const disparado = avaliacao.estado === 'disparado';
        return (
          <TouchableOpacity
            style={[estilos.card, disparado && estilos.cardDisparado]}
            onPress={() => navigation.navigate('FormularioAlerta', { id: item.id })}
            accessibilityRole="button"
            accessibilityLabel={`Editar alerta ${descreverAlerta(item)}`}
          >
            <View style={{ flex: 1 }}>
              <Text style={estilos.titulo}>{descreverAlerta(item)}</Text>
              <Text style={estilos.estacao}>{buscarEstacao(item.estacao_id)?.nome ?? 'Estação removida'}</Text>
              <View style={estilos.linha}>
                <Selo classificacao={estado.classificacao} texto={estado.texto} />
                {typeof avaliacao.valor === 'number' && (
                  <Text style={estilos.valor}>valor atual: {formatarNumero(avaliacao.valor)}</Text>
                )}
              </View>
            </View>
            <View style={estilos.lado}>
              <Switch
                value={item.ativo}
                onValueChange={(ativo) => atualizarAlerta(item.id, { ativo })}
                trackColor={{ true: cores.primariaClara, false: '#CFC8BA' }}
                thumbColor={cores.branco}
                activeThumbColor={cores.branco}
                accessibilityLabel={item.ativo ? 'Desativar alerta' : 'Ativar alerta'}
              />
              <Ionicons name="chevron-forward" size={20} color={cores.textoSuave} />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const estilos = StyleSheet.create({
  conteudo: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
  },
  intro: {
    color: cores.textoSuave,
    fontSize: 14,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.superficie,
    borderRadius: raio,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  cardDisparado: {
    borderColor: coresClassificacao.perigo.forte,
    borderWidth: 2,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700',
    color: cores.texto,
  },
  estacao: {
    fontSize: 13,
    color: cores.textoSuave,
    marginTop: 2,
    marginBottom: 8,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  valor: {
    fontSize: 13,
    color: cores.textoSuave,
  },
  lado: {
    alignItems: 'center',
    gap: 6,
    marginLeft: 8,
  },
});
