import { Route, Routes } from 'react-router-dom';
import { Confirm } from './Confirm';
import { Login } from './Login';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="confirm" element={<Confirm />} />
    </Routes>
  );
}
