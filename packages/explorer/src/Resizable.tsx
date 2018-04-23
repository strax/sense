import React from "react";
import styled from "styled-components";

interface Props {
  children: (ctx: {width: number, onResize: (width: number) => any}) => JSX.Element;
  defaultWidth: number;
  step?: number;
}

interface DividerProps {
  className?: string;
  currentWidth: number;
  onResize: (width: number) => any;
}

const DividerElement = styled.div`
  height: 100%;
  width: 3px;
  width: 1rem;
  background: #21212b;
  cursor: ew-resize;
  user-select: none;
`

class Divider extends React.Component<DividerProps> {
  private dragging = false;
  private prevCursor!: string | null;
  private x0: number;

  private onMouseDown = (evt: React.MouseEvent<any>) => {
    this.dragging = true;
    this.x0 = evt.clientX;
    this.prevCursor = document.body.style.cursor;
    document.body.style.cursor = "ew-resize";
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);
  }

  private onMouseMove = (evt: MouseEvent) => {
    if (this.dragging) {
      const delta = this.x0 - evt.clientX;
      this.props.onResize(this.props.currentWidth + delta);
      this.x0 = evt.clientX;
    }
  }

  private onMouseUp = () => {
    this.dragging = false;
    document.body.style.cursor = this.prevCursor;
  }

  render() {
    return <div onMouseDown={this.onMouseDown}>{this.props.children}</div>
  }
}

interface State {
  width: number;
}

const ResizableContext = React.createContext<{width: number, onResize: (width: number) => any}>();

export default class Resizable extends React.Component<Props, State> {
  static Divider = React.forwardRef<Divider>((props, ref) => {
    return <ResizableContext.Consumer>{ctx => <Divider {...props} onResize={ctx!.onResize} currentWidth={ctx!.width} ref={ref} />}</ResizableContext.Consumer>
  })

  static getDerivedStateFromProps(props: Props): State {
    return {width: props.defaultWidth};
  }

  state = {width: 0};

  private onResize = (width: number) => {
    if (Math.abs(this.state.width - width) > (this.props.step || 0)) {
      this.setState({ width });
    }
  }

  render() {
    return <ResizableContext.Provider value={{width: this.state.width, onResize: this.onResize}}>
      {this.props.children({width: this.state.width, onResize: this.onResize})}
    </ResizableContext.Provider>;
  }
}
