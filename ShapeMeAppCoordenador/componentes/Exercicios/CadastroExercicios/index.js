import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import React, { useState, useEffect } from "react"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import estilo from '../../estilo';
import { collection, setDoc, doc, getDocs, getFirestore, where, query, addDoc, querySnapshot, QueryStartAtConstraint } from "firebase/firestore";
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import { Exercicio } from '../../classes/Exercicio'
import { FontAwesome6 } from '@expo/vector-icons';

export default (navigation, route) =>{

    const novoExercicio = new Exercicio()

    const [conexao, setConexao] = useState(true);


    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])
    
    const [nome, setNome] = useState('')
    const [nomeInvalido, setNomeInvalido] = useState(false);

    const validaNome = (text) => {
        const nomeValido = /^[\p{L}\s]*$/u;
        if (nomeValido.test(text)) {
            setNomeInvalido(false);
        } else {
            setNomeInvalido(true);
        }
        setNome(text);
    };

    // Olhar como definir 4 tipos que serão coleções no firebase
    const [tipo, setTipo] = useState('')
    const [tipoDisponivel, setTipoDisponivel] = useState([])

    const [musculos, setMusculos] = useState('')
    const [musculosInvalido, setMusculosInvalido] = useState(false)

    const validaMusculos = (text) => {
        const musculosValidos = /^[a-zA-Z\s]*$/;
        if (musculosValidos.test(text)) {
            setMusculosInvalido(false);
        } else {
            setMusculosInvalido(true);
        }
        setMusculos(text);
    };
    
    const [descricao, setDescricao] = useState('')
    const [descricaoInvalida, setDescricaoInvalida] = useState(false)

    const validaDescricao = (text) => {
        const descricaoValida = text.length >= 3;

        setDescricao(text);
        setDescricaoInvalida(!descricaoValida)
    };

    const [variacao, setVariacao] = useState([])

    const addVariacao = () => {
        setVariacao([...variacao, ""]); // Adiciona um novo elemento vazio
    };
    
    const updateVariacao = (text, index) => {
        const updatedVariacao = [...variacao];
        updatedVariacao[index] = text;
        setVariacao(updatedVariacao);
    };
    
    const renderVariacao = () => {
        return variacao.map((value, index) => (
        <TextInput
            key={index}
            placeholder={`Digite a variação ${index + 1}`}
            placeholderTextColor={"#CFCDCD"}
            style={[
            styles.inputText,
            /* Adicione suas condições de estilo aqui se necessário */
            ]}
            keyboardType={"default"}
            value={value}
            onChangeText={(text) => updateVariacao(text, index)}
        />
        ));
    };

    const [execucao, setExecucao] = useState([])

    const addExecucao = () => {
        setExecucao([...execucao, ""]); // Adiciona um novo elemento vazio
    };
    
    const updateExecucao = (text, index) => {
        const updatedExecucao = [...execucao];
        updatedExecucao[index] = text;
        setExecucao(updatedExecucao);
    };
    
    const renderExecucao = () => {
        return execucao.map((value, index) => (
        <TextInput
            key={index}
            placeholder={`Digite a variação ${index + 1}`}
            placeholderTextColor={"#CFCDCD"}
            style={[
            styles.inputText,
            /* Adicione suas condições de estilo aqui se necessário */
            ]}
            keyboardType={"default"}
            value={value}
            onChangeText={(text) => updateExecucao(text, index)}
        />
        ));
    };

    /* Definir como adicionar imagem */
    const [image, setImage] = useState(null)


    const handleFinalizarCadastro = () => {
        setDoc(doc(firebaseBD, 'Academias', nomeAcademia, 'Exercicios', `${novoExercicio.getNome()}`),{
            nome: novoExercicio.getNome(),
            tipo: novoExercicio.getTipo(),
            musculos: novoExercicio.getMusculos(),
            descricao: novoExercicio.getDescricao(),
            variacao:  novoExercicio.getVariacao(),
            execucao: novoExercicio.getExecuao(),
            imagem: novoExercicio.getImagem(),
        }).catch((erro) => {
            console.log(`Não foi possível criar o documento. Já existe um exercício cadastrado com esse nome.`)
        });
    }



    return (
        <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
            {!conexao ? <ModalSemConexao/> 
            : 
            <SafeAreaView style={styles.container}>   

                <View>
                    <View style={{alignContent: 'center',}}>
                        <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria,  styles.titulos]}>CADASTTRAR EXERCÍCIO</Text>
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
                                    nomeInvalido? {borderWidth: 1, borderColor: 'red'} : {}
                                ]}
                                keyboardType={'default'}
                                value={nome}
                                onChangeText={(text) => {validaNome(text)}}
                            ></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>TIPO:</Text>

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
                                musculosInvalido? {borderWidth: 1, borderColor: 'red'} : {}
                            ]}
                            keyboardType={'default'}
                            value={musculos}
                            onChangeText={(text) => {validaMusculos(text)}}
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
                                descricaoInvalida? {borderWidth: 1, borderColor: 'red'} : {}
                            ]}
                            keyboardType={'default'}
                            value={descricao}
                            onChangeText={(text) => {validaDescricao(text)}}
                        ></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>VARIAÇÕES:</Text>
                        <View>
                            {renderVariacao()}
                        </View>
                        <View>
                        <TouchableOpacity onPress={addVariacao}>
                            <FontAwesome6 name="add" size={24} color="white" />
                        </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={styles.inputArea}>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>EXECUÇÕES:</Text>
                        <View>
                            {renderExecucao()}
                        </View>
                        <View>
                        <TouchableOpacity onPress={addExecucao}>
                            <FontAwesome6 name="add" size={24} color="white" />
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Text>IMAGEM:</Text>
                    </View>

                    <View>
                        <TouchableOpacity style={[estilo.botao, estilo.sombra]}
                            onPress={() => {
                                novoExercicio.setNome(nome)
                                novoExercicio.setTipo(tipo)
                                novoExercicio.setMusculos(musculos)
                                novoExercicio.setDescricao(descricao)
                                novoExercicio.setVariacao(variacao)
                                novoExercicio.setExecucao(execucao)
                                // novoExercicio.setImagem(imagem)

                                if (novoExercicio.getNome() == ''){
                                    Alert.alert('Informe o nome do exercicio para cadasrtá-lo!!!')
                                } else {
                                    handleFinalizarCadastro()
                                }
                            }}>
                            <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>ADICIONAR</Text>
                        </TouchableOpacity>
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