/**
 * Construct a Course instance.
 *
 * @pre name, tags, timeslots, and preReqs are all valid and of the correct type.
 * @post constructs a Course instance with the given input.
 *
 * @param {string} name Name of Course.
 * @param {Array} tags Tags associated to the Course.
 * @param {Array} timeslotsString Unparsed timeslots associated to the Course.
 * @param {Array} preReqs Pre-requisite courses required by the Course.
 * @class
 */
var Course = (function () {
    function Course(name, tags, timeslotsString, preReqs) {
	if (this.name === undefined)
	    this.name = null;
	if (this.tags === undefined)
	    this.tags = null;
	if (this.timeslots === undefined)
	    this.timeslots = null;
	if (this.preReqs === undefined)
	    this.preReqs = null;
	this.name = name;
	this.tags = tags;
	this.timeslots =  this.parseTimeSlots(timeslotsString);
	this.preReqs = preReqs;
    }
        /**
     * Parses the raw timeslots into an array of integers.
     *
     * @post returns an array of integers which represent timeslots of the course.
     *
     * @param {Array} toBeParsed the string array representing all the timeslots of the course.
     * @return {Array} an array of integers which represent timeslots of the course.
     * @private
     */

    /* PARSING TIME CURRENTLY NOT WORKING*/
    //if(false){
    Course.prototype.parseTimeSlots = function (toBeParsed) {
	var result = ([]);
  //console.log(toBeParsed);
  //toBeParsed = toBeParsed.toString();
  //var toBeParsedArr = toBeParsed.split(" ");
  //console.log(toBeParsedArr);
	for (var i = 0; i < toBeParsed.length; i++) {
	    {
    //console.log(typeof toBeParsed[i]);

    console.log(toBeParsed[i]);
    var days = toBeParsed[i].split(/([0-9]+)/)[0];
		var timeArr = toBeParsed[i].split("-");
    var startTime = timeArr[0].split(/[a-zA-Z]+/)[1];
    console.log(startTime);
    var endTime = timeArr[1];
    var times = new Array();
    times.push(startTime);
    times.push(endTime);

    console.log(times);
		for (var j = 0; j < days.length; j++) {
		    {
      //console.log(days.charAt(j));

      //Takes string containing days of the week and iterates through each day.
      var day = days.charAt(j);
			var dayToInt = void 0;
      //console.log(days.charAt(j).charCodeAt(0));
			switch (day.charCodeAt(0)) {
			case 77 /* 'M' */:
			    dayToInt = 0;
			    break;
			case 84 /* 'T' */:
			    dayToInt = 1440;
			    break;
			case 87 /* 'W' */:
			    dayToInt = 1440 * 2;
			    break;
			case 82 /* 'R' */:
			    dayToInt = 1440 * 3;
			    break;
			case 70 /* 'F' */:
			    dayToInt = 1440 * 4;
			    break;
			default:
			    dayToInt = 0;
			    break;
			}
      //var foo = times[0]) > 0;
      //console.log("day to int stuff" : dayToInt + foo);
			/* add */ (result.push(dayToInt + this.parseTime(times[0])) > 0);
      console.log("push 1: " + result);
      /* add */ (result.push(dayToInt + this.parseTime(times[1])) > 0);
      console.log("push 2: " + result);
		    }
		    ;
		}
	    }
	    ;
	}
	var resultArray = (function (s){
      var a = new Array();
      console.log(s);
      while (s-- > 0){
        a.push(0);
        console.log(a);
      }
	     return a; })(/* size */ result.length);
	for (var i = 0; i < result.length; i++) {
	    {
		      resultArray[i] = result[i];
	    }
	    ;
	}
  console.log(resultArray);
	return resultArray;
    };
        /**
     * Parses the time from hh:ss format to an integer in terms of number
     * of minutes out the day.
     *
     * @post returns the integer representation of the time
     *
     * @return {number} the integer representation of time
     * @param {string} time
     * @private
     */
	Course.prototype.parseTime = function (time) {
  console.log("time: " + time);
  var hoursAndMins = time.split(":");
  console.log("hours and mins: " + hoursAndMins);
  console.log("hour: " + hoursAndMins[0]);
  var minutes = parseInt(hoursAndMins[0]) * 60 + parseInt(hoursAndMins[1]);
  console.log("minutes: " + minutes);
	return minutes;
    };

    //} //END OF COMMENTED FALSE JUMP STATEMENT

    /**
     * Fetch the name of the Course.
     *
     * @post returns the name variable
     *
     * @return {string} name
     */
    Course.prototype.getName = function () {
	return this.name;
    };
        /**
     * Fetch the list of tags assoicated to the Course.
     *
     * @post returns tags
     *
     * @return {Array} tags
     */
    Course.prototype.getTags = function () {
	return this.tags;
    };
        /**
     * Fetch the timeslots that the Course takes.
     *
     * @post returns timeslots
     *
     * @return {Array} timeslots
     */
    Course.prototype.getTimeslots = function () {
	return this.timeslots;
    };
        /**
     * Fetch the pre-requisites of the Course.
     *
     * @post returns preReqs
     *
     * @return {Array} preReqs
     */
    Course.prototype.getPreReqs = function () {
	return this.preReqs;
    };
    return Course;
}());
Course["__class"] = "Course";
