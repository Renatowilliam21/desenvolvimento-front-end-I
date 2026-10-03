// Identidade visual do Arrojado Campo: tons da caatinga e do sol do sertão
export const cores = {
  primaria: '#1F4E3D',      // verde caatinga
  primariaClara: '#2F6B55',
  secundaria: '#E08E2B',    // sol do sertão
  fundo: '#F6F2EA',         // areia
  superficie: '#FFFFFF',
  texto: '#1E2420',
  textoSuave: '#66706A',
  borda: '#DDD6C8',
  perigo: '#C62828',
  branco: '#FFFFFF',
};

// Cores por classificação (ITGU, ITU, Índice de Calor e estado de alerta)
export const coresClassificacao = {
  normal: { fundo: '#E3F1E5', texto: '#1B5E20', forte: '#2E7D32' },
  alerta: { fundo: '#FFF4D6', texto: '#7A5300', forte: '#E0A100' },
  atencao: { fundo: '#FFF4D6', texto: '#7A5300', forte: '#E0A100' },
  atencao_extrema: { fundo: '#FFE7D1', texto: '#8A3B00', forte: '#E46A00' },
  perigo: { fundo: '#FDE2E1', texto: '#8E1B1B', forte: '#C62828' },
  perigo_extremo: { fundo: '#F6D3E3', texto: '#6A1040', forte: '#8E1B5A' },
  neutro: { fundo: '#ECEAE4', texto: '#55605A', forte: '#8A938D' },
};

// Cores de umidade (mesma regra da plataforma web)
export const coresUmidade = {
  critica: '#C62828',
  baixa: '#E46A00',
  adequada: '#1565C0',
};

export const espacos = { p: 8, m: 16, g: 24 };
export const raio = 12;
