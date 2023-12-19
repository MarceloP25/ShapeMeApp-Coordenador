import React, {useState, useEffect} from "react";
import {Text, View, StyleSheet} from 'react-native';
import estilo from "../../estilo";
import Foto from "../Conversas/Foto";
export default ({professor}) => {
    return (
        <View style={[estilo.corSecundaria]}>
            <View style={[style.container]}>
                <Foto cpf={professor.cpf}></Foto>
                <Text style={[estilo.textoCorLight, estilo.tituloH619px, estilo.centralizado, {marginTop: 5}]}>{professor.nome}</Text>
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        textAlign: 'center'
    }
})