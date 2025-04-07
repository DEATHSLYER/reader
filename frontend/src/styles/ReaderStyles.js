import styled from "styled-components";

export const ReaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f5f5f5;
  color: #333;
`;

export const NarratorContainer = styled(ReaderContainer)`
  background: radial-gradient(circle, #1a1a1a, #000);
  color: #e0e0e0;
  font-family: "Courier New", monospace;
  text-shadow: 2px 2px 8px rgba(255, 255, 255, 0.2);
  letter-spacing: 1.5px;
  box-shadow: inset 0px 0px 20px rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.1);
`;

export const Title = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 20px;
  text-transform: uppercase;
`;
