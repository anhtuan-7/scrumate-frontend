import { Spinner, Typography } from '@material-tailwind/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AppList from '../app/AppList';
import Homepage from '../components/Homepage';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginForm from '../features/authentication/LoginForm';
import SignUpForm from '../features/authentication/SignUpForm';
import {
  doLogin,
  doLogout,
  verify,
} from '../features/authentication/statusSlice';
import GroupList from '../features/group/GroupList';
import GroupProjectList from '../features/project/GroupProjectList';
import ProjectList from '../features/project/ProjectList';
import Auth from '../layouts/Auth';
import GroupLayout from '../layouts/GroupLayout';

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.status);

  useEffect(() => {
    dispatch(verify())
      .unwrap()
      .then((response) => {
        const { user } = response.data;
        sessionStorage.setItem('user', JSON.stringify(user));
        dispatch(doLogin()); // Stop loading
      })
      .catch(() => {
        sessionStorage.removeItem('user');
        dispatch(doLogout());
      });
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

        <Route
          path="groups/:id"
          element={
            <ProtectedRoute>
              <GroupLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="projects" />} />
          <Route path="projects" element={<GroupProjectList />} />
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
