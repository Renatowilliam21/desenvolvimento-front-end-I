import { useLayoutEffect, useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatarNumero } from '../formatacao';

import { cores, coresClassificacao, coresUmidade, raio } from '../estilos/tema';
import useResponsivo from '../hooks/useResponsivo';
import { useApp } from '../contexto/AppContext';
import { buscarEstacao, minMaxDoDia, serieHoraria } from '../servicos/leituras';
import { classificarUmidade, dicaDeCampo } from '../servicos/indices';
import Selo from '../componentes/Selo';
import Metrica from '../componentes/Metrica';
import GraficoBarras from '../componentes/GraficoBarras';
import EstadoVazio from '../componentes/EstadoVazio';

// Métricas exibidas na visão completa (tela larga)
const METRICAS = [
  { campo: 'temperatura_ar', rotulo: 'Temp. do Ar', unidade: '°C' },
  { campo: 'umidade_ar', rotulo: 'Umidade do Ar', unidade: '%' },
  { campo: 'itgu', rotulo: 'ITGU', unidade: '' },
  { campo: 'itu', rotulo: 'ITU', unidade: '' },
  { campo: 'indice_calor', rotulo: 'Índice de Calor', unidade: '°C' },
  { campo: 'temp_globo_negro', rotulo: 'Temp. Globo Negro', unidade: '°C' },
  { campo: 'indice_uv', rotulo: 'Índice UV', unidade: '' },
  { campo: 'luminosidade', rotulo: 'Luminosidade', unidade: ' lux' },
  { campo: 'pressao', rotulo: 'Pressão', unidade: ' hPa' },
  { campo: 'vel_vento', rotulo: 'Vel. do Vento', unidade: ' km/h' },
  { campo: 'chuva_mm', rotulo: 'Chuva', unidade: ' mm' },
  { campo: 'co2_ppm', rotulo: 'CO2 eq.', unidade: ' ppm' },
];

/*
 * Tela responsiva (requisito 5):
 *  - celular (< 700 px): Modo Campo, resumo simplificado com dica de segurança
 *  - tablet/web (>= 700 px): visão completa com todas as métricas e mín./máx. do dia
 */
export default function DetalheEstacao({ route, navigation }) {
  const { id } = route.params;
  const { leiturasAtuais, horaSimulada } = useApp();
  const { ehTablet, ehDesktop, paddingTela } = useResponsivo();

  const estacao = buscarEstacao(id);
  const leitura = leiturasAtuais[id];

  useLayoutEffect(() => {
    if (estacao) navigation.setOptions({ title: estacao.nome });
  }, [navigation, estacao]);

  const serieTemperatura = useMemo(() => serieHoraria(id, 'temperatura_ar', horaSimulada), [id, horaSimulada]);

  // Só calcula mín./máx. quando a visão completa está visível
  const minMax = useMemo(() => {
    if (!ehTablet) return {};
    const mapa = {};
    for (const m of METRICAS) mapa[m.campo] = minMaxDoDia(id, m.campo, horaSimulada);
    return mapa;
  }, [id, horaSimulada, ehTablet]);

  if (!estacao || !leitura) {
    return <EstadoVazio icone="alert-circle-outline" mensagem="Estação não encontrada." />;
  }

  const classificacao = leitura.itgu_classificacao;
  const corHero = (coresClassificacao[classificacao] || coresClassificacao.neutro).forte;
  const corUmidade = coresUmidade[classificarUmidade(leitura.umidade_ar)];

  const hero = (
    <View style={[estilos.hero, { backgroundColor: corHero }]}>
      <Text style={estilos.heroRotulo}>Temperatura do ar · {leitura.hora}</Text>
      <Text style={estilos.heroValor}>{formatarNumero(leitura.temperatura_ar)}°C</Text>
      <View style={estilos.heroLinha}>
        <Text style={estilos.heroSub}>ITGU {formatarNumero(leitura.itgu)}</Text>
        <Selo classificacao={classificacao} tamanho="grande" />
      </View>
    </View>
  );

  const dica = (
    <View style={[estilos.dica, { borderLeftColor: corHero }]}>
      <Ionicons name="water-outline" size={22} color={cores.primaria} />
      <Text style={estilos.dicaTexto}>{dicaDeCampo(classificacao, leitura.umidade_ar)}</Text>
    </View>
  );

  const grafico = (
    <GraficoBarras titulo="Temperatura nas últimas 24 h" serie={serieTemperatura} unidade="°C" />
  );

  // ---------- Modo Campo (celular) ----------
  if (!ehTablet) {
    return (
      <ScrollView style={estilos.tela} contentContainerStyle={{ padding: paddingTela }}>
        {hero}
        <View style={estilos.grade2}>
          <Metrica rotulo="Umidade" valor={leitura.umidade_ar} unidade="%" corValor={corUmidade} style={estilos.celula2} />
          <Metrica rotulo="ITGU" valor={leitura.itgu} style={estilos.celula2} />
          <Metrica rotulo="Índice UV" valor={leitura.indice_uv} style={estilos.celula2} />
          <Metrica rotulo="Índice de Calor" valor={leitura.indice_calor} unidade="°C" style={estilos.celula2} />
        </View>
        {dica}
        <View style={{ height: 16 }} />
        {grafico}
        <Text style={estilos.nota}>
          Gire o aparelho ou abra em uma tela maior para ver todas as métricas com mínimo e máximo do dia.
        </Text>
      </ScrollView>
    );
  }

  // ---------- Visão completa (tablet / web) ----------
  const colunasMetricas = ehDesktop ? 4 : 3;
  return (
    <ScrollView style={estilos.tela} contentContainerStyle={[estilos.conteudoLargo, { padding: paddingTela }]}>
      <View style={estilos.linhaLarga}>
        <View style={{ flex: 1 }}>{hero}</View>
        <View style={[estilos.info, { flex: 1 }]}>
          <Text style={estilos.infoTitulo}>{estacao.nome}</Text>
          <Text style={estilos.infoTexto}><Ionicons name="location-outline" size={13} /> {estacao.localizacao}</Text>
          <Text style={estilos.infoTexto}><Ionicons name="hardware-chip-outline" size={13} /> Firmware {estacao.firmware}</Text>
          <Text style={estilos.infoTexto}>
            <Ionicons name="navigate-outline" size={13} /> {estacao.latitude}, {estacao.longitude}
          </Text>
          <Text style={[estilos.infoTexto, { marginTop: 8 }]}>Sensores: {estacao.sensores.join(', ')}</Text>
        </View>
      </View>

      {dica}

      <Text style={estilos.tituloSecao}>Todas as métricas · mínimo e máximo do dia</Text>
      <View style={estilos.grade}>
        {METRICAS.map((m) => (
          <Metrica
            key={m.campo}
            rotulo={m.rotulo}
            valor={leitura[m.campo]}
            unidade={m.unidade}
            minMax={minMax[m.campo]}
            corValor={m.campo === 'umidade_ar' ? corUmidade : undefined}
            style={{ width: `${100 / colunasMetricas - 2}%` }}
          />
        ))}
      </View>

      {grafico}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    backgroundColor: cores.fundo,
  },
  conteudoLargo: {
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
  },
  hero: {
    borderRadius: raio,
    padding: 20,
    marginBottom: 16,
  },
  heroRotulo: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  heroValor: {
    color: cores.branco,
    fontSize: 64,
    fontWeight: '800',
    marginVertical: 4,
  },
  heroLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroSub: {
    color: cores.branco,
    fontSize: 18,
    fontWeight: '700',
  },
  grade2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginBottom: 16,
  },
  celula2: {
    width: '48%',
  },
  dica: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    backgroundColor: cores.superficie,
    borderRadius: raio,
    borderLeftWidth: 5,
    padding: 14,
  },
  dicaTexto: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
    color: cores.texto,
  },
  nota: {
    fontSize: 12,
    color: cores.textoSuave,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  linhaLarga: {
    flexDirection: 'row',
    gap: 16,
  },
  info: {
    backgroundColor: cores.superficie,
    borderRadius: raio,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  infoTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: cores.texto,
    marginBottom: 8,
  },
  infoTexto: {
    fontSize: 14,
    color: cores.textoSuave,
    marginTop: 2,
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: '700',
    color: cores.texto,
    marginTop: 24,
    marginBottom: 12,
  },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
});
