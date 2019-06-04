<img alt="logo" src="media/artwork.svg" width="330px" align="right">

# PureScript npm package

[![npm version](http://img.shields.io/npm/v/purescript.svg)](https://www.npmjs.com/package/purescript)
[![Build Status](https://travis-ci.org/purescript-contrib/node-purescript.svg?branch=master)](https://travis-ci.org/purescript-contrib/node-purescript)

[PureScript](https://github.com/purescript/purescript) binary wrapper that makes it seamlessly available via [npm](https://www.npmjs.com/)

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install purescript
```

Note that this package makes maximum use of `postinstall` [script](https://docs.npmjs.com/misc/scripts), so please make sure that [`ignore-scripts` npm-config](https://docs.npmjs.com/misc/config#ignore-scripts) is not enabled before installation.

Once the command above is executed,

__1.__ First, it checks if a PureScript binary has been already cached in your machine, and restores that if available.

__2.__ The second plan: if no cache is available, it downloads a prebuilt binary from [the PureScript release page](https://github.com/purescript/purescript/releases).

<img alt="screencast: downloading a binary" src="./media/screencast1.gif" width="650px">

__3.__ The last resort: if no prebuilt binary is provided for your platform or the downloaded binary doesn't work correctly, it downloads [the PureScript source code](https://github.com/purescript/purescript/tree/master) and compile it with [Stack](https://docs.haskellstack.org/).

<img alt="screencast: compile a source" src="./media/screencast2.gif" width="650px">

## API

### `require('purescript')`

Type: `string`

An absolute path to the installed PureScript binary, which can be used with [`child_process`](https://nodejs.org/api/child_process.html) functions.

```javascript
const {execFile} = require('child_process');
const purs = require('purescript'); //=> '/Users/you/example/node_modules/purescript/purs.bin'

execFile(purs, ['compile', 'input.purs', '--output', 'output.purs'], () => {
  console.log('Compiled.');
});
```

## CLI

You can use it via CLI by installing it [globally](https://docs.npmjs.com/files/folders#global-installation).

```
npm install --global purescript

purs --help
```

## License

[ISC License](./LICENSE) © 2017 - 2019 Watanabe Shinnosuke

The [artwork](./media/artwork.svg) is a derivative of [PureScript logo](https://github.com/purescript/logo/blob/master/PS_Logo_Final.svg) by [Gareth Hughes](https://github.com/goodworkson) used under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), and it is also licensed under CC BY 4.0 by Watanabe Shinnosuke.
