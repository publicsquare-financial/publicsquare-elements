# PublicSquare Elements SDK

[![Verify](https://github.com/publicsquare-financial/publicsquare-elements/actions/workflows/release-sdk.yml/badge.svg)](https://github.com/publicsquare-financial/publicsquare-elements/actions/workflows/release-sdk.yml)

Contained within is the official **PublicSquare** Elements Javascript and React SDK's.

## Quickstart

### Create your local .env file
Create your .env file and paste in your pk_test_key you obtained from your account.
See (/example-app/env.example)

NEXT_PUBLIC_PUBLICSQUARE_KEY={your_pk_test_key_here}

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
