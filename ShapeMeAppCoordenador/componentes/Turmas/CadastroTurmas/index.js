import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Turmas } from '../../../classes/Turmas';
import { setDoc, doc } from "firebase/firestore";
import { firebaseBD } from '../../configuracoes/firebaseconfig/config';
import NetInfo from "@react-native-community/netinfo";
import estilo from "../../estilo";
import { coordenadorLogado } from '../../LoginScreen';
import Cabecalho from '../Cabecalho';

export default ({ navigation }) => {
    const novaTurma = new Turmas()
    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const [nome, setNome] = useState('');
    const [horario, setHorario] = useState('');
    const [dia, setDia] = useState('');
    const [vaga, setVaga] = useState('');
    
    const handleCadastroTurma = () =>{
        setDoc(doc(firebaseBD, `Academias/${coordenadorLogado.getAcademia()}/Turmas`, `${novaTurma.getNome()}`),{
            nome: novaTurma.getNome(),
            horario: novaTurma.getHorario(),
            dias: novaTurma.getDia(),
            vaga: novaTurma.getVaga(),
        }).then(() => {
            // Limpar os campos após o cadastro bem-sucedido
            setNome('');
            setHorario('');
            setDia('');
            setVaga('');
        }).catch((erro) => {
            console.log(`Não foi possível criar a turma. Já existe uma turma cadastrada com esse nome.`);
        });
    }

    return (
        <ScrollView alwaysBounceVertical={true} style={[estilo.corLightMenos1]}>
            <SafeAreaView style={styles.container}>
            <Cabecalho navigation={navigation} />
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
                        <TouchableOpacity style={[estilo.corPrimaria, styles.botao, estilo.sombra, estilo.botao]}
                            onPress={() => {
                                novaTurma.setNome(nome)
                                novaTurma.setHorario(horario)
                                novaTurma.setDia(dia)
                                novaTurma.setVaga(vaga)

                                if (novaTurma.getNome() == '' || novaTurma.getHorario() == '' ||
                                    novaTurma.getDia() == '' || novaTurma.getVaga() == ''){
                                        Alert.alert('Preencha corretamente todos os campos.')
                                    } else {
                                        handleCadastroTurma()
                                    }
                                }}>
                            <Text>CADASTRAR TURMA</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={navigation.navigate('Turmas')} style={[estilo.corPrimaria, styles.botao, estilo.sombra, estilo.botao]}>
                        <Text>LISTA TURMAS</Text>
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
