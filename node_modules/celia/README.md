# celia

[![npm package](https://nodei.co/npm/celia.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/celia)

> Note:  A modern JavaScript utility library delivering modularity, performance, and extras.

[![NPM version](https://img.shields.io/npm/v/celia.svg?style=flat)](https://npmjs.org/package/celia)
[![NPM Downloads](https://img.shields.io/npm/dm/celia.svg?style=flat)](https://npmjs.org/package/celia)
[![](https://data.jsdelivr.com/v1/package/npm/celia/badge)](https://www.jsdelivr.com/package/npm/celia)

## [Full Documentation](https://fengxinming.github.io/celia/index.html)

---

## Installation

### In a browser

```html
<script src="https://cdn.jsdelivr.net/npm/celia/iife.min.js"></script>
<script>
  // window.celia
  celia.each
  celia.isArrayLike
  celia.isAsyncFunction
  celia.isDate
  celia.isFalsy
  celia.looseEqual
  celia.sleep
  // ...
  // ...
</script>

```

### Using npm

```bash
npm install celia --save
```

```javascript

// es6
import { assign, each, getUid, hasOwn, isArrayLike, isUndefined, isWindow, looseEqual, map, noop, sleep, toString, type } from 'celia');

// modularity
import each from 'celia/each';
import isArrayLike from 'celia/isArrayLike';
import isAsyncFunction from 'celia/isAsyncFunction';
import isDate from 'celia/isDate';
import isFalsy from 'celia/isFalsy';
import looseEqual from 'celia/looseEqual';
import sleep from 'celia/sleep';
// ...
// ...

// node
const { assign, each, getUid, hasOwn, isArrayLike, isUndefined, isWindow, looseEqual, map, noop, sleep, toString, type } = require('celia');
// or
const each = require('celia/each');
const isArrayLike = require('celia/isArrayLike');
const isAsyncFunction = require('celia/isAsyncFunction');
const isDate = require('celia/isDate');
const isFalsy = require('celia/isFalsy');
const looseEqual = require('celia/looseEqual');
const sleep = require('celia/sleep');
// ...
// ...

```

## Example

  - [Jest](test)
