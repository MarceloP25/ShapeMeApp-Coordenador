import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { firebaseBD } from '../configuracoes/firebaseconfig/config';
import { FontAwesome6 } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import { Exercicio } from '../../classes/Exercicio';
import { coordenadorLogado } from '../../LoginScreen';

export default (navigation, route) => {
    const [conexao, setConexao] = useState(true);
    const [exercicios, setExercicios] = useState([]);
    const [exercicioSelecionado, setExercicioSelecionado] = useState(null);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setConexao(state.type === 'wifi' || state.type === 'cellular');
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const carregarExercicios = async () => {
        try {
            const querySnapshot = await getDocs(collection(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), 'Exercicios'));
            const exercicios = [];
            querySnapshot.forEach((doc) => {
            exercicios.push({ id: doc.id, ...doc.data() });
            });
            setExercicios(exercicios);
        } catch (error) {
            console.error('Erro ao carregar exercícios:', error);
        }
        };

        carregarExercicios();
    }, []);

    const navigation = useNavigation();

    const handleSelecionarExercicio = (exercicio) => {
        setExercicioSelecionado(exercicio);
        setNome(exercicio.nome || '');
        setTipo(exercicio.tipo || '');
        setMusculos(exercicio.musculos || '');
        setDescricao(exercicio.descricao || '');
        setVariacao(exercicio.variacao || []);
        setExecucao(exercicio.execucao || []);
        setImage(exercicio.imagem || null);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleSelecionarExercicio(item)}>
            <Text>{item.nome}</Text>
        </TouchableOpacity>
    );

    const options = {
        title: 'Selecione uma imagem',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    // Restante do seu código...

    return (
        <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
        {!conexao ? (
            <ModalSemConexao />
        ) : (
            <SafeAreaView style={styles.container}>
            <View>
                <View style={{ alignContent: 'center' }}>
                <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria, styles.titulos]}>EDITAR EXERCÍCIO</Text>
                </View>

                {/* Lista de exercícios */}
                <FlatList
                    data={exercicios}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<Text>Nenhum exercício encontrado</Text>}
                />

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
                        <ModalDropdown
                            options={tiposDisponiveis}
                            onSelect={(index, value) => setTipo(value)}
                            defaultValue="Selecione o Tipo"
                            textStyle={[estilo.sombra, estilo.corLight, styles.inputText]}
                            dropdownTextStyle={[estilo.sombra, estilo.corLight]}
                        />
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
                <View>
                    <TouchableOpacity
                    style={[estilo.botao, estilo.sombra]}
                    onPress={() => {
                        ImagePicker.showImagePicker(options, (response) => {
                        if (response.didCancel) {
                            console.log('Usuário cancelou a seleção da imagem');
                        } else if (response.error) {
                            console.log('Erro: ', response.error);
                        } else {
                            const source = { uri: response.uri };
                            setImage(source);
                        }
                        });
                    }}>
                    <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>Selecionar Imagem</Text>
                    </TouchableOpacity>
                </View>
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
                                    novoExercicio.setImagem(image)

                                    if (novoExercicio.getNome() == ''){
                                        Alert.alert('Informe o nome do exercicio para cadasrtá-lo!!!')
                                    } else {
                                        handleFinalizarCadastro()
                                    }
                                }}>
                        <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>SALVAR ALTERAÇÕES</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </SafeAreaView>
        )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
container: {
    backgroundColor: '#F8FAFF',
    marginVertical: '2%',
},
inputArea: {
    marginLeft: '10%',
    marginVertical: 10,
},
titulos: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 5,
},
// Restante dos seus estilos...
});
