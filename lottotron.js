const { isNumber } = require('util');

const ERROR_MSG ={
  MAX_NUMBER_IS_NOT_NUMBER: 'The input option "maxNumber" should be a number.',
  MAX_NUMBER_LOWER_ZERO: 'The input option "maxNumber" should be greater than 0.',
}

/**
 * Return a clone of the array
 *
 * @param {array} array
 * @returns {array}
 * @private
 */
const cloneArray = (array) => array.map(value => value);

/**
 * Return a random number from min to max
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 * @private
 */
const getRandomInteger = (min, max) => {
  const randomNumber = min + Math.random () * (max + 1 - min);
  return Math.floor(randomNumber);
}

/**
 * Return an integer array filled with numbers from 0 to "maxNumber".
 *
 * @param {number} maxNumber
 * @returns {array}
 * @private
 */
const createArrayOfIntegers = (maxNumber) => {
  let arrayOfIntegers = [];

  for (let i=0; i <= maxNumber; i++) {
    arrayOfIntegers[i] = i;
  }

  return arrayOfIntegers;
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
     * @member {number[]} _restNumbers
     * @memberof Lottotron
     * @instance
     * @private
     */
    this._restNumbers = createArrayOfIntegers(this._maxNumber)

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
    return cloneArray(this._restNumbers);
  }

  /**
   * Rallback this object to the inital state.
   *
   * @returns {undefined}
   * @memberof Lottotron
   */
  reload() {
    for (let i = 0; i <= this._maxNumber; i++) {
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

    let { _restNumbers } = this;

    if (_restNumbers.length === 0) {
      return null
    }

    let index = getRandomInteger(0, _restNumbers.length - 1)
    return _restNumbers.splice(index, 1)[0]
  }

}

module.exports = Lottotron;