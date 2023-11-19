import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Homepage from '../features/authentication/Homepage';
import LoginForm from '../features/authentication/LoginForm';
import SignUpForm from '../features/authentication/SignUpForm';
import AppList from '../features/group/AppList';
import ProductBacklog from '../features/project/ProductBacklog';
import Auth from '../layouts/Auth';
import ProjectLayout from '../layouts/ProjectLayout';

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
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignUpForm />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
