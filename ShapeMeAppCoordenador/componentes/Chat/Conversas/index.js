import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import estilo from "../../estilo";
import Foto from "./Foto";
export default ({ professor, aluno, navigation, backgroundColor, tipo }) => {
    console.log('aluno', aluno.aluno)

    /*
            <TouchableOpacity style={[style.chat, estilo.corLight, {backgroundColor: backgroundColor}]} onPress={() =>navigation.navigate('Mensagens', {professor: professor})}> 
    
            <View>
            <Foto cpf={professor.cpf}/>
    
            </View>
            <View style={[style.informacoes]}>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px]}>{professor.nome}</Text>
                <Text style={[estilo.textoCorSecundariaMenos1, estilo.textoSmall12px]}>{professor.email} | {professor.cpf}</Text>
            </View>
            </TouchableOpacity>
    
    */

    return (
        <TouchableOpacity style={[style.chat, estilo.corLight, { backgroundColor: backgroundColor }]} onPress={() => navigation.navigate('Mensagens', { aluno: aluno, tipo })}>
            <View>
                <Foto cpf={aluno.cpf} />

            </View>
            <View style={[style.informacoes]}>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px]}>{aluno.nome} - {tipo}</Text>
                <Text style={[estilo.textoCorSecundariaMenos1, estilo.textoSmall12px]}>{aluno.email} | {aluno.cpf}</Text>
            </View>

        </TouchableOpacity>
    )

}

const style = StyleSheet.create({
    chat: {
        width: '100%',
        height: 80,
        borderWidth: 1,
        borderColor: '#F2EDED',
        marginBottom: 5,
        flexDirection: 'row',
        padding: 5,
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    informacoes: {
        flexDirection: 'column',
        marginLeft: 10,
        marginTop: 10
    },

})