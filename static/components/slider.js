import * as React from 'react';
export var Slider = function (props) {
    var min = props.min, max = props.max;
    return React.createElement("input", { type: "range", min: min, max: max });
};
//# sourceMappingURL=slider.js.map