//o Context guarda os dados para para serem usados no React. É usado principalmente no login da pessoa usuária e no que usa o token 

import { createContext, ReactNode, useState } from "react"

import UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

//({} as AuthContextProps): no createContext será "atribuido" a ele o modelo de dados da interface AuthContextProps (trás o modelo que deve seguir e não os dados propriamente ditos!))
export const AuthContext = createContext({} as AuthContextProps)

//AuthProvider: intermediador entre o Contexto e todo o resto da nossa aplicação
export function AuthProvider({ children }: AuthProviderProps) {
//armazenar as informações do usuário após o mesmo fazer seu log in na aplicação e, em seguida permitir que essas informações seja acessadas pelos outros componentes. 
//usuario: é um objeto
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    //isLoading: função do tipo bollean
    //isLoading: variável de estado const do tipo bollean
    const [isLoading, setIsLoading] = useState(false)

    //fazer uma requisição de login ao backend. async: espera que um determinado aconteça e depois executa seu código
    //userLogin: objeto do tipo UsuarioLogin(model)
    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await login(`/usuarios/logar`, userLogin, setUsuario)
            alert("Usuário logado com sucesso")
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            alert("Dados do usuário inconsistentes")
            setIsLoading(false)
        }
    }

    //vai apagar os dados do usuário quando ele se deslogar
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    //value={{ usuario, handleLogin, handleLogout, isLoading }}: informações que vão ser armazenadas no resto da aplicação
    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
