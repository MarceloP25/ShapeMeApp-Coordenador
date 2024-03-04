import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from "react"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import estilo from '../../estilo';
import { collection, setDoc, doc, getDoc, where, query, addDoc } from 'firebase/firestore';
import { firebase, firebaseBD } from '../../configuracoes/firebaseconfig/config'
import { coordenadorLogado } from '../../LoginScreen';
import ModalSemConexao from '../../ModalSemConexao';
import NetInfo from "@react-native-community/netinfo";

export default ({navigation, routes}) => {

    const { exercicio } = routes.params;
    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const [dadosExercicio, setDadosExercicio] = useState(null);

    useEffect(() => {
        const buscarDadosExercicio = async () => {
            try {
                const exercicioRef = doc(collection(firebaseBD, "Academias", coordenadorLogado.getAcademia(), "Exercicios"), exercicio.nome);
                const exercicioSnapshot = await getDoc(exercicioRef);
                if (exercicioSnapshot.exists()) {
                    const dadosExercicio = exercicioSnapshot.data();
                    setDadosExercicio(dadosExercicio);
                } else {
                    console.log("Exercício não encontrado");
                }
            } catch (error) {
                console.log("Erro ao buscar dados do exercício:", error);
            }
        };

        buscarDadosExercicio();
    }, [exercicio]);

    const [variacao, setVariacao] = useState("")
    const [execucao, setExecucao] = useState("")

    const handlecadastrar = () => {
        updateDoc(doc(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), 'Exercicios', dadosExercicio.nome),{
            nome: dadosExercicio.nome,
            tipo: dadosExercicio.tipo,
            musculos: dadosExercicio.musculos,
            descricao: dadosExercicio.descricao,
            variacao: variacao,
            execucao: execucao,
            // imagem: dadosExercicio.imagem,
        }).catch((erro) => {
            Alert.alert("Dados incorretos!")
            console.log(`Não foi possível adicionar à turma.`);
        }).then(() =>{
            Alert.alert("Dados adicionados com sucesso!")
            setExecucao("")
            setVariacao("")
        });
    };



    return (
        <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
            {!conexao ? <ModalSemConexao/> 
            : 
            <SafeAreaView style={styles.container}>   

                    <View style={{alignContent: 'center',}}>
                        <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria,  styles.titulos]}>CADASTRAR VARIAÇÕES E EXECUÇÕES</Text>
                    </View>

                    <View style={styles.inputArea}>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>VARIAÇÃO:</Text>
                        <View>
                            <TextInput
                                placeholder={'Varição'}
                                placeholderTextColor={'#CFCDCD'} 
                                style={[
                                    estilo.sombra, 
                                    estilo.corLight, 
                                    styles.inputText,
                                ]}
                                keyboardType={'default'}
                                value={variacao}
                                onChangeText={(text) => setVariacao(text)}
                            ></TextInput>
                        </View>
                    </View>



                    <View style={styles.inputArea}>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>EXECUÇÃO:</Text>
                        <View>
                        <TextInput
                            placeholder={'Execução'}
                            placeholderTextColor={'#CFCDCD'} 
                            style={[
                                estilo.sombra, 
                                estilo.corLight, 
                                styles.inputText,
                            ]}
                            keyboardType={'default'}
                            value={execucao}
                            onChangeText={(text) => setExecucao(text)}
                        ></TextInput>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity style={[estilo.botao, estilo.sombra, estilo.corPrimaria]}
                            onPress={() => handlecadastrar()}
                            >
                            <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>FINALIZAR</Text>
                        </TouchableOpacity>
                    </View>
                

            </SafeAreaView>
                }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F8FAFF',
        marginVertical: '2%',
    },
    inputArea: {
        marginLeft: '10%',
        marginVertical: 10
    },
    titulos: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 5,
    },
    inputText: {
        width: '90%',
        height: 50,
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 10,
        elevation: 10,
        paddingHorizontal: 20,
    },
    botaoAdd: {
        backgroundColor: '#CFCDCD',
        width: 213,
        height: 29,
        borderRadius: 5,
    },

})