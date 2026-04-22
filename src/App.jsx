import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ProductCatalog from './pages/ProductCatalog'
import FeaturedItems from './pages/FeaturedItems'
import Analytics from './pages/Analytics'
import RequisitionList from './pages/RequisitionList'
import Suppliers from './pages/Suppliers'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/catalog" replace />} />
        <Route path="/catalog"      element={<ProductCatalog />} />
        <Route path="/featured"     element={<FeaturedItems />} />
        <Route path="/analytics"    element={<Analytics />} />
        <Route path="/requisitions" element={<RequisitionList />} />
        <Route path="/suppliers"    element={<Suppliers />} />
      </Route>
    </Routes>
  )
}
