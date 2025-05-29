import { Routes, Route } from 'react-router-dom';

import { PropertyProvider } from '../contexts/PropertyContext';
import ProtectedRoute from './ProtectedRoute';
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import Home from '../pages/PublicPages/Home';
import Login from '../pages/PublicPages/Login';
import { Register, Form, Auth } from '../pages/PublicPages/Register/Register';
import Property from '../pages/PrivatePages/Property';
import Properties from '../pages/PrivatePages/Properties';
import PropertiesAdd from '../pages/PrivatePages/PropertiesAdd';
import PropertiesRemove from '../pages/PrivatePages/PropertiesRemove';
import Reservation from '../pages/PrivatePages/Reservation';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}>
          <Route path="form" element={<Form />} />
          <Route path="auth" element={<Auth />} />
        </Route>
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
        <Route
          path="/:userId/properties/:propertyId"
          element={
            <ProtectedRoute>
              <PropertyProvider>
                <Property />
              </PropertyProvider>
            </ProtectedRoute>
          }
        >
          <Route
            path="reservations"
            element={
              <ProtectedRoute>
                <Reservation />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}
