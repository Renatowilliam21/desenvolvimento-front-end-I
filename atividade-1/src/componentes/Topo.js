import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import cores from '../estilos/cores';
import imagemTopo from '../imagens/topo.png';

// Cabeçalho comum às três telas: faixa com as casas coloridas, botão "Início" e título.
// O botão "Início" atende o requisito 4 (todas as telas voltam à página inicial).
// Na própria página inicial, quem chama pode passar "aoIrParaInicio" (ex.: rolar ao topo).
export default function Topo({ titulo, aoIrParaInicio, children }) {
  const navigation = useNavigation();

  function irParaInicio() {
    if (aoIrParaInicio) {
      aoIrParaInicio();
    } else {
      navigation.popToTop();
    }
  }

  return (
    <View>
      <View>
        <Image source={imagemTopo} style={estilos.imagem} resizeMode="cover" />
        <TouchableOpacity
          style={estilos.botaoInicio}
          onPress={irParaInicio}
          accessibilityRole="button"
          accessibilityLabel="Voltar à página inicial"
        >
          <Text style={estilos.textoInicio}>⌂ Início</Text>
        </TouchableOpacity>
      </View>
      <View style={estilos.faixa}>
        <Text style={estilos.titulo}>{titulo}</Text>
        {children}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  imagem: {
    width: '100%',
    height: 160,
  },
  botaoInicio: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: cores.escuro,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  textoInicio: {
    color: cores.branco,
    fontSize: 14,
    fontWeight: 'bold',
  },
  faixa: {
    backgroundColor: cores.fundo,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.escuro,
  },
});
