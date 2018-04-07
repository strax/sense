import React from "react";
import styled from "styled-components";
import path from "path";
import { Link } from "react-router-dom";

interface Props {
  path: string;
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: #0b0b16;
  -webkit-font-smoothing: antialiased;
  font-weight: 600;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1rem;
  color: #f2f2f2;

  & > * {
    margin: 0 5px;
  }
`;

const PathSpan = styled.span`
  color: #ddd;
`;

const Emphasis = styled.em`
  color: #fefefe;
  font-style: normal;
`;

const FormattedPath: React.SFC<{ path: string }> = props => {
  const basename = path.basename(props.path);
  const dirname = path.dirname(props.path);
  return (
    <PathSpan>
      {dirname}/<Emphasis>{basename}</Emphasis>
    </PathSpan>
  );
};

const BackLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: #fafafa;
  margin-right: 10px;
`;

const ModuleHeader: React.SFC<Props> = props => {
  return (
    <Container>
      <BackLink to="/">← View all</BackLink>
      <FormattedPath path={props.path} />
    </Container>
  );
};

export default ModuleHeader;
