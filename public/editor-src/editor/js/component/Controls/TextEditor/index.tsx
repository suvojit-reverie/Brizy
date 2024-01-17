import classnames from "classnames";
import React, { Component } from "react";
import _ from "underscore";
import { Translate } from "visual/component/Translate";
import { t } from "visual/utils/i18n";
import { discardXSS } from "visual/utils/xss";
import { DefaultProps, Props, State } from "./types";

const keyCodes = {
  ENTER: 13,
  B: 66,
  I: 73,
  U: 85,
  V: 86,
  Y: 89,
  Z: 90
};

export class TextEditor extends Component<Props, State> {
  static defaultProps: DefaultProps = {
    // TODO: refactor value prop name to defaultValue because
    // this is essentially an uncontrolled component at the moment
    value: t("Editable Text"),
    tagName: "span",
    className: ""
  };

  contentRef = React.createRef<HTMLElement>();

  unmounted = false;

  lastNotifiedValue: string | undefined;

  shouldComponentUpdate(nextProps: Props): boolean {
    return (
      this.lastNotifiedValue !== nextProps.value ||
      this.props.tagName !== nextProps.tagName ||
      this.props.className !== nextProps.className
    );
  }

  componentDidMount(): void {
    const element = this.contentRef.current;

    if (element !== null) {
      this.lastNotifiedValue = this.props.value;
      element.addEventListener("input", this.handleInput);
    }
  }

  componentDidUpdate(): void {
    this.lastNotifiedValue = this.props.value;

    // this code shouldn't be here because
    // at componentDidUpdate the value in the DOM
    // should be equal to this.props.value
    // but somehow that isn't always the case
    const content = this.contentRef.current;
    if (content && content.textContent !== this.lastNotifiedValue) {
      content.textContent = this.lastNotifiedValue ?? "";
    }
  }

  componentWillUnmount(): void {
    this.unmounted = true;
  }

  handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();

    const node = this.contentRef.current;

    // issue - https://github.com/bagrinsergiu/blox-editor/issues/1848
    // What does it need for?
    // node.setAttribute("contentEditable", "true");
    node?.classList.add("brz-ed-dd-cancel");
    // node.focus();
  };

  handleKeyDown = (e: React.KeyboardEvent): void => {
    const keyCode = e.which;
    const holdsMeta = e.metaKey || e.ctrlKey;

    // prevent enter
    if (keyCode === keyCodes.ENTER) {
      e.preventDefault();
      return;
    }

    // prevent ctrl + {B,I,U}
    if (
      holdsMeta &&
      (keyCode === keyCodes.B ||
        keyCode === keyCodes.I ||
        keyCode === keyCodes.U)
    ) {
      e.preventDefault();
      return;
    }

    // prevent undo / redo
    if (holdsMeta && (keyCode === keyCodes.Z || keyCode === keyCodes.Y)) {
      e.preventDefault();
      return;
    }
  };

  handleInput = (e: Event): void => {
    const node = e.currentTarget as HTMLElement;

    this.notifyChange(discardXSS(node) || "");
  };

  notifyChange = _.debounce((value: string): void => {
    if (!this.unmounted) {
      this.lastNotifiedValue = value;
      this.props.onChange(value);
    }
  }, 1000);

  handleBlur = (): void => {
    this.contentRef.current?.classList.remove("brz-ed-dd-cancel");
  };

  handlePaste = (e: React.ClipboardEvent): void => {
    e.preventDefault();
    const data = e.clipboardData.getData("text/plain");
    const text = discardXSS(data);

    document.execCommand("insertHTML", false, text);
  };

  render(): React.ReactElement {
    const {
      tagName,
      value,
      className: className_
    } = this.props as Props & DefaultProps;
    const className = classnames(
      className_,
      `brz-${tagName}`,
      "brz-text__editor"
    );

    return (
      <Translate
        tagName={tagName}
        ref={this.contentRef}
        className={className}
        contentEditable={IS_EDITOR}
        dangerouslySetInnerHTML={{ __html: value }}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onPaste={this.handlePaste}
        onBlur={this.handleBlur}
      />
    );
  }
}
