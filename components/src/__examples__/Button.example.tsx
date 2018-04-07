import React from "react";
import Button, { ButtonSize } from "../Button";
import { example, doc, props } from "@sense/core";

export default example(
  doc`
    A simple clickable Button.
    ${props(Button)}
  `,
  <Button text="Normal size" onClick={() => console.log("Clicked!")} />
  // variants(
  //   <Button text="Normal size" onClick={() => console.log("clicked!")} />,
  //   <Button text="Large size" size={ButtonSize.Large} />,
  //   <Button text="Disabled" disabled />
  // )
);
