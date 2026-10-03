import { View, Image, Text, StyleSheet } from 'react-native';

import cores from '../estilos/cores';

// Mostra a foto do imóvel ou, se não houver, o "ESPAÇO PARA IMAGEM" do mockup
export default function ImagemImovel({ imagem, style }) {
  if (imagem) {
    return <Image source={imagem} style={[estilos.base, style]} resizeMode="cover" />;
  }

  return (
    <View style={[estilos.base, estilos.placeholder, style]}>
      <Text style={estilos.textoPlaceholder}>ESPAÇO{'\n'}PARA{'\n'}IMAGEM</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  base: {
    backgroundColor: cores.placeholder,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoPlaceholder: {
    textAlign: 'center',
    color: cores.preto,
    fontSize: 14,
  },
});
