'use strict';

// LAB 2: SORTING AND CAMPY SCI-FI

// Welcome to Lab 2 =)

// Be sure to read all the comments!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

// To run this file (in the terminal) use: node lab2.js

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/

var Blob = function() {

  this.eat = function(humans, startRate) {
    var i = 0;
    var totalEaten = 0;

    while (totalEaten < humans) {
      totalEaten += startRate;
      startRate++;
      i++;
    }
    return i;
  };

};

var blob = new Blob();

var hoursSpentInDowington = blob.eat(1000, 1); // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

Blob.prototype.hoursToOoze = function(population, peoplePerHour) {
  var i = 0;
  var totalEaten = 0;

  while (totalEaten < population) {
    totalEaten += peoplePerHour;
    peoplePerHour++;
    i++;
  }
  return i;
};

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');
assert(blob.hoursToOoze(-10, 1) === 0,
  'If no people means no time, then how long should negative people take?');
assert(blob.hoursToOoze(1000, 1000) === 1, 'This should only take a lunch hour.');
assert(blob.hoursToOoze(7000000000, 1) > (7 * 24),
  'Surely, the world should take more than a week');

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.

function SentientBeing(homePlanet, tongue) {
  this.homePlanet = homePlanet;
  this.tongue = tongue;
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
}

var Klingon = new SentientBeing('Qo\'noS', 'klingon');
var Human = new SentientBeing('Earth', 'federation standard');
var Romulan = new SentientBeing('Romulus', 'romulan');

// sb is a SentientBeing object
SentientBeing.prototype.sayHello = function(sb) {
  console.log(hello[SentientBeing.tongue]);
  return hello[sb.tongue];
};
    // TODO: say hello prints out (console.log's) hello in the
    // language of the speaker, but returns it in the language
    // of the listener (the sb parameter above).
    // use the 'hello' object at the beginning of this exercise
    // to do the translating

    //TODO: put this on the SentientBeing prototype

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).

assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');
assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');
assert((new Romulan()).sayHello(new Human()) === 'hello',
  'the Human should hear hello');
assert((new Klingon()).sayHello(new Human()) === 'hello',
  'the romulan should hear hello');
assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');
assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');

// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

var cities = ['Chicago', 'Paris', 'Los Angeles', 'Vancouver'];
var numbers1 = [1, 2, 3, 4, 5];
var numbers2 = [10, 15, 20, 25, 30];
var numbers3 = [37, 1, 12, 70, 18];
var allNumbers = [numbers1, numbers2, numbers3];

function lastLetterSort(stringArray) {

  function byLastLetter(a, b) {

    if ((a.charAt(a.length - 1)) < (b.charAt(b.length - 1))) {
      return -1;
    } else if ((a.charAt(a.length - 1)) > (b.charAt(b.length - 1))) {
      return 1;
    }
    return 0;
  }
  stringArray.sort(byLastLetter);
}

function sumArray(numberArray) {

  var sum = 0;

  numberArray.forEach(function(value) {
    sum += value;
  });
  return sum;
}

function sumSort(arrayOfArrays) {
  var sumSortArray = [];

  arrayOfArrays.forEach(function(array) {
    sumSortArray.push(sumArray(array));
  });

  arrayOfArrays.sort(sumSortArray);

  return sumSortArray;

}

assert((sumArray(numbers1)) === 15,
  'Almost only counts in horseshoes and hand grenades.');
assert((lastLetterSort(cities)) === ['Chicago', 'Vancouver', 'Paris', 'Los Angeles'],
  'Those are nice cities, but they\'re not in the right order');
assert((sumSort(allNumbers)) === [15, 100, 138],
  'No cigar, try again.');

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
