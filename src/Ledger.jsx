import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import  { jwtDecode }  from 'jwt-decode';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {FormControl, Dropdown, DropdownButton, Carousel, ModalHeader } from 'react-bootstrap';
import { API_ENDPOINT } from './Api';
import './ledger.css';



import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';

function Ledger () {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDecodeUserID = async () => {
            try {
                const response = JSON.parse(localStorage.getItem('token'))
                setUser(response.data);

                const decoded_token = jwtDecode(response.data.token);
                //console.log(decoded_token.tyep_id);
                setUser(decoded_token);
                //console.log(user.type_id);

            } catch (error) {
                navigate("/login")
            }
        };
    
    fetchDecodeUserID();

}, []);

    const handleLogout = async () => {

    try {
        localStorage.removeItem('token');
        navigate("/login");

    } catch (error) {
        console.error('Logout failed', error);
    }
};

/* Fetch Data */

const [users, setUsers] = useState([])

const userdata = JSON.parse(localStorage.getItem('token'));
const token = userdata.data.token;

const headers = {
    accept: 'application/json',
    Authorization: token
}

useEffect(()=>{
    fetchUsers()
    }, [])
    const fetchUsers = async (e) => {
    await axios.get(`${API_ENDPOINT}/user`, { headers: headers}).then(({data})=>{
    setUsers(data) 
})
    }

/* Delete User */
const deleteUser = async (id) => {

    const isConfirm = await Swal.fire({
        title: 'Sure na beh?',
        text: "Wala ng balikan toh",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'blue',
        cancelButtonColor: 'red',
        confirmButtonText: 'Yes. Delete it',
        customClass: {
            title: 'swal-title', 
            popup: 'swal-popup', 
            confirmButton: 'swal-confirm-button', 
            cancelButton: 'swal-cancel-button' 
        },
        background: '#f8f9fa', 
        backdrop: true, 
        showLoaderOnConfirm: true, 
        preConfirm: async () => {
            try {
                await axios.delete(`${API_ENDPOINT}/user/${id}`, { headers: headers });
                return true;
            } catch (error) {
                throw new Error(error.response.data.message);
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'User has been deleted.',
                timer: 1500, 
                showConfirmButton: false,
    });
        fetchUsers()
    } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
            icon: 'info',
            title: 'Cancelled',
            text: 'User deletion was cancelled.',
            timer: 1500,
            showConfirmButton: false,
        });
    }
}) .catch(({ response: { data } }) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: data.message,
        confirmButtonColor: '#d9534f', 
    });
});
};


/* Create User */
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const [firstname, setFirstname] = useState("")
const [lastname, setLastname] = useState("")
const [username, setUsername] = useState("")      
const [passwords, setPasswords] = useState("")
const [validationError, setValidationError] = useState({})

useEffect(() => {
    // Toggle a 'modal-open' class to the body when modal is shown
    if (show) {
        document.body.classList.add('modal-open');
    } else {
        document.body.classList.remove('modal-open');
    }

    return () => {
        document.body.classList.remove('modal-open');
    };
}, [show]);

const createUser = async (e) => {

    e.preventDefault();

    const formData = new FormData()

    formData.append('firstname', firstname)
    formData.append('lastname', lastname)
    formData.append('username', username) /* Same with database */
    formData.append('passwords', passwordx)

    await axios.post(`${API_ENDPOINT}/user`, {firstname, lastname, username, passwords}, {headers: headers}).then(({data})=>{
        Swal.fire({
            icon: 'success',
            text:data.message
        })
        fetchUsers();

    }).catch(({response})=>{
        if(response.status===422){
            setValidationError(response.data.errors)
        }else{
            Swal.fire({
                text:response.data.message,
                icon: 'error'
            })
        }
    })
}

//* Read User */
const [selectedUser, setSelectedUser] = useState(null);
const [show1, setShow1] = useState(false);

const handleClose1 = () => setShow1(false);

const handleShow1 = (row_users) => {
    setSelectedUser(row_users);
    setShow1(true);
};

/* Update User */

const [show2, setShow2] = useState(false);
const handleClose2 = () => setShow2(false);

const [selectedUserId, setSelectedUserId] = useState(null);
const [firstnames, setFirstnames] = useState("");
const [lastnames, setLastnames] = useState("");
const [usernames, setUsernames] = useState("");
const [passwordx, setPasswordx] = useState("");
const [validationError2, setValidationError2] = useState({});

const handleShow2 = (users) => {
    setSelectedUserId(users.user_id);
    setFirstnames(users.firstname);           /* Same with the database */
    setLastnames(users.lastname); 
    setUsernames(users.username);
    setPasswordx(users.passwords || '');
    setShow2(true);
};

const updateUser = async (e) => {
    e.preventDefault();

await axios.put(`${API_ENDPOINT}/user/${selectedUserId}`, 
    { firstname: firstnames, lastname: lastnames, username: usernames, passwords: passwordx }, 
    { headers })
        .then(({ data }) => {
            Swal.fire({ icon: 'success', text: data.message });
            fetchUsers();
            setShow2(false);
        })
        .catch(({ response }) => {
            if (response.status === 422) {
                setValidationError2(response.data.errors);
            } else {
                Swal.fire({ text: response.data.message, icon: 'error' });
            }
        });
};

return (
<>


    <Navbar className='custom-navbar'>

        <Container>
            <Navbar.Brand as={Link} to="/dashboard">URBAN ViBE</Navbar.Brand>
            <Nav className='me-auto'>
                    <Nav.Link as={Link} to="/dashboard">Discover</Nav.Link>
            </Nav>

        <Navbar.Collapse id="basic-navbar-nav">

        <Nav className="ms-auto">
            <Nav.Link as={Link} to="/ledger">Ledger</Nav.Link>
            <NavDropdown title={user ? `User: ${user.username}` : 'Dropdown'} id="basic-nav-dropdown" align="end">
                {/* <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#">Setings</NavDropdown.Item> */}
                <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
        </Nav>

        </Navbar.Collapse>
        </Container>
    </Navbar>

<br/>

<Container>
    <Row>
        <Col>
        <center>
        <h1 style={{fontFamily: 'Lora'}}>Ledger</h1>
        </center>
        </Col>
    </Row>
</Container>

<br/>

<div className='table-container'>
    
<div className='tab'>
<div className="button-container text-end mb-3">
    <button className="btn btn-success"onClick={handleShow}>Create User</button>
</div>

    <table className='table-bordered'>

        <tbody >
            <tr className='table-text'>
                <td>ID</td>
                <td>Username</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Action</td>
               
            </tr>

            {
            users.length > 0 && (
                users.map((row_users, key) =>(
                    <tr className='table-text' key={row_users.user_id}>
                        <td>{row_users.user_id}</td>         
                        <td>{row_users.username}</td>
                        <td>{row_users.firstname}</td>
                        <td>{row_users.lastname}</td>
                        <td style={{ textAlign: 'center'}}>                          
        <Button variant='secondary' size='sm' onClick={()=>handleShow1(row_users)} style={{ marginRight: '5px' }}>Read</Button>
        <Button variant='warning' size='sm' onClick={()=>handleShow2(row_users)} style={{ marginRight: '5px' }}>Update</Button>
        <Button variant="danger" size="sm" onClick={() => deleteUser(row_users.user_id)}>Delete</Button>
                        </td>
                    </tr>
                ))
            )
        }
    </tbody>

    </table>
</div>
</div>


<Modal show={show} onHide={handleClose}>
    <Modal.Header>
        <Modal.Title>Create user</Modal.Title>
    </Modal.Header>

    <Modal.Body>

         <Form onSubmit={createUser}>
            <Row>
                <Col>
                <Form.Group controlId='Firstname'>
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control type='text' value={firstname} onChange={(event)=>{setFirstname(event.target.value)}} required/>
                </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                <Form.Group controlId='Lastname'>
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control type='text' value={lastname} onChange={(event)=>{setLastname(event.target.value)}} required/>
                </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                <Form.Group controlId='Username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' value={username} onChange={(event)=>{setUsername(event.target.value)}} required/>
                </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                <Form.Group controlId='Password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='text' value={passwords} onChange={(event)=>{setPasswords(event.target.value)}} required/>
                </Form.Group>
                </Col>
            </Row>

            <Button variant = "primary" className="mt-2" size="sm" block="block" type="submit">Save</Button>

        </Form>
        </Modal.Body>

</Modal>

<Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
            <Modal.Title>Row Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {selectedUser ? (
                <div>
                    <p><strong>ID:</strong> {selectedUser.user_id}</p>
                    <p><strong>Fullname:</strong> {selectedUser.firstname} {selectedUser.lastname}</p>
                    <p><strong>Username:</strong> {selectedUser.username}</p>
                    <p><strong>Date Joined:</strong> {selectedUser.created_at}</p>
                </div>
            ) : (
                <p>No Data Available</p>
            )}
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
        </Modal.Footer>

</Modal>

<Modal show={show2} onHide={handleClose2}>
                <Modal.Header>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={updateUser}>
                        <Form.Group controlId='Firstname'>
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control
                                type='text'
                                value={firstnames}
                                onChange={(e) => setFirstnames(e.target.value)}
                                isInvalid={!!validationError2.firstname}
                                required
                            />
                            <Form.Control.Feedback type="invalid">{validationError2.firstname}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group controlId='Lastname'>
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control
                                type='text'
                                value={lastnames}
                                onChange={(e) => setLastnames(e.target.value)}
                                isInvalid={!!validationError2.lastname}
                                required
                            />
                            <Form.Control.Feedback type="invalid">{validationError2.lastname}</Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group controlId='Username'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                value={usernames}
                                onChange={(e) => setUsernames(e.target.value)}
                                isInvalid={!!validationError2.username}
                                required
                            />
                            <Form.Control.Feedback type="invalid">{validationError2.username}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='Password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='text'
                                value={passwordx}
                                onChange={(e) => setPasswordx(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" className="mt-2" size="sm" type="submit">Save</Button>
                    </Form>
                </Modal.Body>
            </Modal>


</>
    )
};

export default Ledger;