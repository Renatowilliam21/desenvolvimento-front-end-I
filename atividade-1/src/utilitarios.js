// Formata um número como moeda brasileira: 350000 -> "R$ 350.000,00"
export function formatarValor(valor) {
  return 'R$ ' + Number(valor)
    .toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Converte o texto digitado ("350.000,50" ou "350000.50") em número
export function converterValor(texto) {
  const limpo = texto.replace(/[^\d,.]/g, '');
  if (!limpo) return NaN;
  // Se tiver vírgula, ela é o separador decimal e os pontos são de milhar
  if (limpo.includes(',')) {
    return parseFloat(limpo.replace(/\./g, '').replace(',', '.'));
  }
  return parseFloat(limpo);
}
