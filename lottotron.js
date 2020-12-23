const { isNumber } = require('util');

const ERROR_MSG ={
  MAX_NUMBER_IS_NOT_NUMBER: 'The input option "maxNumber" should be a number.',
  MAX_NUMBER_LOWER_ZERO: 'The input option "maxNumber" should be greater than 0.',
}

/**
 * Create an object that can return random non-repeated integers.
 * It returns integers from 0 to the user-defined value.
 *
 * @param {number} maxNumber - The max number of the interval. Should be not less than 0. The float number will be rounded down to the nearest integer.
 *
 * @class Lottotron
 */
class Lottotron {

  constructor(maxNumber) {

    // Check and init input param
    if (!isNumber(maxNumber)) {
      throw new Error(ERROR_MSG.MAX_NUMBER_IS_NOT_NUMBER);
    }

    if (maxNumber < 0) {
      throw new Error(ERROR_MSG.MAX_NUMBER_LOWER_ZERO);
    }

    /**
     * The max number of the interval.
     *
     * @member {number} _maxNumber
     * @memberof Lottotron
     * @instance
     * @private
     */
    this._maxNumber = Math.floor(maxNumber)

    /**
     * The array of the numbers that were not returned from the *#getNumber()* method
     * @member {number[]} _restNumbers -
     * @memberof Lottotron
     * @instance
     * @private
     */
    this._restNumbers = this._createNumbersArray(this._maxNumber)

  }

  /**
   * The max number of the interval
   *
   * @type {number}
   *
   * @readonly
   * @memberof Lottotron
   */
  get maxNumber() {
    return this._maxNumber;
  }

  /**
   * The array of the numbers that were not returned from method *#getNumber()*
   *
   * @type {number[]}
   *
   * @readonly
   * @memberof Lottotron
   */
  get restNumbers() {
    return this._cloneArray(this._restNumbers);
  }

  /**
   * Rallback this object to the inital state.
   *
   * @returns {undefined}
   * @memberof Lottotron
   */
  reload() {
    for (var i = 0; i <= this._maxNumber; i++) {
      this._restNumbers[i] = i
    }
  }

  /**
   * Return the next number until all numbers of the inteval are returned. Return "null" when all numbers have been returned.
   *
   * @returns {number|null}
   * @memberof Lottotron
   */
  getNumber() {
    if (this._restNumbers.length <= 0) {
      return null
    } else {
      var numberIndx = this._randomInteger(0, this._restNumbers.length - 1)
      return this._restNumbers.splice(numberIndx, 1)[0]
    }
  }

  /**
   * Return a clone of the array
   *
   * @param {array} array
   * @returns {array}
   * @memberof Lottotron
   * @private
   */
  _cloneArray(array) {
    var res = []
    array.forEach(function(value, i, array) {
      res.push(value)
    })
    return res
  }

  /**
   * Return a random number from min to max
   *
   * @param {number} min
   * @param {number} max
   *
   * @returns {number}
   * @memberof Lottotron
   * @private
   */
  _randomInteger(min, max) {
    var rand = min + Math.random () * (max + 1 - min)
    rand = Math.floor(rand)
    return rand
  }

  /**
   * Return an integer array filled with numbers from 0 to "maxNumber".
   *
   * @param {number} maxNumber
   *
   * @returns {array}
   * @memberof Lottotron
   * @private
   */
  _createNumbersArray(maxNumber) {
    var res = []
      for (var i = 0; i <= maxNumber; i++) {
        res[i] = i
      }
      return res
  }

}

module.exports = Lottotron;