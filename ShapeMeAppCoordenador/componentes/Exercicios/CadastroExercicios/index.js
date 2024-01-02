import { Text, StyleSheet, View, SafeAreaView, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import estilo from '../../estilo';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import BotaoSelect from '../../BotaoSelect';

export default (navigation) =>{

    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
            {!conexao ? <ModalSemConexao/> 
            : 
            <SafeAreaView style={styles.container}>     
                <View style={styles.block}>
                    <View style={{alignContent: 'center',}}>
                        <Text style={estilo.tituloH523px}>ADICIONAR CATEGORIA</Text>
                    </View>
                    <View style={{alignContent: 'center',}}>
                        <TextInput placeholder='ex:peitoral' style={[estilo.TextInput]}></TextInput>
                    </View>
                    <View style={{alignContent: 'center',}}>
                        <TouchableOpacity style={[estilo.botao]}>ADICIONAR</TouchableOpacity>
                    </View>
                </View>

                <View style={styles.block}>
                    <View style={{alignContent: 'center',}}>
                        <Text style={estilo.tituloH523px}>ADICIONAR EXERCÍCIO</Text>
                    </View>
                    <View>
                        <Text>SELECIONE A CATEGORIA</Text>
                        <BotaoSelect></BotaoSelect>
                    </View>

                    <View>
                        <Text>NOME:</Text>
                        <TextInput></TextInput>
                    </View>

                    <View>
                        <Text>ATUAÇÃO MUSCULAR:</Text>
                        <TextInput></TextInput>
                    </View>

                    <View>
                        <Text>DESCRIÇÃO:</Text>
                        <TextInput></TextInput>
                    </View>

                    <View>
                        <Text>VARIAÇÕES:</Text>
                    </View>
                    
                    <View>
                        <Text>EXECUÇÕS:</Text>
                    </View>

                    <View>
                        <Text>IMAGEM</Text>
                    </View>
                </View>

            </SafeAreaView>
                }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F8FAFF',
    },
    block: {
        borderColor: '#0066FF',
        backgroundColor: '#F8FAFF',
    }

})