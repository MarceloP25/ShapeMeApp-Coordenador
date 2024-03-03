import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import estilo from '../../estilo';
import { useNavigation } from '@react-navigation/native';


export default ({navigation, route}) => {
    const { exercicios } = route.params;

    return (
        <ScrollView alwaysBounceVertical={true} style={[estilo.corLightMenos1]}>
            <SafeAreaView style={[style.container, estilo.corLightMenos1]}>
                
                {exercicios.map((exercicio) => (
                    console.log(exercicio),
                    <TouchableOpacity
                        key={exercicio.nome}
                        style={[estilo.botaoClaro2, estilo.sombra, estilo.corLight]}
                        onPress={ () => navigation.navigate("Dados Exercicios", { exercicios: exercicio })}
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
