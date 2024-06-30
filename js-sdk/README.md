# Credova JavaScript Elements

[![Version](https://img.shields.io/npm/v/@credova/credova-js.svg)](https://www.npmjs.org/package/@credova/credova-js)
[![Downloads](https://img.shields.io/npm/dm/@credova/credova-js.svg)](https://www.npmjs.org/package/@credova/credova-js)

The [Credova](https://credova.com/) JavaScript Elements SDK

## Installation

Using [Node Package Manager](https://docs.npmjs.com/)

```sh
npm install --save @credova/credova-js
```

Using [Yarn](https://classic.yarnpkg.com/en/docs/)

```sh
yarn add @credova/credova-js
```

## Documentation

For a complete list of options and examples, please refer to our [JavaScript Elements SDK docs](https://developers.credova.com/sdks/web/javascript/)

## Usage

### Initialization

```javascript
import { Credova } from '@credova/credova-js';

const credova = await new Credova().init('<API Key>'); // replace with your Publishable API key
```