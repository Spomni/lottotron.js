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
const isNull = (value) => value === null;

const areStrictEqualArrays = (array1, array2) => {
  return array1.length === array2.length
    && array1.every((value, index) => value === array2[index]);
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

  describe('Lottotron', function() {

    describe('#maxNumber', function() {
      it('Should be number', function() {
        var lotto = new Lottotron(8.3)
        assert.isNumber(lotto.maxNumber)
      })

      it('Should be not less than 0', function() {
        var lotto = new Lottotron(5.7)
        assert(!(lotto.maxNumber < 0))
      })

      it('Should be integer', function() {
        var lotto = new Lottotron(3.2)
        assert((lotto.maxNumber % 1 === 0))
      })

      it('Should round to down the param "maxNumber" if it is a float number.', function() {
        var lotto = new Lottotron(4.7)
        assert.strictEqual(lotto.maxNumber, 4)
      })

      it('Should be read-only.', function() {
        var lotto = new Lottotron(3)
        lotto.maxNumber = 7
        assert.equal(lotto.maxNumber, 3)
      })
    })

    describe('#getNumber()', function() {
      it('The calls with numbers from 0 till "maxNumber" should return all numbers of the interval.', function() {
        var maxNumber = 4
        var lotto = new Lottotron(maxNumber)
        var returnedNumbers = []

        for (let i = 0; i <= maxNumber; i++) {
          returnedNumbers.push(lotto.getNumber())
        }

        for (let i = 0; i <= maxNumber; i++) {
          assert.include(returnedNumbers, i)
        }
      })

      it('The next calls should return "null"', function() {
        var maxNumber = 4
        var lotto = new Lottotron(maxNumber)

        for (let i = 0; i <= maxNumber; i++) {
          lotto.getNumber()
        }

        assert.isNull(lotto.getNumber())
        assert.isNull(lotto.getNumber())
      })

      it('The numbers sequences, returned from the different "Lottotron" instances, should not be equal.', function() {
        var maxNumber = 19
        var lotto1 = new Lottotron(maxNumber)
        var lotto2 = new Lottotron(maxNumber)
        var array1 = []
        var array2 = []

        for (let i = 0; i <= maxNumber; i++) {
          array1.push(lotto1.getNumber())
          array2.push(lotto2.getNumber())
        }

        assert(!areStrictEqualArrays(array1, array2))
      })
    })

    describe('#restNumbers', function() {
      it('Should be an array', function() {
        var lotto = new Lottotron(4)
        assert.isArray(lotto.restNumbers)
      })

      it('Should contain all numbers of the interval that were not returned from the method "getNumber".', function() {
        var maxNumber = 6
        var lotto = new Lottotron(maxNumber)

        var dontReturned = []
        for (let i = 0; i <= maxNumber; i++) {
          dontReturned.push(i)
        }

        for (let i = 0; i <= maxNumber; i++) {
          var number = lotto.getNumber()

          for (var key in dontReturned) {
            if (dontReturned[key] === number) {
              dontReturned.splice(key, 1)
            }
          }

          dontReturned.forEach(function(number, i, dontReturned) {
            assert.include(lotto.restNumbers, number)
          })
        }
      })

      it('Should not contain numbers that was returned from the method "getNumber".', function() {
        var maxNumber = 9
        var lotto = new Lottotron(maxNumber)
        var returnedNumbers = []

        for (let i = 0; i <= maxNumber; i++) {
          returnedNumbers.push(lotto.getNumber())
          var restNumbers = lotto.restNumbers

          returnedNumbers.forEach(function(number, i, returnedNumbers) {
            assert.notInclude(restNumbers, number)
          })
        }
      })

      it('Should return an empty array if all numbers from the interval was returned from the method "getNumber".', function() {
        var lotto = new Lottotron(7)

        while (!isNull(lotto.getNumber())) {
          'smile please'
        };

        assert.isArray(lotto.restNumbers)
        assert.strictEqual(lotto.restNumbers.length, 0)
      })

      it('Should be read-only.', function() {
        var lotto = new Lottotron(4)

        lotto.restNumbers = [1, 3]

        assert(areStrictEqualArrays([0, 1, 2, 3, 4], lotto.restNumbers))
      })

      it('Should not change when the returb value has been changed.', function() {
        var lotto = new Lottotron(3)

        var value = lotto.restNumbers
        value.push(98)

        assert(areStrictEqualArrays([0, 1, 2, 3], lotto.restNumbers))
      })
    })

    describe('#reload()', function() {
      it('The property "restNumbers" should contain all numbers of the interval.', function() {
        var maxNumber = 11
        var lotto = new Lottotron(maxNumber)

        var initalArray = []
        for (let i = 0; i <= maxNumber; i++) {
          initalArray.push(i)
        }

        for (let i = 0; i < 5; i++) {
          lotto.getNumber()
        }

        lotto.reload()

        initalArray.forEach(function(number, i, initalArray) {
          assert.include(lotto.restNumbers, number)
        })
      })

      it('The "#getNumber()" calls with numbers from 0 till "maxNumber" should return all numbers of the interval..', function() {
        var maxNumber = 12
        var lotto = new Lottotron(maxNumber)

        var numbersArray = []
        for (let i = 0; i <= maxNumber; i++) {
          numbersArray.push(i)
        }

        for (let i = 0; i < 5; i++) {
          lotto.getNumber()
        }

        lotto.reload()

        for (let i = 0; i <= maxNumber; i++) {
          var number = lotto.getNumber()

          if (numbersArray.includes(number)) {
            numbersArray.forEach(function(value, index, numbersArray) {
              if (value === number) {
                numbersArray.splice(index, 1)
              }
            })
          }
        }

        assert.strictEqual(numbersArray.length, 0)
      })
    })
  })
})
