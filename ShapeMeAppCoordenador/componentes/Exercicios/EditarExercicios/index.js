import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import estilo from '../../estilo';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { firebaseBD } from '../configuracoes/firebaseconfig/config';
import { FontAwesome6 } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import { Exercicio } from '../../classes/Exercicio';
import { coordenadorLogado } from '../../LoginScreen';

export default ({navigation, route}) => {
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

    const handleSelecionarExercicio = (exercicio) => {
        setExercicioSelecionado(exercicio);
        setNome(exercicio.nome || '');
        setTipo(exercicio.tipo || '');
        setMusculos(exercicio.musculos || '');
        setDescricao(exercicio.descricao || '');
        setVariacao(exercicio.variacao || []);
        setExecucao(exercicio.execucao || []);
        setImagem(exercicio.imagem || null);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleSelecionarExercicio(item)}>
            <Text>{item.nome}</Text>
        </TouchableOpacity>
    );
    const [nome, setNome] = useState('')
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

    // Olhar como definir 4 tipos que serão coleções no firebase
    const [tipo, setTipo] = useState('')
    const tiposDisponiveis = ["Alongamentos", "Aeróbicos", "Força - Membros Superiores", "Força - Membros Inferiores"];

    const [musculos, setMusculos] = useState('')
    const [musculosInvalido, setMusculosInvalido] = useState(false)

    const validaMusculos = (text) => {
        const musculosValidos = /^[a-zA-Z\s]*$/;
        if (musculosValidos.test(text)) {
            setMusculosInvalido(false);
        } else {
            setMusculosInvalido(true);
        }
        setMusculos(text);
    };
    
    const [descricao, setDescricao] = useState('')
    const [descricaoInvalida, setDescricaoInvalida] = useState(false)

    const validaDescricao = (text) => {
        const descricaoValida = text.length >= 3;

        setDescricao(text);
        setDescricaoInvalida(!descricaoValida)
    };

    const [variacao, setVariacao] = useState([])

    const addVariacao = () => {
        setVariacao([...variacao, ""]); // Adiciona um novo elemento vazio
    };
    
    const updateVariacao = (text, index) => {
        const updatedVariacao = [...variacao];
        updatedVariacao[index] = text;
        setVariacao(updatedVariacao);
    };
    
    const renderVariacao = () => {
        return variacao.map((value, index) => (
        <TextInput
            key={index}
            placeholder={`Digite a variação ${index + 1}`}
            placeholderTextColor={"#CFCDCD"}
            style={[
            styles.inputText,
            /* Adicione suas condições de estilo aqui se necessário */
            ]}
            keyboardType={"default"}
            value={value}
            onChangeText={(text) => updateVariacao(text, index)}
        />
        ));
    };

    const [execucao, setExecucao] = useState([])

    const addExecucao = () => {
        setExecucao([...execucao, ""]); // Adiciona um novo elemento vazio
    };
    
    const updateExecucao = (text, index) => {
        const updatedExecucao = [...execucao];
        updatedExecucao[index] = text;
        setExecucao(updatedExecucao);
    };
    
    const renderExecucao = () => {
        return execucao.map((value, index) => (
        <TextInput
            key={index}
            placeholder={`Digite a variação ${index + 1}`}
            placeholderTextColor={"#CFCDCD"}
            style={[
            styles.inputText,
            /* Adicione suas condições de estilo aqui se necessário */
            ]}
            keyboardType={"default"}
            value={value}
            onChangeText={(text) => updateExecucao(text, index)}
        />
        ));
    };

    const [imagem, setImagem] = useState(null)

    const options = {
        title: 'Selecione uma imagem',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const handleFinalizarCadastro = () => {
        updateDoc(doc(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), 'Exercicios', `${exercicios.getNome()}`),{
            nome: exercicios.getNome(),
            tipo: exercicios.getTipo(),
            musculos: exercicios.getMusculos(),
            descricao: exercicios.getDescricao(),
            variacao:  exercicios.getVariacao(),
            execucao: exercicios.getExecuao(),
            imagem: exercicios.getImagem(),
        }).catch((erro) => {
            console.log(`Não foi possível criar o documento. Já existe um exercício cadastrado com esse nome.`)
        });
    }

    const handleExcluirExercicio = async () => {
        try {
            await doc(
                firebaseBD,
                'Academias',
                coordenadorLogado.getAcademia(),
                'Exercicios',
                exercicioSelecionado.id
            ).delete();

        // Atualizar a lista de exercícios após a exclusão
        const updatedExercicios = exercicios.filter(
            (exercicio) => exercicio.id !== exercicioSelecionado.id
        );
        setExercicios(updatedExercicios);

        // Limpar os campos de input após a exclusão
        setExercicioSelecionado(null);
        setNome('');
        setTipo('');
        setMusculos('');
        setDescricao('');
        setVariacao([]);
        setExecucao([]);
        setImagem(null);

        Alert.alert('Exercício excluído com sucesso!');
        } catch (error) {
        console.error('Erro ao excluir exercício:', error);
        Alert.alert('Erro ao excluir exercício. Tente novamente.');
        }
    };

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
                    <TouchableOpacity style={[estilo.botao, estilo.sombra, estilo.corPrimaria]}
                                onPress={() => {
                                    exercicios.setNome(nome)
                                    exercicios.setTipo(tipo)
                                    exercicios.setMusculos(musculos)
                                    exercicios.setDescricao(descricao)
                                    exercicios.setVariacao(variacao)
                                    exercicios.setExecucao(execucao)
                                    exercicios.setImagem(imagem)

                                    if (exercicios.getNome() == '' || exercicios.getTipo() == ''){
                                        Alert.alert('Informe o nome do exercicio para cadasrtá-lo!!!')
                                    } else {
                                        handleFinalizarCadastro()
                                    }
                                }}>
                        <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>SALVAR ALTERAÇÕES</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[estilo.botao, estilo.sombra, styles.botaoExcluir]}
                        onPress={() => {
                        if (exercicioSelecionado) {
                            Alert.alert(
                            'Excluir Exercício',
                            `Deseja realmente excluir o exercício "${exercicioSelecionado.nome}"?`,
                            [
                                {
                                text: 'Cancelar',
                                style: 'cancel',
                                },
                                { text: 'Excluir', onPress: handleExcluirExercicio() },
                            ]
                            );
                        } else {
                            Alert.alert('Nenhum exercício selecionado para excluir.');
                        }
                        }}>
                        <Text style={[estilo.tituloH523px, estilo.textoCorLight]}>EXCLUIR EXERCÍCIO</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </SafeAreaView>
        )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F8FAFF',
        marginVertical: '2%',
    },
    inputArea: {
        marginLeft: '10%',
        marginVertical: 10
    },
    titulos: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 5,
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
    botaoAdd: {
        backgroundColor: '#CFCDCD',
        width: 213,
        height: 29,
        borderRadius: 5,
    },
    botaoExcluir: {
        backgroundColor: 'red',
    }

})
