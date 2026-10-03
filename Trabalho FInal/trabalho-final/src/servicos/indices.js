/*
 * Índices bioclimatológicos da plataforma Arrojado.
 * Mesmas fórmulas e faixas do firmware esp32-estacao (v2.10), para que o app
 * classifique exatamente como as estações e o servidor.
 */

// Ponto de orvalho (aproximação de Magnus), em °C
export function calcularPontoOrvalho(temperatura, umidade) {
  const a = 17.27;
  const b = 237.7;
  const alpha = (a * temperatura) / (b + temperatura) + Math.log(umidade / 100);
  return (b * alpha) / (a - alpha);
}

// ITGU: Buffington et al. (1981), a partir do globo negro
export function calcularITGU(tempGloboNegro, umidade) {
  return tempGloboNegro + 0.36 * calcularPontoOrvalho(tempGloboNegro, umidade) + 41.5;
}

// ITU: Buffington et al. (1982), a partir da temperatura e umidade do ar
export function calcularITU(temperatura, umidade) {
  return 0.8 * temperatura + (umidade / 100) * (temperatura - 14.3) + 46.3;
}

// Índice de Calor: NOAA, regressão de Rothfusz (válida a partir de 26,7 °C)
export function calcularIndiceCalor(temperatura, umidade) {
  if (temperatura < 26.7) return temperatura;
  const T = (temperatura * 9) / 5 + 32;
  const RH = umidade;
  const HI =
    -42.379 + 2.04901523 * T + 10.14333127 * RH -
    0.22475541 * T * RH - 0.00683783 * T * T - 0.05481717 * RH * RH +
    0.00122874 * T * T * RH + 0.00085282 * T * RH * RH -
    0.00000199 * T * T * RH * RH;
  const resultado = ((HI - 32) * 5) / 9;
  if (resultado < -50 || resultado > 100) return NaN;
  return resultado;
}

// Classificação de ITGU e ITU (mesmos limites do firmware)
export function classificar(indice) {
  if (indice === null || indice === undefined || Number.isNaN(indice)) return null;
  if (indice > 78) return 'perigo';
  if (indice > 72) return 'alerta';
  return 'normal';
}

export function classificarIndiceCalor(indice) {
  if (indice === null || indice === undefined || Number.isNaN(indice)) return null;
  if (indice > 54) return 'perigo_extremo';
  if (indice > 41) return 'perigo';
  if (indice > 32) return 'atencao_extrema';
  if (indice > 27) return 'atencao';
  return 'normal';
}

// Mesma regra de cor da plataforma web: < 30% vermelho, 30 a 40% laranja, > 40% azul
export function classificarUmidade(umidade) {
  if (umidade === null || umidade === undefined) return null;
  if (umidade < 30) return 'critica';
  if (umidade <= 40) return 'baixa';
  return 'adequada';
}

export const ROTULOS_CLASSIFICACAO = {
  normal: 'Normal',
  alerta: 'Alerta',
  perigo: 'Perigo',
  atencao: 'Atenção',
  atencao_extrema: 'Atenção extrema',
  perigo_extremo: 'Perigo extremo',
};

// Dica contextual do Modo Campo (mesmo texto da plataforma web)
export function dicaDeCampo(classificacao, umidade) {
  if (classificacao === 'perigo') {
    return 'Risco alto de estresse térmico. Evite exposição prolongada ao sol e mantenha os animais em locais sombreados com água disponível.';
  }
  if (classificacao === 'alerta') {
    return 'Condições de atenção. Redobre a hidratação e monitore sinais de desconforto térmico nos animais.';
  }
  if (umidade !== null && umidade !== undefined && umidade < 30) {
    return 'Umidade baixa hoje. Fique atento à hidratação, mesmo com temperatura amena.';
  }
  return 'Condições dentro do normal. Nenhuma ação especial recomendada no momento.';
}
