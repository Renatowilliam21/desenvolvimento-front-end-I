import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { cores, raio } from '../estilos/tema';

// variante: 'primario' | 'perigo' | 'contorno'
export default function Botao({ titulo, onPress, variante = 'primario', style, desabilitado }) {
  const fundo = {
    primario: { backgroundColor: cores.primaria },
    perigo: { backgroundColor: cores.perigo },
    contorno: { backgroundColor: 'transparent', borderWidth: 2, borderColor: cores.primaria },
  }[variante];

  return (
    <TouchableOpacity
      style={[estilos.botao, fundo, desabilitado && estilos.desabilitado, style]}
      onPress={onPress}
      disabled={desabilitado}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={titulo}
    >
      <Text style={[estilos.texto, variante === 'contorno' && { color: cores.primaria }]}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  botao: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: raio,
    alignItems: 'center',
  },
  desabilitado: {
    opacity: 0.5,
  },
  texto: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: '600',
  },
});
