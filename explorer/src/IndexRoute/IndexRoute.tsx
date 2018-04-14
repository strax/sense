import React from "react";
import AppContext from "../AppContext";
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
    <AppContext.Consumer>
      {ctx =>
        ctx && (
          <List>
            {ctx.examples.map(example => (
              <Row key={example.path + ":" + example.name}>
                <StyledLink to={example.path}>
                  {example.path}:{example.name}
                </StyledLink>
              </Row>
            ))}
          </List>
        )}
    </AppContext.Consumer>
  </Container>
);
