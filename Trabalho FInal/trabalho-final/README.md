# Arrojado Campo

Trabalho Final da disciplina Desenvolvimento Front-end I (Especialização em
Desenvolvimento Full Stack, IF Sudeste MG). Aplicativo em React Native (Expo SDK 54)
que complementa a **plataforma Arrojado** de monitoramento agrometeorológico e
conforto térmico animal, trazendo o "Modo Campo" para o celular do produtor rural
e do técnico de campo.

## Requisitos do enunciado

| # | Requisito | Onde está |
|---|---|---|
| 1 | Pelo menos 3 telas navegáveis | Painel, Detalhe da Estação, Alertas, Formulário de Alerta, Índices e Sobre |
| 2 | Usabilidade e design | Cores por nível de risco, dica de segurança contextual, validação com mensagens, confirmação de exclusão, prévia da regra do alerta, contador de alertas na aba, rótulos de acessibilidade, números no padrão brasileiro |
| 3 | CRUD completo (JSON ou AsyncStorage) | Configurações de alerta com **AsyncStorage**: `src/servicos/alertas.js`, telas `ListaAlertas` e `FormularioAlerta` |
| 4 | Navegação com Bottom Tabs | `src/navegacao/Abas.js` (Painel, Alertas, Índices e Sobre), com pilhas Stack dentro das abas |
| 5 | Pelo menos uma tela responsiva | `DetalheEstacao`: Modo Campo no celular e visão completa com mín./máx. do dia em tablet e web. O Painel também passa para 2 colunas em telas largas |

Também foram aplicados os recursos de otimização vistos na disciplina: `React.memo`
nos componentes de cartão, `useMemo` e `useCallback` nos cálculos e handlers, e
`FlatList` nas listas.

## Funcionalidades

- **Painel**: um card por estação com temperatura, umidade e ITGU, colorido pela
  classificação de risco, e a lista de alertas disparados no momento.
- **Detalhe da Estação**: Modo Campo no celular (temperatura em destaque, métricas
  principais, dica de segurança e gráfico de 24 h) ou visão completa em tela larga.
- **Alertas**: CRUD de configurações (estação, parâmetro, operador e limite), com
  ativar/desativar direto na lista e avaliação contra a leitura mais recente.
- **Índices**: calculadora de ITGU, ITU e Índice de Calor a partir de medições de campo.

## Dados e fórmulas

As leituras vêm de `src/dados/leituras.json`: um ciclo diário simulado de 144 leituras
agregadas (10 em 10 minutos) para as estações IFCE Boa Viagem e Sítio Semiárido, no mesmo
formato do payload `POST /api/leituras` da plataforma. O app encaixa esse ciclo no
relógio e mostra as últimas 24 h; a barra "ver horário" do Painel permite ver o app de
madrugada, de manhã ou no pico de calor.

Os índices usam as mesmas fórmulas e faixas do firmware `esp32-estacao` (v2.10):

| Índice | Fórmula | Classificação |
|---|---|---|
| ITGU (Buffington et al., 1981) | Tgn + 0,36 × Tpo + 41,5 | normal ≤ 72 < alerta ≤ 78 < perigo |
| ITU (Buffington et al., 1982) | 0,8 × T + UR/100 × (T − 14,3) + 46,3 | mesmas faixas do ITGU |
| Índice de Calor (NOAA/Rothfusz) | regressão de Rothfusz a partir de 26,7 °C | atenção > 27, atenção extrema > 32, perigo > 41, perigo extremo > 54 |

Para consumir a API real da plataforma, basta trocar as funções de
`src/servicos/leituras.js` por chamadas a `/api/v1/estacoes` mantendo os mesmos retornos.

## Estrutura

    App.js                       Provedores e navegação
    src/
      navegacao/Abas.js          Bottom Tabs + pilhas Stack (Painel e Alertas)
      telas/                     Painel, DetalheEstacao, ListaAlertas, FormularioAlerta, Indices, Sobre
      componentes/               CartaoEstacao, Metrica, GraficoBarras, Selo, SeletorOpcoes, BarraSimulacao...
      contexto/AppContext.js     Estado global: horário, alertas e avaliações
      servicos/
        indices.js               Fórmulas e classificações (iguais ao firmware)
        leituras.js              Fonte de leituras (ciclo simulado)
        alertas.js               CRUD de alertas + avaliação
        armazenamento.js         CRUD genérico com AsyncStorage
      dados/                     leituras.json e parametros.js
      hooks/useResponsivo.js     Breakpoints de responsividade

## Executar

    npm install
    npm run web      # navegador
    npm start        # Expo Go no celular
