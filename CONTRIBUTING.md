# Contributing to React Custom Hooks

We welcome contributions to the React Custom Hooks library! Here's how you can contribute:

## Setting Up the Development Environment

1. **Fork and clone the repository:**

   ```
   git clone https://github.com/your-username/react-custom-hooks.git
   cd react-custom-hooks
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Link your local package for development:**

   If you are developing a specific hook (e.g., `use-window-size`), navigate to the package's directory and use `npm link` to symlink the package for local development:

   ```
   cd packages/use-window-size
   npm link
   ```

## Running Tests

1. **Run tests with Jest:**

   ```
   npm test
   ```

   This will run tests for all hooks. To test a specific hook, you can use:

   ```
   npm test -- packages/use-window-size
   ```

## Formatting Code

We follow a consistent coding style, and we encourage you to use code formatters like Prettier:

```
npx prettier --write .
```

## Submitting Pull Requests

1. **Create a new branch for your changes:**

   ```
   git checkout -b your-branch-name
   ```

2. **Make your changes and commit them:**

   ```
   git commit -am "Add some feature"
   ```

3. **Push to your fork and submit a pull request:**

   ```
   git push origin your-branch-name
   ```

   Then, on your GitHub repository, click the 'Pull request' button.

## Reporting Bugs

If you find a bug, please create an issue on our [issue tracker](https://github.com/djkepa/react-custom-hooks/issues) with a description of the bug and steps to reproduce it.

## Suggesting Features

Feature suggestions are welcome! Please create an issue with the tag 'enhancement' and outline your proposed feature.

Thank you for contributing to React Custom Hooks!