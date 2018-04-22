import React, { Fragment } from "react";
import styled from "styled-components";
import StackTrace, { StackFrame } from "stacktrace-js";
import { dropRepeats, dropRepeatsWith, eqBy } from "ramda";

const ErrorInformationContainer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorInformationPre = styled.pre`
  font-family: "SF Mono", monospace;
  font-size: 16px;
  color: #fefefe;
`;

const FileLink = styled.a`
  color: #fff;
  text-decoration: underline;
`;

const isReactFrame = (frame: StackFrame) =>
  /node_modules\/react(-dom)?\//.test(frame.fileName);

const editorHref = (path: string) => `vscode://file${path}`;

const StackFrameView: React.SFC<{ frame: StackFrame }> = ({ frame }) => {
  const pointedURL = `${frame.fileName}:${frame.lineNumber}`;
  return (
    <Fragment>
      {"  "}
      at {frame.functionName} (<FileLink href={editorHref(pointedURL)}>
        {pointedURL}
      </FileLink>)
      <br />
    </Fragment>
  );
};

const ErrorInformation: React.SFC<{
  error: Error;
  stack: StackFrame[];
}> = props => (
  <ErrorInformationContainer>
    <ErrorInformationPre>
      <b>{props.error.name}</b>: {props.error.message}
      <br />
      {props.stack
        .filter(_ => !isReactFrame(_))
        .map(frame => <StackFrameView frame={frame} key={frame.toString()} />)}
    </ErrorInformationPre>
  </ErrorInformationContainer>
);

enum StateType {
  Error,
  NoErrors
}

interface ErrorState {
  type: StateType.Error;
  error: Error;
  stack: StackFrame[];
}

interface NormalState {
  type: StateType.NoErrors;
}

type State = ErrorState | NormalState;

export default class ErrorBoundary extends React.Component<{}, State> {
  state: State = { type: StateType.NoErrors };

  async componentDidCatch(err: Error) {
    if (this.state.type !== StateType.Error) {
      const stack = await StackTrace.fromError(err, { offline: true });
      this.setState({ type: StateType.Error, error: err, stack });
    } else {
      throw err;
    }
  }

  componentWillReceiveProps() {
    this.setState({ type: StateType.NoErrors });
  }

  render() {
    if (this.state.type === StateType.Error) {
      return (
        <ErrorInformation error={this.state.error} stack={this.state.stack} />
      );
    } else {
      return this.props.children;
    }
  }
}
