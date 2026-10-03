import { View, Text, TextInput, StyleSheet } from 'react-native';

import { cores, raio } from '../estilos/tema';

// Campo de formulário com rótulo e mensagem de erro
export default function Campo({ rotulo, erro, multiline, ...props }) {
  return (
    <View style={estilos.grupo}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <TextInput
        style={[estilos.campo, multiline && estilos.multilinha, erro && estilos.campoErro]}
        placeholderTextColor={cores.textoSuave}
        multiline={multiline}
        accessibilityLabel={rotulo}
        {...props}
      />
      {erro ? <Text style={estilos.erro}>{erro}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  grupo: {
    marginBottom: 16,
  },
  rotulo: {
    fontSize: 15,
    fontWeight: '600',
    color: cores.texto,
    marginBottom: 6,
  },
  campo: {
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio,
    padding: 12,
    fontSize: 16,
    color: cores.texto,
  },
  multilinha: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  campoErro: {
    borderColor: cores.perigo,
    borderWidth: 2,
  },
  erro: {
    color: cores.perigo,
    fontSize: 13,
    marginTop: 4,
  },
});
