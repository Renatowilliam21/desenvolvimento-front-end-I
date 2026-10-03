import { memo, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatarNumero } from '../formatacao';

import { cores, coresClassificacao, raio } from '../estilos/tema';

// Gráfico de barras simples (sem biblioteca): uma barra por hora, colorida pela classificação do ITGU
function GraficoBarras({ titulo, serie, unidade = '', altura = 120 }) {
  const { minimo, maximo } = useMemo(() => {
    const valores = serie.map((p) => p.valor).filter((v) => typeof v === 'number');
    return { minimo: Math.min(...valores), maximo: Math.max(...valores) };
  }, [serie]);

  const escala = (v) => {
    if (maximo === minimo) return altura * 0.6;
    return 12 + ((v - minimo) / (maximo - minimo)) * (altura - 12);
  };

  return (
    <View style={estilos.card}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo}>{titulo}</Text>
        <Text style={estilos.faixa}>
          {formatarNumero(minimo)}{unidade} a {formatarNumero(maximo)}{unidade}
        </Text>
      </View>
      <View style={[estilos.barras, { height: altura }]} accessibilityLabel={`${titulo}: de ${minimo} a ${maximo}`}>
        {serie.map((ponto) => (
          <View key={ponto.hora} style={estilos.coluna}>
            <View
              style={[
                estilos.barra,
                {
                  height: typeof ponto.valor === 'number' ? escala(ponto.valor) : 2,
                  backgroundColor: (coresClassificacao[ponto.classificacao] || coresClassificacao.neutro).forte,
                },
              ]}
            />
          </View>
        ))}
      </View>
      <View style={estilos.eixo}>
        <Text style={estilos.eixoTexto}>{serie[0]?.hora}</Text>
        <Text style={estilos.eixoTexto}>{serie[Math.floor(serie.length / 2)]?.hora}</Text>
        <Text style={estilos.eixoTexto}>{serie[serie.length - 1]?.hora}</Text>
      </View>
      <View style={estilos.legenda}>
        {['normal', 'alerta', 'perigo'].map((c) => (
          <View key={c} style={estilos.itemLegenda}>
            <View style={[estilos.quadrado, { backgroundColor: coresClassificacao[c].forte }]} />
            <Text style={estilos.eixoTexto}>ITGU {c}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  card: {
    backgroundColor: cores.superficie,
    borderRadius: raio,
    padding: 16,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: cores.texto,
  },
  faixa: {
    fontSize: 13,
    color: cores.textoSuave,
  },
  barras: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  coluna: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  barra: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  eixo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  eixoTexto: {
    fontSize: 11,
    color: cores.textoSuave,
  },
  legenda: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  itemLegenda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  quadrado: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
});

export default memo(GraficoBarras);
