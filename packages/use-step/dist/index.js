"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStep = void 0;
var react_1 = require("react");
function useStep(_a) {
    var _b = _a.initialStep, initialStep = _b === void 0 ? 0 : _b, totalSteps = _a.totalSteps, _c = _a.loop, loop = _c === void 0 ? false : _c;
    var _d = (0, react_1.useState)(initialStep), currentStep = _d[0], setCurrentStep = _d[1];
    var goToStep = (0, react_1.useCallback)(function (step) {
        if (step < 0 || step >= totalSteps) {
            if (loop) {
                var newStep = step < 0 ? totalSteps - 1 : 0;
                setCurrentStep(newStep);
            }
            return;
        }
        setCurrentStep(step);
    }, [totalSteps, loop]);
    var nextStep = (0, react_1.useCallback)(function () {
        goToStep(currentStep + 1);
    }, [currentStep, goToStep]);
    var prevStep = (0, react_1.useCallback)(function () {
        goToStep(currentStep - 1);
    }, [currentStep, goToStep]);
    var reset = (0, react_1.useCallback)(function () {
        setCurrentStep(initialStep);
    }, [initialStep]);
    return { currentStep: currentStep, goToStep: goToStep, nextStep: nextStep, prevStep: prevStep, reset: reset };
}
exports.useStep = useStep;
