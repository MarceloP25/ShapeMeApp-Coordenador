import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import estilo from '../../../estilo';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc } from "firebase/firestore";
import { firebaseBD } from '../../../configuracoes/firebaseconfig/config';
import { coordenadorLogado } from '../../../LoginScreen';

export default ({ navigation, route }) => {
    const { exercicio } = route.params;
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

    return (
        <SafeAreaView style={estilo.corLightMenos1}>
            <ScrollView alwaysBounceVertical={true} style={style.container}>

                {dadosExercicio ? (
                    <View style={[style.areaTexto, estilo.centralizado]}>

                        <Text style={estilo.tituloH523px}>Nome:</Text>
                        <Text style={estilo.tituloH619px}>{dadosExercicio.nome}</Text>

                        <Text style={estilo.tituloH523px}>Tipo:</Text>
                        <Text style={estilo.tituloH619px}>{dadosExercicio.tipo}</Text>

                        <Text style={estilo.tituloH523px}>Atuação Muscular:</Text>
                        <Text style={estilo.tituloH619px}>{dadosExercicio.musculos}</Text>

                        <Text style={estilo.tituloH523px}>Descrição:</Text>
                        <Text style={estilo.tituloH619px}>
                            {dadosExercicio.descricao}
                        </Text>

                        <Text style={estilo.tituloH523px}>Variação:</Text>
                        {dadosExercicio.variacao.map((variacao, index) => (
                            <Text key={index} style={estilo.tituloH619px}>{variacao}</Text>
                        ))}

                        <Text style={estilo.tituloH523px}>Execução:</Text>
                        {dadosExercicio.execucao.map((execucao, index) => (
                            <Text key={index} style={estilo.tituloH619px}>{execucao}</Text>
                        ))}

                    </View>
                ) : (
                    <Text>Carregando...</Text>
                )}

                <TouchableOpacity
                    style={[estilo.botao, estilo.sombra, estilo.corPrimaria]}
                    onPress={() => navigation.navigate("Cadastro Varicacao Execucao", { exercicio: dadosExercicio })}
                >
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>ADICIONAR VARIAÇÃO E EXECUÇÃO</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[estilo.botao, estilo.sombra, estilo.corPrimaria]}
                    onPress={() => navigation.navigate('Editar Exercicios', { exercicio: dadosExercicio })}
                >
                    <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>EDITAR DADOS</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        marginVertical: '2%',
    },
    areaTexto: {
        marginTop: '10%',
        flex: 1,
        width: '90%',
        padding: 20,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: '#0066FF',
    },
});
