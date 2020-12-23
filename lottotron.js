class Lottotron {

  constructor(maxNumber) {

    // -- Check and init input param
    if (typeof(maxNumber) !== 'number') {
      throw new Error('The input option "maxNumber" should be a number.')
    } else if (maxNumber < 0) {
      throw new Error('The input option "maxNumber" should be greater than 0.')
    }

    this._maxNumber = Math.floor(maxNumber)

    this._restNumbers = this._createNumbersArray(this._maxNumber)

  }

  get maxNumber() {
    return this._maxNumber;
  }

  get restNumbers() {
    return this._cloneArray(this._restNumbers);
  }

  reload() {
    for (var i = 0; i <= this._maxNumber; i++) {
      this._restNumbers[i] = i
    }
  }

  getNumber() {
    if (this._restNumbers.length <= 0) {
      return null
    } else {
      var numberIndx = this._randomInteger(0, this._restNumbers.length - 1)
      return this._restNumbers.splice(numberIndx, 1)[0]
    }
  }

  _cloneArray(array) {
    var res = []
    array.forEach(function(value, i, array) {
      res.push(value)
    })
    return res
  }

  _randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min)
    rand = Math.floor(rand)
    return rand
  }

  _createNumbersArray(maxNumber) {
    var res = []
      for (var i = 0; i <= maxNumber; i++) {
        res[i] = i
      }
      return res
  }

}

module.exports = Lottotron;