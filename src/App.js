import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import OSList from './pages/osList';
import CustomerSelection from './pages/customerSelection';
import CreateOS from './pages/createOS';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/os' element={<OSList/>}/>
        <Route path='/create/os' element={<CustomerSelection/>}/>
        <Route path='/create/os/:customerId' element={<CreateOS/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
