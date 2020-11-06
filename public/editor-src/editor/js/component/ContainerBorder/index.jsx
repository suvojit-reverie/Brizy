import React from "react";
import T from "prop-types";
import classnames from "classnames";
import ClickOutside from "visual/component/ClickOutside";
import ContainerBorderButton from "./ContainerBorderButton";

export default class ContainerBorder extends React.Component {
  static propTypes = {
    type: T.string,
    className: T.string,
    color: T.oneOf(["grey", "blue", "red"]),
    borderStyle: T.oneOf(["none", "solid", "dotted"]),
    activeBorderStyle: T.oneOf(["none", "solid", "dotted"]),
    buttonPosition: T.oneOf(["topLeft", "topRight"]),
    renderButtonWrapper: T.func,
    activateOnContentClick: T.bool,
    clickOutsideExceptions: T.arrayOf(T.string),
    children: T.func
  };

  static defaultProps = {
    type: "element",
    borderStyle: "none",
    buttonPosition: "topRight",
    activateOnContentClick: true,
    clickOutsideExceptions: [
      "#brz-toolbar-portal",
      ".brz-ed-sidebar__right",
      ".brz-ed-tooltip__content-portal"
    ]
  };

  containerRef = React.createRef();

  innerBorderRef = React.createRef();

  buttonRef = React.createRef();

  buttonInnerRef = React.createRef();

  isBorderActive = false;

  isButtonActive = false;

  isHovered = false;

  componentDidMount() {
    // we attach a native click handler instead
    // of doing it via jsx because we don't want
    // to catch clicks from components that aren't
    // physically (in the actual DOM) inside of ContainerBorder
    // React on the other hand bubbles clicks from all the subtree
    // regardless of the physical position in the DOM thus
    // we will be reacting to clicks from toolbars and other portals
    this.containerRef.current.addEventListener(
      "click",
      this.handleContentClick
    );
    this.containerRef.current.addEventListener(
      "brz.toolbar.mouseenter",
      this.handleToolbarMouseEnter
    );
    this.containerRef.current.addEventListener(
      "brz.toolbar.mouseleave",
      this.handleToolbarMouseLeave
    );
    this.containerRef.current.addEventListener(
      "brz.toolbar.open",
      this.handleToolbarOpen
    );
    this.containerRef.current.addEventListener(
      "brz.toolbar.close",
      this.handleToolbarClose
    );
  }

  handleContentClick = e => {
    this.handleActivationEvent(e);
  };

  handleButtonClick = e => {
    this.handleActivationEvent(e);
  };

  handleClickOutside = () => {
    this.setActive(false, false);
    this.setHover(false);
  };

  handleToolbarMouseEnter = () => {
    if (!this.isBorderActive && !this.isButtonActive) {
      this.setHover(true);
    }
  };

  handleToolbarMouseLeave = () => {
    if (!this.isBorderActive && !this.isButtonActive) {
      this.setHover(false);
    }
  };

  handleToolbarOpen = e => {
    this.handleActivationEvent(e);
  };

  handleToolbarClose = () => {
    this.setActive(false, false);
  };

  handleActivationEvent = e => {
    const { activateOnContentClick } = this.props;

    if (e.brzContainerBorderHandled) {
      return;
    }

    let handled = false;
    const button = this.buttonInnerRef.current;

    if (button && button.contains(e.target)) {
      this.setActive(true, true);
      handled = true;
    }

    if (!handled && activateOnContentClick) {
      this.setActive(true, false);
      handled = true;
    }

    if (handled) {
      e.brzContainerBorderHandled = true;
    }

    if (!handled && (this.isBorderActive || this.isBorderActive)) {
      this.setActive(false, false);
    }
  };

  setActive(border, button = false) {
    const { type } = this.props;

    if (this.isButtonActive !== button) {
      this.isButtonActive = button;
      this.buttonRef.current.setActive(button);
    }

    if (this.isBorderActive !== border) {
      this.isBorderActive = border;
      if (border) {
        this.containerRef.current.setAttribute("data-border--active", type);
      } else {
        this.containerRef.current.removeAttribute("data-border--active");
      }
    }
  }

  setHover(hover) {
    if (hover !== this.isHovered) {
      this.isHovered = hover;

      if (hover) {
        const { type } = this.props;
        this.containerRef.current.setAttribute("data-border--hovered", type);
      } else {
        this.containerRef.current.removeAttribute("data-border--hovered");
      }
    }
  }

  renderButton = props => {
    const { buttonPosition } = this.props;

    return (
      <ContainerBorderButton
        {...props}
        ref={this.buttonRef}
        innerRef={this.buttonInnerRef}
        position={buttonPosition}
      />
    );
  };

  render() {
    const {
      type,
      color,
      borderStyle,
      activeBorderStyle,
      renderButtonWrapper,
      children,
      clickOutsideExceptions
    } = this.props;

    // button
    const button = renderButtonWrapper
      ? renderButtonWrapper(this.renderButton)
      : this.renderButton();

    // border
    const borderClassName = classnames("brz-ed-border__inner", {
      [`brz-ed-border--${borderStyle}`]: borderStyle,
      [`brz-ed-border--active-${activeBorderStyle}`]: activeBorderStyle
    });
    const border = (
      <div ref={this.innerBorderRef} className={borderClassName} />
    );

    let attr = {
      "data-border": type
    };

    if (color) {
      attr[`data-border--${color}`] = type;
    }

    return (
      <ClickOutside
        exceptions={clickOutsideExceptions}
        onClickOutside={this.handleClickOutside}
      >
        {children({
          ref: this.containerRef,
          button,
          border,
          attr
        })}
      </ClickOutside>
    );
  }
}
