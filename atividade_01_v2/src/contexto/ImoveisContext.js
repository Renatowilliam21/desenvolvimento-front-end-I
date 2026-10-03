import React, {
  createContext,
  useContext,
  useState,
} from 'react';

import imoveisIniciais from '../dados/imoveis';

const ImoveisContext = createContext();

export function ImoveisProvider({ children }) {
  const [imoveis, setImoveis] = useState(imoveisIniciais);

  function adicionarImovel(imovel) {
    setImoveis((listaAtual) => [
      ...listaAtual,
      {
        ...imovel,
        id: Date.now().toString(),
      },
    ]);
  }

  return (
    <ImoveisContext.Provider
      value={{
        imoveis,
        adicionarImovel,
      }}
    >
      {children}
    </ImoveisContext.Provider>
  );
}

export function useImoveis() {
  return useContext(ImoveisContext);
}
