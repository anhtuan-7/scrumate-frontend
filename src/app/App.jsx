import { Spinner, Typography } from '@material-tailwind/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AppList from '../app/AppList';
import Homepage from '../components/Homepage';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginForm from '../features/authentication/LoginForm';
import SignUpForm from '../features/authentication/SignUpForm';
import { doLogin, verify } from '../features/authentication/statusSlice';
import GroupList from '../features/group/GroupList';
import ProductBacklog from '../features/issue/ProductBacklog';
import ProjectList from '../features/project/ProjectList';
import Auth from '../layouts/Auth';
import ProjectLayout from '../layouts/ProjectLayout';

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.status);

  useEffect(() => {
    dispatch(verify())
      .unwrap()
      .then((response) => {
        const { user } = response.data;
        sessionStorage.setItem('user', JSON.stringify(user));
        dispatch(doLogin());
      })
      .catch(() => sessionStorage.removeItem('user'));
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="mx-auto flex min-h-screen flex-col items-center justify-center">
        <div className="flex items-center gap-3 p-6">
          <Spinner className="inline-block h-8 w-8" color="blue" />
          <Typography variant="h2" color="blue" className="inline-block">
            Just a moment
          </Typography>
        </div>
        <img src="/waiting.gif" className="rounded-2xl" />
      </div>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route
          path="app"
          element={
            <ProtectedRoute>
              <AppList />
            </ProtectedRoute>
          }
        >
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
