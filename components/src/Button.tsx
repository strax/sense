import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  appearance: none;
`;

export interface Props {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  /**
   * The text content of the button
   */
  text: string;
}

export const Button: React.SFC<Props> = props => (
  <StyledButton
    className={props.className}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.text}
  </StyledButton>
);

export default Button;
