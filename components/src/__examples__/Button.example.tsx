import React from "react";
import { Button } from "components";
import { Example, markdown } from "@sense/core";

export default (
  <Example
    component={Button}
    description={markdown`
This is the **bestest** thing you're going to see!
    `}
  >
    <Button text="Click me plz" />
  </Example>
);
