import { ComponentMetadata } from "@sense/webpack-ts-props-loader";

export default function componentMetadata(
  component: React.ComponentType
): ComponentMetadata | null {
  const metadata = (component as any)[Symbol.for("react/metadata")];
  return metadata || null;
}
