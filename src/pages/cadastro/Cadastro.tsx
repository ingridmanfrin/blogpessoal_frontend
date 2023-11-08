import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

import {toastAlerta} from '../../utils/toastAlerta'
import { cadastrarUsuario } from '../../services/Service'
import Usuario from '../../models/Usuario'

import './Cadastro.css'

function Cadastro() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  //setConfirmaSenha: usada para fazer uma comparação entre os campos de senha no formulário.
  const [confirmaSenha, setConfirmaSenha] = useState<string>("")

  //Armazena as informações do usuário que será cadastrado na aplicação
 //usamos a model Usuario e não UsuarioLogin, pois nesse estado não trabalhamos com o token.
  const [usuario, setUsuario] = useState<Usuario>({
      id: 0,
      nome: '',
      usuario: '',
      senha: '',
      foto: ''
  })

  useEffect(() => {
      if (usuario.id !== 0) {
          retornar()
      }
  }, [usuario])

  function retornar() {
      navigate('/login')
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
      setConfirmaSenha(e.target.value)
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
      setUsuario({
        //Operador de Espalhamento (Spread Operator) ...usuario: cria novos objetos baseados em objetos existentes com algumas alterações.
          ...usuario,
        //[e.target.name]: propriedade dinâmica 
          [e.target.name]: e.target.value
      })
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
        setIsLoading(true)

        try {
            await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
            toastAlerta('Usuário cadastrado com sucesso', "sucesso")

        } catch (error) {
            toastAlerta('Erro ao cadastrar o Usuário', "erro")
        }

    } else {
        toastAlerta('Erro ao cadastrar o Usuário', "erro")
        setUsuario({ ...usuario, senha: "" })
        setConfirmaSenha("")
    }

    setIsLoading(false)
}

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      <div className="fundoCadastro hidden lg:block"></div>
      <form 
            className='flex justify-center items-center flex-col w-2/3 gap-3' 
            onSubmit={cadastrarNovoUsuario}>
        <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
        <div className="flex flex-col w-full">
               <label htmlFor="nome">Nome</label>
                  <input
                      type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome"
                        className="border-2 border-slate-700 rounded p-2"
                        value={usuario.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="usuario">Usuario</label>
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                placeholder="Usuario"
                                className="border-2 border-slate-700 rounded p-2"
                                value={usuario.usuario}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="foto">Foto</label>
                            <input
                                type="text"
                                id="foto"
                                name="foto"
                                placeholder="Foto"
                                className="border-2 border-slate-700 rounded p-2"
                                value={usuario.foto}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="senha">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="Senha"
                                className="border-2 border-slate-700 rounded p-2"
                                value={usuario.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="confirmarSenha">Confirmar Senha</label>
                            <input
                                type="password"
                                id="confirmarSenha"
                                name="confirmarSenha"
                                placeholder="Confirmar Senha"
                                className="border-2 border-slate-700 rounded p-2"
                                value={confirmaSenha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                            />
                        </div>
                        <div className="flex justify-around w-full gap-8">
                            <button 
                                 className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2'
                                onClick={retornar}>
                                  Cancelar
                            </button>
                            <button 
                                className='rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 
                                           py-2 flex justify-center' 
                                type='submit'>
                                    {isLoading ? <RotatingLines
                                        strokeColor="white"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="24"
                                        visible={true}
                                    /> :
                                    <span>Cadastrar</span>}
                            </button>
                        </div>
                    </form>
                </div>
  )
}

export default Cadastro