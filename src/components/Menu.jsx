import React, { useReducer } from "react";
import { Toggle } from "rsuite";
import {
  Button,
  Table,
  Modal,
  Form,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";

function Menu() {
  const initialState = {
    users: [
      {
        id: 1,
        name: "Deepak jangra",
        address: "HR-30",
        age: "22",
        profession: "Web developer",
        height: "5.9",
      },
      {
        id: 2,
        name: "Mia",
        address: "internet",
        age: "enough",
        profession: "freelancer",
        height: "5.5",
      },
    ],
    newUser: {
      id: null,
      name: "",
      address: "",
      age: "",
      profession: "",
      height: "",
    },
    show: false,
    editing: false,
    showCreateBtn: true,
    rates: [5.6, 5.7, 5.8, 5.9, 5.1, 5.11, 6.0],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_USERS":
        return { ...state, users: action.payload };
      case "SET_NEW_USER":
        return { ...state, newUser: action.payload };
      case "SET_SHOW":
        return { ...state, show: action.payload };
      case "SET_EDITING":
        return { ...state, editing: action.payload };
      case "SET_SHOW_CREATE_BTN":
        return { ...state, showCreateBtn: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { users, newUser, show, editing, showCreateBtn, rates } = state;

  const handleClose = () => {
    dispatch({ type: "SET_SHOW", payload: false });
  };

  const handleShow = () => {
    dispatch({ type: "SET_SHOW", payload: true });
    if (!editing) {
      dispatch({ type: "SET_NEW_USER", payload: initialState.newUser });
    }
  };

  const onEdit = (user) => {
    dispatch({ type: "SET_EDITING", payload: true });
    if (editing) {
      dispatch({ type: "SET_NEW_USER", payload: user });
      handleShow();
    }
  };

  const onFormSubmit = (newUser) => {
    const id = users.length + 1;
    dispatch({
      type: "SET_USERS",
      payload: [...users, { ...newUser, id }],
    });
  };

  const onUpdateUser = (updatedUser) => {
    dispatch({
      type: "SET_USERS",
      payload: users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    });
    dispatch({ type: "SET_EDITING", payload: false });
  };

  const onDeleteUser = (currentUser) => {
    dispatch({
      type: "SET_USERS",
      payload: users.filter((user) => user.id !== currentUser.id),
    });
  };

  const onSubmit = () => {
    if (editing) {
      onUpdateUser(newUser);
    } else {
      onFormSubmit(newUser);
    }
    handleClose();
  };

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <Card className="customCard">
            <Card.Body>
              <div className="d-flex justify-content-between customCardBody text-white">
                <div>
                  <Card.Title>User Data</Card.Title>
                </div>
                <div className="d-flex">
                  <Toggle
                    className="userToggleBtn"
                    checked={showCreateBtn}
                    onClick={() =>
                      dispatch({ type: "SET_SHOW_CREATE_BTN", payload: !showCreateBtn })
                    }
                  />
                  {showCreateBtn ? (
                    <Button variant="primary" onClick={handleShow} title="Add User">
                      <FaPlus />
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Age</th>
                    <th>Profession</th>
                    <th>Height (ft)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.address}</td>
                        <td>{user.age}</td>
                        <td>{user.profession}</td>
                        <td>{user.height}</td>
                        <td>
                          <Button
                            variant="info"
                            title="Edit user details"
                            onClick={() => onEdit(user)}
                          >
                            <FaPencilAlt />
                          </Button>{" "}
                          <Button
                            variant="danger"
                            title="Delete user"
                            onClick={() => onDeleteUser(user)}
                          >
                            <FaTrashAlt />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Modal size="lg" show={show} onHide={handleClose}>
            <Form onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}>
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.name}
                    required
                    onChange={(e) =>
                      dispatch({ type: "SET_NEW_USER", payload: { ...newUser, name: e.target.value } })
                    }
                    placeholder="Enter Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.address}
                    onChange={(e) =>
                      dispatch({ type: "SET_NEW_USER", payload: { ...newUser, address: e.target.value } })
                    }
                    placeholder="Enter Address"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    value={newUser.age}
                    onChange={(e) =>
                      dispatch({ type: "SET_NEW_USER", payload: { ...newUser, age: e.target.value } })
                    }
                    placeholder="Enter Age"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicProfession">
                  <Form.Label>Profession</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.profession}
                    onChange={(e) =>
                      dispatch({ type: "SET_NEW_USER", payload: { ...newUser, profession: e.target.value } })
                    }
                    placeholder="Enter Profession"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Height (ft)</Form.Label>
                  <Form.Select
                    value={newUser.height}
                    onChange={(e) =>
                      dispatch({ type: "SET_NEW_USER", payload: { ...newUser, height: e.target.value } })
                    }
                  >
                    <option value="">Select</option>
                    {rates.length
                      ? rates.map((val, index) => (
                          <option key={index} value={val}>
                            {val}
                          </option>
                        ))
                      : null}
                  </Form.Select>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!newUser.name}
                >
                  {editing ? "Update" : "Submit"}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default Menu;
