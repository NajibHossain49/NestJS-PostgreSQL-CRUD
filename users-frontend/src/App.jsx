import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', age: '' });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Create a new user
  const createUser = async () => {
    try {
      const { name, email, age } = newUser;
      if (!name || !email || !age) {
        alert('Please fill out all fields');
        return;
      }
      await axios.post(API_URL, { name, email, age: Number(age) });
      setNewUser({ name: '', email: '', age: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Update an existing user
  const updateUser = async () => {
    try {
      if (!editUser) return;

      const { id, name, email, age } = editUser;
      if (!id || !name || !email || !age) {
        alert('Please fill out all fields');
        return;
      }

      // Send PATCH request to backend
      await axios.patch(`${API_URL}/${id}`, {
        name,
        email,
        age: Number(age),
      });

      alert('User updated successfully!');
      setEditUser(null); // Clear the edit form
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>User Management</h1>

      {/* Create User Section */}
      <div>
        <h2>Create User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
        />
        <button onClick={createUser}>Add User</button>
      </div>

      {/* Users List Section */}
      <div>
        <h2>Users List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>
                {user.name} - {user.email} - Age: {user.age}
              </span>
              <button onClick={() => setEditUser(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit User Section */}
      {editUser && (
        <div>
          <h2>Edit User</h2>
          <input
            type="text"
            placeholder="Name"
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
          <input
            type="number"
            placeholder="Age"
            value={editUser.age}
            onChange={(e) => setEditUser({ ...editUser, age: e.target.value })}
          />
          <button onClick={updateUser}>Update User</button>
          <button onClick={() => setEditUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;
