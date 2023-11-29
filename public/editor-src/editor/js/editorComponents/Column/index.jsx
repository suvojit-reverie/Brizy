import classnames from "classnames";
import React from "react";
import _ from "underscore";
import Animation from "visual/component/Animation";
import Background from "visual/component/Background";
import ContainerBorder from "visual/component/ContainerBorder";
import ContextMenu from "visual/component/ContextMenu";
import CustomCSS from "visual/component/CustomCSS";
import { HoverAnimation } from "visual/component/HoverAnimation/HoverAnimation";
import { getHoverAnimationOptions } from "visual/component/HoverAnimation/utils";
import { makeOptionValueToAnimation } from "visual/component/Options/types/utils/makeValueToOptions";
import { Roles } from "visual/component/Roles";
import { ScrollMotion } from "visual/component/ScrollMotions";
import { makeOptionValueToMotion } from "visual/component/ScrollMotions/utils";
import { SortableElement } from "visual/component/Sortable/SortableElement";
import SortableHandle from "visual/component/Sortable/SortableHandle";
import Toolbar, { ToolbarExtend } from "visual/component/Toolbar";
import EditorArrayComponent from "visual/editorComponents/EditorArrayComponent";
import EditorComponent from "visual/editorComponents/EditorComponent";
import { shouldRenderPopup } from "visual/editorComponents/tools/Popup";
import { blocksDataSelector, deviceModeSelector } from "visual/redux/selectors";
import { getStore } from "visual/redux/store";
import { css } from "visual/utils/cssStyle";
import { getContainerW } from "visual/utils/meta";
import { getCSSId } from "visual/utils/models/cssId";
import {
  defaultValueValue,
  validateKeyByProperty
} from "visual/utils/onChange";
import { handleLinkChange } from "visual/utils/patch/Link";
import { attachRef } from "visual/utils/react";
import * as State from "visual/utils/stateMode";
import { parseCustomAttributes } from "visual/utils/string/parseCustomAttributes";
import * as Str from "visual/utils/string/specs";
import { styleSizeWidth } from "visual/utils/style2";
import Items from "./Items";
import ColumnResizer from "./components/ColumnResizer";
import contextMenuConfig from "./contextMenu";
import defaultValue from "./defaultValue.json";
import * as sidebarConfig from "./sidebar";
import { styleAnimation, styleColumn, styleItems } from "./styles";
import * as toolbarConfig from "./toolbar";
import { getLinkData } from "visual/utils/models/link";
import Link from "visual/component/Link";

class Column extends EditorComponent {
  static get componentId() {
    return "Column";
  }

  static defaultProps = {
    meta: {},
    popoverData: [],
    onResizeStart: _.noop,
    onResize: _.noop,
    onResizeEnd: _.noop
  };

  static defaultValue = defaultValue;

  static experimentalDynamicContent = true;

  containerBorderRef = React.createRef();

  toolbarRef = React.createRef();

  shouldComponentUpdate(nextProps) {
    const { meta, tabletReversed, mobileReversed } = this.props;
    const reversed =
      nextProps.mobileReversed !== mobileReversed ||
      nextProps.tabletReversed !== tabletReversed;

    const { index: previousIndex } = this.props.meta.row?.item ?? {};
    const { index: currentIndex } = nextProps.meta.row?.item ?? {};

    const indexWasChanged = previousIndex !== currentIndex;

    return (
      meta.posts ||
      meta.inCarousel ||
      reversed ||
      this.optionalSCU(nextProps) ||
      indexWasChanged
    );
  }

  handleResizeStart = (position) => {
    if (this.containerBorderRef.current) {
      this.containerBorderRef.current.setActive(true);
    }

    this.props.onResizeStart(position);
  };

  handleResize = (deltaX, position) => {
    this.props.onResize(deltaX, position);
  };

  handleResizeEnd = (position) => {
    if (this.containerBorderRef.current) {
      this.containerBorderRef.current.setActive(false);
    }

    this.props.onResizeEnd(position);
  };

  handleToolbarEscape = () => {
    this.toolbarRef.current.show();
  };

  patchValue(patch, meta) {
    const link = handleLinkChange(patch);
    super.patchValue({ ...patch, ...link }, meta);
  }

  getMeta(v) {
    const { verticalAlign, tabletVerticalAlign, mobileVerticalAlign } = v;
    const { meta } = this.props;
    const width = styleSizeWidth({ v, device: "desktop" });
    const tabletWidth = styleSizeWidth({ v, device: "tablet" });
    const mobileWidth = styleSizeWidth({ v, device: "mobile" });
    const { w: desktopW, wNoSpacing: desktopWNoSpacing } = getContainerW({
      v,
      width,
      w: meta.desktopW,
      wNoSpacing: meta.desktopWNoSpacing,
      device: "desktop"
    });
    const { w: tabletW, wNoSpacing: tabletWNoSpacing } = getContainerW({
      v,
      w: meta.tabletW,
      wNoSpacing: meta.tabletWNoSpacing,
      width: tabletWidth,
      device: "tablet"
    });
    const { w: mobileW, wNoSpacing: mobileWNoSpacing } = getContainerW({
      v,
      w: meta.mobileW,
      wNoSpacing: meta.mobileWNoSpacing,
      width: mobileWidth,
      device: "mobile"
    });

    return _.extend({}, meta, {
      column: {
        width,
        tabletWidth,
        mobileWidth,
        verticalAlign,
        tabletVerticalAlign,
        mobileVerticalAlign
      },
      desktopW,
      desktopWNoSpacing,
      tabletW,
      tabletWNoSpacing,
      mobileW,
      mobileWNoSpacing
    });
  }

  isInnerRow() {
    const { meta } = this.props;

    return meta.row && meta.row.isInner;
  }

  dvv = (key) => {
    const v = this.getValue();
    const device = deviceModeSelector(this.getReduxState());

    const state = State.mRead(v.tabsState);

    return defaultValueValue({ v, key, device, state });
  };

  getAnimationClassName = (v, vs, vd) => {
    if (!validateKeyByProperty(v, "animationName", "none")) {
      return undefined;
    }

    const animationName = this.dvv("animationName");
    const animationDuration = this.dvv("animationDuration");
    const animationDelay = this.dvv("animationDelay");
    const animationInfiniteAnimation = this.dvv("animationInfiniteAnimation");

    const slug = `${animationName}-${animationDuration}-${animationDelay}-${animationInfiniteAnimation}`;

    return classnames(
      css(
        `${this.getComponentId()}-animation-${slug}`,
        `${this.getId()}-animation-${slug}`,
        styleAnimation(v, vs, vd)
      )
    );
  };

  getRef = (portalToolbar) => {
    if (this.props.getParentRef) {
      return this.props.getParentRef(portalToolbar?.node) ?? this.toolbarRef;
    }
    return this.toolbarRef;
  };

  renderToolbar = (ContainerBorderButton) => {
    return (
      <Toolbar
        {...this.makeToolbarPropsFromConfig2(toolbarConfig, sidebarConfig)}
        ref={(el) => {
          attachRef(el, this.getRef(el));
        }}
      >
        <SortableHandle>
          <ContainerBorderButton />
        </SortableHandle>
      </Toolbar>
    );
  };

  getHoverData = (v) => {
    const hoverName = Str.read(this.dvv("hoverName")) ?? "none";
    const options = makeOptionValueToAnimation(v);

    return {
      hoverName,
      options: getHoverAnimationOptions(options, hoverName),
      animationId: this.getId(),
      isHidden: hoverName === "none"
    };
  };

  renderResizer(position) {
    const {
      meta: { row, inGrid },
      popoverData
    } = this.props;

    if (!inGrid) {
      return null;
    }

    const { isFirst } = row.item;
    const isInnerRow = this.isInnerRow();

    if (isFirst && position === "left") {
      return null;
    }

    return (
      <ColumnResizer
        popoverData={popoverData}
        position={position}
        color={isInnerRow && inGrid ? "red" : "blue"}
        onResizeStart={this.handleResizeStart}
        onResize={this.handleResize}
        onResizeEnd={this.handleResizeEnd}
      />
    );
  }

  renderContent(v, vs, vd) {
    const className = classnames(
      "brz-column__items",
      css(
        `${this.constructor.componentId}-bg`,
        `${this.getId()}-bg`,
        styleItems(v, vs, vd)
      )
    );

    const itemsProps = this.makeSubcomponentProps({
      bindWithKey: "items",
      containerClassName: className,
      meta: this.getMeta(v)
    });

    return (
      <Background value={v} meta={this.getMeta(v)}>
        <Items {...itemsProps} />
      </Background>
    );
  }

  renderPopups() {
    const popupsProps = this.makeSubcomponentProps({
      bindWithKey: "popups",
      itemProps: (itemData) => {
        let {
          blockId,
          value: { popupId }
        } = itemData;

        if (itemData.type === "GlobalBlock") {
          // TODO: some kind of error handling
          const globalBlocks = blocksDataSelector(getStore().getState());
          const blockData = globalBlocks[itemData.value._id];
          popupId = blockData.value.popupId;
        }

        return {
          blockId,
          instanceKey: IS_EDITOR
            ? `${this.getId()}_${popupId}`
            : itemData.type === "GlobalBlock"
            ? `global_${popupId}`
            : popupId
        };
      }
    });

    return <EditorArrayComponent {...popupsProps} />;
  }

  renderForEdit(v, vs, vd) {
    const { items, customClassName, cssClass, customAttributes } = v;
    const {
      meta: { inGrid, posts }
    } = this.props;
    const id = getCSSId(v);
    const isInnerRow = this.isInnerRow();

    const classNameColumn = classnames(
      "brz-columns",
      { "brz-columns__posts": posts },
      { "brz-columns--empty": items.length === 0 },
      css(
        `${this.constructor.componentId}-column`,
        `${this.getId()}-column`,
        styleColumn(v, vs, vd)
      ),
      cssClass || customClassName
    );

    const animationClassName = this.getAnimationClassName(v, vs, vd);
    const { animationId, hoverName, options, isHidden } = this.getHoverData(v);
    const content = (
      <ScrollMotion
        options={makeOptionValueToMotion(v)}
        className="brz-columns__scroll-effect"
      >
        <HoverAnimation
          animationId={animationId}
          cssKeyframe={hoverName}
          options={options}
          target={"parent"}
          isHidden={isHidden}
        >
          {this.renderContent(v, vs, vd)}
        </HoverAnimation>
      </ScrollMotion>
    );

    return (
      <>
        <SortableElement type="column" useHandle={true}>
          {(sortableElementAttr) => (
            <ContextMenu {...this.makeContextMenuProps(contextMenuConfig)}>
              <ContainerBorder
                type={posts ? "column__posts" : "column"}
                ref={this.containerBorderRef}
                color={isInnerRow && inGrid ? "red" : "blue"}
                borderStyle="solid"
                activateOnContentClick={false}
                buttonPosition="topRight"
                renderButtonWrapper={this.renderToolbar}
              >
                {({
                  ref: containerBorderRef,
                  attr: containerBorderAttr,
                  button: ContainerBorderButton,
                  border: ContainerBorderBorder
                }) => (
                  <CustomCSS selectorName={this.getId()} css={v.customCSS}>
                    <Animation
                      ref={containerBorderRef}
                      component={"div"}
                      animationClass={animationClassName}
                      componentProps={{
                        ...parseCustomAttributes(customAttributes),
                        ...sortableElementAttr,
                        ...containerBorderAttr,
                        ...(id && { id }),
                        className: classNameColumn
                      }}
                    >
                      <Roles allow={["admin"]} fallbackRender={() => content}>
                        {this.renderResizer("left")}
                        {this.renderResizer("right")}
                        <ToolbarExtend onEscape={this.handleToolbarEscape}>
                          {content}
                        </ToolbarExtend>
                        {ContainerBorderButton}
                        {ContainerBorderBorder}
                      </Roles>
                    </Animation>
                  </CustomCSS>
                )}
              </ContainerBorder>
            </ContextMenu>
          )}
        </SortableElement>
        {shouldRenderPopup(v, blocksDataSelector(getStore().getState())) &&
          this.renderPopups()}
      </>
    );
  }

  renderForView(v, vs, vd) {
    const { tagName, customClassName, cssClass, customAttributes } = v;
    const { sectionPopup, sectionPopup2 } = this.props.meta;

    const id = getCSSId(v);
    const classNameColumn = classnames(
      "brz-columns",
      css(
        `${this.constructor.componentId}-column`,
        `${this.getId()}-column`,
        styleColumn(v, vs, vd)
      ),
      cssClass || customClassName
    );

    const animationClassName = this.getAnimationClassName(v, vs, vd);
    const { animationId, hoverName, options, isHidden } = this.getHoverData(v);

    const linkData = getLinkData(v);

    return (
      <>
        <CustomCSS selectorName={this.getId()} css={v.customCSS}>
          <Animation
            iterationCount={sectionPopup || sectionPopup2 ? Infinity : 1}
            component={tagName}
            componentProps={{
              ...parseCustomAttributes(customAttributes),
              ...(id && { id }),
              className: classNameColumn
            }}
            animationClass={animationClassName}
          >
            <ScrollMotion
              options={makeOptionValueToMotion(v)}
              className="brz-columns__scroll-effect"
            >
              <HoverAnimation
                animationId={animationId}
                cssKeyframe={hoverName}
                options={options}
                target={"parent"}
                isHidden={isHidden}
              >
                {this.renderContent(v, vs, vd)}
              </HoverAnimation>
            </ScrollMotion>
            {linkData.href && (
              <Link
                className="brz-container-link"
                type={linkData.type}
                href={linkData.href}
                target={linkData.target}
                rel={linkData.rel}
              />
            )}
          </Animation>
        </CustomCSS>
        {shouldRenderPopup(v, blocksDataSelector(getStore().getState())) &&
          this.renderPopups()}
      </>
    );
  }
}

export default Column;
