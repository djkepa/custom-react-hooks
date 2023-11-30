"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = __importDefault(require("react-dom"));
function usePortal() {
    var _a = (0, react_1.useState)(false), isOpen = _a[0], setIsOpen = _a[1];
    var portalRef = (0, react_1.useRef)(document.createElement('div'));
    var openPortal = (0, react_1.useCallback)(function () { return setIsOpen(true); }, []);
    var closePortal = (0, react_1.useCallback)(function () { return setIsOpen(false); }, []);
    (0, react_1.useEffect)(function () {
        var portalElement = portalRef.current;
        document.body.appendChild(portalElement);
        return function () {
            document.body.removeChild(portalElement);
        };
    }, []);
    var Portal = (0, react_1.useCallback)(function (_a) {
        var children = _a.children;
        return isOpen ? react_dom_1.default.createPortal(children, portalRef.current) : null;
    }, [isOpen]);
    return { Portal: Portal, openPortal: openPortal, closePortal: closePortal, isOpen: isOpen };
}
exports.default = usePortal;
