const { assert } = require('chai');

const LottotronError = require('../lib/LottotronError');

describe(`class LottotronError`, () => {

  describe(`constructor(message):`, () => {

    it(`Should be an instance of LottotronError.`, () => {
      assert.instanceOf(new LottotronError(), LottotronError);
    })

    it(`Should be an instance of Error.`, () => {
      assert.instanceOf(new LottotronError(), Error);
    })
  })

  describe('#message', () => {
    it(`Should be equal to the option passed in constructor.`,
      () => {
        const string = `message`;
        const { message } = new LottotronError(string);
        assert.strictEqual(message, string);
      }
    );
  })

})