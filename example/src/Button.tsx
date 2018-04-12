import React from "react";
import styled, { css } from "styled-components";

export enum ButtonSize {
  Normal = 28,
  Large = 36
}

const px = (n: number) => `${n}px`;

interface StyledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
}

const size = (props: StyledButtonProps) => {
  const h = props.size || ButtonSize.Normal;
  return css`
    height: ${px(h)};
    padding: 0 ${px(h / 2)};
  `;
};

const StyledButton = styled.button`
  appearance: none;
  font-size: 16px;
  font-family: "Proxima Nova";
  color: #222;
  border-radius: 3px;
  -webkit-font-smoothing: antialiased;
  font-weight: 700;
  border: 0;
  user-select: none;
  background: #0072C6;
  color: #fefefe;
  outline: none;

  ${size};

  &:disabled {
    background: #A2CBEA;
    color: #79797F;
  }

  &:hover, &:active {
    background-color: #0068B4;
  }

  &:active, &:focus {
    box-shadow: 0 0 0 4px rgba(0, 114, 198, 0.4);
  }

  pointer-events: ${props => (props.disabled ? "none" : "auto")}

  &:hover {
    cursor: pointer;
  }
`;

export interface Props {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: ButtonSize;
  /**
   * The text content of the button
   */
  text: string;
}

export const Button: React.SFC<Props> = props => (
  <StyledButton
    size={props.size}
    className={props.className}
    onClick={props.onClick}
    tabIndex={1}
    role="button"
    disabled={props.disabled}
  >
    {props.text}
  </StyledButton>
);

export default Button;
