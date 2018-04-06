export interface ComponentMetadata {
  name: string;
  props: Array<PropMetadata>;
}

export interface PropMetadata {
  key: string;
  type: string;
  description?: string;
  optional: boolean;
}
