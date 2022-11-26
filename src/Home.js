import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { addUser, deleteUser, loadUsers } from './redux/action';


const initialState = {
    name : "",
    email: ""
}


const Home = () => {
    const [state, setState] = useState(initialState)
    const dispatch = useDispatch();
    const {users, msg} = useSelector(state => state.data);

    const {name, email} = state;

    useEffect(() => {
        dispatch(loadUsers());
    });

    useEffect(() => {
        if(msg){
            toast.success(msg)
        }
    }, [msg]);

    const handleChange = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(state));
        setState({name: "", email: ""})
    };

    const handleDelete = (id) =>{
        if(window.confirm("Are you sure you want to delete?")){
            dispatch(deleteUser(id))
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/">Action</a></li>
                                    <li><a className="dropdown-item" href="/">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="/">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <div className='container my-5 py-5'>
                <div className='row'>
                    <div className='col-md-4'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label for="name">Name</label>
                                <input type='text' className='form-control' name='name' id='name' placeholder='enter your name...' value={name} onChange = {handleChange}></input>
                            </div>
                            <div className='form-group'>
                                <label for="email">email</label>
                                <input type='email' className='form-control' name='email' id='email' placeholder='enter your email...' value={email} onChange = {handleChange}></input>
                            </div>
                            <button type='submit' className='btn btn-primary w-100' onSubmit={handleSubmit}>Submit</button>
                        </form>
                    </div>
                    <div className='col-md-8'>
                        <table className='table table-dark table-striped'>
                            <thead className='table-light'>
                                <tr>
                                    <th scope='col'>No</th>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>
                            {users && users.map((item, index) => (
                                <tbody key={index} className='table-group-divider'>
                                    <tr>
                                        <th scope='row'>{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td><button onClick={()=> handleDelete(item._id)}>Delete</button></td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home