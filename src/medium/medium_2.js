import mpg_data from "./data/mpg_data.js";
import { getStatistics } from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */

export const allCarStats = {

    avgMpg: { "city": getStatistics(mpg_data.map(element => element.city_mpg)).mean, "highway": getStatistics(mpg_data.map(element => element.highway_mpg)).mean },
    allYearStats: getStatistics(mpg_data.map(element => element.year)),
    ratioHybrids: (getStatistics(mpg_data.map(element => element.hybrid)).sum) / (getStatistics(mpg_data.map(element => element.hybrid)).length)
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: mpg_data.reduce(
        function () {
            let toReturn = []
            let toAdd = {} // "make": carmake
            let carMakes = [] // "hybrids": carMakes
            let placeHolder = {}
            for (let i = 0; i < mpg_data.length; i++) {
                if (!(mpg_data[i].make in placeHolder)) {
                    placeHolder[mpg_data[i].make] = [mpg_data[i].id];
                } else {
                    placeHolder[mpg_data[i].make].push(mpg_data[i].id);
                }
            }
            for (let m in placeHolder) {
                toReturn.push({ "make": m, "hybrids": placeHolder[m] })
            }

            return toReturn
        }
    ),
    avgMpgByYearAndHybrid: mpg_data.reduce(
        function () {
            let toReturn = []
            let toAdd = {} // "make": carmake
            let carMakes = [] // "hybrids": carMakes
            let placeHolder = {}
            for (let i = 0; i < mpg_data.length; i++) {
                if (!(mpg_data[i].make in placeHolder)) {
                    placeHolder[mpg_data[i].make] = [mpg_data[i].id];
                } else {
                    placeHolder[mpg_data[i].make].push(mpg_data[i].id);
                }
            }
            for (let m in placeHolder) {
                toReturn.push({ "make": m, "hybrids": placeHolder[m] })
            }
            toReturn.sort(
                function (firstOne, SecondOne) {
                    return SecondOne.hybrids.length - firstOne.hybrids.length
                }
            )
            return toReturn
        }
    )
};
