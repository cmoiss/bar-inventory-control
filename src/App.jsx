import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout' 
import Home from './pages/Home'
import Categorias from './pages/Categorias'
import Variacoes from './pages/Variacoes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/variacoes" element={<Variacoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}