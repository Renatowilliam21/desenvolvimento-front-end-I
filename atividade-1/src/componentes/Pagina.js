import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import cores from '../estilos/cores';

// Envolve cada tela: fundo salmão e conteúdo centralizado com largura máxima,
// para o layout não esticar demais quando aberto no navegador do computador
export default function Pagina({ children }) {
  return (
    <SafeAreaView style={estilos.fundo} edges={['bottom', 'left', 'right']}>
      <View style={estilos.conteudo}>{children}</View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
});
