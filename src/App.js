import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './login';
import './App.css';
import './auth';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="*" element={<Login />} /> */}
      </Routes>
    
    
    </div>
  );
}

export default App;
