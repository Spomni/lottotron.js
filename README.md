# @spomni/lottotron

Construct an object that returns random non-repeating integers.
The instance returns integers from 0 to the user-defined value.

## How to use

Install **`lottotron`**.

    npm install @spomni/lottotron
  
Add a constructor into your script.

    const Lottotron = require('@spomni/lottotron')

Create an instance of the class **"`Lottotron( maxNumber )`"** passing the max value as option. The number should be not less than 0.

    var lotto = new Lottotron( 9 );

Call the method **"`#getNumber()`"** to get the next number.

    var number = lotto.getNumber();

The method **"`#getNumber()`"** returns the next number until all numbers of the inteval are returned. It returns **"`null`"** when all numbers have been returned.

If you need to get numbers again use the method *#reload()*. It rallback the object to the inital state.

    lotto.reload();

The property **"`#maxNumber`"** contains the max number of the interval.

    var maxNumber = lotto.maxNumber;

The property **"`#restNumbers`"** contains all numbers that were not returned from the method **"`#getNumber()`"**.

    var dontReturnedNumbersArray = lotto.restNumbers;

## Error processing

If you pass invalid value as the option of the constructor it throws an **"`Error`"** object. The field **"`message`"** of this object contains an error description.

<hr>

The more information looks on the [documentation](https://https://spomni.github.io/lottotron).