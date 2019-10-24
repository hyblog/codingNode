'use strict';

class NotImplementedError extends Error {

  constructor(method) {
    const message = `${method}() is not implemented`;
    super(message);
    this.name = 'NotImplementedError';
    this.code = 'ERR_METHOD_NOT_IMPLEMENTED';
  }

}

module.exports = NotImplementedError;
