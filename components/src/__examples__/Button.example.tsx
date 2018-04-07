import React from "react";
import Button from "../Button";
import { Example, Variants, doc, props } from "@sense/core";

export default (
  <Example
    description={doc`
      This is a sample example for the Button component.
      ${props(Button)}
    `}
  >
    <Button text="Normal" onClick={() => console.log("clicked!")} />
  </Example>
);
