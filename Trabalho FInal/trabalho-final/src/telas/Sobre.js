import { ScrollView, View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { cores, raio } from '../estilos/tema';

function Bloco({ icone, titulo, children }) {
  return (
    <View style={estilos.bloco}>
      <Text style={estilos.blocoTitulo}>
        <Ionicons name={icone} size={18} color={cores.primaria} /> {titulo}
      </Text>
      {children}
    </View>
  );
}

export default function Sobre() {
  return (
    <ScrollView style={{ backgroundColor: cores.fundo }} contentContainerStyle={estilos.container}>
      <View style={estilos.topo}>
        <Ionicons name="sunny" size={44} color={cores.secundaria} />
        <Text style={estilos.nome}>Arrojado Campo</Text>
        <Text style={estilos.versao}>versão 1.0 · aplicativo complementar da plataforma Arrojado</Text>
      </View>

      <Bloco icone="information-circle-outline" titulo="O que é">
        <Text style={estilos.texto}>
          Aplicativo para o produtor rural e o técnico de campo acompanharem, pelo celular, as estações
          meteorológicas IoT da plataforma Arrojado e o risco de estresse térmico dos animais no semiárido cearense.
        </Text>
      </Bloco>

      <Bloco icone="flask-outline" titulo="Sobre os dados">
        <Text style={estilos.texto}>
          Nesta versão, as leituras vêm de um ciclo diário simulado, no mesmo formato enviado pelas estações à
          API da plataforma (POST /api/leituras). Use a barra "ver horário" do Painel para conferir o app de
          madrugada, de manhã ou no pico de calor da tarde.
        </Text>
        <Text style={estilos.texto}>
          As configurações de alerta ficam salvas no próprio aparelho (AsyncStorage).
        </Text>
      </Bloco>

      <Bloco icone="calculator-outline" titulo="Índices">
        <Text style={estilos.texto}>• ITGU (Buffington et al., 1981): conforto térmico animal pelo globo negro.</Text>
        <Text style={estilos.texto}>• ITU (Buffington et al., 1982): temperatura e umidade do ar.</Text>
        <Text style={estilos.texto}>• Índice de Calor (NOAA/Rothfusz): sensação térmica para pessoas.</Text>
        <Text style={estilos.texto}>Faixas de ITGU e ITU: normal até 72, alerta até 78, perigo acima de 78.</Text>
      </Bloco>

      <Bloco icone="school-outline" titulo="Créditos">
        <Text style={estilos.texto}>
          Trabalho Final da disciplina Desenvolvimento Front-end I, Especialização em Desenvolvimento Full Stack,
          IF Sudeste MG, Campus Manhuaçu.
        </Text>
        <Text style={estilos.texto}>Autor: Renato William Rodrigues de Souza</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://github.com/Renatowilliam21/smart-weather-platform')}
          accessibilityRole="link"
        >
          <Text style={estilos.link}>
            <Ionicons name="logo-github" size={14} /> Código da plataforma Arrojado
          </Text>
        </TouchableOpacity>
      </Bloco>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
  },
  topo: {
    alignItems: 'center',
    marginVertical: 16,
  },
  nome: {
    fontSize: 26,
    fontWeight: '800',
    color: cores.primaria,
    marginTop: 6,
  },
  versao: {
    fontSize: 13,
    color: cores.textoSuave,
    textAlign: 'center',
  },
  bloco: {
    backgroundColor: cores.superficie,
    borderRadius: raio,
    padding: 16,
    marginBottom: 12,
    gap: 8,
  },
  blocoTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: cores.texto,
  },
  texto: {
    fontSize: 14,
    color: cores.texto,
    lineHeight: 21,
  },
  link: {
    color: cores.primaria,
    fontWeight: '700',
    marginTop: 4,
  },
});
