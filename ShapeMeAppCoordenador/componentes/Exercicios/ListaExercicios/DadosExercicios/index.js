import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import estilo from '../../../estilo';
import { useNavigation } from '@react-navigation/native';


export default ({ navigation, route }) => {
    const {exercicio}  = route.params;
    useEffect(() => {
        console.log(erro, exercicio)
    })
    return (
        <SafeAreaView style={estilo.corLightMenos1}>
            <ScrollView alwaysBounceVertical={true} style={style.container}>    

                <View style={[style.areaTexto, estilo.centralizado]}>

                    <Text style={estilo.tituloH523px}>Nome:</Text>
                    <Text style={estilo.tituloH619px}>{exercicio.nome}</Text>

                    <Text style={estilo.tituloH523px}>Tipo:</Text>
                    <Text style={estilo.tituloH619px}>{exercicio.tipo}</Text>

                    <Text style={estilo.tituloH523px}>Atuação Muscular:</Text>
                    <Text style={estilo.tituloH619px}>{exercicio.musculos}</Text>

                    <Text style={estilo.tituloH523px}>Descrição:</Text>
                    <Text style={estilo.tituloH619px}>
                        {exercicio.descricao}
                    </Text>
                    
                    <Text style={estilo.tituloH523px}>Variação:</Text>
                    {exercicio.variacao.map((variacao) => (
                        <Text style={estilo.tituloH619px}>{variacao}</Text>
                    ))}
                    
                    <Text style={estilo.tituloH523px}>Execução:</Text>
                    {exercicio.execucao.map((execucao) => (
                        <Text style={estilo.tituloH619px}>{execucao}</Text>
                    ))}

                </View>
                
                <TouchableOpacity
                    style={[estilo.botao, estilo.sombra, estilo.corPrimaria]}
                    onPress={() => navigation.navigate("Cadastro Varicacao Execucao", { exercicio: exercicio})}
                    >
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>ADICIONAR VARIAÇÃO E EXECUÇÃO</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[estilo.botao, estilo.sombra, estilo.corPrimaria]}
                    onPress={() => navigation.navigate('Editar Exercicios', { exercicio: exercicio})}
                    >
                    <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>EDITAR DADOS</Text>
                </TouchableOpacity>
            
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        marginVertical: '2%',
    },
    areaTexto:{
        marginTop: '10%',
        flex: 1,
        width: '90%',
        padding: 20,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: '#0066FF',
    },
});
