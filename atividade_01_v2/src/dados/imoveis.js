// Imóveis cadastrados previamente (requisito 3 da atividade)
import casaRosa from '../imagens/casa_rosa.png';
import casaVerde from '../imagens/casa_verde.png';
import casaAmarela from '../imagens/casa_amarela.png';

const imoveisIniciais = [
  {
    id: '1',
    titulo: 'Casa Rosa no Centro',
    descricao:
      'Casa com 3 quartos, sala ampla, cozinha planejada e quintal. Próxima a escolas, mercados e ao centro comercial.',
    valor: 350000,
    imagem: casaRosa,
  },
  {
    id: '2',
    titulo: 'Casa Verde com Varanda',
    descricao:
      'Sobrado com 2 suítes, varanda gourmet e garagem para dois carros, em rua tranquila e arborizada.',
    valor: 480000,
    imagem: casaVerde,
  },
  {
    id: '3',
    titulo: 'Casa Amarela Aconchegante',
    descricao:
      'Casa térrea com 2 quartos, área de serviço e jardim na frente. Ótima opção para quem busca o primeiro imóvel.',
    valor: 275000,
    imagem: casaAmarela,
  },
];

export default imoveisIniciais;