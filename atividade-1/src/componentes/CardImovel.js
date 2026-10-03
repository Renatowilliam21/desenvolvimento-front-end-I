import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import cores from '../estilos/cores';
import ImagemImovel from './ImagemImovel';
import { formatarValor } from '../utilitarios';

// Item da lista da página inicial
export default function CardImovel({ imovel, onPress }) {
  return (
    <TouchableOpacity
      style={estilos.card}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalhes de ${imovel.titulo}`}
    >
      <ImagemImovel imagem={imovel.imagem} style={estilos.imagem} />

      <View style={estilos.informacoes}>
        <Text style={estilos.titulo} numberOfLines={2}>{imovel.titulo}</Text>
        <Text style={estilos.descricao} numberOfLines={3}>{imovel.descricao}</Text>
        <Text style={estilos.valor}>{formatarValor(imovel.valor)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: cores.card,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  imagem: {
    width: 140,
    height: 140,
  },
  informacoes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  titulo: {
    fontSize: 15,
    color: cores.preto,
    textAlign: 'center',
    marginBottom: 6,
  },
  descricao: {
    fontSize: 13,
    color: cores.preto,
    textAlign: 'center',
    marginBottom: 8,
  },
  valor: {
    fontSize: 20,
    color: cores.preto,
    textAlign: 'center',
  },
});
