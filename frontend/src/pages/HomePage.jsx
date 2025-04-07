import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HomeContainer, Title, Button } from "../styles/HomeStyles";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Title initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        GoReader AI
      </Title>
      <Button onClick={() => navigate("/reader")}>Get Started</Button>
    </HomeContainer>
  );
};

export default HomePage;
