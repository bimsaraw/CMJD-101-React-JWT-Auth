import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate(); //enable navigation

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState(null);

    const handleUsername = (event) => {
        setUsername(event.target.value); //set username state from form control value
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const registerUser = async (event) => {
        event.preventDefault();

        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (username.length < 6) {
            setError("Username should have atleast 6 characters");
        } else if (password.length < 6) {
            setError("Password should be atleast 6 characters long");
        } else if (!regex.test(email)) {
            setError("Email is not valid");
        } else {
            setError(null);
            //no errors, register the user
            
            try {
                const response = await axios.post("http://localhost:8081/auth/register", {
                    username: username,
                    password: password,
                    email: email
                });
                
                navigate("/login");
                
            } catch (error) {
                setError(error.response.data)
            }
            
        }
    }

    return (
        <>
            <Container>
                <h1>User Registration</h1>

                <Form onSubmit={registerUser}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" onChange={handleUsername} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={handleEmail} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={handlePassword} />
                    </Form.Group>

                    {error &&
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    }

                    <Button type="submit">Register</Button>
                </Form>
            </Container>
        </>
    )
}

export default Register;