import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }
    

    return (
        <Container>
            <h1>Home</h1>
            <Button onClick={logout}>Logout</Button>
        </Container>
    );

}

export default Home;