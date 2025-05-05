import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Properties from '../pages/Properties';
import PropertiesAdd from '../pages/PropertiesAdd';
import PropertiesRemove from '../pages/PropertiesRemove';

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
          path="/:userId/properties"
          element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:userId/properties/:id"
          element={
            <ProtectedRoute>
              <p>Imovel</p>
            </ProtectedRoute>
          }
        />
        <Route
          path="/:userId/properties/add"
          element={
            <ProtectedRoute>
              <PropertiesAdd />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:userId/properties/remove"
          element={
            <ProtectedRoute>
              <PropertiesRemove />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
