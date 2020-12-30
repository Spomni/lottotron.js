const assert = require('chai').assert
const Lottotron = require('../lottotron.js')

describe('lottotron.js', function() {
  /** @namespace itWrappers */
    const itWr = {

      /** @function forEachType Вызывает функцию callback для каждого из стандартных типов данных.
        * @describe Вызывает функцию callback для каждого из стандартных типов данных. В параметр type передает экземпляр соответствующего типа данеых.
        * @param {Function} callback( type )
        * @returns {undefined}
        */
        forEachType : function(callback) {
          var typeArr = [
            1,
            'string',
            null,
            undefined,
            [],
            {}
          ]

          var res = function() {
            typeArr.forEach(function(type, i, typeArr) {
              callback(type)
            })
          }

          return res
        }
      //
    } // itWrapper

  /** @function isNumber
    * @param {mixed} value
    * @returns {boolean}
    */
    function isNumber(param) {
      return (typeof(param) === 'number')
    }

  /** @function isNull
    * @param {mixed} value
    * @returns {boolean}
    */
    function isNull(value) {
      return value === null
    }

  /** @function doesArrayInclude Check the inclusion of the value in the array.
    * @desc Check the inclusion of the value in the array. Return "true" if the value is encluded else return "false".
    *
    * @param {array} array
    * @param {mixed} value
    *
    * @returns {boolean}
    */
    function doesArrayInclude(array, value) {
      var res = false
      array.forEach(function(arrayValue, i, array) {
        if (arrayValue === value) {
          res = true
        }
      })
      return res
    }

  /** @function isEqualArrays
    * @param {array} array1
    * @param {array} array2
    * @returns {boolean}
    */
    function isEqualArrays(array1, array2) {
      if (array1.length !== array2.length) {
        return false
      }
      for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
          return false
        }
      }
      return true
    }

  describe('new Lottotron( maxNumber )', function() {
    it('Should throw an "Error" object if the input param "maxNumber" is not number.', itWr.forEachType(function(type) {
      if (!isNumber(type)) {
        assert.throws(function() {
          var lotto = new Lottotron(type)
          lotto.reset()
        }, Error)
      }
    }))


    it('Should throw an "Error" object if the input param "maxNumber" is not finite value',
      () => {
        [NaN, +Infinity, -Infinity].forEach((notFinite) => {
          assert.throws(() => new Lottotron(notFinite));
        })
      }
    );

    it('Should throw an "Error" object if the input param "maxNumber" is less than 0.', function() {
      assert.throws(function() {
        var lotto = new Lottotron(-1)
        lotto.reset()
      }, Error)
    })

    it('Should return an object instance of "Lottotron" if the input param "maxNumber" is number and it is not less than 0.', function() {
      var lotto = new Lottotron(8)
      assert.instanceOf(lotto, Lottotron)
    })

    it('Should round to down the param "maxNumber" if it is a float number.', function() {
      var lotto = new Lottotron(4.7)
      assert.strictEqual(lotto.maxNumber, 4)
    })
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

        assert(!isEqualArrays(array1, array2))
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

        assert(isEqualArrays([0, 1, 2, 3, 4], lotto.restNumbers))
      })

      it('Should not change when the returb value has been changed.', function() {
        var lotto = new Lottotron(3)

        var value = lotto.restNumbers
        value.push(98)

        assert(isEqualArrays([0, 1, 2, 3], lotto.restNumbers))
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

          if (doesArrayInclude(numbersArray, number)) {
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
