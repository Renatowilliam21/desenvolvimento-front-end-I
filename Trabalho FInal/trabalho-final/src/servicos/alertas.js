import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatarNumero } from '../formatacao';

import criarColecao from './armazenamento';
import PARAMETROS from '../dados/parametros';

/*
 * Configurações de alerta (CRUD com AsyncStorage).
 * Mesmos campos da tabela alertas_config da plataforma:
 * estacao_id, parametro, operador, valor_limite, ativo.
 */
const colecao = criarColecao('@arrojado-campo:alertas');
const CHAVE_INICIALIZADO = '@arrojado-campo:alertas-inicializados';

// Alertas de exemplo criados no primeiro uso, para o app não começar vazio
const ALERTAS_INICIAIS = [
  { estacao_id: 2, parametro: 'itgu', operador: '>', valor_limite: 78, ativo: true },
  { estacao_id: 1, parametro: 'itgu', operador: '>', valor_limite: 72, ativo: true },
  { estacao_id: 2, parametro: 'umidade_ar', operador: '<', valor_limite: 30, ativo: true },
];

export async function inicializarAlertas() {
  const jaInicializado = await AsyncStorage.getItem(CHAVE_INICIALIZADO);
  if (jaInicializado) return;
  for (const alerta of [...ALERTAS_INICIAIS].reverse()) {
    await colecao.criar(alerta);
  }
  await AsyncStorage.setItem(CHAVE_INICIALIZADO, 'sim');
}

// Avalia uma configuração contra a leitura: 'disparado', 'normal', 'inativo' ou 'sem_dado'
export function avaliarAlerta(alerta, leitura) {
  if (!alerta.ativo) return { estado: 'inativo', valor: null };
  const valor = leitura ? leitura[alerta.parametro] : undefined;
  if (typeof valor !== 'number') return { estado: 'sem_dado', valor: null };

  const limite = Number(alerta.valor_limite);
  const condicoes = {
    '>': valor > limite,
    '>=': valor >= limite,
    '<': valor < limite,
    '<=': valor <= limite,
    '=': valor === limite,
  };
  return { estado: condicoes[alerta.operador] ? 'disparado' : 'normal', valor };
}

export function descreverAlerta(alerta) {
  const parametro = PARAMETROS[alerta.parametro];
  const unidade = parametro?.unidade?.trim() ? parametro.unidade : '';
  const limite = typeof alerta.valor_limite === 'number' ? formatarNumero(alerta.valor_limite) : alerta.valor_limite;
  return `${parametro?.rotulo ?? alerta.parametro} ${alerta.operador} ${limite}${unidade}`;
}

export default colecao;
