import './App.css'
import Login from './login/login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DropdownM from './component/dropdownM'
import Page_P from './page_principale/p_principale'


function App() {
    return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Page_P />} />
      </Routes>
    </Router>
        
        )
}

export default App
