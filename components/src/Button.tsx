import React from "react";

export interface Props {
  className?: string;
  /**
   * Button content
   */
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.SFC<Props> = props => (
  <button
    className={props.className}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.text}
  </button>
);

export default Button;
