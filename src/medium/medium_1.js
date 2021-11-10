import { maxAndMin } from "../mild/mild_1.js";
import { variance } from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let i = 0
    for (let n = 0; n < array.length; n++) {
        i += array[n];
    }
    return i
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    let y = []
    let copy = Object.assign({}, array)

    for (let i = 0; i < Object.keys(copy).length; i++) {
        let lowest = array[0]

        for (let n = 0; n < array.length; n++) {
            if (array[n] < lowest) {
                lowest = array[n]
            }
        }
        y[i] = lowest
        array.splice(array.indexOf(lowest), 1)
    }

    if (y.length % 2 == 0) {
        return ((y[y.length / 2] + y[(y.length / 2) - 1]) / 2)
    } else {
        return (y[(y.length / 2) + .5])

    }
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let lowest = array[0]
    let highest = array[0]
    for (let i = 0; i < array.length; i++) {
        if (array[i] > highest) {
            highest = array[i]
        } else if (array[i] < lowest) {
            lowest = array[i]
        }

    }
    let returning = {
        max: Number(highest),
        min: Number(lowest)
    }








    let newObject = {}
    newObject["length"] = array.length
    newObject["sum"] = getSum(array)
    newObject["mean"] = getSum(array) / array.length
    newObject["median"] = getMedian(array)
    newObject["min"] = returning["min"]
    newObject["max"] = returning.max



    let what = array.map(function (sample) {
        return Math.pow(newObject.mean - sample, 2);
    })
        .reduce(function sum(m, v) {
            m += v;
            return m;
        }, 0) / array.length;

    newObject["variance"] = what




    return newObject
}

