const { assert } = require('chai');

const LottotronError = require('../lib/LottotronError');

describe(`LottotronError,js`, () => {

  describe(`new LottotronError(message):`, () => {

    it(`Should be an instance of LottotronError.`, () => {
      assert.instanceOf(new LottotronError(), LottotronError);
    })

    it(`Should be an instance of Error.`, () => {
      assert.instanceOf(new LottotronError(), Error);
    })
  })
})