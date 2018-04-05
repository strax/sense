import React from "react";
import { Button } from "components";
import { Example, markdown } from "@sense/core";

export default (
  <Example
    component={Button}
    description={markdown`
      A simple button for demonstration purposes.
      You can **click** the button.
    `}
  >
    <Button text="foo bar baz" onClick={() => console.log("clicked!")} />
  </Example>
);
