import React, {useEffect, useState} from 'react'
import {Text, View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import estilo from '../estilo'
import {useFonts} from "expo-font"
import { getAuth, signOut } from "firebase/auth";
import { coordenadorLogado, enderecoCoordenador } from '../LoginScreen'

export default ({navigation}) => {

    const handleLogout = () => {
        const auth = getAuth()
        signOut(auth)
          .then(() => {
            console.log("Usuário deslogado com sucesso!");
            alert("Desconectado com sucesso!")
            navigation.navigate('Login')
        })
          .catch((error) => {
            console.error(error.message);
          });
      };

      console.log(coordenadorLogado)
    return(
        <View>
            <View style={[estilo.corLightMenos1, style.container]}>
            <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>ACADEMIA:</Text>
                <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{coordenadorLogado.getAcademia()}</Text>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>CPF:</Text>
                <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{coordenadorLogado.getCpf()}</Text>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Data de nascimento:</Text>
                <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{coordenadorLogado.getDataNascimento()}</Text>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Telefone:</Text>
                <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{coordenadorLogado.getTelefone()}</Text>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Login:</Text>
                <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{coordenadorLogado.getEmail()}</Text>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Senha:</Text>
                <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{coordenadorLogado.getSenha()}</Text>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Profissão:</Text>
                <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{coordenadorLogado.getProfissao()}</Text>
                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria]}>Endereço:</Text>
                <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{enderecoCoordenador.getRua()},{enderecoCoordenador.getNumero()}, {enderecoCoordenador.getCidade()}, {enderecoCoordenador.getEstado()}</Text>
                
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria, estilo.sombra, {marginTop: '5%'}]} onPress={()=>navigation.navigate('Editar foto')}>
                    <Text style={[estilo.textoCorLight, estilo.tituloH619px]} >ALTERAR FOTO</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria, estilo.sombra, {marginTop: '5%'}]} onPress={()=>handleLogout()}>
                    <Text style={[estilo.textoCorLight, estilo.tituloH619px]} >SAIR</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const style = StyleSheet.create({
    container: {
        height: 500,
        width: '100%',
        padding: 20,
    },

})