import React from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import estilo from '../../estilo';


export default ({ navigation,route }) => {
    const { turma } = route.params;

    return (
        <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
            <SafeAreaView style={styles.container}>

                <View style={[estilo.corLight, styles.areaTexto, estilo.centralizado]}>
                <Text style={[estilo.tituloH333px, estilo.textoCorSecundaria, estilo.centralizado]}>Detalhes da Turma</Text>

                    <View style={[styles.texto]}>
                        <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria]}>Nome da Turma:</Text>
                        <Text style={[estilo.tituloH427px, estilo.textoCorSecundaria]}>{turma.nome}</Text>

                        <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria]}>Horário da Turma:</Text>
                        <Text style={[estilo.tituloH427px, estilo.textoCorSecundaria]}>{turma.horario}</Text>

                        <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria]}>Dias da Turma:</Text>
                        <Text style={[estilo.tituloH427px, estilo.textoCorSecundaria]}>{turma.dias}</Text>

                        <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria]}>Vagas da Turma:</Text>
                        <Text style={[estilo.tituloH427px, estilo.textoCorSecundaria]}>{turma.vaga}</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={[estilo.botao, estilo.sombra, estilo.corPrimaria]} 
                    onPress={() => navigation.navigate('Editar Turmas', { turma: turma })}
                    >
                    <Text style={[estilo.textoCorLight, estilo.tituloH523px]}>EDITAR TURMA</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: '10%',
        flex: 1,
        //height: '100%',
    },
    areaTexto:{
        marginTop: '10%',
        height: 400,
        width: '90%',
        padding: 20,
        borderRadius: 17,
        borderWidth: 1,
    },
    texto: {
        marginTop: '15%',
    },
});
