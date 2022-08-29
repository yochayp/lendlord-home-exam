import React, { useState, useEffect } from "react";
import { fetchUsers, fetchManagers, addNewUser, deleteUser, updateUser, fetchRoles } from "./api/api";
import Navbar from './components/navbar/Navbar'
import UserTable from "./components/usersTable/UserTable";
import useModal from "./components/modal/useModal";
import Modal from "./components/modal/Modal";

import './App.css';
import Paginator from "./components/paginator/Paginator";

function App() {

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [npp, setNpp] = useState(10);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [managers, setManagers] = useState([]);

  const { isShowing, toggleUserModal } = useModal();
  const [selectedUser, setSelectedUser] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  useEffect(async () => {
    setIsLoading(true);
    setIsError(false);
    let res = await fetchUsers(page,npp);
    setUsers(res.data);
    setTotalPages(res.paging.pages)
    setIsLoading(false);
  }, [page]);

  const userFormToggle = async (user) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const [managers, roles] = await Promise.all([fetchManagers(), fetchRoles()]);
      setRoles(roles);
      setManagers(managers);
    } catch (error) {
      setIsError(error.message);
    }
    if (user) {
      user = { ...user, dateStarted: new Date(user.dateStarted).toLocaleDateString('sv') };
    }
    setSelectedUser(user);
    setIsLoading(false);
    toggleUserModal();
  }

  const submitForm = async (user) => {
    setIsLoading(true);
    try {
      let newUsers = users;
      if (selectedUser) {
        const { updatedUsers } = await updateUser(user);
        updateUsers(updatedUsers, newUsers);
      } else {
        const res = await addNewUser(user);
        const { userCreated, updatedUsers } = res;
        if (users.length === npp) {
          newUsers = users.slice(0, users.length - 1);
          newUsers = [userCreated, ...newUsers];
        } else {
          newUsers = [userCreated, ...newUsers];
        }
        updateUsers(updatedUsers, newUsers);

      };
      toggleUserModal();
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }

  const updateUsers = (updatedUsers, newUsers) => {
    updatedUsers.forEach(updatedUser => {
      newUsers = newUsers.map(user => {
        if (user._id === updatedUser._id) return updatedUser;
        else return user;
      })
    })
    setUsers(newUsers);
  }

  const onDeleteUser = async ({ id }) => {
    setIsLoading(true);
    try {
      const { deletedUserId, updatedUsers } = await deleteUser({ id });
      let newUsers = users;
      newUsers = users.filter(user => user._id !== deletedUserId);
      updateUsers(updatedUsers, newUsers);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="App">
      <Navbar userFormToggle={userFormToggle} />
      <Modal isShowing={isShowing} hide={toggleUserModal} selectedUser={selectedUser} submitForm={submitForm} isLoading={isLoading} isError={isError} managers={managers} roles={roles} />
      <div className="container">
        <UserTable users={users} userFormToggle={userFormToggle} onDeleteUser={onDeleteUser} />
        <Paginator page={page} setPage={setPage} totalPages={totalPages} />
        {isLoading && <div class="d-flex my-3 justify-content-center">
          <div class="spinner-border" role="status"></div>
        </div>
        }
        {isError && <div class="d-flex my-3 justify-content-center">
          <div className="text-danger">{isError}</div>
        </div>}
      </div>
    </div>
  );
}

export default App;
