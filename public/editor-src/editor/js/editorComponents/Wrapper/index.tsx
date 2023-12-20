import classNames from "classnames";
import React, {
  ComponentType,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
  createRef
} from "react";
import Animation from "visual/component/Animation";
import ContainerBorder from "visual/component/ContainerBorder";
import ContextMenu, { ContextMenuExtend } from "visual/component/ContextMenu";
import {
  ElementModel,
  ElementModelType
} from "visual/component/Elements/Types";
import { HoverAnimation } from "visual/component/HoverAnimation/HoverAnimation";
import {
  disabledHoverForElements,
  getHoverAnimationOptions
} from "visual/component/HoverAnimation/utils";
import { makeOptionValueToAnimation } from "visual/component/Options/types/utils/makeValueToOptions";
import { ProBlocked } from "visual/component/ProBlocked";
import { Roles, currentUserRole } from "visual/component/Roles";
import { ScrollMotion } from "visual/component/ScrollMotions";
import { makeOptionValueToMotion } from "visual/component/ScrollMotions/utils";
import {
  SortableElement,
  SortableElementDataAttributes
} from "visual/component/Sortable/SortableElement";
import SortableHandle from "visual/component/Sortable/SortableHandle";
import Toolbar, {
  ToolbarExtend as _ToolbarExtend
} from "visual/component/Toolbar";
import { PortalToolbar } from "visual/component/Toolbar/PortalToolbar";
import EditorArrayComponent from "visual/editorComponents/EditorArrayComponent";
import EditorComponent, {
  Props as EDProps,
  ToolbarExtend
} from "visual/editorComponents/EditorComponent";
import { OnChangeMeta } from "visual/editorComponents/EditorComponent/types";
import { getProTitle } from "visual/editorComponents/EditorComponent/utils";
import { ToolbarItemType } from "visual/editorComponents/ToolbarItemType";
import { Draggable } from "visual/editorComponents/tools/Draggable";
import { Value as DraggableV } from "visual/editorComponents/tools/Draggable/entities/Value";
import { getContainerSizes } from "visual/editorComponents/tools/Draggable/utils";
import { ElementTypes } from "visual/global/Config/types/configs/ElementTypes";
import { deviceModeSelector } from "visual/redux/selectors";
import { getStore } from "visual/redux/store";
import { css } from "visual/utils/cssStyle";
import { getWrapperContainerW } from "visual/utils/meta";
import { CssId, getCSSId } from "visual/utils/models/cssId";
import {
  defaultValueKey,
  defaultValueValue,
  validateKeyByProperty
} from "visual/utils/onChange";
import { WithClassName } from "visual/utils/options/attributes";
import * as Position from "visual/utils/position/element";
import { attachRef } from "visual/utils/react";
import { read as readBoolean } from "visual/utils/reader/bool";
import { DESKTOP, MOBILE, TABLET } from "visual/utils/responsiveMode";
import * as State from "visual/utils/stateMode";
import * as NoEmptyString from "visual/utils/string/NoEmptyString";
import * as Attr from "visual/utils/string/parseCustomAttributes";
import * as Str from "visual/utils/string/specs";
import { Literal } from "visual/utils/types/Literal";
import { MValue } from "visual/utils/value";
import { getAnimations } from "../../component/HoverAnimation/animations";
import contextMenuConfig from "./contextMenu";
import contextMenuConfigPro from "./contextMenuPro";
import defaultValue from "./defaultValue.json";
import * as sidebarConfig from "./sidebar";
import * as sidebarExtendConfig from "./sidebarExtend";
import { styleAnimation, styleWrapper } from "./styles";
import * as toolbarConfig from "./toolbar";
import * as toolbarExtendConfig from "./toolbarExtend";

export interface Value extends ElementModel, CssId {
  items: ElementModelType[];
}
type Component<P> = ComponentType<P> | keyof JSX.IntrinsicElements;
type Props = {
  meta: {
    desktopW: number;
    desktopWNoSpacing: number;
    tabletW: number;
    tabletWNoSpacing: number;
    mobileW: number;
    mobileWNoSpacing: number;
    sectionPopup?: boolean;
    sectionPopup2?: boolean;
    wrapperAnimationId: string;
    wrapperAnimationActive: boolean;
  };
};

type Static = WithClassName & {
  v: Value;
  vs: Value;
  vd: Value;
  extraAttr?: SortableElementDataAttributes;
  ref?: Ref<unknown>;
};

export default class Wrapper extends EditorComponent<Value, Props> {
  static get componentId(): string {
    return "Wrapper";
  }

  static defaultValue = defaultValue;

  static experimentalDynamicContent = true;

  childToolbarExtend?: ToolbarExtend = undefined;

  toolbarRef = createRef<PortalToolbar>();

  shouldComponentUpdate(nextProps: EDProps<Value, Props>): boolean {
    return this.optionalSCU(nextProps);
  }

  getInnerElement(): MValue<{ type: string; value: ElementModel }> {
    const v = this.getDBValue();
    return v.items[0] as MValue<{ type: string; value: ElementModel }>;
  }

  getTitleIfPro(): string | undefined {
    const model = this.getInnerElement();

    if (model !== undefined) {
      return NoEmptyString.is(model.type)
        ? getProTitle(model.type, model.value)
        : undefined;
    }

    return undefined;
  }

  handleValueChange(value: Value, meta: OnChangeMeta<Value>): void {
    if (value.items.length === 0) {
      this.selfDestruct();
    } else {
      super.handleValueChange(value, meta);
    }
  }

  handleRemove = (): void => {
    this.selfDestruct();
  };

  handleExtendParentToolbar = (childToolbarExtend: ToolbarExtend): void => {
    this.childToolbarExtend = childToolbarExtend;
  };

  getMeta(v: ElementModel): ElementModel {
    const { horizontalAlign, tabletHorizontalAlign, mobileHorizontalAlign } = v;
    const { meta } = this.props;
    const { w: desktopW, wNoSpacing: desktopWNoSpacing } = getWrapperContainerW(
      {
        v,
        w: meta.desktopW,
        wNoSpacing: meta.desktopWNoSpacing,
        device: DESKTOP
      }
    );
    const { w: tabletW, wNoSpacing: tabletWNoSpacing } = getWrapperContainerW({
      v,
      w: meta.tabletW,
      wNoSpacing: meta.tabletWNoSpacing,
      device: TABLET
    });
    const { w: mobileW, wNoSpacing: mobileWNoSpacing } = getWrapperContainerW({
      v,
      w: meta.mobileW,
      wNoSpacing: meta.mobileWNoSpacing,
      device: MOBILE
    });

    const animationName = Str.read(this.dvv("animationName")) ?? "none";
    const animationInfiniteAnimation =
      this.dvv("animationInfiniteAnimation") ?? false;

    return {
      ...meta,
      desktopW,
      desktopWNoSpacing,
      tabletW,
      tabletWNoSpacing,
      mobileW,
      mobileWNoSpacing,
      horizontalAlign,
      tabletHorizontalAlign,
      mobileHorizontalAlign,
      wrapperAnimationId: this.getId(),
      wrapperAnimationActive:
        animationName !== "none" && animationInfiniteAnimation
    };
  }

  renderContent(v: Value): ReactElement {
    const toolbarExtendFilter =
      v.showToolbar === "on" || currentUserRole() !== "admin"
        ? (toolbarExtendItems: ToolbarItemType[]): ToolbarItemType[] =>
            toolbarExtendItems.filter(
              (item) => item.id !== "duplicate" && item.id !== "remove"
            )
        : null;
    const itemsProps = this.makeSubcomponentProps({
      bindWithKey: "items",
      itemProps: {
        meta: this.getMeta(v),
        toolbarExtend: this.makeToolbarPropsFromConfig2(
          // @ts-expect-error: Need to convert all toolbars, sidebar to TS
          toolbarExtendConfig,
          sidebarExtendConfig,
          {
            allowExtendFromChild: false,
            parentItemsFilter: toolbarExtendFilter
          }
        ),
        extendParentToolbar: this.handleExtendParentToolbar
      }
    });

    return (
      /**
       * Since the EditorArrayComponent is still in JS,
       * TS cannot read properly it's return type
       * @ts-expect-error */
      <EditorArrayComponent {...itemsProps} />
    );
  }

  getHoverData(v: Value) {
    const hoverName = Str.read(this.dvv("hoverName")) ?? "none";
    const element = this.getInnerElement()?.type;
    const options = makeOptionValueToAnimation(v);
    const isHidden =
      !element ||
      disabledHoverForElements.includes(element as ElementTypes) ||
      !this.hoverAnimationOptionActive(hoverName);

    return {
      animationId: this.getId(),
      cssKeyframe: hoverName,
      options: getHoverAnimationOptions(options, hoverName),
      isHidden
    };
  }

  renderStatic({ v, vs, vd, extraAttr, className, ref }: Static): ReactElement {
    const { customAttributes } = v;
    const proTitleElement = this.getTitleIfPro();
    const cssId = getCSSId<Value>(v);

    if (proTitleElement) {
      const content = (
        <ProBlocked
          text={proTitleElement}
          absolute={false}
          onRemove={this.handleRemove}
        />
      );

      return (
        <ContainerBorder type="wrapper" color="grey" borderStyle="dotted">
          {({
            ref: containerBorderRef,
            attr: containerBorderAttr,
            border: ContainerBorderBorder
          }: {
            ref: Ref<HTMLDivElement>;
            border: ReactElement;
            attr: HTMLAttributes<Element>;
          }): ReactElement => (
            <Animation<"div">
              ref={(v: HTMLDivElement | null): void => {
                attachRef(v, containerBorderRef);
                attachRef(v, ref || null);
              }}
              component="div"
              className={classNames(
                this.getWrapperClassName(v, vs, vd),
                className
              )}
              animationId={this.getId()}
              animationClass={this.getAnimationClassName(v, vs, vd)}
              componentProps={{
                ...Attr.mRead(customAttributes),
                ...containerBorderAttr,
                ...extraAttr,
                id: cssId
              }}
            >
              <ContextMenuExtend
                // @ts-expect-error: Need to convert contextMenuConfig to TS
                {...this.makeContextMenuProps(contextMenuConfigPro)}
              >
                <ContextMenu
                  // @ts-expect-error: Need to convert contextMenuConfig to TS
                  {...this.makeContextMenuProps(contextMenuConfig)}
                  componentId={v?.items[0]?.type}
                >
                  <Roles
                    allow={["admin"]}
                    fallbackRender={(): ReactNode => content}
                  >
                    {v.showToolbar === "on" ? (
                      <_ToolbarExtend onEscape={this.handleToolbarEscape}>
                        {content}
                      </_ToolbarExtend>
                    ) : (
                      content
                    )}
                    {ContainerBorderBorder}
                  </Roles>
                </ContextMenu>
              </ContextMenuExtend>
            </Animation>
          )}
        </ContainerBorder>
      );
    }

    const { cssKeyframe, animationId, options, isHidden } =
      this.getHoverData(v);
    const { wrapperAnimationActive = false } = this.getMeta(v);
    const isDisabledHover = readBoolean(wrapperAnimationActive);
    const content = (
      <ScrollMotion
        className="brz-wrapper__scrollmotion"
        options={makeOptionValueToMotion(v)}
      >
        <HoverAnimation
          animationId={animationId}
          cssKeyframe={cssKeyframe}
          options={options}
          isDisabledHover={isDisabledHover}
          isHidden={isHidden}
        >
          {this.renderContent(v)}
        </HoverAnimation>
      </ScrollMotion>
    );

    return (
      <ContainerBorder
        type="wrapper"
        color="grey"
        borderStyle="dotted"
        buttonPosition="topRight"
        renderButtonWrapper={this.renderToolbar}
      >
        {({
          ref: containerBorderRef,
          attr: containerBorderAttr,
          button: ContainerBorderButton,
          border: ContainerBorderBorder
        }: {
          ref: Ref<HTMLDivElement>;
          button: ReactElement;
          border: ReactElement;
          attr: HTMLAttributes<Element>;
        }): ReactElement => (
          <Animation<"div">
            ref={(v: HTMLDivElement | null): void => {
              attachRef(v, containerBorderRef);
              attachRef(v, ref || null);
            }}
            animationId={this.getId()}
            component="div"
            className={classNames(
              this.getWrapperClassName(v, vs, vd),
              className
            )}
            animationClass={this.getAnimationClassName(v, vs, vd)}
            componentProps={{
              ...Attr.mRead(customAttributes),
              ...containerBorderAttr,
              ...extraAttr,
              id: cssId
            }}
          >
            <ContextMenu
              // @ts-expect-error: Need to convert contextMenuConfig to TS
              {...this.makeContextMenuProps(contextMenuConfig)}
              componentId={v?.items[0]?.type}
            >
              <Roles
                allow={["admin"]}
                fallbackRender={(): ReactNode => content}
              >
                {v.showToolbar === "on" ? (
                  <>
                    <_ToolbarExtend onEscape={this.handleToolbarEscape}>
                      {content}
                    </_ToolbarExtend>
                    {ContainerBorderButton}
                  </>
                ) : (
                  content
                )}
                {ContainerBorderBorder}
              </Roles>
            </ContextMenu>
          </Animation>
        )}
      </ContainerBorder>
    );
  }

  containerSize = (): { width: number; height: number } => {
    const v = this.getValue();
    const device = deviceModeSelector(getStore().getState());
    const meta = this.getMeta(v);
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    return getContainerSizes(v, device, meta, innerWidth, innerHeight);
  };

  dvv = (key: string): MValue<Literal> => {
    const v = this.getValue();
    const device = deviceModeSelector(getStore().getState());
    const state = State.mRead(v.tabsState);

    return defaultValueValue({ v, key, device, state });
  };

  renderForEdit(v: Value, vs: Value, vd: Value): ReactNode {
    const isRelative = Position.getPosition(this.dvv) === "relative";

    return (
      <SortableElement type="shortcode">
        {(extraAttr): ReactElement => {
          return (
            <Draggable
              active={!isRelative}
              onChange={this.handleDraggable}
              hAlign={Position.getHAlign(this.dvv) ?? "left"}
              vAlign={Position.getVAlign(this.dvv) ?? "top"}
              xSuffix={Position.getHUnit(this.dvv) ?? "px"}
              ySuffix={Position.getVUnit(this.dvv) ?? "px"}
              getValue={(): {
                x: number;
                y: number;
              } => ({
                x: Position.getHOffset(this.dvv) ?? 0,
                y: Position.getVOffset(this.dvv) ?? 0
              })}
              getContainerSizes={this.containerSize}
            >
              {(ref, className): ReactNode =>
                isRelative
                  ? this.renderStatic({ v, vs, vd, extraAttr })
                  : this.renderStatic({
                      v,
                      vs,
                      vd,
                      className,
                      ref
                    })
              }
            </Draggable>
          );
        }}
      </SortableElement>
    );
  }

  renderForView(v: Value, vs: Value, vd: Value): ReactNode {
    const { customAttributes } = v;
    const { sectionPopup, sectionPopup2 } = this.props.meta;
    const cssId = getCSSId(v);

    const { cssKeyframe, animationId, options, isHidden } =
      this.getHoverData(v);

    const content = (
      <ScrollMotion
        options={makeOptionValueToMotion(v)}
        className="brz-wrapper__scrollmotion"
      >
        <HoverAnimation
          animationId={animationId}
          cssKeyframe={cssKeyframe}
          options={options}
          isHidden={isHidden}
        >
          {this.renderContent(v)}
        </HoverAnimation>
      </ScrollMotion>
    );

    return (
      <Animation<"div">
        iterationCount={sectionPopup || sectionPopup2 ? Infinity : 1}
        component={"div"}
        animationId={this.getId()}
        className={classNames(this.getWrapperClassName(v, vs, vd))}
        animationClass={this.getAnimationClassName(v, vs, vd)}
        componentProps={{
          ...Attr.mRead(customAttributes),
          id: cssId
        }}
      >
        {content}
      </Animation>
    );
  }

  getWrapperClassName = (v: Value, vs: Value, vd: Value): string => {
    const { customClassName, cssClass } = v;
    const _className = Str.mRead(cssClass || customClassName);

    return classNames(
      css(this.getComponentId(), this.getId(), styleWrapper(v, vs, vd)),
      "brz-wrapper",
      _className
    );
  };

  getAnimationClassName = (
    v: Value,
    vs: Value,
    vd: Value
  ): string | undefined => {
    if (!validateKeyByProperty(v, "animationName", "none")) {
      return undefined;
    }

    const animationName = this.dvv("animationName");
    const animationDuration = this.dvv("animationDuration");
    const animationDelay = this.dvv("animationDelay");
    const animationInfiniteAnimation = this.dvv("animationInfiniteAnimation");

    const slug = `${animationName}-${animationDuration}-${animationDelay}-${animationInfiniteAnimation}`;

    return classNames(
      css(
        `${this.getComponentId()}-animation-${slug}`,
        `${this.getId()}-animation-${slug}`,
        styleAnimation(v, vs, vd)
      )
    );
  };

  hoverAnimationOptionActive = (hoverName: string): boolean => {
    return Boolean(getAnimations(hoverName));
  };

  handleDraggable = ({ x, y }: DraggableV): void => {
    const v = this.getValue();
    const state = State.mRead(v.tabsState);
    const device = deviceModeSelector(getStore().getState());

    const dvk = (key: string, value: number): ElementModel => ({
      [defaultValueKey({ key, device, state })]: value
    });

    this.patchValue(
      Position.setHOffset(dvk, x, Position.setVOffset(dvk, y, {}))
    );
  };

  handleToolbarEscape = (): void => this.toolbarRef.current?.show();

  renderToolbar = (Button: Component<Record<string, unknown>>): ReactNode => {
    const isPro = this.getTitleIfPro();

    return toolbar && isPro === undefined ? (
      <Toolbar
        // @ts-expect-error: Need convert toolbar, sidebar to TS
        {...this.makeToolbarPropsFromConfig2(toolbarConfig, sidebarConfig)}
        ref={this.toolbarRef}
      >
        <SortableHandle>
          <Button />
        </SortableHandle>
      </Toolbar>
    ) : null;
  };
}
