class Turmas {
    constructor(id, nome, horario, dia, vaga){
        this.id = id
        this.nome = nome
        this.horario = horario
        this.dia = dia
        this.vaga = vaga
        this.professor = []
        this.alunos = []
    }

    setId = (id) => {this.id = id}
    getId = () => {return this.id}

    setNome = (nome) => {this.nome = nome}
    getNome = () => {return this.nome}

    setHorario = (horario) => {this.horario = horario}
    getHorario = () => {return this.horario}

    setDia = (dia) => {this.dia = dia}
    getDia = () => {return this.dia}

    setVaga = (vaga) => {this.vaga = vaga}
    getVaga = () => {return this.vaga}

}

export {Turmas}