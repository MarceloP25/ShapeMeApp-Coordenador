import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, Alert, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { firebaseBD } from '../../configuracoes/firebaseconfig/config';
import NetInfo from "@react-native-community/netinfo";
import estilo from "../../estilo";
import { coordenadorLogado } from '../../LoginScreen';


export default ({ route, navigation }) => {

    const turma = route.params
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


    const handleEdicaoTurma = () => {
        updateDoc(doc(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), 'Turmas', turma.nome),{
            nome: nome,
            horario: horario,
            dias: dia,
            vaga: vaga,
        }).catch((erro) => {
            Alert.alert("Dados incorretos!")
            console.log(`Não foi possível editar a turma.`);
        }).then(() =>{
            Alert.alert("Dados atualizados com sucesso!")
            navigation.goBack()
        });
    };

    return (
        <ScrollView alwaysBounceVertical={true} style={[estilo.corLightMenos1]}>
            <SafeAreaView style={styles.container}>

                <View style={styles.inputArea}>
                    <Text style={[estilo.tituloH619px, styles.aviso]}>EDITE OS DADOS DA TURMA!</Text>
                    <Text style={[estilo.tituloH619px, styles.aviso]}>CASO NÃO QUEIRA, FINALIZE A EDIÇÃO.</Text>
                </View>
                <View style={styles.inputArea}>
                    <View style={styles.inputArea}>
                        <Text>Nome da turma:</Text>
                        <View>
                            <TextInput 
                                placeholder="Nome da turma" 
                                value={nome} 
                                style={[estilo.sombra, estilo.corLight, styles.inputText,]} 
                                onChangeText={(text) => setNome(text)}
                                ></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <Text>Horário da turma:</Text>
                        <View>
                            <TextInput 
                                placeholder="Horário da turma" 
                                value={horario} 
                                style={[estilo.sombra, estilo.corLight, styles.inputText,]} 
                                keyboardType='numeric' 
                                onChangeText={(text) => setHorario(text)}
                                ></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <Text>Dias da turma:</Text>
                        <View>
                            <TextInput 
                                placeholder="Dias da turma" 
                                value={dia} 
                                style={[estilo.sombra, estilo.corLight, styles.inputText,]} 
                                onChangeText={(text) => setDia(text)}
                                ></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <Text>Vagas da turma:</Text>
                        <View>
                            <TextInput 
                                placeholder="Vagas da turma" 
                                value={vaga} style={[estilo.sombra, estilo.corLight, styles.inputText,]} 
                                keyboardType='numeric' 
                                onChangeText={(text) => setVaga(text)}
                                ></TextInput>
                        </View>
                    </View>

                    <View style={styles.inputArea}>
                        <TouchableOpacity 
                            style={[estilo.corPrimaria, styles.botao, estilo.sombra, estilo.botao]}
                            onPress={() => handleEdicaoTurma()}
                            >
                            <Text>EDITAR TURMA</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
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
