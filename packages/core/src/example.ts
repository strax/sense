export class Example {
  constructor(
    public readonly render: JSX.Element,
    public readonly description: string | null
  ) {}
}

export function example(render: JSX.Element): Example;
export function example(doc: string, render: JSX.Element): Example;
export function example(
  docOrRender: string | JSX.Element,
  render?: JSX.Element
) {
  if (render === undefined) {
    return example(null, docOrRender as JSX.Element);
  } else {
    const doc = docOrRender as string;
    return new Example(render, doc);
  }
}
