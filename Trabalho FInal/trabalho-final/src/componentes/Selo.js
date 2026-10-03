import { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { coresClassificacao } from '../estilos/tema';
import { ROTULOS_CLASSIFICACAO } from '../servicos/indices';

// Etiqueta colorida com a classificação (Normal, Alerta, Perigo...)
function Selo({ classificacao, texto, tamanho = 'normal' }) {
  const cor = coresClassificacao[classificacao] || coresClassificacao.neutro;
  const rotulo = texto ?? ROTULOS_CLASSIFICACAO[classificacao] ?? 'Sem dado';

  return (
    <View
      style={[estilos.selo, { backgroundColor: cor.fundo }, tamanho === 'grande' && estilos.grande]}
      accessibilityLabel={`Classificação: ${rotulo}`}
    >
      <View style={[estilos.ponto, { backgroundColor: cor.forte }]} />
      <Text style={[estilos.texto, { color: cor.texto }, tamanho === 'grande' && estilos.textoGrande]}>
        {rotulo}
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  selo: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  grande: {
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  ponto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  texto: {
    fontSize: 12,
    fontWeight: '700',
  },
  textoGrande: {
    fontSize: 15,
  },
});

export default memo(Selo);
