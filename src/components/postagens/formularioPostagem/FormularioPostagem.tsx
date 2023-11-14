import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { AuthContext } from '../../../contexts/AuthContext';

import Tema from '../../../models/Tema';
import Postagem from '../../../models/Postagem';
import { toastAlerta } from '../../../utils/toastAlerta';

function FormularioPostagem() {

    //hook useNavigate: redirecionamento de página
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    //conjunto de todos os temas existentes na aplicação
    //<Tema[]> : esse significa que é um vetor de Tema ; useState: é uma função([]): significa o estado atual é um vetor vazio
    const [temas, setTemas] = useState<Tema[]>([])
    //tema escolhido pela pessoa usuaria para fazer a postagem
    const [tema, setTema] = useState<Tema>({
         id: 0, 
         descricao: '', 
        })

    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    //hook useParams: vai observar a url e vai procurar um parâmetro id na url
    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    //busca postagem por id traz para o formulário todas as informações de uma postagem específica 
    //escolhida por id. Usando a Service buscar
    async function buscarPostagemPorId(id: string) {
        await buscar(`/postagens/${id}`, setPostagem, {
            headers: {
                Authorization: token,
            },
        })
    }
    //pega a informações do Tema que o usuario escolher. Usando a Service buscar
    async function buscarTemaPorId(id: string) {
        await buscar(`/temas/${id}`, setTema, {
            headers: {
                Authorization: token,
            },
        })
    }

    //com o buscarTemas() traz todos os temas. Usando a Service buscar
    async function buscarTemas() {
        await buscar('/temas/all', setTemas, {
            headers: {
                Authorization: token,
            },
        })
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info');
            navigate('/');
        }
    }, [token])
    //vai verifircar se o [id] se seu valor definido, válido. O id já foi definido em outra linha do código
    useEffect(() => {
        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])

    //esse objeto que vai permitir que o objeto esteja atualizado com o novo tema
    //esse useEffect vai impedir que o fique sem estar atualizado com as informações necessárias que o usuário está digitando
    //...postagem: coloca todos os campos do objeto postagem e deixando disponíveis 
    //propriedade tema:tema : nessa linha acontece o relacionamento entre a postagem e o objeto tema escolhido pelo usuário
    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    //traz a postagem, fazendo o relacionamento entre tema e usuário 
    //e atualizando os valores das propriedades de postagem
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        //para indicar ao usuário de forma visual que tem um processo rodando 
        setIsLoading(true)

        if (id != undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });

                toastAlerta('Postagem atualizada com sucesso', 'sucesso')

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', 'info')
                    handleLogout()
                } else {
                    toastAlerta('Erro ao atualizar a Postagem', 'erro')
                }
            }

        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                })

                toastAlerta('Postagem cadastrada com sucesso','sucesso');

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', 'info')
                    handleLogout()
                } else {
                    toastAlerta('Erro ao cadastrar a Postagem', 'erro');
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoTema = tema.descricao === '';

    return (
        <div className="container flex flex-col mx-auto items-center">
        <h1 className="text-4xl text-center my-8">
            {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
        </h1>

        <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
            <div className="flex flex-col gap-2">
                <label htmlFor="titulo">Título da Postagem</label>
                <input
                    value={postagem.titulo}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    type="text"
                    placeholder="Insira aqui o Título"
                    name="titulo"
                    required
                    className="border-2 border-slate-700 rounded p-2"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="titulo">Texto da Postagem</label>

                <input
                    value={postagem.texto}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    type="text"
                    placeholder="Adicione aqui o Texto da Postagem"
                    name="texto"
                    required
                    className="border-2 border-slate-700 rounded p-2"
                />
            </div>

            <div className="flex flex-col gap-2">
                <p>Tema da Postagem</p>
                
                <select name="tema" id="tema" className='border p-2 border-slate-800 rounded'
                    onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                >
                    <option value="" selected disabled>Selecione um Tema</option>
                    
                    {temas.map((tema) => (
                        <>
                    
                            <option value={tema.id} >{tema.descricao}</option>
                        </>
                    ))}

                </select>
            </div>
            <button
                type='submit'
                disabled={carregandoTema}
                className='flex justify-center rounded disabled:bg-slate-200 bg-indigo-400 
                        hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2'
            >
                {isLoading ?
                    <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                    /> :
                    <span>Confirmar</span>
                }
            </button>
        </form>
    </div>
    );
}

export default FormularioPostagem;