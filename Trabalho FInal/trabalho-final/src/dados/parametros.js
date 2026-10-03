// Parâmetros que podem ser monitorados por alerta (mesmas chaves da plataforma web)
const PARAMETROS = {
  itgu: { rotulo: 'ITGU', unidade: '', dica: 'Alerta acima de 72, perigo acima de 78' },
  itu: { rotulo: 'ITU', unidade: '', dica: 'Alerta acima de 72, perigo acima de 78' },
  indice_calor: { rotulo: 'Índice de Calor', unidade: '°C', dica: 'Atenção acima de 27 °C, perigo acima de 41 °C' },
  temperatura_ar: { rotulo: 'Temperatura do Ar', unidade: '°C', dica: 'Faixa válida do sensor: -10 a 65 °C' },
  umidade_ar: { rotulo: 'Umidade do Ar', unidade: '%', dica: 'Abaixo de 30% é considerada crítica' },
  temp_globo_negro: { rotulo: 'Temp. Globo Negro', unidade: '°C', dica: 'Base do cálculo do ITGU' },
  umid_globo_negro: { rotulo: 'Umid. Globo Negro', unidade: '%', dica: '' },
  indice_uv: { rotulo: 'Índice UV', unidade: '', dica: 'UV acima de 8 é muito alto' },
  pressao: { rotulo: 'Pressão', unidade: ' hPa', dica: 'Faixa válida: 800 a 1100 hPa' },
  vel_vento: { rotulo: 'Velocidade do Vento', unidade: ' km/h', dica: '' },
  chuva_mm: { rotulo: 'Chuva', unidade: ' mm', dica: '' },
  co2_ppm: { rotulo: 'CO2 (ppm)', unidade: ' ppm', dica: 'Só em estações com sensor ENS160' },
};

export const OPERADORES = ['>', '>=', '<', '<=', '='];

export const ROTULOS_OPERADORES = {
  '>': 'maior que',
  '>=': 'maior ou igual a',
  '<': 'menor que',
  '<=': 'menor ou igual a',
  '=': 'igual a',
};

export default PARAMETROS;
