// src/App.jsx
import React from 'react';
import UserForm from './components/createUser';
import UserUpdateForm from './components/updateUser';
import UserDelete from './components/deleteUser';

const App = () => {
  return (
    <div>
      <h1>User Management</h1>
      <h2>Create User</h2>
      <UserForm />
      <h2>Update User</h2>
      <UserUpdateForm />
      <h2>Delete User</h2>
      <UserDelete />
    </div>
  );
};

export default App;
