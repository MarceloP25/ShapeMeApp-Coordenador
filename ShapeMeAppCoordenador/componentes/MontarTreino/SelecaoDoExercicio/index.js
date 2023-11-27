import react, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import BotaoSelect from '../../BotaoSelect'
import RadioBotao from '../../RadioBotao'
import estilo from "../../estilo";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { professorLogado } from "../../Home";
import Spinner from "react-native-loading-spinner-overlay";
import Aerobicos from "../../../Exercicios/Aerobicos";
import MembrosSuperiores from "../../../Exercicios/MembrosSuperiores";
import Alongamentos from "../../../Exercicios/Alongamentos";
import MembrosInferores from "../../../Exercicios/MembrosInferiores"
export default ({ navigation, route }) => {
  const [exercicio, setExercicio] = useState('')
  const [grupoMuscular, setGrupoMuscular] = useState([])
  const [carregandoDados, setCarregandoDados] = useState(false)

  const [alongamentos, setAlongamentos] = useState([])
  const [selecionado, setSelecionado] = useState('')
  const [cardioSelecionado, setCardioSelecionado] = useState('')
  const {tipo, index} = route.params
  const indexPorParametro = index
  console.log('index pt 2', indexPorParametro)
  const handleSelecaoExercicio = (value, index, tipoExercicio) => {
    console.log(value);
    let exercicioAux = {}
    if (tipoExercicio === 'MembrosSuperiores') {
      for (i of MembrosSuperiores[index].exercicios) {
        if (i.nome === value) {
          exercicioAux = { ...i }
        }
      }
      if (Object.keys(exercicioAux).length === 0) {
        Alert.alert("Selecione um exercício", "É necessário escolher um exercício antes de prosseguir.");
      } else {
        setSelecionado(value)
        navigation.navigate('Adicionais exercício', { exercicio: exercicioAux, receberExercicio: route.params.receberExercicio, aluno: route.params.aluno, tipo: tipoExercicio, index: indexPorParametro })
      }
    } else if (tipoExercicio === 'MembrosInferiores') {
      for (i of MembrosInferores[index].exercicios) {
        if (i.nome === value) {
          exercicioAux = { ...i }
        }
      }
      if (Object.keys(exercicioAux).length === 0) {
        Alert.alert("Selecione um exercício", "É necessário escolher um exercício antes de prosseguir.");
      } else {
        setSelecionado(value)
        navigation.navigate('Adicionais exercício', { exercicio: exercicioAux, receberExercicio: route.params.receberExercicio, aluno: route.params.aluno, tipo: tipoExercicio, index: indexPorParametro })
      }
    } else if (tipoExercicio === 'Alongamento'){
      for (i of Alongamentos[index].exercicios) {
        if (i.nome === value) {
          exercicioAux = { ...i }
        }
      }
      if (Object.keys(exercicioAux).length === 0) {
        Alert.alert("Selecione um exercício", "É necessário escolher um exercício antes de prosseguir.");
      } else {
        setSelecionado(value)
        console.log(exercicioAux)
        console.log(tipoExercicio)
        navigation.navigate('Adicionais exercício', { exercicio: exercicioAux, receberExercicio: route.params.receberExercicio, aluno: route.params.aluno, tipo: tipoExercicio, index: indexPorParametro })
      }
    }
  }


  const handleSelecaoExercicioCardio = (value, tipo) => {
    console.log(value)
    console.log(value);
    let exercicioAux = {}
    for (i of Aerobicos) {
      console.log(i)
      if (i.nome === value) {
        exercicioAux = { ...i }
      }
    }
    if (Object.keys(exercicioAux).length === 0) {
      Alert.alert("Selecione um exercício", "É necessário escolher um exercício antes de prosseguir.");
    } else {
      setSelecionado(value)
      navigation.navigate('Adicionais exercício', { exercicio: exercicioAux, receberExercicio: route.params.receberExercicio, aluno: route.params.aluno, tipo, index: index })
    }
  }


  const peitoral = MembrosSuperiores[0].exercicios.map((item) => item.nome)
  const grandeDorsal = MembrosSuperiores[1].exercicios.map((item) => item.nome)
  const biceps = MembrosSuperiores[2].exercicios.map((item) => item.nome)
  const triceps = MembrosSuperiores[3].exercicios.map((item) => item.nome)
  const abdominais = MembrosSuperiores[4].exercicios.map((item) => item.nome)
  const deltoide = MembrosSuperiores[5].exercicios.map((item) => item.nome)
  const paravertebrais = MembrosSuperiores[6].exercicios.map((item) => item.nome)
  const antebracos = MembrosSuperiores[7].exercicios.map((item) => item.nome)
  const transversoAbdominal = MembrosSuperiores[8].exercicios.map((item) => item.nome)
  const trapezio = MembrosSuperiores[9].exercicios.map((item) => item.nome)
  const subescapular = MembrosSuperiores[10].exercicios.map((item) => item.nome)
  const manguitoRotador = MembrosSuperiores[11].exercicios.map((item) => item.nome)
  const latissimoDoDorso = MembrosSuperiores[12].exercicios.map((item => item.nome))
  const cardios = Aerobicos.map((item) => item.nome)

  const multiarticular = MembrosInferores[0].exercicios.map((item) => item.nome)
  const uniarticular = MembrosInferores[1].exercicios.map((item) => item.nome)
  
  const alongamentoCadeiaAnteirior = Alongamentos[0].exercicios.map((item) => item.nome)
  const alongamentoCadeiaPosterior = Alongamentos[1].exercicios.map((item) => item.nome)
  const alongamentosAdutores = Alongamentos[2].exercicios.map((item) => item.nome)
  const alongamentoManguitoRotadores = Alongamentos[3].exercicios.map((item) => item.nome)
  const alongamentoAbdominalObliquo = Alongamentos[4].exercicios.map((item)=> item.nome)
  const alongamentoGluteoMaximo = Alongamentos[5].exercicios.map((item) => item.nome)
  const alongamentoGluteoMedio = Alongamentos[6].exercicios.map((item)=> item.nome)
  const alongamentoIsquiotibiais = Alongamentos[7].exercicios.map((item) => item.nome)
  const alongamentoPanturrilha = Alongamentos[8].exercicios.map((item)=>item.nome)
  const alongamentoQuadriceps = Alongamentos[9].exercicios.map((item) => item.nome)
  const alongamentoAntebraco = Alongamentos[10].exercicios.map((item) => item.nome)
  const alongamentoGrandeDorsal = Alongamentos[11].exercicios.map((item) => item.nome)
  const alongamentoRetoFemoral = Alongamentos[12].exercicios.map((item) => item.nome)
  const alongamentoLinhaAnterior = Alongamentos[13].exercicios.map((item) => item.nome)
  const alongamentoLinhaLateral = Alongamentos[14].exercicios.map((item) => item.nome)
  const alongamentoLinhaPosterior = Alongamentos[15].exercicios.map((item) => item.nome)
  const alongamentoParavertebrais = Alongamentos[16].exercicios.map((item) => item.nome)
  const alongamentoTriceps = Alongamentos[17].exercicios.map((item) => item.nome)
  const alongamentoDeltoide = Alongamentos[18].exercicios.map((item) => item.nome)

  console.log(alongamentoDeltoide)
  return (
    <View>
      {carregandoDados ? (
        <Spinner
          visible={carregandoDados}
          textContent={'Carregando exercícios...'}
          textStyle={[estilo.textoCorLight, estilo.textoP16px]}
        />
      ) : (
        tipo === 'força' ? <ScrollView style={[estilo.centralizado, { width: '100%' }]}>
          <View style={[estilo.centralizado, { marginVertical: 10 }]}>
            <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px]}>Grupos musculares</Text>

          </View>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Membros superiores:</Text>

          <View style={{ marginBottom: '3%' }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Peitoral:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 0, 'MembrosSuperiores')
              }
              options={peitoral}
              select={'Exercícios peitoral'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Grande dorsal:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 1, 'MembrosSuperiores')
              }
              options={grandeDorsal}
              select={'Exercícios grande dorsal'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Bíceps:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 2, 'MembrosSuperiores')
              }
              options={biceps}
              select={'Exercícios bíceps'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Tríceps:</Text>
            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 3, 'MembrosSuperiores')
              }
              options={triceps}
              select={'Exercícios tríceps'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Abdominais:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 4, 'MembrosSuperiores')
              }
              options={abdominais}
              select={'Exercícios abdominais'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Deltóide:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 5, 'MembrosSuperiores')
              }
              options={deltoide}
              select={'Exercícios deltóide'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Paravertebrais:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 6, 'MembrosSuperiores')
              }
              options={paravertebrais}
              select={'Exercícios paravertebrais'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Antebraço:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 7, 'MembrosSuperiores')
              }
              options={antebracos}
              select={'Exercícios antebraço'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Transverso abdominal:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 8, 'MembrosSuperiores')
              }
              options={transversoAbdominal}
              select={'Exercíciso transverso abdominal'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Trapézio:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 9, 'MembrosSuperiores')
              }
              options={trapezio}
              select={'Exercícios trapézio'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Subescapular:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 10, 'MembrosSuperiores')
              }
              options={subescapular}
              select={'Exercícios subescapular'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Manguito rotador:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 11, 'MembrosSuperiores')
              }
              options={manguitoRotador}
              select={'Exercícios manguito rotador'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Latissimo do dorso:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 12, 'MembrosSuperiores')
              }
              options={latissimoDoDorso}
              select={'Exercícios latissimo do dorso'}
            />
          </View>

          <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Membros inferiores:</Text>

          <View style={{ marginBottom: '3%' }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Multiarticular:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 0, 'MembrosInferiores')
              }
              options={multiarticular}
              select={'Exercícios multiarticulares'}
            />
          </View>
          <View style={{ marginBottom: '3%' }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Uniarticular:</Text>

            <BotaoSelect
              selecionado={true}
              titulo='Selecione um exercício'
              max={1}
              onChange={(value) =>
                handleSelecaoExercicio(value, 1, 'MembrosInferiores')
              }
              options={uniarticular}
              select={'Exercícios uniarticulares'}
            />
          </View>

        </ScrollView>
          :
          tipo === 'aerobicos' ? <>
            <View style={{ marginBottom: '3%', padding: 10 }}>
              <Text style={[estilo.textoCorSecundaria, estilo.tituloH523px]}>Selecione um exercício:</Text>

              <BotaoSelect
                selecionado={true}
                titulo='Selecione um exercício'
                max={1}
                onChange={(value) =>
                  handleSelecaoExercicioCardio(value, 'Aerobicos')
                }
                options={cardios}
              />
            </View>

          </> :
              tipo === 'alongamento' ? 
           <ScrollView>
           <View style={{ padding: 10 }}>
          <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px, estilo.centralizado]}>Selecione um exercício</Text>

        </View>
        <View style={{marginBottom: '3%'}}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Cadeia anterior:</Text>
          <BotaoSelect
            selecionado={true}
            titulo='Selecione um exercício'
            max={1}
            onChange={(value) =>
              handleSelecaoExercicio(value,0, 'Alongamento')
            }
            options={alongamentoCadeiaAnteirior}
            select={'Exercícios cadeia anterior'}
          />
        </View>

        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Cadeia posterior:</Text>

        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 1, 'Alongamento')
          }
          options={alongamentoCadeiaPosterior}
          select={'Exercícios cadeia Posterior'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Adutores:</Text>
        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 2, 'Alongamento')
          }
          options={alongamentosAdutores}
          select={'Exercícios adutores'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Manguito rotador:</Text>

        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 3, 'Alongamento')
          }
          options={alongamentoManguitoRotadores}
          select={'Exercícios manguito rotador'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Abdominal oblíquo:</Text>

        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 4, 'Alongamento')
          }
          options={alongamentoAbdominalObliquo}
          select={'Exercícios abdominal oblíquo'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Glúteo máximo:</Text>

        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 5, 'Alongamento')
          }
          options={alongamentoGluteoMaximo}
          select={'Exercício glúteo máximo'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Glúteo médio:</Text>
        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 6, 'Alongamento')
          }
          options={alongamentoGluteoMedio}
          select={'Exercícios glúteo médio'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Isquiotibiais:</Text>

        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 7, 'Alongamento')
          }
          options={alongamentoIsquiotibiais}
          select={'Exercícios isquiotibiais'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Panturrilha:</Text>
        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 8, 'Alongamento')
          }
          options={alongamentoPanturrilha}
          select={'Exercícios panturrilha'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Quadríceps:</Text>
        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 9, 'Alongamento')
          }
          options={alongamentoQuadriceps}
          select={'Exercícios quadríceps'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Antebraço:</Text>

        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 10, 'Alongamento')
          }
          options={alongamentoAntebraco}
          select={'Exercícios antebraço'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Grande dorsal:</Text>
        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 11, 'Alongamento')
          }
          options={alongamentoGrandeDorsal}
          select={'Exercícios grande dorsal'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Reto Femoral:</Text>

        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 12, 'Alongamento')
          }
          options={alongamentoRetoFemoral}
          select={'Exercícios reto femoral'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Linha anterior:</Text>
        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 13, 'Alongamento')
          }
          options={alongamentoLinhaAnterior}
          select={'Exercícios linha anterior'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Linha lateral:</Text>
        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 14, 'Alongamento')
          }
          options={alongamentoLinhaLateral}
          select={'Exercícios linha lateral'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Linha posterior:</Text>

        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 15, 'Alongamento')
          }
          options={alongamentoLinhaPosterior}
          select={'Exercícios linha posterior'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Paravertebrais:</Text>

        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 16, 'Alongamento')
          }
          options={alongamentoParavertebrais}
          select={'Exercícios paravertebrais'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Tríceps:</Text>

        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 17, 'Alongamento')
          }
          options={alongamentoTriceps}
          select={'Exercícios tríceps'}
        />
      </View>
        <View style={{ marginBottom: '3%' }}>
        <Text style={[estilo.textoCorSecundaria, estilo.tituloH619px, {marginVertical: '2%'}]}>Deltóide:</Text>

        <BotaoSelect
          selecionado={true}
          titulo='Selecione um exercício'
          max={1}
          onChange={(value) =>
            handleSelecaoExercicio(value, 18, 'Alongamento')
          }
          options={alongamentoDeltoide}
          select={'Exercícios deltóide'}
        />
      </View>

        </ScrollView> : null

       
      )}
    </View>
  );

}