import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AppList from '../app/AppList';
import Homepage from '../features/authentication/Homepage';
import LoginForm from '../features/authentication/LoginForm';
import SignUpForm from '../features/authentication/SignUpForm';
import GroupList from '../features/group/GroupList';
import ProductBacklog from '../features/issue/ProductBacklog';
import ProjectList from '../features/project/ProjectList';
import Auth from '../layouts/Auth';
import ProjectLayout from '../layouts/ProjectLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="app" element={<AppList />}>
          <Route index element={<Navigate to="groups" />} />
          <Route path="groups" element={<GroupList />} />
          <Route path="projects" element={<ProjectList />} />
        </Route>
        <Route path="project/:id" element={<ProjectLayout />}>
          <Route index element={<Navigate to="product-backlog" />} />
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
