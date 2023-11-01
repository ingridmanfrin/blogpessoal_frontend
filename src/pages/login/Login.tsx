import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Login.css';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';

function Login(){
       //permite a navegação do usuário de forma indireta, fazendo o usuário navegar entre os componentes da tela como do login para a home de forma "passiva"
        const navigate = useNavigate();
        //useContext: usar o context onde tem as manipulações dos dados e deixando essas variaveis e função disponíveis ao componente Login
        const { usuario, handleLogin, isLoading } = useContext(AuthContext);

        const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
            {} as UsuarioLogin
        );
        
        //function atualizarEstado: pegar o que foi digitado no input e atualizar 
        //ChangeEvent: evento de mudança
        function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
            setUsuarioLogin({
                //... acessa o objeto ou array e espalha seus dados em outro objeto e outro array
                ...usuarioLogin,
                //[e.target.name]: acessa o parÂmetro e o target e a propriedade name  
                [e.target.name]: e.target.value
            })
        }

        //utiliza essa função para ser passados os dados e finalizar esse processo de passar as informações em sí
        function login(e: ChangeEvent<HTMLFormElement>) {
           // preventDefault(): tem sempre que utilizar quando for enviar dados em um formulário
            e.preventDefault()
            handleLogin(usuarioLogin)
        }


        useEffect(() => {
            if (usuario.token !== "") {
                navigate('/home')
            }
        }, [usuario])


        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
                            <form className="flex justify-center items-center flex-col w-1/2 gap-4" 
                                onSubmit={login}>
                                <h2 className="text-slate-900 text-5xl ">Entrar</h2>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="usuario">Usuário</label>
                                    <input
                                        type="text"
                                        id="usuario"
                                        name="usuario"
                                        placeholder="Usuario"
                                        className="border-2 border-slate-700 rounded p-2"
                                        value={usuarioLogin.usuario}
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
                                        value={usuarioLogin.senha} 
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className="rounded bg-indigo-400 flex justify-center
                                            hover:bg-indigo-900 text-white w-1/2 py-2">
                                    {isLoading ? <RotatingLines
                                        strokeColor="white"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="24"
                                        visible={true}
                                    /> :
                                        <span>Entrar</span>}
                                </button>

                                <hr className="border-slate-800 w-full" />

                                <p>
                                    Ainda não tem uma conta?{' '}
                                    <Link to="/cadastro" className="text-indigo-800 hover:underline">
                                        Cadastre-se
                                    </Link>
                                </p>
                            </form>
                            <div className="fundoLogin hidden lg:block"></div>
                        </div>
        );
    }
    
export default Login;