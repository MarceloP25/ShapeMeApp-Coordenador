import { Text, StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect} from 'react'
import estilo from '../../estilo'

import { useNavigation } from '@react-navigation/native'

export default (navigation, route) => {
    const { professor } = route.params;

    return (
        <ScrollView>
            <SafeAreaView>


                <View style={[estilo.corLightMenos1]}>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>NOME:</Text>
                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professor.nome}</Text>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>CPF:</Text>
                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professor.cpf}</Text>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Data de nascimento:</Text>
                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professor.datanascimento}</Text>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Telefone:</Text>
                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professor.telefone}</Text>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Login:</Text>
                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professor.email}</Text>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Profissão:</Text>
                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{professor.profissao}</Text>
                    {/*
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Endereço:</Text>
                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{enderecoCoordenador.getRua()},{enderecoCoordenador.getNumero()}, {enderecoCoordenador.getCidade()}, {enderecoCoordenador.getEstado()}</Text>
                    */}
                </View>

                <View>
                    <TouchableOpacity>
                        <Text>TRANSFERIR DE TURAM</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    )

}

const styles = StyleSheet.create({

})