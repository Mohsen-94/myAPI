const _ = require('underscore');
const data = require('./data.json');
//Combinations util function
_.mixin({
  combinations: function() {
    return _.reduce(
      Array.prototype.slice.call(arguments, 1),
      function(ret, newarr) {
        return _.reduce(
          ret,
          function(memo, oldi) {
            return memo.concat(
              _.map(newarr, function(newi) {
                return oldi.concat([newi]);
              })
            );
          },
          []
        );
      },
      _.map(arguments[0], function(i) {
        return [i];
      })
    );
  }
});

function isConflict(course1, course2) {
  //some refactoring here later
  if (
    course1.SUN &&
    course2.SUN &&
    _.intersection(course1.SUN.split(','), course2.SUN.split(',')).length != 0
  ) {
    return true;
  }
  if (
    course1.MON &&
    course2.MON &&
    _.intersection(course1.MON.split(','), course2.MON.split(',')).length != 0
  ) {
    return true;
  }
  if (
    course1.TUE &&
    course2.TUE &&
    _.intersection(course1.TUE.split(','), course2.TUE.split(',')).length != 0
  ) {
    return true;
  }
  if (
    course1.WED &&
    course2.WED &&
    _.intersection(course1.WED.split(','), course2.WED.split(',')).length != 0
  ) {
    return true;
  }
  if (
    course1.THU &&
    course2.THU &&
    _.intersection(course1.THU.split(','), course2.THU.split(',')).length != 0
  ) {
    return true;
  }
  return false;
}

function courseNames() {
  return _.uniq(data.map(course => course['Course Name']));
}

function isValid(sch) {
  if (sch.length >= 2) {
    for (let i = 0; i < sch.length; i++) {
      const course1 = sch[i];
      for (let j = i + 1; j < sch.length; j++) {
        const course2 = sch[j];
        if (isConflict(course1, course2)) {
          return false;
        }
      }
    }
    return true;
  } else return true;
}

function validScheduels(query) {
  if (query) {
    let theorySubjects = query
      .split(',')
      .map(sub =>
        data.filter(
          course =>
            course['Course Name'] === sub &&
            course['Activity'] === 'Theoretical'
        )
      );
    let labs = query
      .split(',')
      .map(sub =>
        data.filter(
          course =>
            course['Course Name'] === sub && course['Activity'] === 'Practical'
        )
      )
      .filter(element => element.length !== 0);

    let combinations =
      _.flatten(labs).length === 0
        ? _.combinations(...theorySubjects)
        : _.combinations(...theorySubjects, ...labs);
    return combinations.filter(isValid);
  } else {
    return {};
  }
}

module.exports = {
  courseNames: courseNames,
  validScheduels: validScheduels
};
