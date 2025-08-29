import './App.css';
import Form from './components/Form';
import UserHome from './components/UserHome';
import CreateSale from './components/CreateSale'; // Importa el nuevo componente
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Form callback={setUser} />} />
        <Route path='/userHome' element={<UserHome user={user} />} />
        <Route path='/createSale' element={<CreateSale />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;