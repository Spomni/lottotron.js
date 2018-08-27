module.exports = Lottotron

/** @constructor Lottotron
  *
  * @classdesc Create an object that can return random non-repeated integers. It returns integers from 0 to the user-defined value.
  *
  * @param {number} maxNumber - The max number of the interval. Should be not less than 0. The float number will be rounded down to the nearest integer.
  *
  * @returns {Lottotron|Error}
  */
  function Lottotron(maxNumber) {
    // -- Check and init input param
      if (typeof(maxNumber) !== 'number') {
        throw new Error('The input option "maxNumber" should be a number.')
      } else if (maxNumber < 0) {
        throw new Error('The input option "maxNumber" should be greater than 0.')
      }

    /** @member {number} _maxNumber - The max number of the interval.
      * @private
      * @instance
      *
      * @memberof Lottotron
      */
      this._maxNumber = Math.floor(maxNumber)

    /** @member {number} maxNumber - The max number of the interval.
      * @instance
      * @readonly
      *
      * @memberof Lottotron
      */
      Object.defineProperty(Lottotron.prototype, 'maxNumber', {
        get : this._getMaxNumber
      })

    /** @member {array} _restNumbers - The array of the numbers that were not returned from method *#getNumber()*.
      * @private
      * @instance
      *
      * @memberof Lottotron
      */
      this._restNumbers = this._createNumbersArray(this._maxNumber)

    /** @member {array} restNumbers - The array of the numbers that were not returned from method *#getNumber()*.
      * @instance
      * @readonly
      *
      * @memberof Lottotron
      */
      Object.defineProperty(Lottotron.prototype, 'restNumbers', {
        get : this._getRestNumbers
      })
  };

  /** @method getNumber
    * @instance
    *
    * @desc Return the next number until all numbers of the inteval are returned. Return "null" when all numbers have been returned.
    *
    * @returns {number|null}
    *
    * @memberof Lottotron
    */
  Lottotron.prototype.getNumber = function() {
    if (this._restNumbers.length <= 0) {
      return null
    } else {
      var numberIndx = this._randomInteger(0, this._restNumbers.length - 1)
      return this._restNumbers.splice(numberIndx, 1)[0]
    }
  }

  /** @method reload
    * @instance
    *
    * @desc Rallback this object to the inital state.
    *
    * @returns {undefined}
    *
    * @memberof Lottotron
    */
    Lottotron.prototype.reload = function() {
      for (var i = 0; i <= this._maxNumber; i++) {
        this._restNumbers[i] = i
      }
    }

  /** Return the value of the private var "maxNumber".
    * @private
    * @instance
    * @memberof Lottotron
    */
  Lottotron.prototype._getMaxNumber = function() {
    return this._maxNumber
  }

  /** Return a clone of the private array "restNumbers"
    * @private
    * @instance
    * @memberof Lottotron
    */
  Lottotron.prototype._getRestNumbers = function() {
    return this._cloneArray(this._restNumbers)
  }

  /** Return a clone of the array
    *
    * @param {array} array
    *
    * @returns {array}
    *
    * @private
    * @memberof Lottotron
    */
  Lottotron.prototype._cloneArray = function(array) {
    var res = []
    array.forEach(function(value, i, array) {
      res.push(value)
    })
    return res
  }

  /** Return a random number from min to max
    *
    * @param {number} min
    * @param {number} max
    *
    * @returns {number}
    *
    * @private
    * @memberof Lottotron
    */
    Lottotron.prototype._randomInteger = function(min, max) {
      var rand = min + Math.random() * (max + 1 - min)
      rand = Math.floor(rand)
      return rand
    }

  /** Return an integer array filled with numbers from 0 to "maxNumber".
    *
    * @param {number} maxNumber
    *
    * @returns {array}
    *
    * @private
    * @memberof Lottotron
    */
    Lottotron.prototype._createNumbersArray = function(maxNumber) {
      var res = []
      for (var i = 0; i <= maxNumber; i++) {
        res[i] = i
      }
      return res
    }

  // -- Hide private methods
    for (var key in Lottotron.prototype) {
      if (key[0] === '_') {
        Object.defineProperty(Lottotron.prototype, key, {
          'enumerable' : false
        })
      };
    };
