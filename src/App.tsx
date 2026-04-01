import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PropertyPage from './pages/propertyPage/PropertyPage'
import Layout from './componets/layouts/Layout'
import './App.css'
import { PROPERTY_NAV, ROUTES } from './routes/rouets'
import TenantsPage from './pages/tenantsPage/TenantsPage'
import PropertyDetailPage from './pages/propertyDetailPage/PropertyDetailPage'
import PropertyListPage from './pages/propertyListPage/PropertyListPage'
import PropertyDetailLayout from './pages/propertyDetailLayout/PropertyDetailLayout'
import RoomDetailPage from './pages/roomDetailPage/RoomDetailPage'
import PropertyTenantPage from './pages/propertyTenant/PropertyTenantPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to={ROUTES.property} replace />}/>
          <Route path={ROUTES.property} element={<PropertyPage />}>
            <Route index element={<PropertyListPage />}/>
            <Route path=":id" element={<PropertyDetailLayout/>}>
              <Route index element={<PropertyDetailPage />}/>
              <Route path={PROPERTY_NAV.room} element={<RoomDetailPage />} />
              <Route path={PROPERTY_NAV.tenant} element={<PropertyTenantPage />} />
            </Route>
          </Route>
          <Route path={ROUTES.tenants} element={<TenantsPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App






