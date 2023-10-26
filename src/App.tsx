import { BrowserRouter, Route, Routes } from 'react-router-dom';
//react-router-dom: serve para exibir somente o frontend (outra biblioteca que vai exibir as rotas do backend!)
import { AuthProvider } from './contexts/AuthContext';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Cadastro from './pages/cadastro/Cadastro';

//BrowserRouter é como se fosse o satélite para acharmos um endereço

/*Routes: É como se fosse o Swith no swith case
Routes: GPS ou google maps. Ajuda a aplicação a encontrar o caminho que o usuário quer acessar e fica observando o que está na url*/

/*Routes: Observa o que está após o / da url. 
Route: Cada rota da aplicação. Vai pedir que seja exibida cada parte da nossa aplicação, segundo o que estiver contido após / do url. 
Path: seria a rua. Elements: seria o objetivo
Route: É como se fosse o Case no swith case*/

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

          <div className='min-h-[80vh]'>
           
            <Routes>
           
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
            </Routes>

          </div>  
        <Footer />
      </BrowserRouter>
      </AuthProvider>
  );
}

export default App;