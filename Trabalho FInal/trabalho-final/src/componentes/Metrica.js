import { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatarNumero } from '../formatacao';

import { cores, raio } from '../estilos/tema';

// Cartão de uma métrica, com mínimo e máximo do dia opcionais
function Metrica({ rotulo, valor, unidade = '', corValor, minMax, destaque = false, style }) {
  const temValor = typeof valor === 'number';

  return (
    <View style={[estilos.card, destaque && estilos.destaque, style]}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <Text style={[estilos.valor, destaque && estilos.valorDestaque, corValor && { color: corValor }]}>
        {formatarNumero(valor)}
        {temValor && unidade ? <Text style={estilos.unidade}>{unidade}</Text> : null}
      </Text>
      {!temValor && <Text style={estilos.ausente}>Sensor não instalado</Text>}
      {minMax && (
        <View style={estilos.minMax}>
          <Text style={estilos.minMaxTexto}>↓ {formatarNumero(minMax.min.valor)} às {minMax.min.hora}</Text>
          <Text style={estilos.minMaxTexto}>↑ {formatarNumero(minMax.max.valor)} às {minMax.max.hora}</Text>
        </View>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  card: {
    backgroundColor: cores.superficie,
    borderRadius: raio,
    padding: 14,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  destaque: {
    borderColor: cores.primaria,
    borderWidth: 2,
  },
  rotulo: {
    fontSize: 13,
    color: cores.textoSuave,
  },
  valor: {
    fontSize: 22,
    fontWeight: '700',
    color: cores.texto,
    marginTop: 4,
  },
  valorDestaque: {
    fontSize: 26,
  },
  unidade: {
    fontSize: 14,
    fontWeight: '600',
  },
  ausente: {
    fontSize: 11,
    color: cores.textoSuave,
    marginTop: 2,
  },
  minMax: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
  },
  minMaxTexto: {
    fontSize: 12,
    color: cores.textoSuave,
  },
});

export default memo(Metrica);
