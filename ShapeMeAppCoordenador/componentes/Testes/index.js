import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Cabecalho from '../Cabecalho';
import estilo from '../estilo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default ({navigation, route}) => {
  const navigation = useNavigation();
  const [sexoSelecionado, setSexoSelecionado] = useState(null);

  const handleEscolherSexo = (sexo) => {
    setSexoSelecionado(sexo);
    navigation.navigate('Teste1', { sexo: sexo });
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <Cabecalho navigation={navigation} />
        <Text style={estilo.tituloH427px}>ESCOLHA O SEXO PARA VISUALIZAR OS TESTES:</Text>

        <TouchableOpacity
          style={[
            estilo.botao,
            estilo.sombra,
            estilo.corPrimaria,
            sexoSelecionado === 'Masculino' ? estilo.botaoSelecionado : {},
          ]}
          onPress={() => handleEscolherSexo('Masculino')}
        >
          <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>Masculino</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            estilo.botao,
            estilo.sombra,
            estilo.corPrimaria,
            sexoSelecionado === 'Feminino' ? estilo.botaoSelecionado : {},
          ]}
          onPress={() => handleEscolherSexo('Feminino')}
        >
          <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>Feminino</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
