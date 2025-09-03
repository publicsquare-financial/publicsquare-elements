# PublicSquare Elements SDK

[![Verify](https://github.com/publicsquare-financial/publicsquare-elements/actions/workflows/release-sdk.yml/badge.svg)](https://github.com/publicsquare-financial/publicsquare-elements/actions/workflows/release-sdk.yml)

Contained within is the official **PublicSquare** Elements Javascript and React SDK's.

## Quickstart

### Dependencies

- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) - `npm install --global yarn`
  - Run yarn once to enable it - `yarn`
- [Playwright](https://playwright.dev/) - `yarn playwright install`

### Build the SDK and run Tests

Run the following command from the root of the project:

```sh
make verify
```

## Running the example app (`/example-app`)

The example app is provided as a convenience to quickly see what it looks like.

To use it, simply:

```bash
$ cd example-app
$ yarn
$ yarn dev
```

Then open [http://localhost:3000](http://localhost:3000)
