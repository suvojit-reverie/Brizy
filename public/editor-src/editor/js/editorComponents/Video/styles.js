import { renderStyles } from "visual/utils/cssStyle";

export function styleContent(v, vs, vd) {
  const styles = {
    ".brz &&:hover": {
      standart: [
        "cssStyleElementVideoBgColorRatio",
        "cssStyleSizeMaxWidthSize",
        "cssStyleBorderRadius",
        "cssStyleBoxShadow"
      ],
      interval: [
        "cssStyleHoverTransition",
        "cssStylePropertyHoverTransitionTransform"
      ]
    },
    ".brz &&:hover .brz-video-content": {
      standart: [
        "cssStyleBorder",
        "cssStyleBorderRadius",
        "cssStyleElementVideoMask"
      ],
      interval: [
        "cssStyleHoverTransition",
        "cssStylePropertyHoverTransitionTransform"
      ]
    },
    ".brz &&:hover .brz-iframe, && .brz-video__cover:before": {
      standart: ["cssStyleElementVideoFilter"]
    },
    ".brz &&:hover.brz-custom-video video": {
      standart: ["cssStyleElementVideoFilter"]
    },
    ".brz &&:hover .brz-iframe": {
      standart: ["cssStyleElementVideoIframeFix"]
    }
  };
  return renderStyles({ v, vs, vd, styles });
}

export function styleWrapper(v, vs, vd) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleElementVideoPaddingRatio"]
    },
    ".brz &&:hover .brz-video__cover::before": {
      standart: [
        "cssStyleElementVideoCoverSrc",
        "cssStyleElementVideoCoverPosition",
        "cssStyleElementVideoBgSize"
      ]
    },
    ".brz &&:hover .brz-video__cover .brz-video__cover-icon": {
      standart: [
        "cssStyleElementVideoIconFontSize",
        "cssStyleElementVideoIconWidth",
        "cssStyleElementVideoIconHeight",
        "cssStyleBgColor"
      ],
      interval: [
        "cssStyleHoverTransition",
        "cssStylePropertyHoverTransitionTransform"
      ]
    },
    ".brz &&:hover .brz-video__cover .brz-video__cover-icon .brz-span": {
      standart: ["cssStyleColor"],
      interval: [
        "cssStyleHoverTransition",
        "cssStylePropertyHoverTransitionTransform"
      ]
    }
  };

  return renderStyles({ v, vs, vd, styles });
}

export function styleCustomVideo(v, vs, vd) {
  const styles = {
    ".brz && > .brz-video-custom-video-controls > .brz-video-custom-controls > .brz-video-custom-current-time:hover": {
      standart: ["cssStyleVideoIconControls"],
      interval: [
        "cssStyleHoverTransition",
        "cssStylePropertyHoverTransitionTransform"
      ]
    },
    ".brz && > .brz-video-custom-video-controls > .brz-video-custom-controls > .brz-video-custom-total-time:hover": {
      standart: ["cssStyleVideoIconControls"],
      interval: [
        "cssStyleHoverTransition",
        "cssStylePropertyHoverTransitionTransform"
      ]
    },
    ".brz && .brz-video-custom-slider:hover:before": {
      standart: ["cssStyleBg2Color", "cssStyleBorderRadius"],
      interval: [
        "cssStyleHoverTransition",
        "cssStylePropertyHoverTransitionTransform"
      ]
    },
    ".brz && .brz-video-custom-slider:hover .brz-video-custom-progress": {
      standart: ["cssStyleBg2Color"],
      interval: [
        "cssStyleHoverTransition",
        "cssStylePropertyHoverTransitionTransform"
      ]
    },
    ".brz && .brz-video-custom-video-controls:hover": {
      standart: ["cssStyleVideoControlsBgColor"],
      interval: [
        "cssStyleHoverTransition",
        "cssStylePropertyHoverTransitionTransform"
      ]
    }
  };
  return renderStyles({ v, vs, vd, styles });
}

export function styleControls(v, vs, vd) {
  const styles = {
    ".brz &&:hover": {
      standart: [
        "cssStyleElementMediaPadding",
        "cssStyleTypography3FontFamily",
        "cssStyleTypography3FontSize",
        "cssStyleTypography3LineHeight",
        "cssStyleTypography3FontWeight",
        "cssStyleTypography3LetterSpacing"
      ]
    }
  };

  return renderStyles({ v, vs, vd, styles });
}

export function styleIcon(v, vs, vd) {
  const styles = {
    ".brz &&:hover": {
      standart: [
        "cssStyleElementVideoControlsIconFontSize",
        "cssStyleVideoIconControls"
      ],
      interval: [
        "cssStyleHoverTransition",
        "cssStylePropertyHoverTransitionTransform"
      ]
    }
  };

  return renderStyles({ v, vs, vd, styles });
}
