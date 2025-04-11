import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout' 
import Products from './pages/Products'
import Categorias from './pages/Categorias'
import Variacoes from './pages/Variacoes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Products />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/variacoes" element={<Variacoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}