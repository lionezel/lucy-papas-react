import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.div`
  background-color: #111;
`;

const NavContainer = styled.div`
  display: flex;
`;

const Title = styled.p`
  color: white;
`;

const Nav = styled.nav`
  margin-left: 100px;
`;

export const Sidebar = () => {
  return (
    <Container>
      <NavContainer>
        <Title>PapasLucy</Title>
        <Nav>
          <Link className="Links" to="/">
            Ordenes
          </Link>
          <Link to="/menu">Menu</Link>
        </Nav>
      </NavContainer>
    </Container>
  );
};
