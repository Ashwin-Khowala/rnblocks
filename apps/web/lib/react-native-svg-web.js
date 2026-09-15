import * as elements from "react-native-svg/lib/module/elements.web";
import { WebShape } from "react-native-svg/lib/module/web/WebShape";

// React Native's Animated.createAnimatedComponent automatically injects `collapsable={false}`.
// On web, SVG shapes render as real DOM elements (<line>, <g>, <path>, etc.) where `collapsable`
// is not a valid DOM attribute, causing React 19 to log a console error:
// "Received `false` for a non-boolean attribute `collapsable`."
// We strip `collapsable` in prepareProps before createElement is called.
if (WebShape && WebShape.prototype) {
  const originalPrepareProps = WebShape.prototype.prepareProps;
  WebShape.prototype.prepareProps = function (props) {
    const raw = props || this.props;
    const res = originalPrepareProps ? originalPrepareProps.call(this, raw) : raw;
    if (res && typeof res === "object" && "collapsable" in res) {
      const { collapsable, ...cleanProps } = res;
      return cleanProps;
    }
    return res;
  };

  const originalRender = WebShape.prototype.render;
  WebShape.prototype.render = function () {
    if (this.props && typeof this.props === "object" && "collapsable" in this.props) {
      delete this.props.collapsable;
    }
    return originalRender.call(this);
  };
}

export * from "react-native-svg/lib/module/elements.web";
export default elements.default;
