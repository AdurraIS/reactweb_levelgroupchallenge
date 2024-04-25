import Compras from "./components/Compras/Compras";
import SideBar from "./components/MenuSideBar/SideBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/SignIn/SignIn"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {



  return (
    <Router>
      <div className='flex flex-row'>
      <SideBar/>
        <Routes>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/compras" element={<Compras/>}/>
        </Routes>
      </div>
    </Router>
      
  )
}

export default App
