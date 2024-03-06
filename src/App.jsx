import './App.css'
import {Route, Routes} from "react-router-dom"
import LandingPage from './components/Pages/Landing/LandingPage';
import Error from './components/Pages/Error/Error';
import Home from './components/Pages/Home/Home';
import Detail from './components/Pages/Detail/Detail';
import Form from './components/Pages/Form/Form';
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/form" element={<Form/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  )
}

export default App
