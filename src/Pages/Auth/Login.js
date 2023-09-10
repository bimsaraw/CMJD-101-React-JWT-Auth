import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const userLogin = async (event) => {
        event.preventDefault();

        if(username === "") {
            setError("Username is required")
        } else if(password === "") {
            setError("Password is required")
        } else {
            //user login
            try {
                const response = await axios.post("http://localhost:8081/auth/login", {
                    username: username,
                    password: password
                });

                localStorage.setItem("token",response.data); //Store the JWT token for future use

                //set it as the default authorization header for future requests
                //from now onwards.
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;

                navigate("/");

            } catch (error) {
                setError(error.response.data)
            }
        }
    }

    return (
        <>
            <Container>
                <h1>User Login</h1>

                <Form onSubmit={userLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" onChange={handleUsername} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={handlePassword} />
                    </Form.Group>

                    <Button type="submit">Login</Button>
                </Form>
            </Container>
        </>
    )
}

export default Login;