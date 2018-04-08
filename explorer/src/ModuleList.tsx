import React from "react";
import ModuleContext from "./ModuleContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.h1`
  color: #fefefe;
  -webkit-font-smoothing: antialiased;
  font-weight: 600;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #fefefe;
`;

const Container = styled.div`
  width: 600px;
  margin: 3rem auto;
`;

const Row = styled.li`margin: 0;`;

const StyledLink = styled(Link)`
  color: #fefefe;
  text-decoration: none;
  display: block;
  line-height: 50px;
  padding: 0 2rem;

  &:hover {
    background: #21212b;
  }
`;

export default () => (
  <Container>
    <Header>Available examples</Header>
    <ModuleContext.Consumer>
      {modules =>
        modules && (
          <List>
            {Array.from(modules.keys()).map(k => (
              <Row key={k}>
                <StyledLink to={k}>{k}</StyledLink>
              </Row>
            ))}
          </List>
        )}
    </ModuleContext.Consumer>
  </Container>
);
