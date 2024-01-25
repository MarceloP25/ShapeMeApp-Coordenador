import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import estilo from '../../../estilo';
import { useNavigation } from '@react-navigation/native';

export default ({ navigation, route }) => {
    const { exercicio } = route.params;
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <SafeAreaView style={estilo.corLightMenos1}>
            <ScrollView alwaysBounceVertical={true} style={style.container}>
                <View>
                    <View>
                        <TouchableOpacity onPress={toggleModal}>
                            <Image source={{ uri: exercicio.imagem }} style={style.imagemExercicio} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={estilo.tituloH619px}>{exercicio.nome}</Text>
                        <Text style={estilo.tituloH619px}>Tipo: {exercicio.tipo}</Text>
                        <Text style={estilo.tituloH619px}>Atuação Muscular: {exercicio.musculos}</Text>
                        <Text style={estilo.tituloH619px}>Descrição: {exercicio.descricao}</Text>
                        <Text style={estilo.tituloH619px}>Variação: {exercicio.variacao}</Text>
                        <Text style={estilo.tituloH619px}>Execução: {exercicio.execucao}</Text>
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={toggleModal}
                    >
                    <View style={style.modalContainer}>
                        <TouchableOpacity onPress={toggleModal}>
                            <Image source={{ uri: exercicio.imagem }} style={style.imagemExercicioExpandida} />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        marginVertical: '2%',
    },
    imagemExercicio: {
        width: '100%',
        height: 200, // Ajuste a altura conforme necessário
        resizeMode: 'cover',
    },
    imagemExercicioExpandida: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
});
