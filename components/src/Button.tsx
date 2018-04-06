import React from "react";

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
  <button
    className={props.className}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.text}
  </button>
);

export default Button;
