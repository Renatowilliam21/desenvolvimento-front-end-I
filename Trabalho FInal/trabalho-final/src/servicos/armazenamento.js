import AsyncStorage from '@react-native-async-storage/async-storage';

/*
 * CRUD genérico com AsyncStorage (requisito 3).
 * Cada "coleção" é guardada como um array JSON em uma chave.
 * Ex.: const alertas = criarColecao('@arrojado-campo:alertas');
 *      await alertas.criar({ parametro: 'itgu', operador: '>', valor_limite: 78 });
 */
export default function criarColecao(chave) {
  async function listar() {
    try {
      const salvo = await AsyncStorage.getItem(chave);
      return salvo ? JSON.parse(salvo) : [];
    } catch (e) {
      console.error(`Erro ao ler ${chave}`, e);
      return [];
    }
  }

  async function salvarTudo(lista) {
    await AsyncStorage.setItem(chave, JSON.stringify(lista));
    return lista;
  }

  async function buscar(id) {
    const lista = await listar();
    return lista.find((item) => item.id === id) || null;
  }

  async function criar(dados) {
    const lista = await listar();
    // id único mesmo para registros criados no mesmo milissegundo
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    const novo = { ...dados, id, criadoEm: new Date().toISOString() };
    await salvarTudo([novo, ...lista]);
    return novo;
  }

  async function atualizar(id, dados) {
    const lista = await listar();
    const atualizada = lista.map((item) =>
      item.id === id ? { ...item, ...dados, atualizadoEm: new Date().toISOString() } : item
    );
    await salvarTudo(atualizada);
    return atualizada.find((item) => item.id === id);
  }

  async function remover(id) {
    const lista = await listar();
    await salvarTudo(lista.filter((item) => item.id !== id));
  }

  async function limpar() {
    await AsyncStorage.removeItem(chave);
  }

  return { listar, buscar, criar, atualizar, remover, limpar };
}
