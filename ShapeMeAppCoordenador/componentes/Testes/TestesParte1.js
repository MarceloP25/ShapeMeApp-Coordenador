import React, {useEffect, useState} from 'react'
import {Text, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native'
import estilo from '../estilo'
import SentarAlcancar from './Tabelas/SentarAlcancar'
import DinamometriaMembrosInferiores from './Tabelas/DinamometriaMembrosInferiores'
import {useFonts} from 'expo-font'

export default ({route, navigation}) => {


    return (
        <ScrollView style={estilo.corLightMenos1}>
            <SafeAreaView style={[{marginTop: '3%', marginLeft: '3%'}]}>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, style.Montserrat]}>Preencha os campos abaixo:</Text>
            </SafeAreaView>
            <View style={{marginVertical: '5%'}}>
                <SentarAlcancar sexoDoAluno={aluno.sexo}></SentarAlcancar>
                <View style={[{marginTop: '5%', width: '100%'}]}>
                    <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, style.Montserrat, estilo.centralizado]}>Resultado sentar e alcançar:</Text>
                    <TextInput 
                    placeholder='Medida 1' 
                    style={[estilo.sombra, style.textInput, estilo.centralizado, 
                    resultadoSentarAlcancar1Invalido ? {borderWidth: 1, borderColor: 'red'} : {}]}
                    onChangeText={(text)=> setResultadoSentarAlcancar1(parseFloat(text))}
                    keyboardType='numeric'
                    />
                    <TextInput 
                    placeholder='Medida 2' 
                    style={[estilo.sombra, style.textInput, estilo.centralizado]}
                    onChangeText={(text)=> setResultadoSentarAlcancar2(parseFloat(text))}
                    keyboardType='numeric'
                    />
                    <TextInput 
                    placeholder='Medida 3' 
                    style={[estilo.sombra, style.textInput, estilo.centralizado]}
                    onChangeText={(text)=> setResultadoSentarAlcancar3(parseFloat(text))}
                    keyboardType='numeric'
                    />
                </View>
            </View>
            <DinamometriaMembrosInferiores sexoDoAluno={aluno.sexo}></DinamometriaMembrosInferiores>
            <View style={[{marginTop: '5%', width: '100%'}]}>
                <Text style={[estilo.centralizado, estilo.textoCorSecundaria, estilo.textoP16px, {textAlign: 'center', marginBottom: '3%'}]}>Para pessoas com mais de 50 anos, reduza as pontuações em 10% para ajustar a perda de tecido muscular devido ao envelhecimento.</Text>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, style.Montserrat, estilo.centralizado, {textAlign: 'center'}]}>Resultado dinamometria:</Text>
                <TextInput 
                placeholder='Medida 1' 
                style={[estilo.sombra, style.textInput, estilo.centralizado, 
                resultadoDinamometria1Invalido ? {borderWidth: 1, borderColor: 'red'}: {}]}
                onChangeText={(text)=> setResultadoDinamometria1(parseFloat(text))}
                keyboardType='numeric'
                />
                <TextInput 
                placeholder='Medida 2' 
                style={[estilo.sombra, style.textInput, estilo.centralizado]}
                onChangeText={(text)=> setResultadoDinamometria2(parseFloat(text))}
                keyboardType='numeric'
                />
                <TextInput 
                placeholder='Medida 3' 
                style={[estilo.sombra, style.textInput, estilo.centralizado]}
                onChangeText={(text)=> setResultadoDinamometria3(parseFloat(text))}
                keyboardType='numeric'
                />
            </View>
            <View style={{marginVertical: '10%'}}>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={validaCampos}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>PROSSEGUIR</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

const style= StyleSheet.create({
    textInput: {width: '80%', backgroundColor: '#FFFF', height: 50 ,borderRadius: 5, paddingLeft: 15, marginTop: '3%'}
})