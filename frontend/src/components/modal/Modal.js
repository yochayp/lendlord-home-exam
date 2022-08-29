import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './modal.css'

const Modal = ({ isShowing, hide, selectedUser, submitForm, isLoading, isError, managers, roles }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="d-flex  justify-content-between">
                    {selectedUser ?
                        <h2>Update User</h2> :
                        <h2>Add User</h2>}
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <Formik
                    initialValues={
                        selectedUser ?
                            {
                                ...selectedUser
                            } :
                            {
                                firstName: '',
                                lastName: '',
                                email: '',
                                dateStarted: new Date().toLocaleDateString('sv'),
                                salary: '',
                                userType: '',
                                manager: ''
                            }}

                    validationSchema={Yup.object({
                        firstName: Yup.string()
                            .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
                            .max(20, 'Must be 20 characters or less')
                            .required('Required'),
                        lastName: Yup.string()
                            .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
                            .max(20, 'Must be 20 characters or less')
                            .required('Required'),
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required'),
                        userType: Yup.string().required('Required')
                    })}
                    onSubmit={(values) => {
                        if (values.manager != '') {
                            const [selectedManager] = managers.filter(manager => {
                                return manager._id === values.manager || manager._id === values.manager?._id
                            })
                            values = { ...values, manager: { _id: selectedManager._id, firstName: selectedManager.firstName, lastName: selectedManager.lastName } };
                        }
                        submitForm(values);
                    }}
                >
                    <Form>
                        <div className="modal-body d-flex flex-column">

                            <div >
                                <div className='d-flex my-1 justify-content-between'>
                                    <label htmlFor="firstName">First Name</label>
                                    <Field className="w-50" name="firstName" type="text" />
                                </div>
                                <div className='d-flex my-1 justify-content-end'>
                                    <ErrorMessage name="firstName" >
                                        {value => <div className="text-danger">{value}</div>}
                                    </ErrorMessage>
                                </div>
                            </div>

                            <div>
                                <div className='d-flex my-1 justify-content-between'>
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field className="w-50" name="lastName" type="text" />
                                </div>
                                <div className='d-flex my-1 justify-content-end'>
                                    <ErrorMessage name="lastName" >
                                        {value => <div className="text-danger">{value}</div>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div>
                                <div className='d-flex my-1 justify-content-between'>
                                    <label htmlFor="email">Email</label>
                                    <Field className="w-50" name="email" type="email" />
                                </div>
                                <div className='d-flex my-1 justify-content-end'>
                                    <ErrorMessage name="email" >
                                        {value => <div className="text-danger">{value}</div>}
                                    </ErrorMessage>
                                </div>
                            </div>

                            <div className='d-flex my-1 justify-content-between'>
                                <label htmlFor="dateStarted">Date Started</label>
                                <Field className="w-50" name="dateStarted" type="date" />
                                <ErrorMessage name="dateStarted" >
                                    {value => <div className="text-danger">{value}</div>}
                                </ErrorMessage>
                            </div>

                            <div>
                                <div className='d-flex my-1 justify-content-between'>
                                    <label htmlFor="userType">Role</label>
                                    <Field className="w-50" as="select" name="userType" placeholder="First Name">
                                        <option value="">Select Role</option>
                                        {roles.map(role =>
                                            <option value={role}>{role}</option>
                                        )}
                                    </Field>
                                </div>
                                <div className='d-flex my-1 justify-content-end'>
                                    <ErrorMessage name="userType" >
                                        {value => <div className="text-danger">{value}</div>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div>
                                <div className='d-flex my-1 justify-content-between'>
                                    <label htmlFor="salary">Salary</label>
                                    <Field className="w-50" name="salary" type="text" />
                                </div>
                                <div className='d-flex my-1 justify-content-end'>
                                    <ErrorMessage name="salary" >
                                        {value => <div className="text-danger">{value}</div>}
                                    </ErrorMessage>
                                </div>
                            </div>

                            <div className='d-flex my-1 justify-content-between'>
                                <label htmlFor="manager">Manager</label>
                                <Field className="w-50" as="select" name="manager" value={selectedUser?.manager._id}>
                                    <option value="">Select Manager</option>
                                    {managers.map(manager =>
                                        <option value={manager._id}>{manager.firstName + " " + manager.lastName}</option>
                                    )}
                                </Field>
                                <ErrorMessage name="manager" >
                                    {value => <div className="text-danger">{value}</div>}
                                </ErrorMessage>
                            </div>


                        </div>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h3 className={'text-danger ' + (!isError ? 'd-none' : '')}>error...</h3>
                            </div>
                            <div>
                                {isLoading ?
                                    <button class="btn btn-primary" type="button" disabled>
                                        <span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                                    </button> :
                                    <button className="submit-button btn btn-primary" type="submit">Save</button>
                                }
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    </React.Fragment>, document.body
) : null;

export default Modal;