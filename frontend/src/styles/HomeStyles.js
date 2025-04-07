import styled from "styled-components";
import { motion } from "framer-motion";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #ff7eb3, #ff758c);
`;

export const Title = styled(motion.h1)`
  font-size: 4rem;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 15px 30px;
  font-size: 1.5rem;
  border: none;
  background-color: black;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: white;
    color: black;
  }
`;
