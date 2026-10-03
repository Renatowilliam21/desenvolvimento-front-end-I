import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import cores from '../estilos/cores';

// Botão reutilizável. variante: 'principal' (oliva), 'perigo' (vermelho) ou 'contorno'
export default function Botao({ titulo, onPress, variante = 'principal', style }) {
  const estiloVariante = {
    principal: estilos.principal,
    perigo: estilos.perigo,
    contorno: estilos.contorno,
  }[variante];

  return (
    <TouchableOpacity
      style={[estilos.botao, estiloVariante, style]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={titulo}
    >
      <Text style={[estilos.texto, variante === 'contorno' && estilos.textoContorno]}>
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  botao: {
    minWidth: 200,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  principal: {
    backgroundColor: cores.escuro,
  },
  perigo: {
    backgroundColor: cores.perigo,
  },
  contorno: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: cores.escuro,
  },
  texto: {
    color: cores.branco,
    fontSize: 16,
  },
  textoContorno: {
    color: cores.escuro,
    fontWeight: 'bold',
  },
});
