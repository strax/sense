import React from "react";
import Button, { ButtonSize } from "../Button";
import { example, doc, props } from "@sense/core";
import "common-tags";

export default example(
  doc`
    A simple clickable Button.

    It is possible to customize it even further by passing a custom argument.

    ${props(Button)}
  `,
  <Button text="Normal size" onClick={() => console.log("Clicked!")} />
  // variants(
  //   <Button text="Normal size" onClick={() => console.log("clicked!")} />,
  //   <Button text="Large size" size={ButtonSize.Large} />,
  //   <Button text="Disabled" disabled />
  // )
);
