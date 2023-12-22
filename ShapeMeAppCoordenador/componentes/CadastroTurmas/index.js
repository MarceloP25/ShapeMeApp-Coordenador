import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Turmas } from '../../classes/Turmas';
import { setDoc, doc } from "firebase/firestore";
import { firebaseBD } from '../configuracoes/firebaseconfig/config';
import NetInfo from "@react-native-community/netinfo";
import estilo from "../estilo";

export default ({ navigation}) => {
    const turma = new Turmas('','','','')
    const [turmasCadastradas, setTurmasCadastradas] = useState([]); // Adiciona o estado para armazenar as turmas cadastradas


    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
        setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
        unsubscribe()
        }
    }, [])


    const [nome, setNome ] = useState('')
    const [horario, setHorario] = useState('')
    const [dia, setDia] = useState('')
    const [vaga, setVaga] = useState('')
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

    // const {nomeAcademia} = route.params

    const handleTurmaCadastro = () => {
        // Adiciona a nova turma ao vetor de turmas cadastradas
        setTurmasCadastradas([...turmasCadastradas, { nome, horario, dia, vaga }]);

        // Limpa os campos
        setNome('');
        setHorario('');
        setDia('');
        setVaga('');

        // Mensagem de sucesso
        Alert.alert("Turma cadastrada no sistema! Se deseja cadastrar uma nova turma, preencha novamente...");
    };

    const handleFinalizar = () => {
        // Salva as turmas no Firebase
        for (const turma of turmasCadastradas) {
            try {
                setDoc(doc(firebaseBD, "Academias", nomeAcademia, "Turmas", turma.nome), turma);
            } catch (erro) {
                console.log(`Não foi possível criar as turmas. Erro: ${erro}`);
            }
        }

        // Navega para a tela de login
        navigation.navigate('Login');
    };
    

    return (
        <ScrollView alwaysBounceVertical={true} style={[estilo.corLightMenos1]}>
            <SafeAreaView style={styles.container}>
                <View style={styles.inputArea}>
                    <Text style={[estilo.tituloH619px, styles.aviso]}>PREENCHA COM OS DADOS PARA CRIAR TURMAS!</Text>
                    <Text style={[estilo.tituloH619px, styles.aviso]}>CASO NÃO QUEIRA, FINALIZE O CADASTRO.</Text>
                </View>
                <View style={styles.inputArea}>
                    <View style={styles.inputArea}>
                        <Text>Nome da turma:</Text>
                        <View>
                            <TextInput placeholder="Nome da turma" value={nome} style={[estilo.sombra, estilo.corLight, styles.inputText,]} onChangeText={(text) => setNome(text)}></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <Text>Horário da turma:</Text>
                        <View>
                            <TextInput placeholder="Horário da turma" value={horario} style={[estilo.sombra, estilo.corLight, styles.inputText,]} keyboardType='numeric' onChangeText={(text) => setHorario(text)}></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <Text>Dias da turma:</Text>
                        <View>
                            <TextInput placeholder="Dias da turma" value={dia} style={[estilo.sombra, estilo.corLight, styles.inputText,]} onChangeText={(text) => setDia(text)}></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <Text>Vagas da turma:</Text>
                        <View>
                            <TextInput placeholder="Vagas da turma" value={vaga} style={[estilo.sombra, estilo.corLight, styles.inputText,]} keyboardType='numeric' onChangeText={(text) => setVaga(text)}></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <TouchableOpacity onPress={handleTurmaCadastro} style={[estilo.corPrimaria, styles.botao, estilo.sombra, estilo.botao]}>
                            <Text>CADASTRAR TURMA</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={handleFinalizar} style={[estilo.corPrimaria, styles.botao, estilo.sombra, estilo.botao]}>
                        <Text>FINALIZAR</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        marginVertical: '2%',
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
    inputArea: {
        marginLeft: '10%',
        marginVertical: 10
    },
    aviso: {
        color: 'red',
    }
});
