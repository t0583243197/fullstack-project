import './App.css';
// import './flags.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Register from './features/auth/Register';
import Login from './features/auth/Login';
import Layout from './Components/Layout';
import Basket from './features/basket/Basket';
import LogOut from './Components/LogOut';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import BasicDemo from './features/Product/Products'
import Home from './Components/Home';

function App() {

  return (
    <div className="App">
    <BrowserRouter>
     <Routes>
     <Route path='/' element={<Layout></Layout>}>
     <Route path="/" element={<Home/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path='/products' element={<BasicDemo/>}/>
     <Route path='/basket' element={<Basket/>}/> 
     <Route path='/logOut' element={<LogOut/>}/>
   
     </Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}
export default App;
