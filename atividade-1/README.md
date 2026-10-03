# Atividade 1: 3 Cores Imobiliária

App em React Native (Expo SDK 54) com navegação Stack entre três telas:
Página inicial, Cadastro de imóvel e Página do imóvel.

## Como executar

    npm install
    npm run web        # abre no navegador
    npm start          # Expo Go no celular (QR code)

## Estrutura

    App.js                      Navegação (Stack Navigator) e provedores
    src/dados/imoveis.js        3 imóveis cadastrados previamente
    src/contexto/               Lista de imóveis compartilhada entre as telas
    src/telas/                  PaginaInicial, CadastroImovel, PaginaImovel
    src/componentes/            Topo, Botao, CardImovel, ImagemImovel, Pagina
    src/estilos/cores.js        Paleta do enunciado
