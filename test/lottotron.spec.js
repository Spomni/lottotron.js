const assert = require('chai').assert

const Lottotron = require('../lottotron.js')
const LottotronError = require('../lib/LottotronError');

const arrayOfTypes = [
  'string',
  null,
  undefined,
  [],
  {},
  () => {},

  /* number */
  1,
  -1,
  1.3,
  -1.4,
  +Infinity,
  -Infinity,
  NaN,
]

const ERROR_MSG_ ={
  MAX_NUMBER_IS_NOT_NUMBER: 'The input option "maxNumber" should be a number.',
  MAX_NUMBER_LOWER_ZERO: 'The input option "maxNumber" should be greater than 0.',
  MAX_NUMBER_IS_NON_FINITE: 'The input option "maxNumber" should be a finite number.'
}

const isNumber = (value) => typeof(value) === 'number';

const getNaturalNumbersTo = (maxNumber) => {
  let array = [];
  for (let i=0; i <= maxNumber; i++) array.push(i);
  return array;
}

describe('class Lottotron', () => {

  describe('constructor(maxNumber)', () => {

    it('Should throw an error if the maxNumber option is not a number.',
      () => arrayOfTypes.forEach((typeValue) => {
        if (isNumber(typeValue)) return;

        assert.throws(
          () => new Lottotron(typeValue),
          LottotronError,
          ERROR_MSG_.MAX_NUMBER_IS_NOT_NUMBER
        );
      })
    );

    it(`Should throw an error if the maxNumber option is a non-finite number.`,
      () => arrayOfTypes.forEach((typeValue) => {
        if (!isNumber(typeValue)) return;
        if (Number.isFinite(typeValue)) return;

        assert.throws(
          () => new Lottotron(typeValue),
          LottotronError,
          ERROR_MSG_.MAX_NUMBER_IS_NON_FINITE
        )
      })
    );

    it('Should throw an error if the maxNumber option less than 0.',
      () => {
        assert.throws(
          () => new Lottotron(-5),
          LottotronError,
          ERROR_MSG_.MAX_NUMBER_LOWER_ZERO
        )
      }
    )

    it('Should return a Lottotron instance if the maxNumber option has a correct value.',
      () => assert.instanceOf(new Lottotron(3), Lottotron)
    )
  })

  describe('#maxNumber', () => {

    it(`Should be a positive integer`,
      () => {
        const { maxNumber } = new Lottotron(3.6);
        assert(Number.isInteger(maxNumber))
      }
    )

    it(`Should be equal to the maxNumber constructor option if one passed with integer value.`,
      () => {
        const value = 5;
        const { maxNumber } = new Lottotron(value);
        assert.strictEqual(maxNumber, value);
      }
    )

    it(`Should be equal the rounded down maxNumber constructor option if one passed with a float value.`,
      () => {
        const value = 93.4;
        const flooredValue = Math.floor(value);
        const { maxNumber } = new Lottotron(value);
        assert.strictEqual(maxNumber, flooredValue);
      }
    )

    it('Should be a read-only property.',
      () => {
        const initalValue = 3;
        const lotto = new Lottotron(initalValue);
        lotto.maxNumber = 7;
        assert.equal(lotto.maxNumber, initalValue);
      }
    )
  })

  describe('#getNumber()', () => {

    it(`Should return all numbers of the interval in (maxNumber + 1) method calls.`,
      () => {
        const lotto = new Lottotron(8);
        const { maxNumber } = lotto;

        assert(
          Array(maxNumber + 1).fill(null)
            .map(() => lotto.getNumber())
            .every((number, index, numberList) => numberList.includes(index))
        )
      }
    );

    it(`Should return null if method is called (maxNumber + 2) or more times. `,
      () => {
        const lotto = new Lottotron(6);
        const { maxNumber } = lotto;
        let counter = 0;

        while (counter < maxNumber + 5) {
          if (counter <= maxNumber + 1) {
            lotto.getNumber()
          } else {
            assert.isNull(lotto.getNumber());
          }
          counter++;
        }
      }
    );

    it(`Should not return equal number sequenses from different Lottotron instance.`,
      () => {
        const maxNumber = 8;
        const lotto1 = new Lottotron(maxNumber);
        const lotto2 = new Lottotron(maxNumber);

        const sequence1 = Array(maxNumber + 1).fill(null)
          .map(() => lotto1.getNumber())

        const sequence2 = Array(maxNumber + 1).fill(null)
          .map(() => lotto2.getNumber())

        assert.isFalse(sequence1.every((number, index) => {
          return sequence2[index] === number;
        }))
      }
    )
  })

  describe('#restNumbers', () => {

    it(`Should be an array.`,
      () => {
        const { restNumbers } = new Lottotron(32);
        assert.isArray(restNumbers);
      }
    );

    it('Should contain all numbers of the interval that were not returned from the method "getNumber".',
      () => {
        const maxNumber = 5;
        const lotto = new Lottotron(maxNumber);

        let remainder = Array(maxNumber + 1).fill(null)
          .map((value, index) => index);

        for (let i=0; i <= maxNumber; i++) {
          const { restNumbers } = lotto;

          assert.deepEqual(restNumbers, remainder);

          const number = lotto.getNumber();
          const index = remainder.findIndex((value) => value === number);
          remainder.splice(index, 1);
        }
      }
    );

    it(`Should return an empty array if all numbers from the interval was returned`,
      () => {
        const maxNumber = 13;
        const lotto = new Lottotron(13)
        let counter = 0;

        while (counter < maxNumber + 7) {
          lotto.getNumber();
          if (counter > maxNumber + 1) {
            assert.isEmpty(lotto.restNumbers);
          }
          counter++;
        }
      }
    );

    it(`Should return new array every time method calls.`,
      () => {
        const lotto = new Lottotron(3);

        const oldValue = lotto.restNumbers;
        lotto.restNumbers = Symbol('newValue');
        assert(lotto.restNumbers !== oldValue);
      }
    )

    it('Should be a read-only property.',
      () => {
        const lotto = new Lottotron(3);

        const oldValue = lotto.restNumbers;
        lotto.restNumbers = Symbol('newValue');
        assert.deepEqual(lotto.restNumbers, oldValue);
      }
    )

    it(`Should return the same result if the array returned in the previous call is changed.`,
      () => {
        const lotto = new Lottotron(13);
        const { restNumbers } = lotto;
        const restNumbersCopy = restNumbers.map((item) => item);
        restNumbers[6] = Symbol('someValue');
        assert.deepEqual(lotto.restNumbers, restNumbersCopy);
      }
    );
  })

  describe('#reload()', () => {

    it(`The #restNumbers array should contain all numbers after that the #reload()was called.`,
      () => {
        const maxNumber = 9;
        const lotto = new Lottotron(maxNumber);
        const expectedRestNumbers = getNaturalNumbersTo(maxNumber);

        while (lotto.restNumbers.length > 2) lotto.getNumber();
        lotto.reload()
        assert.deepEqual(lotto.restNumbers, expectedRestNumbers)
      }
    );

    it(`The #geNumber() method should return all numbers of the interval in (maxNumber + 1) method calls after that the #reload() method was called.`,
      () => {
        const maxNumber = 17;
        const lotto = new Lottotron(maxNumber);

        while (lotto.restNumbers.length > 0) lotto.getNumber();
        lotto.reload();

        assert(
          Array(maxNumber + 1).fill(null)
            .map(() => lotto.getNumber())
            .every((number, index, numberList) => numberList.includes(index))
        )
      }
    );
  })
})
