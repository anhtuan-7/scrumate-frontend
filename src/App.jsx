import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Auth from './layouts/Auth';
import ProjectLayout from './layouts/ProjectLayout';
import AppList from './pages/AppList';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import ProductBacklog from './pages/ProductBacklog';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="app" element={<AppList />} />
        {/* <Route path="group" element={<AppList />} /> */}
        <Route path="project" element={<ProjectLayout />}>
          <Route index path="product-backlog" element={<ProductBacklog />} />
        </Route>
        <Route path="auth" element={<Auth />}>
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
