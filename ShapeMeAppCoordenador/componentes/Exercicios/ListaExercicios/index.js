import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import estilo from '../../estilo';
import { useNavigation } from '@react-navigation/native';
import { collection, getDoc, doc } from "firebase/firestore";
import { firebase, firebaseBD } from '../../configuracoes/firebaseconfig/config'
import { coordenadorLogado } from '../../LoginScreen';

export default ({navigation, route}) => {
    const { exercicios } = route.params;

    const dadosExercicio = async (nomeExercicio) => {
        try {
            const exercicioRef = doc(collection(firebaseBD, "Academias", coordenadorLogado.getAcademia(), "Exercicios"), nomeExercicio);
            const exercicioSnapshot = await getDoc(exercicioRef);
            if (exercicioSnapshot.exists()) {
                const exercicioDados = exercicioSnapshot.data();
                navigation.navigate("Dados Exercicios", { exercicio: exercicioDados });
            } else {
                console.log("Exercício não encontrado");
            }
        } catch (error) {
            console.log("Erro ao buscar dados do exercício:", error);
        }
    };

    return (
        <ScrollView alwaysBounceVertical={true} style={[estilo.corLightMenos1]}>
            <SafeAreaView style={[style.container, estilo.corLightMenos1]}>
                
                {exercicios.map((exercicio) => (
                    console.log(exercicio),
                    <TouchableOpacity
                        key={exercicio.nome}
                        style={[estilo.botaoClaro2, estilo.sombra, estilo.corLight]}
                        onPress={ () => dadosExercicio(exercicio.nome)}
                    >
                        <Text style={[estilo.tituloH427px, estilo.textoCorDark]}>{exercicio.nome}</Text>
                    </TouchableOpacity>
                ))}
                
            </SafeAreaView>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        marginVertical: '2%',
    },
    exercicioBotao: {
        width: '80%',
        height: 80,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
