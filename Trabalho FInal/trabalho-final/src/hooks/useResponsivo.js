import { useWindowDimensions } from 'react-native';

// Hook de responsividade (requisito 5). Recalcula sempre que a janela muda.
export default function useResponsivo() {
  const { width, height } = useWindowDimensions();

  const ehTablet = width >= 700;
  const ehDesktop = width >= 1024;

  return {
    largura: width,
    altura: height,
    ehTablet,
    ehDesktop,
    colunas: ehDesktop ? 3 : ehTablet ? 2 : 1,
    paddingTela: ehTablet ? 32 : 16,
    escalaFonte: ehTablet ? 1.15 : 1,
  };
}
