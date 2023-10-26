import axios from "axios";

const api = axios.create({
    baseURL: 'https://blogpessoal-cg5i.onrender.com'
})

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    // setDados(resposta.data): Atualiza os dados na nossa aplicação com os dados retornados pela API após o login do usuário.
    setDados(resposta.data)
}
//cadastrarUsuario: responsável por cadastrar um novo usuário em nossa aplicação.
export const cadastrarUsuario = async(url: string, dados: Object, setDados: Function) => { 
    const resposta = await api.post(url,dados)
    setDados(resposta.data)
  }
