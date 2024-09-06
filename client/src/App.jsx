// src/App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserForm from './components/createUser';
import UserUpdateForm from './components/updateUser';
import UserTable from './components/userTable';
import LoginForm from './components/loginForm';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<UserForm />} />
        <Route path="/update" element={<UserUpdateForm />} />
        <Route path="/showTable" element={<UserTable />} />
        <Route path="/userForm" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
