import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from "react"
import { useNavigation } from '@react-navigation/native';
import estilo from '../estilo';
import { collection, getDocs, firebaseBD } from "firebase/firestore";
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercicio } from '../../classes/Exercicio';
import { coordenadorLogado } from '../LoginScreen';

export default ({navigation, route}) =>{

  const {academia} = route.params;
  const [exercicioData, setExercicioData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Arrays para armazenar exercícios de cada tipo
  const [alongamentoExercicios, setAlongamentoExercicios] = useState([]);
  const [aerobicoExercicios, setAerobicoExercicios] = useState([]);
  const [forcaSuperioresExercicios, setForcaSuperioresExercicios] = useState([]);
  const [forcaInferioresExercicios, setForcaInferioresExercicios] = useState([]);

  useEffect(() => {
    fetchExercicioData();
  }, []);

  const fetchExercicioData = async () => {
    try {
      const academiaRef = collection(firebaseBD, "Academias", coordenadorLogado.getAcademia());
      const querySnapshot = await getDocs(academiaRef);

      if (querySnapshot.empty) {
        // A coleção "Exercicios" não existe, mostrar o modal e interromper o processamento
        setModalVisible(true);
        return;
      }

      const exercicios = [];
      querySnapshot.forEach((academiaDoc) => {
        const academiaNome = academiaDoc.get("nome");
        const exercicioRef = collection(firebaseBD, "Academias", academiaNome, "Exercicios");
        const exercicioSnapshot = getDocs(exercicioRef);

        for (const exercicioDoc of exercicioSnapshot.docs) {
          const exercicioData = exercicioDoc.data();
          exercicios.push(exercicioData);

          // Adicionar exercício ao array correspondente ao tipo
          switch (exercicioData.tipo) {
            case "Alongamentos":
              setAlongamentoExercicios((prevExercicios) => [...prevExercicios, exercicioData]);
              break;
            case "Aeróbicos":
              setAerobicoExercicios((prevExercicios) => [...prevExercicios, exercicioData]);
              break;
            case "Força - Membros Superiores":
              setForcaSuperioresExercicios((prevExercicios) => [...prevExercicios, exercicioData]);
              break;
            case "Força - Membros Inferiores":
              setForcaInferioresExercicios((prevExercicios) => [...prevExercicios, exercicioData]);
              break;
            default:
              break;
          }

          const exercicioString = JSON.stringify(exercicioDoc.data());
          AsyncStorage.setItem('exercicioLocal', exercicioString);
        }
      });

      setExercicioData(exercicios);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
      <SafeAreaView style={style.container}>

        {/* Modal para redirecionar o usuário para a tela de cadastro */}
        {modalVisible && (
          <View style={style.modalContainer}>
            <Text style={style.modalText}>A coleção "Exercicios" não existe. Cadastre-se agora!</Text>
            <TouchableOpacity
              style={[estilo.botao, estilo.sombra]}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Cadastro Exercicios');
              }}
            >
              <Text style={estilo.tituloH427px}>Ir para o cadastro</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={style.containerBotao}>
          {/* Botão exercícios do tipo alongamento */}
          <TouchableOpacity
            style={[estilo.botaoClaro1, estilo.sombra]}
            onPress={() => navigation.navigate('Lista Exercicios', { exercicios: alongamentoExercicios })}
          >
            <Text style={estilo.tituloH427px}>ALONGAMENTO</Text>
          </TouchableOpacity>
        </View>

        <View style={style.containerBotao}>
          {/* Botão exercícios do tipo aeróbico */}
          <TouchableOpacity
            style={[estilo.botaoClaro1, estilo.sombra]}
            onPress={() => navigation.navigate('Lista Exercicios', { exercicios: aerobicoExercicios })}
          >
            <Text style={estilo.tituloH427px} >AERÓBICO</Text>
          </TouchableOpacity>
        </View>

        <View style={style.containerBotao}>
          {/* Botão exercícios do tipo força membros superiores */}
          <TouchableOpacity
            style={[estilo.botaoClaro1, estilo.sombra]}
            onPress={() => navigation.navigate('Lista Exercicios', { exercicios: forcaSuperioresExercicios })}
          >
            <Text style={estilo.tituloH427px}>FORÇA SUPERIORES</Text>
          </TouchableOpacity>
        </View>

        <View style={style.containerBotao}>
          {/* Botão exercícios do tipo força membros inferiores */}
          <TouchableOpacity
            style={[estilo.botaoClaro1, estilo.sombra]}
            onPress={() => navigation.navigate('Lista Exercicios', { exercicios: forcaInferioresExercicios })}
          >
            <Text style={estilo.tituloH427px}>FORÇA INFERIORES</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container:{
    marginVertical: '2%',
  },
  containerBotao: {
    width: '40%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFF",
  },
  modalText: {
    fontSize: 18,
    color: "#FF6262",
    marginBottom: 20,
  },
});
