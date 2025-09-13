<p align="center">
  <img src="https://i.ibb.co/ykSxVSX/custom-react-hooks-logo.png" alt="Custom React Hooks Logo"/>
</p>

<p align="center">
  <a href="https://github.com/djkepa/custom-react-hooks/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"/>
  </a>
  <a href="https://github.com/djkepa/custom-react-hooks/stargazers">
    <img src="https://img.shields.io/github/stars/djkepa/custom-react-hooks.svg" alt="GitHub Stars"/>
  </a>
  <a href="https://github.com/djkepa/custom-react-hooks/network">
    <img src="https://img.shields.io/github/forks/djkepa/custom-react-hooks.svg" alt="GitHub Forks"/>
  </a>
  <a href="https://github.com/djkepa/custom-react-hooks/issues">
    <img src="https://img.shields.io/github/issues/djkepa/custom-react-hooks.svg" alt="GitHub Issues"/>
  </a>
</p>

<div align="center">
  A collection of reusable and well-documented custom React hooks for supercharging your React applications. These hooks cover a wide range of functionalities, making it easier for you to build dynamic and interactive user interfaces.
</div>

# Custom React Hooks Library

## Website

```sh
https://custom-react-hooks-live.vercel.app/
```

## Github

```sh
https://github.com/djkepa/custom-react-hooks
```

## 🌟 Table of Contents

- [Installation](#-installation)
- [Hooks List](#-hooks-list)
- [Links](#-links)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 [Installation](#installation)

Choose and install individual hooks that suit your project needs, or install the entire collection for a full suite of utilities.

### Installing All Hooks

If you prefer to have all hooks at your disposal, you can install the entire collection:

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

### Installing Specific Hooks

Each hook is a standalone package, and you can install them individually using npm or yarn:

```sh
npm install @custom-react-hooks/use-async
```

or

```sh
yarn add @custom-react-hooks/use-async
```

## Importing the Hook

The `useExample` hook must be imported using a named import as shown below:

**Named Import:**
```javascript
import { useExample } from '@custom-react-hooks/use-example';
```
This approach ensures that the hook integrates seamlessly into your project, maintaining consistency and predictability in how you use our package.


## 📚 [Hooks List](#hooks-list)

A list of available hooks and their respective documentation can be found below:

- [useAsync](https://www.npmjs.com/package/@custom-react-hooks/use-async)
- [useCache](https://www.npmjs.com/package/@custom-react-hooks/use-cache) 🆕
- [useClickOutside](https://www.npmjs.com/package/@custom-react-hooks/use-click-outside)
- [useClipboard](https://www.npmjs.com/package/@custom-react-hooks/use-clipboard) 
- [useDebounce](https://www.npmjs.com/package/@custom-react-hooks/use-debounce)
- [useDocumentTitle](https://www.npmjs.com/package/@custom-react-hooks/use-document-title)
- [useDragDrop](https://www.npmjs.com/package/@custom-react-hooks/use-drag-drop)
- [useEffectOnce](https://www.npmjs.com/package/@custom-react-hooks/use-effect-once)
- [useElementSize](https://www.npmjs.com/package/@custom-react-hooks/use-element-size)
- [useEventListener](https://www.npmjs.com/package/@custom-react-hooks/use-event-listener)
- [useFetch](https://www.npmjs.com/package/@custom-react-hooks/use-fetch) 
- [useForm](https://www.npmjs.com/package/@custom-react-hooks/use-form)
- [useGeoLocation](https://www.npmjs.com/package/@custom-react-hooks/use-geo-location)
- [useHistoryState](https://www.npmjs.com/package/@custom-react-hooks/use-history-state) 🆕
- [useHover](https://www.npmjs.com/package/@custom-react-hooks/use-hover)
- [useIdle](https://www.npmjs.com/package/@custom-react-hooks/use-idle)
- [useImageLoad](https://www.npmjs.com/package/@custom-react-hooks/use-image-load)
- [useIsland](https://www.npmjs.com/package/@custom-react-hooks/use-island) 🆕
- [useKeyPress](https://www.npmjs.com/package/@custom-react-hooks/use-key-press)
- [useLockBodyScroll](https://www.npmjs.com/package/@custom-react-hooks/use-lock-body-scroll)
- [useLongPress](https://www.npmjs.com/package/@custom-react-hooks/use-long-press)
- [useMediaDevices](https://www.npmjs.com/package/@custom-react-hooks/use-media-devices)
- [useMediaQuery](https://www.npmjs.com/package/@custom-react-hooks/use-media-query)
- [useMouse](https://www.npmjs.com/package/@custom-react-hooks/use-mouse)
- [useNetwork](https://www.npmjs.com/package/@custom-react-hooks/use-network) 🆕
- [useOffscreen](https://www.npmjs.com/package/@custom-react-hooks/use-offscreen) 🆕
- [useOnScreen](https://www.npmjs.com/package/@custom-react-hooks/use-on-screen)
- [useOrientation](https://www.npmjs.com/package/@custom-react-hooks/use-orientation)
- [usePermission](https://www.npmjs.com/package/@custom-react-hooks/use-permission)
- [usePortal](https://www.npmjs.com/package/@custom-react-hooks/use-portal)
- [usePrevious](https://www.npmjs.com/package/@custom-react-hooks/use-previous) 🆕
- [useScript](https://www.npmjs.com/package/@custom-react-hooks/use-script)
- [useShare](https://www.npmjs.com/package/@custom-react-hooks/use-share) 🆕
- [useStatus](https://www.npmjs.com/package/@custom-react-hooks/use-status)
- [useStep](https://www.npmjs.com/package/@custom-react-hooks/use-step)
- [useStorage](https://www.npmjs.com/package/@custom-react-hooks/use-storage)
- [useThrottle](https://www.npmjs.com/package/@custom-react-hooks/use-throttle)
- [useTimeout](https://www.npmjs.com/package/@custom-react-hooks/use-timeout)
- [useToggle](https://www.npmjs.com/package/@custom-react-hooks/use-toggle)
- [useUpdateEffect](https://www.npmjs.com/package/@custom-react-hooks/use-update-effect)
- [useVirtual](https://www.npmjs.com/package/@custom-react-hooks/use-virtual) 🆕
- [useWebSocket](https://www.npmjs.com/package/@custom-react-hooks/use-websocket) 🆕
- [useWindowSize](https://www.npmjs.com/package/@custom-react-hooks/use-window-size)
- [useWorker](https://www.npmjs.com/package/@custom-react-hooks/use-worker) 🆕


## 🛠️ [Contributing](#contributing)

Your contributions are welcome! Please read our [Contributing Guidelines](https://github.com/djkepa/custom-react-hooks/blob/main/CONTRIBUTING.md) for details on how to submit pull requests, file bugs, and suggest enhancements.

## 🔗 [Links](#links)

- [GitHub Repository](https://github.com/djkepa/custom-react-hooks)
- [Issue Tracker](https://github.com/djkepa/custom-react-hooks/issues)

## 📄 [License](#license)

This project is licensed under the MIT License - see the [LICENSE](https://github.com/djkepa/custom-react-hooks/blob/main/LICENSE) file for details.