import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import estilo from '../estilo';
import { useNavigation } from '@react-navigation/native';
import Cabecalho from '../../Cabecalho';

export default ({navigation, route}) => {
    const { exercicios } = route.params;

    return (
        <SafeAreaView style={estilo.corLightMenos1}>
            <ScrollView alwaysBounceVertical={true} style={style.container}>
            <Cabecalho navigation={navigation} />
                <View>
                    {exercicios.map((exercicio, index) => (
                        <TouchableOpacity
                        key={index}
                        style={[estilo.botaoClaro1, estilo.sombra, style.exercicioBotao]}
                        onPress={ () => navigation.navigate('Dados Exercicio', { exercicios: exercicio })}
                        >
                        <Text style={estilo.tituloH427px}>{exercicio.nome}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
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
