import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

const privateRoutes = {
  properties: {
    path: '/properties',
    element: (
      <ProtectedRoute>
        <p>properties</p>
      </ProtectedRoute>
    ),
  },
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<PrivateLayout />}>
        <Route path={privateRoutes.properties.path} element={privateRoutes.properties.element} />
      </Route>
    </Routes>
  );
}
