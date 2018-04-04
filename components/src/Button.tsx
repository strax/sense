import React from "react";

export interface Props {
  className?: string;
  /**
   * Button content
   */
  text: string;
  onClick?: () => void;
}

const Button: React.SFC<Props> = props => (
  <button className={props.className} onClick={props.onClick}>
    {props.text}
  </button>
);

export default Button;
