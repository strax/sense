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
  background: #fafafa;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px 2em;
  color: #222;
  border-bottom: 1px solid #e5e5e5;
  margin: 0 -5px;

  & > * {
    margin: 0 5px;
  }
`;

const PathSpan = styled.span`
  color: #aaa;
`;

const Emphasis = styled.em`
  color: #222;
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
  color: #666;
  font-weight: 500;
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
