import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import "../App.css";

function LoginModal(props) {
    return (
      <Modal
        {...props} className="login-modal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* <form data-abide novalidate id="login-form">
                <div className="login-box">
                <div className="row collapse expanded">
                    <div className="small-12 medium-6 column small-order-2 medium-order-1">
                    <div className="login-box-form-section">
                        <input className="login-box-input" type="email" name="email" placeholder="E-mail" required pattern="email" id="userID-Login"/>
                        <span className="form-error">Please enter a valid email address</span>
                        <input className="login-box-input" type="password" name="password" placeholder="Password" id="pwd-Login" minlength="8" required/>
                    </div>
                    </div>
                </div>
                </div>
            </form> */}
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control controlId="userID-Login" type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock" placeholder="Password"
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        Your password must be 8-20 characters long, contain letters and numbers, and
                        must not contain spaces, special characters, or emoji.
                    </Form.Text>
                </Form.Group>
                <Button className="primary-button" onClick={props.onHide}>Login</Button>
                <Button className="homepage-buttons"onClick={props.onHide} variant="secondary">Forgot Password</Button>
            </Form>
        </Modal.Body>   
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Login</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }

  export default LoginModal;