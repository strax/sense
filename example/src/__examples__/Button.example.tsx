import React from "react";
import Button from "../Button";
import { example, doc } from "@sense/core";

export default example(
  doc`
    A simple clickable Button.

    It is possible to customize it even further by passing a custom argument.
  `,
  <div>
    <Button text="Normal size" onClick={() => console.log("Clicked!")} />
    HI
  </div>
  // variants(
  //   <Button text="Normal size" onClick={() => console.log("clicked!")} />,
  //   <Button text="Large size" size={ButtonSize.Large} />,
  //   <Button text="Disabled" disabled />
  // )
);
