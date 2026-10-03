import { createContext, useContext, useState } from 'react';

import imoveisIniciais from '../dados/imoveis';

// Contexto que compartilha a lista de imóveis entre as três telas.
// Os dados ficam em memória: ao recarregar o app, voltam os imóveis iniciais.
const ImoveisContext = createContext(null);

export function ImoveisProvider({ children }) {
  const [imoveis, setImoveis] = useState(imoveisIniciais);

  function adicionarImovel({ titulo, descricao, valor }) {
    const novoImovel = {
      id: Date.now().toString(),
      titulo,
      descricao,
      valor,
      imagem: null, // sem imagem: o card mostra o "espaço para imagem"
    };
    setImoveis((listaAtual) => [novoImovel, ...listaAtual]);
  }

  function removerImovel(id) {
    setImoveis((listaAtual) => listaAtual.filter((imovel) => imovel.id !== id));
  }

  function buscarImovel(id) {
    return imoveis.find((imovel) => imovel.id === id);
  }

  return (
    <ImoveisContext.Provider value={{ imoveis, adicionarImovel, removerImovel, buscarImovel }}>
      {children}
    </ImoveisContext.Provider>
  );
}

export function useImoveis() {
  return useContext(ImoveisContext);
}
