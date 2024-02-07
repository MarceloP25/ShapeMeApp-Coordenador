import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Logo from '../Logo';
import estilo from '../estilo';
import { getDocs, collection } from 'firebase/firestore';
import { firebaseBD } from '../configuracoes/firebaseconfig/config';
import { coordenadorLogado } from '../LoginScreen';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalSemConexao from '../ModalSemConexao';
import NetInfo from '@react-native-community/netinfo';

export default ({ navigation }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alunos, setAlunos] = useState([]);
  const [carregandoAlunos, setCarregandoAlunos] = useState(true);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const academiaRef = collection(firebaseBD, 'Academias');
        const querySnapshot = await getDocs(academiaRef);

        const newArrayAlunos = [];

        for (const academiaDoc of querySnapshot.docs) {
          const academiaNome = academiaDoc.get('nome');

          if (academiaNome === coordenadorLogado.getAcademia()) {
            const professoresRef = collection(
              firebaseBD,
              'Academias',
              coordenadorLogado.getAcademia(),
              'Professores'
            );

            const professoresSnapshot = await getDocs(professoresRef);

            for (const professorDoc of professoresSnapshot.docs) {
              const professorData = professorDoc.data();

              const alunoRef = collection(
                firebaseBD,
                'Academias',
                coordenadorLogado.getAcademia(),
                'Professores',
                professorData.nome,
                'alunos'
              );
              const alunoSnapshot = await getDocs(alunoRef);

              for (const alunoDoc of alunoSnapshot.docs) {
                const alunoData = alunoDoc.data();

                newArrayAlunos.push(alunoData);
              }
            }
          }
        }

        setAlunos(newArrayAlunos);
        setCarregandoAlunos(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAlunos();
  }, []);

  const [conexao, setConexao] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConexao(state.type === 'wifi' || state.type === 'cellular');
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const redirecionarParaPerfilAluno = (aluno) => {
    navigation.navigate('Perfil Aluno', { aluno: aluno });
  };

  return (
    <SafeAreaView style={style.container}>
      <View>
        {conexao ? (
          <>
            
            <Text style={[estilo.textoCorDanger, estilo.textoP16px, style.textoAlinhado]} numberOfLines={2}>
              Selecione o aluno para continuar.
            </Text>
            {carregandoAlunos ? (
              <Spinner
                visible={carregandoAlunos}
                textContent={'Carregando alunos...'}
                textStyle={[estilo.textoCorLight, estilo.textoP16px]}
              />
            ) : (
              alunos.map((aluno) => (
                <TouchableOpacity
                  key={aluno.cpf}
                  style={[estilo.botao, estilo.corPrimaria, style.botao]}
                  onPress={() => redirecionarParaPerfilAluno(aluno)}
                >
                  <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>{aluno.nome}</Text>
                </TouchableOpacity>
              ))
            )}
          </>
        ) : (
          <ModalSemConexao navigation={navigation} ondeNavegar={'Home'} />
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    marginVertical: '5%',
  },
  tituloAlinhado: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%',
  },
  textoAlinhado: {
    marginLeft: '5%',
    marginTop: '15%',
    textDecorationLine: 'underline',
  },
  foto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center', // Alinha os itens verticalmente
    justifyContent: 'space-around', // Alinha os itens horizontalmente
  },
});
