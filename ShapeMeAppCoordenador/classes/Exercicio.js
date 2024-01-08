class Exercicio {
    constructor (id, nome, tipo, musculos, descricao, imagem){
        this.id = id
        this.nome = nome
        this.tipo = tipo
        this.musculos = musculos
        this.descricao = descricao
        this.variacao = []
        this.execucao = []
        this.imagem = ''
    }

    setNome = (nome) => {this.nome = nome}
    getNome = () => {return this.nome}
    
    setTipo = (tipo) => {this.tipo = tipo}
    getTipo = () => {return this.tipo}

    setMusculos = (musculos) => {this.musculos = musculos}
    getMusculos = () => {return this.musculos}

    setId = (id) => {this.id = id}
    getId = () => {return this.id}

    setDescricao = (descricao) => {this.descricao = descricao}
    getDescricao = () => {return this.descricao}
    
}

export {Exercicio}