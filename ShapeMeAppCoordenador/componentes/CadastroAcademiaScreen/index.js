import React, {useState, useEffect} from "react"
import { Text, View, StyleSheet,ScrollView, SafeAreaView, TextInput, TouchableOpacity, Alert, Modal} from "react-native"
import estilo from "../estilo"
import RadioBotao from "../RadioBotao"
import { useFonts } from 'expo-font';
import BotaoSelect from "../BotaoSelect"
import { TextInputMask } from 'react-native-masked-text';
import {Academia} from '../../classes/Academia'
import { AppLoading } from 'expo';
import {Endereco} from '../../classes/Endereco'
import { collection,setDoc,doc, getDocs, getFirestore, where , query, addDoc, querySnapshot, QueryStartAtConstraint} from "firebase/firestore";
import {firebase, firebaseBD} from '../configuracoes/firebaseconfig/config'
import NetInfo from "@react-native-community/netinfo"
import ModalSemConexao from "../ModalSemConexao";

export default ({navigation}) => {
    const novaAcademia = new Academia('', '', '', '', '', '', '')
    const enderecoAcademia = new Endereco('', '', '', '', '', '', '')

    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
        setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
        unsubscribe()
        }
    }, [])

    const checkWifiConnection = () => {
        NetInfo.fetch().then((state) => {
        if (state.type === 'wifi' || state.type === 'cellular') {
            console.log('Conectado ao Wi-Fi');
            setConexao(true)
        } else {
            console.log('Não conectado ao Wi-Fi');
            setConexao(false)
        }
        });
    };
    useEffect(() => {
        checkWifiConnection();
    }, []);

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

    const [Cnpj, setCnpj] = useState('')
    const [CnpjInvalido, setCnpjInvalido] = useState(false);

    const validaECorrigeCnpj = (text) => {
        setCnpj(text);
        setCnpjInvalido(!validarCnpj(text));
    };

    const [cep, setCep] = useState('')
    const [cepInvalido, setCepInvalido] = useState(false)

    const [estado, setEstado] = useState('')
    const [estadoInvalido, setEstadoInvalido] = useState(false)

    const [cidade, setCidade] = useState('')
    const [cidadeInvalida, setCidadeInvalida] = useState(false);
    
    const [bairro, setBairro] = useState('')
    const [bairroInvalido, setBairroInvalido] = useState(false)

    const [rua, setRua] = useState('')
    const [ruaInvalida, setRuaInvalida] = useState(false)

    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')

    setDoc(doc(firebaseBD, "Academia", `${novaAcademia.getNome()}`), {
        nome: novaAcademia.getNome(),
        cnpj: novaAcademia.getCnpj(),
        endereco: {
            rua: enderecoAcademia.getRua(),
            cidade: enderecoAcademia.getCidade(),
            estado: enderecoAcademia.getEstado(),
            numero: enderecoAcademia.getNumero(),
            complemento: enderecoAcademia.getComplemento(),
        },
        }).then(() => {
        alert("Academia criada com sucesso!")
        firebase.auth().createUserWithEmailAndPassword(novoCoordenador.getEmail(), novoCoordenador.getSenha())
        .then((userCredential) => {
            console.log(userCredential)

        }).catch((error) => {
            alert("Ocorreu um erro no seu cadastro.")
        })
        }).catch((erro) => {
            console.log(`Não foi possível criar o documento. Já existe uma academia cadastrada com este cnpj.`)
        });
        setDoc(doc(firebaseBD, "Academia", `${novaAcademia.getNome()}`, "Notificações", `Notificação${ano}|${mes}|${dia}`), {
            data: `${dia}/${mes}/${ano}`,
            nova: false,
            remetente: 'Gustavo & cia',
            texto: "É um prazer recebê-lo em nosso aplicativo. Desenvolvido por Gustavo Vaz Teixeira, João Bastista, Mateus Novaes, Sérgio Muinhos e Marcelo Patrício, em parceria com o Instituto Federal do Sudeste de Minas Gerais, o ShapeMeApp foi criado para proporcionar a você uma experiência interativa e personalizada durante seus treinos.",
            tipo: "sistema",
            titulo: "Bem-vindo ao ShapeMeApp!"
        })
        navigation.navigate("CadastroTurmas")

          //Validação do estado
        const estadosBrasileiros = [
            'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
            'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
            'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
        ];
        const validaEstado = (text) => {
            const estadoUpper = text.toUpperCase();
            if (estadosBrasileiros.includes(estadoUpper)) {
                setEstadoInvalido(false);
            } else {
                setEstadoInvalido(true);
            }
            setEstado(estadoUpper);
        };
    
      //Validação da cidade
        const validaCidade = (text) => {
        // Apenas um exemplo simples de validação: a cidade deve ter pelo menos 2 caracteres
        const cidadeValida = text.length >= 3;
      
        // Atualize o estado da cidade e o estado de validação
        setCidade(text);
        setCidadeInvalida(!cidadeValida);
        };
    
        //Validação do bairro
        const validaBairro = (text) => {
            const bairroValido = text.length >= 5;
        
            setBairro(text)
            setBairroInvalido(!bairroValido)
          }
        
          //Validação da rua
          const validaRua = (text) => {
            const ruaValida = text.length >= 5;
        
            setRua(text)
            setRuaInvalida(!ruaValida)
          }


        return (
            <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
                {!conexao ? <ModalSemConexao/> 
                : 
                <SafeAreaView style={style.container}>      

                <Text style={[estilo.textoP16px, estilo.textoCorSecundaria,  style.titulos]}>Primeiramente, identifique-se</Text>
                <View style={style.inputArea}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>NOME COMPLETO:</Text>
                    <View>
                    <TextInput 
                    placeholder={'Informe o nome da aacademia'} 
                    placeholderTextColor={'#CFCDCD'} 
                    style={[
                        estilo.sombra, 
                        estilo.corLight, 
                        style.inputText,
                        nomeInvalido? {borderWidth: 1, borderColor: 'red'} : {}
                    ]}
                    keyboardType={'default'}
                    value={nome}
                    onChangeText={(text) => {validaNome(text)}}
                    >
                    </TextInput>
                    </View>                        
                </View>

              <View style={style.inputArea}>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>CPF:</Text>
                  <TextInputMask 
                          type={'cnpj'}
                          placeholder={'Informe o cnpj'} 
                          placeholderTextColor={'#CFCDCD'} 
                          style={[
                          estilo.sombra, 
                          estilo.corLight, 
                          style.inputText,
                          cpfInvalido ? {borderWidth: 1, borderColor: 'red'} : {}
                          ]}
                          value={cnpj}
                          onChangeText={(text) => setCpf(text)}   
                      >
                      </TextInputMask>

                      </View>

              <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.titulos]}>Agora, informe sua residência</Text>

              <View style={style.inputArea}>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>INFORME SEU CEP:</Text>
                  <TextInputMask 
                      style={[
                      style.inputText, 
                      estilo.sombra, 
                      estilo.corLight
                                          ]}
                      placeholder="ex: 36180-000"
                      value={cep}
                      type={'zip-code'}
                      onChangeText={(text) => setCep(text)}
                      keyboardType='numeric'
                  ></TextInputMask>
              </View>


              <View style={style.inputArea}>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]}>ESTADO:</Text>
                  <TextInput 
                      style={[
                          style.inputText, 
                          estilo.sombra, 
                          estilo.corLight,
                          estadoInvalido ? { borderColor: '#FF6262', borderWidth: 1 } : {}
                      ]}
                      placeholder="ex: MG"
                      value={estado}
                      onChangeText={(text) => validaEstado(text)}
                      maxLength={2}
                      ></TextInput>
                  </View>


                  <View style={style.inputArea}>
              <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>CIDADE:</Text>
                <TextInput
                  style={[
                    style.inputText,
                    estilo.sombra,
                    estilo.corLight,
                    cidadeInvalida ? { borderColor: 'red', borderWidth: 1 } : {}
                  ]}
                  placeholder="Informe a cidade"
                  value={cidade}
                  onChangeText={(text) => validaCidade(text)}
                />
              </View>


              <View style={style.inputArea}>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>BAIRRO:</Text>
                  <TextInput
                  style={[
                    style.inputText,
                    estilo.sombra,
                    estilo.corLight,
                    bairroInvalido ? { borderColor: 'red', borderWidth: 1 } : {}
                  ]}
                  placeholder="Informe o bairro"
                  value={bairro}
                  onChangeText={(text) => validaBairro(text)}
                />
              </View>


              <View style={style.inputArea}>
                  <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>RUA:</Text>
                  <TextInput
                  style={[
                    style.inputText,
                    estilo.sombra,
                    estilo.corLight,
                    ruaInvalida ? { borderColor: 'red', borderWidth: 1 } : {}
                  ]}
                  placeholder="Informe a rua"
                  value={rua}
                  onChangeText={(text) => validaRua(text)}
                />
              </View>

              <View style={style.alinhamentoBotoesPequenos}>
                  <View style={[style.inputArea, style.campoPequeno]}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>NÚMERO:</Text>
                      <TextInput 
                          style={[style.inputText, estilo.sombra, estilo.corLight]} placeholder="Número da residência"
                          value={numero}
                          keyboardType='numeric'
                          onChangeText={(text) => setNumero(text)}
                          
                          ></TextInput>
                  </View>
                  <View style={[style.inputArea, style.campoPequeno]}>
                      <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria]} numberOfLines={1}>COMPLEMENTO:</Text>
                      <TextInput 
                          style={[style.inputText, estilo.sombra, estilo.corLight]} placeholder="complemento"
                          value={complemento}
                          onChangeText={(text) => setComplemento(text)}
                          ></TextInput>
                  </View> 
              </View>
            
              <TouchableOpacity 
              style={[estilo.corPrimaria, style.botao, estilo.sombra, estilo.botao]}
              onPress={()=>{

                novaAcademia.setNome(nome)
                novaAcademia.setCnpj(cnpj)
                enderecoAcademia.setCep(cep)
                enderecoAcademia.setEstado(estado)
                enderecoAcademia.setCidade(cidade)
                enderecoAcademia.setBairro(bairro)
                enderecoAcademia.setRua(rua)
                enderecoAcademia.setNumero(numero)
                enderecoAcademia.setComplemento(complemento)
                novaAcademia.setEndereco(enderecoAcademia)
                console.log(novaAcademia)


                if(novaAcademia.getNome() == ''
                || novaAcademia.getCnpj() == ''
                || enderecoAcademia.getCep() == '' || enderecoAcademia.getCidade() == '' || enderecoAcademia.getEstado() == ''
                || enderecoAcademia.getRua() == ''){
                  Alert.alert("Há campos não preenchidos.", "Preencha os campos antes de prosseguir.")
                  if(novaAcademia.getNome() == '') setNomeInvalido(true)
                  if(novaAcademia.getCnpj() == '') setCnpjInvalido(true)
                  if(enderecoAcademia.getCep() == '') setCepInvalido(true)
                  if(enderecoAcademia.getRua() == '') setRuaInvalida(true)
                  if(enderecoAcademia.getEstado() == '') setEstadoInvalido(true)
                  if(enderecoAcademia.getCidade() == '') setCidadeInvalida(true)
                  if(enderecoAcademia.getBairro() == '') setBairroInvalido(true)
                  
                } else {
                  handleFinalizarCadastro()
                }
               }}>
                  <Text 
              style={[estilo.tituloH523px, estilo.textoCorLight]}>CADASTRAR</Text>
              </TouchableOpacity>
              </SafeAreaView>
              }
               

            </ScrollView>
    )
}

const style = StyleSheet.create({
container:{
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
areaInputDataNascimento: {
    width: '90%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
},

botaoInputDataNascimento: {
    width:'30%',
    padding: 10,
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 10,

},

campoPequeno: {
    width: '40%'
},
alinhamentoBotoesPequenos: {
    flexDirection: 'row',
    width: '100%'
}
})