declare module "react-element-to-jsx-string" {
  import React from "react";
  export default function(
    component: React.ReactElement<any>,
    options?: object
  ): string;
}
