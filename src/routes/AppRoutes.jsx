import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Properties from '../pages/Properties';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<PrivateLayout />}>
        <Route
          path="/:user_id/properties"
          element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:user_id/properties/:id"
          element={
            <ProtectedRoute>
              <p>Imovel</p>
            </ProtectedRoute>
          }
        />
        <Route
          path="/:user_id/properties/add"
          element={
            <ProtectedRoute>
              <p>Adicionar</p>
            </ProtectedRoute>
          }
        />
        <Route
          path="/:user_id/properties/remove"
          element={
            <ProtectedRoute>
              <p>Remover</p>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
