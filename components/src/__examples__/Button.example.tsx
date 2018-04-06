import React from "react";
import { Button } from "components";
import { Example, markdown, Variants } from "@sense/core";

export default (
  <Example
    description={markdown`
      A simple button for demonstration purposes.
      You can **click** the button.
    `}
  >
    <Variants>
      <Button text="Normal" onClick={() => console.log("clicked!")} />
      <Button text="Disabled" disabled />
    </Variants>
  </Example>
);
