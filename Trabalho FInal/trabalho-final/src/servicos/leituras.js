import dados from '../dados/leituras.json';

/*
 * Fonte de leituras do app.
 *
 * Usa um ciclo diário simulado (144 leituras de 10 em 10 minutos por estação),
 * no mesmo formato do payload POST /api/leituras da plataforma Arrojado.
 * As leituras são "encaixadas" no relógio: o app mostra as últimas 24 horas
 * até o horário de referência (o horário atual ou um horário simulado).
 *
 * Para usar a API real no futuro, basta trocar as funções abaixo por fetch()
 * para /api/v1/estacoes e /api/v1/estacoes/{id}/leituras, mantendo os retornos.
 */

const MINUTOS_POR_LEITURA = 10;

// Converte a referência (Date ou "HH:MM") em um Date de hoje
function dataReferencia(horaSimulada) {
  const agora = new Date();
  if (!horaSimulada) return agora;
  const [h, m] = horaSimulada.split(':').map(Number);
  const ref = new Date(agora);
  ref.setHours(h, m, 0, 0);
  return ref;
}

// Leituras das últimas 24 h até a referência, da mais antiga para a mais recente
function montarJanela(estacaoId, horaSimulada) {
  const ciclo = dados.ciclos[String(estacaoId)] || [];
  const ref = dataReferencia(horaSimulada);
  const slotAtual = Math.floor((ref.getHours() * 60 + ref.getMinutes()) / MINUTOS_POR_LEITURA);

  const janela = [];
  for (let i = ciclo.length - 1; i >= 0; i--) {
    const slot = (slotAtual - i + ciclo.length) % ciclo.length;
    const leitura = ciclo[slot];
    const registradoEm = new Date(ref);
    registradoEm.setSeconds(0, 0);
    registradoEm.setMinutes(Math.floor(ref.getMinutes() / MINUTOS_POR_LEITURA) * MINUTOS_POR_LEITURA - i * MINUTOS_POR_LEITURA);
    janela.push({ ...leitura, registrado_em: registradoEm.toISOString() });
  }
  return janela;
}

export function listarEstacoes() {
  return dados.estacoes;
}

export function buscarEstacao(id) {
  return dados.estacoes.find((estacao) => estacao.id === id) || null;
}

export function listarLeituras(estacaoId, horaSimulada) {
  return montarJanela(estacaoId, horaSimulada);
}

export function ultimaLeitura(estacaoId, horaSimulada) {
  const janela = montarJanela(estacaoId, horaSimulada);
  return janela[janela.length - 1] || null;
}

// Mínimo e máximo do dia (desde 00:00 da data de referência), com horário
export function minMaxDoDia(estacaoId, campo, horaSimulada) {
  const ref = dataReferencia(horaSimulada);
  const doDia = montarJanela(estacaoId, horaSimulada).filter(
    (l) => new Date(l.registrado_em).toDateString() === ref.toDateString() && typeof l[campo] === 'number'
  );
  if (doDia.length === 0) return null;

  let min = doDia[0];
  let max = doDia[0];
  for (const l of doDia) {
    if (l[campo] < min[campo]) min = l;
    if (l[campo] > max[campo]) max = l;
  }
  return {
    min: { valor: min[campo], hora: min.hora },
    max: { valor: max[campo], hora: max.hora },
  };
}

// Uma leitura por hora nas últimas 24 h (para o gráfico de barras)
export function serieHoraria(estacaoId, campo, horaSimulada) {
  return montarJanela(estacaoId, horaSimulada)
    .filter((l) => l.hora.endsWith(':00'))
    .map((l) => ({ hora: l.hora, valor: l[campo] ?? null, classificacao: l.itgu_classificacao }));
}
