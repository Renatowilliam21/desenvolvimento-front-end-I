// Formata números no padrão brasileiro: 86.5 -> "86,5"; 69298.1 -> "69.298,1"
export function formatarNumero(valor, casas) {
  if (typeof valor !== 'number' || Number.isNaN(valor)) return '--';
  const texto = casas === undefined ? String(valor) : valor.toFixed(casas);
  const [inteiro, decimal] = texto.split('.');
  const comMilhar = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return decimal ? `${comMilhar},${decimal}` : comMilhar;
}
