import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Switch, StyleSheet } from 'react-native';

import { cores, raio } from '../estilos/tema';
import { useApp } from '../contexto/AppContext';
import { listarEstacoes } from '../servicos/leituras';
import { descreverAlerta } from '../servicos/alertas';
import PARAMETROS, { OPERADORES, ROTULOS_OPERADORES } from '../dados/parametros';
import SeletorOpcoes from '../componentes/SeletorOpcoes';
import Campo from '../componentes/Campo';
import Botao from '../componentes/Botao';
import { avisar, confirmar } from '../mensagens';

// Criação (C), edição (U) e exclusão (D) de uma configuração de alerta
export default function FormularioAlerta({ route, navigation }) {
  const id = route.params?.id;
  const editando = Boolean(id);
  const { alertas, criarAlerta, atualizarAlerta, removerAlerta } = useApp();
  const estacoes = listarEstacoes();

  const [estacaoId, setEstacaoId] = useState(estacoes[0]?.id);
  const [parametro, setParametro] = useState('itgu');
  const [operador, setOperador] = useState('>');
  const [limite, setLimite] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: editando ? 'Editar alerta' : 'Novo alerta' });
    if (editando) {
      const alerta = alertas.find((a) => a.id === id);
      if (alerta) {
        setEstacaoId(alerta.estacao_id);
        setParametro(alerta.parametro);
        setOperador(alerta.operador);
        setLimite(String(alerta.valor_limite).replace('.', ','));
        setAtivo(alerta.ativo);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const limiteNumerico = parseFloat(limite.replace(',', '.'));
  const previa = descreverAlerta({ parametro, operador, valor_limite: Number.isNaN(limiteNumerico) ? '?' : limiteNumerico });

  async function salvar() {
    if (limite.trim() === '' || Number.isNaN(limiteNumerico)) {
      setErro('Informe um valor numérico. Ex.: 78 ou 30,5');
      return;
    }
    setErro('');
    setSalvando(true);
    const dados = { estacao_id: estacaoId, parametro, operador, valor_limite: limiteNumerico, ativo };
    if (editando) {
      await atualizarAlerta(id, dados);
    } else {
      await criarAlerta(dados);
    }
    setSalvando(false);
    avisar('Alerta salvo', `${previa} foi ${editando ? 'atualizado' : 'cadastrado'}.`);
    navigation.goBack();
  }

  function excluir() {
    confirmar('Excluir alerta', `Deseja excluir a configuração "${previa}"?`, async () => {
      await removerAlerta(id);
      navigation.goBack();
    });
  }

  return (
    <ScrollView style={{ backgroundColor: cores.fundo }} contentContainerStyle={estilos.container} keyboardShouldPersistTaps="handled">
      <Text style={estilos.rotulo}>Estação</Text>
      <SeletorOpcoes
        opcoes={estacoes.map((e) => ({ valor: e.id, rotulo: e.nome }))}
        valor={estacaoId}
        onChange={setEstacaoId}
        rotuloAcessivel="Estação"
      />

      <Text style={estilos.rotulo}>Parâmetro monitorado</Text>
      <SeletorOpcoes
        opcoes={Object.entries(PARAMETROS).map(([valor, p]) => ({ valor, rotulo: p.rotulo }))}
        valor={parametro}
        onChange={setParametro}
        rotuloAcessivel="Parâmetro"
      />
      {PARAMETROS[parametro]?.dica ? <Text style={estilos.dica}>{PARAMETROS[parametro].dica}</Text> : null}

      <Text style={estilos.rotulo}>Condição</Text>
      <SeletorOpcoes
        opcoes={OPERADORES.map((op) => ({ valor: op, rotulo: `${op}  ${ROTULOS_OPERADORES[op]}` }))}
        valor={operador}
        onChange={setOperador}
        rotuloAcessivel="Condição"
      />

      <View style={{ marginTop: 20 }}>
        <Campo
          rotulo={`Valor limite${PARAMETROS[parametro]?.unidade ? ` (${PARAMETROS[parametro].unidade.trim()})` : ''}`}
          value={limite}
          onChangeText={(texto) => {
            setLimite(texto);
            if (erro) setErro('');
          }}
          placeholder="Ex.: 78"
          keyboardType="decimal-pad"
          erro={erro}
        />
      </View>

      <View style={estilos.linhaAtivo}>
        <View style={{ flex: 1 }}>
          <Text style={estilos.rotuloAtivo}>Configuração ativa</Text>
          <Text style={estilos.dica}>Desative para pausar o alerta sem excluí-lo.</Text>
        </View>
        <Switch
          value={ativo}
          onValueChange={setAtivo}
          trackColor={{ true: cores.primariaClara, false: '#CFC8BA' }}
          thumbColor={cores.branco}
          activeThumbColor={cores.branco}
          accessibilityLabel="Configuração ativa"
        />
      </View>

      <View style={estilos.previa}>
        <Text style={estilos.previaTexto}>
          Alerta disparado quando: <Text style={{ fontWeight: '700' }}>{previa}</Text>
        </Text>
      </View>

      <Botao titulo={salvando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Cadastrar alerta'} onPress={salvar} desabilitado={salvando} />
      {editando && <Botao titulo="Excluir alerta" variante="perigo" onPress={excluir} style={{ marginTop: 12 }} />}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
  },
  rotulo: {
    fontSize: 15,
    fontWeight: '700',
    color: cores.texto,
    marginTop: 20,
    marginBottom: 10,
  },
  dica: {
    fontSize: 13,
    color: cores.textoSuave,
    marginTop: 8,
  },
  linhaAtivo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.superficie,
    borderRadius: raio,
    padding: 14,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  rotuloAtivo: {
    fontSize: 15,
    fontWeight: '600',
    color: cores.texto,
  },
  previa: {
    backgroundColor: '#EFE8DA',
    borderRadius: raio,
    padding: 14,
    marginVertical: 20,
  },
  previaTexto: {
    fontSize: 15,
    color: cores.texto,
  },
});
