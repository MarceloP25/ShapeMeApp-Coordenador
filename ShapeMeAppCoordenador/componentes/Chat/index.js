// Importações necessárias do React Native e Firebase
import React, { useState, useEffect } from "react"
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, View } from "react-native"
import Logo from '../Logo' // Componente de logo
import estilo from "../estilo" // Estilos personalizados
import { FontAwesome5 } from '@expo/vector-icons'; // Ícone FontAwesome5
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config' // Configurações do Firebase
import { collection, getDocs, query, orderBy } from "firebase/firestore"; // Funções do Firestore
import { coordenadorLogado } from "../LoginScreen"; // Objeto de coordenador logado
import Conversas from "./Conversas"; // Componente de Conversas
import Spinner from "react-native-loading-spinner-overlay"; // Spinner de carregamento
import NetInfo from "@react-native-community/netinfo" // Verificação de conexão de rede
import ModalSemConexao from "../ModalSemConexao"; // Modal para exibição sem conexão
import * as Notification from "expo-notifications" // Notificações Expo

// Componente funcional para exibição de mensagens entre coordenador e professores
export default ({ navigation }) => {
    // Estado para armazenar a URL da imagem (não utilizado no código fornecido)
    const [imageUrl, setImageUrl] = useState(null);

    // Estado para indicar se está carregando (spinner)
    const [loading, setLoading] = useState(true);

    // Estado para armazenar a lista de professores
    const [professores, setProfessores] = useState([]);

    // Estado para verificar a conexão de rede
    const [conexao, setConexao] = useState(true);

    // Efeito colateral para verificar a conexão de rede ao carregar o componente
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type == 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    // Estado para indicar se está carregando os professores
    const [carregandoProfessores, setCarregandoProfessores] = useState(true);

    // Efeito colateral para buscar os professores ao carregar o componente
    useEffect(() => {
        const fetchProfessores = async () => {
            try {
                const academiaRef = collection(firebaseBD, 'Academia');
                const querySnapshot = await getDocs(academiaRef);

                const newArrayProfessores = [];

                for (const coordenadorDoc of querySnapshot.docs) {
                    const academiaNome = coordenadorDoc.get('nome');
                    if (academiaNome === coordenadorLogado.getAcademia()) {
                        const coordenadorRef = collection(
                            coordenadorDoc.ref,
                            'Coordenador'
                        );
                        const professoresSnapshot = await getDocs(academiaRef);

                        for (const professorDoc of professoresSnapshot.docs) {
                            const professorData = professorDoc.data();
                            const professoresRef = collection(
                                academiaDoc.ref,
                                'Professor'
                            );
                            const professoresSnapshot = await getDocs(professoresRef,);

                            for (const alunoDoc of professoresSnapshot.docs) {
                                const alunoData = alunoDoc.data();

                                const mensagensRef = collection(
                                    firebaseBD, 'Academia', coordenadorLogado.getAcademia(), 'Professores', coordenadorLogado.getNome(),
                                    'Mensagens',
                                    `Mensagens ${alunoData.email}`,
                                    'todasAsMensagens'
                                );

                                const q = query(mensagensRef, orderBy('data', 'asc'));
                                const mensagensSnapshot = await getDocs(q);
                                const lastMessageDoc = mensagensSnapshot.docs[mensagensSnapshot.docs.length - 1];

                                if (lastMessageDoc) {
                                    const remetente = lastMessageDoc.get('remetente');
                                    newArrayProfessores.push({ aluno: alunoData, remetente: remetente });
                                    console.log('newArrayProfessores', newArrayProfessores)
                                }
                            }
                        }
                    }
                }

                setProfessores(newArrayProfessores);
                setCarregandoProfessores(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfessores();
    }, []);

    console.log("PROFESSORES LENGTH", professores.length)

    // Função para lidar com notificações locais
    const handleNotificationLocal = async (alunoUltimaMensagem) => {
        await Notification.scheduleNotificationAsync({
            content: {
                title: 'Nova mensagem!',
                body: `Nova mensagem do aluno ${alunoUltimaMensagem}`,
                data: []
            },
            trigger: {
                seconds: 1
            }
        });
    }

    // Renderização condicional com base na conexão e no carregamento
    return (
        <View style={style.container}>
            {conexao ? carregandoProfessores ? (
                <Spinner
                    visible={carregandoProfessores}
                    textContent={'Carregando mensagens...'}
                    textStyle={[estilo.textoCorLight, estilo.textoP16px]}
                />
            ) : (
                professores.map((professor) => {
                    professor.remetente === coordenadorLogado.getEmail() ? '' : handleNotificationLocal(professor.remetente)
                    return (
                        <Conversas aluno={professor.aluno} navigation={navigation} backgroundColor={professor.remetente !== coordenadorLogado.getEmail() ? '#0066FF' : '#FFFFFF'} />
                    )
                })
            ) : <ModalSemConexao ondeNavegar={'Home'} navigation={navigation} />}
        </View>
    )
}

// Estilos específicos para a tela
const style = StyleSheet.create({
    container: {
        width: '100%'
    },
    tituloAlinhado: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '5%'
    },
    textoAlinhado: {
        marginLeft: '5%',
        marginTop: '15%',
        textDecorationLine: 'underline',
    },
    foto: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    botao: {
        flexDirection: 'row',
        alignItems: 'center', // Alinha os itens verticalmente
        justifyContent: 'space-around', // Alinha os itens horizontalmente
    }
});
