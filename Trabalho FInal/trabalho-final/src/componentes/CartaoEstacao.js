import { memo } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatarNumero } from '../formatacao';

import { cores, coresClassificacao, coresUmidade, raio } from '../estilos/tema';
import { classificarUmidade } from '../servicos/indices';
import Selo from './Selo';

// Card do Painel: um por estação. memo evita re-renderizar cards que não mudaram.
function CartaoEstacao({ estacao, leitura, alertasDisparados, onPress }) {
  const classificacao = leitura?.itgu_classificacao ?? 'neutro';
  const corBorda = (coresClassificacao[classificacao] || coresClassificacao.neutro).forte;
  const corUmidade = coresUmidade[classificarUmidade(leitura?.umidade_ar)] ?? cores.texto;

  return (
    <TouchableOpacity
      style={[estilos.card, { borderLeftColor: corBorda }]}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`${estacao.nome}, ${leitura?.temperatura_ar ?? '--'} graus, ITGU ${leitura?.itgu ?? '--'}`}
    >
      <View style={estilos.topo}>
        <View style={{ flex: 1 }}>
          <Text style={estilos.nome} numberOfLines={1}>{estacao.nome}</Text>
          <Text style={estilos.local} numberOfLines={1}>
            <Ionicons name="location-outline" size={12} /> {estacao.localizacao}
          </Text>
        </View>
        <Selo classificacao={classificacao} />
      </View>

      <View style={estilos.linha}>
        <View style={estilos.bloco}>
          <Text style={estilos.valorGrande}>
            {formatarNumero(leitura?.temperatura_ar)}
            <Text style={estilos.unidade}>°C</Text>
          </Text>
          <Text style={estilos.rotulo}>Temperatura</Text>
        </View>
        <View style={estilos.bloco}>
          <Text style={[estilos.valor, { color: corUmidade }]}>{formatarNumero(leitura?.umidade_ar)}%</Text>
          <Text style={estilos.rotulo}>Umidade</Text>
        </View>
        <View style={estilos.bloco}>
          <Text style={estilos.valor}>{formatarNumero(leitura?.itgu)}</Text>
          <Text style={estilos.rotulo}>ITGU</Text>
        </View>
      </View>

      <View style={estilos.rodape}>
        {alertasDisparados > 0 ? (
          <Text style={estilos.alerta}>
            <Ionicons name="warning" size={13} /> {alertasDisparados} alerta(s) disparado(s)
          </Text>
        ) : (
          <Text style={estilos.semAlerta}>
            <Ionicons name="checkmark-circle-outline" size={13} /> Nenhum alerta disparado
          </Text>
        )}
        <Text style={estilos.hora}>Leitura das {leitura?.hora ?? '--:--'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: cores.superficie,
    borderRadius: raio,
    borderLeftWidth: 6,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  nome: {
    fontSize: 17,
    fontWeight: '700',
    color: cores.texto,
  },
  local: {
    fontSize: 13,
    color: cores.textoSuave,
    marginTop: 2,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 14,
  },
  bloco: {
    flex: 1,
  },
  valorGrande: {
    fontSize: 34,
    fontWeight: '700',
    color: cores.texto,
  },
  unidade: {
    fontSize: 18,
    fontWeight: '600',
  },
  valor: {
    fontSize: 22,
    fontWeight: '700',
    color: cores.texto,
  },
  rotulo: {
    fontSize: 12,
    color: cores.textoSuave,
    marginTop: 2,
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
  },
  alerta: {
    color: cores.perigo,
    fontWeight: '700',
    fontSize: 13,
  },
  semAlerta: {
    color: cores.textoSuave,
    fontSize: 13,
  },
  hora: {
    color: cores.textoSuave,
    fontSize: 12,
  },
});

export default memo(CartaoEstacao);
