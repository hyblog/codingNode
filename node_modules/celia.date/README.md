# celia.date

[![npm package](https://nodei.co/npm/celia.date.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/celia.date)

> Note:  A modern JavaScript Date utility library delivering modularity, performance, & extras.

[![NPM version](https://img.shields.io/npm/v/celia.date.svg?style=flat)](https://npmjs.org/package/celia.date)
[![NPM Downloads](https://img.shields.io/npm/dm/celia.date.svg?style=flat)](https://npmjs.org/package/celia.date)
[![](https://data.jsdelivr.com/v1/package/npm/celia.date/badge)](https://www.jsdelivr.com/package/npm/celia.date)

---

## Installation

### Load `celia.date` via classical `<script>` tag

```html
<script src="https://cdn.jsdelivr.net/npm/celia.date/iife.min.js"></script>
<script>
  // window.celiaDate
  celiaDate.add
  celiaDate.clone
  celiaDate.dayOfYear
  celiaDate.daysInMonth
  celiaDate.diff
  celiaDate.endOf
  celiaDate.format
  celiaDate.get
  celiaDate.isAfter
  celiaDate.isBefore
  celiaDate.isBetween
  celiaDate.isLeapYear
  celiaDate.isSame
  celiaDate.isSameOrAfter
  celiaDate.isSameOrBefore
  celiaDate.isValid
  celiaDate.parse
  celiaDate.set
  celiaDate.startOf
  celiaDate.subtract
</script>

```

### CommonJS style with npm

```bash
npm install celia.date --save
```

```javascript

// es6
import { add, clone, dayOfYear, daysInMonth, diff, endOf, format, get, isAfter, isBefore, isBetween, isLeapYear, isSame, isSameOrAfter, isSameOrBefore, isValid, parse, set, startOf, subtract } from 'celia.date';
// or
import { ... } from 'celia.date/es';

// node
const { add, clone, dayOfYear, daysInMonth, diff, endOf, format, get, isAfter, isBefore, isBetween, isLeapYear, isSame, isSameOrAfter, isSameOrBefore, isValid, parse, set, startOf, subtract } = require('celia.date');

// modularity
import add from 'celia.date/add';
import format from 'celia.date/format';

```

