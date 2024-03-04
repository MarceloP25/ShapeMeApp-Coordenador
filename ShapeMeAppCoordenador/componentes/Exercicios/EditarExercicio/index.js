import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import estilo from '../../estilo';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { firebaseBD } from '../../configuracoes/firebaseconfig/config';
import { FontAwesome6 } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import { coordenadorLogado } from '../../LoginScreen';


export default ({navigation, route}) => {
    const [conexao, setConexao] = useState(true);
    const {exercicio} = route.params;

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setConexao(state.type === 'wifi' || state.type === 'cellular');
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {

    }, []);

    const [nome, setNome] = useState(exercicio.nome);
    const [tipo, setTipo] = useState(exercicio.tipo);
    const [musculos, setMusculos] = useState(exercicio.musculos);
    const [descricao, setDescricao] = useState(exercicio.descricao);
    const [variacao, setVariacao] = useState(exercicio.variacao)
    const [execucao, setExecucao] = useState(exercicio.execucao)
    //const [imagem, setImagem] = useState(exercicio.imagem)


    // Olhar como definir 4 tipos que serão coleções no firebase
    const tiposDisponiveis = ["Alongamentos", "Aeróbicos", "Força - Membros Superiores", "Força - Membros Inferiores"];



    const handleFinalizarEdicao = () => {
        updateDoc(doc(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), 'Exercicios', exercicio.nome),{
            nome: nome,
            tipo: tipo,
            musculos: musculos,
            descricao: descricao,
            variacao:  variacao,
            execucao: execucao,
            //imagem: imagem,
        }).then(() => {
            Alert.alert("Exercício editado com sucesso!");
            navigation.goBack(); // Volta para a tela anterior após editar o exercício
        }).catch((error) => {
            console.error("Erro ao editar exercício: ", error);
            Alert.alert("Erro ao editar exercício. Por favor, tente novamente mais tarde.");
        });
    }

    const handleExcluirExercicio = async () => {
        const exercicioRef = doc(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), 'Exercicios', exercicio.nome);
        deleteDoc(exercicioRef)
            .then(() => {
                Alert.alert("Exercício excluído com sucesso!")
                console.log("Exercício excluído com sucesso!");
                // Redirecione para a tela inicial ou para onde desejar após a exclusão
                navigation.goBack();
            })
            .catch((erro) => {
                console.error("Erro ao excluir exercício:", erro);
                // Exiba uma mensagem de erro ou trate o erro conforme necessário
            });
    };

    return (
        <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
        {!conexao ? (
            <ModalSemConexao />
        ) : (
            <SafeAreaView style={[styles.container, estilo.corLightMenos1]}>
          
            <View>
                <View style={{ alignContent: 'center' }}>
                <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria, styles.titulos]}>EDITAR EXERCÍCIO</Text>
                </View>



                    <View style={styles.inputArea}>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>NOME:</Text>
                        <View>
                            <TextInput
                                placeholder={'Nome do exercicio'}
                                placeholderTextColor={'#CFCDCD'} 
                                style={[
                                    estilo.sombra, 
                                    estilo.corLight, 
                                    styles.inputText,
                                    
                                ]}
                                keyboardType={'default'}
                                value={nome}
                                onChangeText={(text) => setNome(text)}
                            ></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>TIPO:</Text>
                        <ModalDropdown
                            options={tiposDisponiveis}
                            onSelect={(index, value) => setTipo(value)}
                            defaultValue="Selecione o Tipo"
                            textStyle={[estilo.sombra, estilo.corLight, styles.inputText]}
                            dropdownTextStyle={[estilo.sombra, estilo.corLight]}
                        />
                    </View>

                    <View style={styles.inputArea}>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>ATUAÇÃO MUSCULAR:</Text>
                        <View>
                        <TextInput
                            placeholder={'Atuacao'}
                            placeholderTextColor={'#CFCDCD'} 
                            style={[
                                estilo.sombra, 
                                estilo.corLight, 
                                styles.inputText,
                                
                            ]}
                            keyboardType={'default'}
                            value={musculos}
                            onChangeText={(text) => setMusculos(text)}
                        ></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>DESCRIÇÃO:</Text>
                        <View>
                        <TextInput
                            placeholder={'Descricao'}
                            placeholderTextColor={'#CFCDCD'} 
                            style={[
                                estilo.sombra, 
                                estilo.corLight, 
                                styles.inputText,
                                
                            ]}
                            keyboardType={'default'}
                            value={descricao}
                            onChangeText={(text) => setDescricao(text)}
                        ></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>VARIAÇÃO:</Text>
                        <View>
                        {exercicio.variacao.map((variacao) => (
                            <TextInput
                                placeholder={'Variação'}
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
                        ))}
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>VARIAÇÃO:</Text>
                        <View>
                        {exercicio.execucao.map((execucao) => (
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
                        ))}
                        </View>
                    </View>

                <View>
                    <TouchableOpacity 
                        style={[estilo.botao, estilo.sombra, estilo.corPrimaria]}
                        onPress={() => handleFinalizarEdicao()}
                        >
                        <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>SALVAR ALTERAÇÕES</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[estilo.botao, estilo.sombra, estilo.corDanger]}
                        onPress={() => handleExcluirExercicio()}
                        >
                        <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>EXCLUIR EXERCÍCIO</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </SafeAreaView>
        )}
        </ScrollView>
    );
};

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
