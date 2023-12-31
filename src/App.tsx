//react-router-dom: serve para exibir somente o frontend (outra biblioteca que vai exibir as rotas do backend!)
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
 

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Cadastro from './pages/cadastro/Cadastro';
import ListaTemas from './components/temas/listaTemas/ListaTemas';
import FormularioTema from './components/temas/formularioTema/FormularioTema';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import ListaPostagens from './components/postagens/listaPostagens/ListaPostagens';
import FormularioPostagem from './components/postagens/formularioPostagem/FormularioPostagem';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import Perfil from './pages/perfil/Perfil';

import 'react-toastify/dist/ReactToastify.css';

//BrowserRouter é como se fosse o satélite para acharmos um endereço /*Routes: É como se fosse o Swith no swith case. Routes: GPS ou google maps. Ajuda a aplicação a encontrar o caminho que o usuário quer acessar e fica observando o que está na url*/
/*Routes: Observa o que está após o / da url. Route: Cada rota da aplicação. Vai pedir que seja exibida cada parte da nossa aplicação, segundo o que estiver contido após / do url. Path: seria a rua. Elements: seria o objetivo. Route: É como se fosse o Case no swith case*/

//essas rotas abaixo são as rotas do front end, da url
function App() {
  return (
    //AuthProvider: intermediador
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />

          <div className='min-h-[80vh]'>
           
            <Routes>
           
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/temas" element={<ListaTemas />} />
              <Route path="/cadastroTema" element={<FormularioTema />} />
              <Route path="/editarTema/:id" element={<FormularioTema />} />
              <Route path="/deletarTema/:id" element={<DeletarTema />} />
              <Route path="/postagens" element={<ListaPostagens />} />
              <Route path="/cadastroPostagem" element={<FormularioPostagem />} />
              <Route path="/editarPostagem/:id" element={<FormularioPostagem />} />
              <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />        
              <Route path="/perfil" element={<Perfil />} />

            </Routes>

          </div>  
        <Footer />
      </BrowserRouter>
      </AuthProvider>
  );
}

export default App;