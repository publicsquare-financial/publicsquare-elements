# Credova React Elements

[![Version](https://img.shields.io/npm/v/@credova/elements-react.svg)](https://www.npmjs.org/package/@credova/elements-react)
[![Downloads](https://img.shields.io/npm/dm/@credova/elements-react.svg)](https://www.npmjs.org/package/@credova/elements-react)

A thin React wrapper for [Credova](https://credova.com/) JavaScript Elements SDK.

## Installation

Using [Node Package Manager](https://docs.npmjs.com/)

```sh
npm install --save @credova/elements-react
```

Using [Yarn](https://classic.yarnpkg.com/en/docs/)

```sh
yarn add @credova/elements-react
```

## Documentation

For a complete list of options and examples, please refer to our [React Elements SDK docs](https://developers.credova.com/sdks/web/react/)

## Usage

### Initialization

Initializing the SDK is done via calling the `useCredova` hook with parameters:

```jsx
import {
  CredovaProvider,
  CardElement,
  useCredova,
} from '@credova/credova-react';

const App = () => {
  return (
    <CredovaProvider apiKey={apiKey}> // Publishable API Key
      <MyComponent />
    </CredovaProvider>
  );
};

const MyComponent = () => {
  const { credova } = useCredova();

  return <CardElement id="cardInput" />;
};
```