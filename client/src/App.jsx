// src/App.jsx
import React from 'react';
import UserForm from './components/createUser';
import UserUpdateForm from './components/updateUser';
import UserTable from './components/userTable';
import LoginForm from './components/loginForm';
import { Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginForm/>}></Route>
      {/* <h1>User Management</h1>
      <h2>Create User</h2> */}
      <Route path="/register" element={<UserForm/>}></Route>
      <Route path="/update" element={<UserUpdateForm/>}></Route>
      <Route path="/showTable" element={<UserTable/>}></Route>
      <UserForm />
      {/* <h2>Update User</h2> */}
      <UserUpdateForm />
      {/* <h2>User Table</h2> */}
      <UserTable/>
    </Routes>
    </>
  );
};

export default App;
