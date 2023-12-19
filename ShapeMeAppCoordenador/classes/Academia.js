class Academia {
    constructor(nome, cnpj, coordenador, endereco){
        this.nome = nome
        this.cnpj = cnpj
        this.alunos = []
        this.professores = [] 
        this.coordenador = []
        this.endereco = null
        this.turmas = []
        this.exercicios = []
    }

    setNome = (nome) =>{ this.nome = nome}
    setCnpj = (cnpj) =>{ this.cnpj = cnpj}

    setCoordenador = (coordenador) =>{ this.coordenador = coordenador}
    getCoordenador = () =>{ return this.coordenador}

    setEndereco = (endereco) => {this.endereco = endereco}
    getEndereco = () => {return this.endereco}

    getNome = () => {return this.nome}
    getCnpj = () => {return this.cnpj}
    getPessoa = () => {return this.pessoa}
    getCoordenador = () => {return this.coordenador}
}



export {Academia}