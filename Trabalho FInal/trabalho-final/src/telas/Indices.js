import { useMemo, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { formatarNumero } from '../formatacao';

import { cores, coresClassificacao, raio } from '../estilos/tema';
import useResponsivo from '../hooks/useResponsivo';
import {
  calcularITGU,
  calcularITU,
  calcularIndiceCalor,
  classificar,
  classificarIndiceCalor,
} from '../servicos/indices';
import Campo from '../componentes/Campo';
import Selo from '../componentes/Selo';

const converter = (texto) => parseFloat(String(texto).replace(',', '.'));

function Resultado({ titulo, valor, classificacao, explicacao }) {
  const cor = coresClassificacao[classificacao] || coresClassificacao.neutro;
  return (
    <View style={[estilos.resultado, { borderTopColor: cor.forte }]}>
      <Text style={estilos.resultadoTitulo}>{titulo}</Text>
      <Text style={[estilos.resultadoValor, { color: cor.forte }]}>
        {Number.isFinite(valor) ? formatarNumero(valor, 1) : '--'}
      </Text>
      {classificacao ? <Selo classificacao={classificacao} /> : <Text style={estilos.explicacao}>Preencha os campos</Text>}
      <Text style={estilos.explicacao}>{explicacao}</Text>
    </View>
  );
}

// Calculadora de campo: mesmas fórmulas e faixas usadas pelo firmware das estações
export default function Indices() {
  const { ehTablet, paddingTela } = useResponsivo();
  const [temperatura, setTemperatura] = useState('32');
  const [umidade, setUmidade] = useState('35');
  const [globo, setGlobo] = useState('38');

  const erros = useMemo(() => {
    const e = {};
    const t = converter(temperatura);
    const u = converter(umidade);
    const g = converter(globo);
    if (temperatura !== '' && (Number.isNaN(t) || t < -10 || t > 65)) e.temperatura = 'Use um valor entre -10 e 65 °C.';
    if (umidade !== '' && (Number.isNaN(u) || u < 5 || u > 100)) e.umidade = 'Use um valor entre 5 e 100%.';
    if (globo !== '' && (Number.isNaN(g) || g < -10 || g > 65)) e.globo = 'Use um valor entre -10 e 65 °C.';
    return e;
  }, [temperatura, umidade, globo]);

  const resultados = useMemo(() => {
    const t = converter(temperatura);
    const u = converter(umidade);
    const g = converter(globo);
    const arValido = !erros.temperatura && !erros.umidade && Number.isFinite(t) && Number.isFinite(u);
    const globoValido = arValido && !erros.globo && Number.isFinite(g);

    const itu = arValido ? calcularITU(t, u) : NaN;
    const ic = arValido ? calcularIndiceCalor(t, u) : NaN;
    const itgu = globoValido ? calcularITGU(g, u) : NaN;
    return {
      itu, ic, itgu,
      cItu: arValido ? classificar(itu) : null,
      cIc: arValido ? classificarIndiceCalor(ic) : null,
      cItgu: globoValido ? classificar(itgu) : null,
    };
  }, [temperatura, umidade, globo, erros]);

  return (
    <ScrollView style={{ backgroundColor: cores.fundo }} contentContainerStyle={[estilos.container, { padding: paddingTela }]}>
      <Text style={estilos.intro}>
        Informe as medições feitas em campo para calcular os índices de conforto térmico.
      </Text>

      <View style={[estilos.campos, ehTablet && estilos.camposLinha]}>
        <View style={estilos.campo}>
          <Campo rotulo="Temperatura do ar (°C)" value={temperatura} onChangeText={setTemperatura} keyboardType="decimal-pad" erro={erros.temperatura} placeholder="Ex.: 32" />
        </View>
        <View style={estilos.campo}>
          <Campo rotulo="Umidade relativa (%)" value={umidade} onChangeText={setUmidade} keyboardType="decimal-pad" erro={erros.umidade} placeholder="Ex.: 35" />
        </View>
        <View style={estilos.campo}>
          <Campo rotulo="Temp. de globo negro (°C)" value={globo} onChangeText={setGlobo} keyboardType="decimal-pad" erro={erros.globo} placeholder="Ex.: 38" />
        </View>
      </View>

      <View style={[estilos.resultados, ehTablet && estilos.camposLinha]}>
        <Resultado titulo="ITGU" valor={resultados.itgu} classificacao={resultados.cItgu}
          explicacao="Globo negro + umidade. Normal até 72, alerta até 78, perigo acima." />
        <Resultado titulo="ITU" valor={resultados.itu} classificacao={resultados.cItu}
          explicacao="Temperatura + umidade do ar. Mesmas faixas do ITGU." />
        <Resultado titulo="Índice de Calor (°C)" valor={resultados.ic} classificacao={resultados.cIc}
          explicacao="Sensação térmica humana (NOAA). Abaixo de 26,7 °C é igual à temperatura." />
      </View>

      <Text style={estilos.fonte}>
        Fórmulas: Buffington et al. (1981) para ITGU, Buffington et al. (1982) para ITU e NOAA/Rothfusz para o
        Índice de Calor. Iguais às do firmware das estações Arrojado.
      </Text>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 1000,
    alignSelf: 'center',
  },
  intro: {
    fontSize: 15,
    color: cores.textoSuave,
    marginBottom: 16,
  },
  campos: {},
  camposLinha: {
    flexDirection: 'row',
    gap: 16,
  },
  campo: {
    flex: 1,
  },
  resultados: {
    gap: 12,
  },
  resultado: {
    flex: 1,
    backgroundColor: cores.superficie,
    borderRadius: raio,
    borderTopWidth: 6,
    padding: 16,
    gap: 6,
  },
  resultadoTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: cores.texto,
  },
  resultadoValor: {
    fontSize: 40,
    fontWeight: '800',
  },
  explicacao: {
    fontSize: 13,
    color: cores.textoSuave,
    lineHeight: 18,
  },
  fonte: {
    fontSize: 12,
    color: cores.textoSuave,
    marginTop: 20,
    lineHeight: 18,
  },
});
