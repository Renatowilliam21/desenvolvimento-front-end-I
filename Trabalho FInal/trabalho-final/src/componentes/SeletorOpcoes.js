import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { cores } from '../estilos/tema';

// Grupo de "chips" para escolher uma opção (substitui o <select> da versão web)
export default function SeletorOpcoes({ opcoes, valor, onChange, rotuloAcessivel }) {
  return (
    <View style={estilos.grupo} accessibilityRole="radiogroup" accessibilityLabel={rotuloAcessivel}>
      {opcoes.map((opcao) => {
        const selecionado = opcao.valor === valor;
        return (
          <TouchableOpacity
            key={String(opcao.valor)}
            style={[estilos.chip, selecionado && estilos.chipSelecionado]}
            onPress={() => onChange(opcao.valor)}
            accessibilityRole="radio"
            accessibilityState={{ selected: selecionado }}
            accessibilityLabel={opcao.rotulo}
          >
            <Text style={[estilos.texto, selecionado && estilos.textoSelecionado]}>{opcao.rotulo}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const estilos = StyleSheet.create({
  grupo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.superficie,
  },
  chipSelecionado: {
    backgroundColor: cores.primaria,
    borderColor: cores.primaria,
  },
  texto: {
    color: cores.texto,
    fontSize: 14,
  },
  textoSelecionado: {
    color: cores.branco,
    fontWeight: '700',
  },
});
