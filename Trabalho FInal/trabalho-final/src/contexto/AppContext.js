import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import alertasColecao, { inicializarAlertas, avaliarAlerta } from '../servicos/alertas';
import { listarEstacoes, ultimaLeitura } from '../servicos/leituras';

/*
 * Estado compartilhado do app:
 *  - horaSimulada: null = horário atual; "15:00" = simula o dado daquele horário
 *  - alertas: configurações salvas no AsyncStorage (CRUD)
 *  - avaliacoes: estado de cada alerta frente à leitura mais recente
 */
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [horaSimulada, setHoraSimulada] = useState(null);
  const [alertas, setAlertas] = useState([]);
  const [carregandoAlertas, setCarregandoAlertas] = useState(true);
  const [atualizadoEm, setAtualizadoEm] = useState(new Date());

  const recarregarAlertas = useCallback(async () => {
    setAlertas(await alertasColecao.listar());
  }, []);

  useEffect(() => {
    (async () => {
      await inicializarAlertas();
      await recarregarAlertas();
      setCarregandoAlertas(false);
    })();
  }, [recarregarAlertas]);

  // "Puxar para atualizar": relê as leituras do horário atual
  const atualizar = useCallback(() => setAtualizadoEm(new Date()), []);

  const criarAlerta = useCallback(async (dados) => {
    await alertasColecao.criar(dados);
    await recarregarAlertas();
  }, [recarregarAlertas]);

  const atualizarAlerta = useCallback(async (id, dados) => {
    await alertasColecao.atualizar(id, dados);
    await recarregarAlertas();
  }, [recarregarAlertas]);

  const removerAlerta = useCallback(async (id) => {
    await alertasColecao.remover(id);
    await recarregarAlertas();
  }, [recarregarAlertas]);

  const leiturasAtuais = useMemo(() => {
    const mapa = {};
    for (const estacao of listarEstacoes()) {
      mapa[estacao.id] = ultimaLeitura(estacao.id, horaSimulada);
    }
    return mapa;
    // atualizadoEm força o recálculo quando o usuário puxa para atualizar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [horaSimulada, atualizadoEm]);

  const avaliacoes = useMemo(() => {
    const mapa = {};
    for (const alerta of alertas) {
      mapa[alerta.id] = avaliarAlerta(alerta, leiturasAtuais[alerta.estacao_id]);
    }
    return mapa;
  }, [alertas, leiturasAtuais]);

  const totalDisparados = useMemo(
    () => Object.values(avaliacoes).filter((a) => a.estado === 'disparado').length,
    [avaliacoes]
  );

  const valor = {
    horaSimulada,
    setHoraSimulada,
    atualizar,
    atualizadoEm,
    leiturasAtuais,
    alertas,
    carregandoAlertas,
    avaliacoes,
    totalDisparados,
    criarAlerta,
    atualizarAlerta,
    removerAlerta,
  };

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
