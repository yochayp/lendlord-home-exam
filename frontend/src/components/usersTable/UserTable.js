import { FaUserEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import './usersTable.css'

const UserTable = ({ users ,onDeleteUser ,userFormToggle }) => {
    return (

        <table class="table ">
            <thead>
                <tr>
                    <th >First Name</th>
                    <th>Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date Started</th>
                    <th scope="col">Role</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Manager</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user._id} className="">
                        <td scope="row">{user.firstName}</td>
                        <td scope="row">{user.lastName}</td>
                        <td scope="row">{user.email}</td>
                        <td scope="row">{new Date(user.dateStarted).toLocaleDateString()}</td>
                        <td scope="row">{user.userType}</td>
                        <td scope="row">{user.salary?<><span>&#163;</span>{user.salary}</>:''}</td>
                        <td scope="row">{user.manager?user.manager.firstName+" "+user.manager.lastName:""}</td>
                        <td scope="row d-flex align-items-center">
                            {<div className="client-buttons d-flex  align-items-center">
                                <button className="mx-2 border-0 rounded-circle d-flex justify-content-center align-items-center" onClick={() => userFormToggle(user)}>
                                    <FaUserEdit className="icon"  value={{ color: 'blue', size: '50px' }} />
                                </button>
                                <button className=" border-0 rounded-circle d-flex justify-content-center align-items-center" onClick={() => onDeleteUser({ id:user._id })}>
                                    <RiDeleteBin6Line className="icon"/>
                                </button>
                            </div>}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UserTable;