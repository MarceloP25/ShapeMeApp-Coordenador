import { Pessoa } from "./Pessoa";

class Coordenador extends Pessoa {
    constructor(nome, cpf, dataNascimento, telefone, sexo, email, senha){
        super(nome, cpf, dataNascimento, telefone, sexo, email, senha)
        this.academia = null
        this.professores = []
        this.alunos = []
    }
    setDataNascimento = (dataNascimento) => {this.dataNascimento = dataNascimento}
    getDataNascimento = () => {return this.dataNascimento}
    setProfissao = (Profissao) => {this.Profissao = Profissao}
    getProfissao = () => {return this.Profissao}
}

export {Coordenador}