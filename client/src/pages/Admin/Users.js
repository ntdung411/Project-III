import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { Modal, Select } from 'antd';

const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState(null);

  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Thay đổi quyền người dùng
  const changeUserRole = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/users/${selectedUser._id}`, { role: newRole });
      alert('User role changed successfully');
      fetchUsers(); // Cập nhật danh sách sau khi thay đổi quyền
      setVisible(false);
      setSelectedUser(null);
      setNewRole(null);
    } catch (error) {
      console.error('Error changing user role:', error);
      alert('Failed to change user role');
    }
  };

  // Xóa người dùng
  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API}/api/v1/auth/users/${userId}`);
        alert('User deleted successfully');
        setUsers(users.filter((user) => user._id !== userId)); // Cập nhật danh sách sau khi xóa
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-4 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className='text-center'>All Users</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role === 0 ? 'User' : user.role === 1 ? 'Admin' : 'Seller'}</td>
                    <td>
                      <button
                        className="btn btn-warning ms-2"
                        onClick={() => {
                          setSelectedUser(user);
                          setVisible(true);
                        }}
                      >
                        Change Role
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        title="Change User Role"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={changeUserRole}
      >
        <Select
          value={newRole}
          onChange={(value) => setNewRole(value)}
          style={{ width: '100%' }}
        >
          <Option value={0}>User</Option>
          <Option value={1}>Admin</Option>
          <Option value={2}>Seller</Option>
        </Select>
      </Modal>
    </Layout>
  );
};

export default Users;