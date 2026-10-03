import { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';

import cores from '../estilos/cores';
import Pagina from '../componentes/Pagina';
import Topo from '../componentes/Topo';
import Botao from '../componentes/Botao';
import { useImoveis } from '../contexto/ImoveisContext';
import { converterValor } from '../utilitarios';
import { avisar } from '../mensagens';

export default function CadastroImovel({ navigation }) {
  const { adicionarImovel } = useImoveis();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [erros, setErros] = useState({});

  function validar() {
    const novosErros = {};
    if (!titulo.trim()) novosErros.titulo = 'Informe o título do anúncio.';
    if (!descricao.trim()) novosErros.descricao = 'Informe uma descrição.';
    const numero = converterValor(valor);
    if (isNaN(numero) || numero <= 0) novosErros.valor = 'Informe um valor válido. Ex.: 350000,00';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function cadastrar() {
    if (!validar()) return;

    adicionarImovel({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      valor: converterValor(valor),
    });

    avisar('Imóvel cadastrado', `"${titulo.trim()}" foi adicionado à lista.`);
    navigation.popToTop(); // volta para a página inicial
  }

  return (
    <Pagina>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Topo titulo="Cadastrar Imóvel" />

        <View style={estilos.formulario}>
          <Text style={estilos.rotulo}>Título:</Text>
          <TextInput
            style={[estilos.campo, erros.titulo && estilos.campoErro]}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ex.: Casa com 3 quartos no centro"
            placeholderTextColor="#999"
            maxLength={60}
          />
          {erros.titulo && <Text style={estilos.erro}>{erros.titulo}</Text>}

          <Text style={estilos.rotulo}>Descrição</Text>
          <TextInput
            style={[estilos.campo, estilos.campoMultilinha, erros.descricao && estilos.campoErro]}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Fale um pouco sobre o imóvel"
            placeholderTextColor="#999"
            multiline
          />
          {erros.descricao && <Text style={estilos.erro}>{erros.descricao}</Text>}

          <Text style={estilos.rotulo}>Valor R$:</Text>
          <TextInput
            style={[estilos.campo, erros.valor && estilos.campoErro]}
            value={valor}
            onChangeText={setValor}
            placeholder="Ex.: 350000,00"
            placeholderTextColor="#999"
            keyboardType="decimal-pad"
          />
          {erros.valor && <Text style={estilos.erro}>{erros.valor}</Text>}

          <View style={estilos.acoes}>
            <Botao titulo="Cadastrar" onPress={cadastrar} />
            <Botao
              titulo="Voltar ao início"
              variante="contorno"
              onPress={() => navigation.popToTop()}
              style={estilos.botaoVoltar}
            />
          </View>
        </View>
      </ScrollView>
    </Pagina>
  );
}

const estilos = StyleSheet.create({
  formulario: {
    paddingHorizontal: 36,
    paddingBottom: 40,
  },
  rotulo: {
    textAlign: 'center',
    fontSize: 16,
    color: cores.preto,
    marginTop: 24,
    marginBottom: 8,
  },
  campo: {
    backgroundColor: cores.campo,
    borderWidth: 1,
    borderColor: cores.escuro,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  campoMultilinha: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  campoErro: {
    borderColor: cores.perigo,
    borderWidth: 2,
  },
  erro: {
    color: cores.perigo,
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  acoes: {
    alignItems: 'center',
    marginTop: 40,
  },
  botaoVoltar: {
    marginTop: 14,
  },
});
