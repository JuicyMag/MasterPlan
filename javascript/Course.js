
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
     //  if (this.subject === undefined)
    	//     this.subject = null;
     //  if (this.number === undefined)
    	//     this.number = null;
    	// if (this.attributes === undefined)
    	//     this.attributes = null;
    	if (this.name === undefined)
    	    this.name = null;
      // if (this.prof === undefined)
    	 //    this.prof = null;
      // if (this.description === undefined)
    	 //    this.description = null;
    	if (this.tags === undefined)
    	    this.tags = null;
    	if (this.timeslots === undefined)
    	    this.timeslots = null;
    	if (this.preReqs === undefined)
    	    this.preReqs = null;
      // this.subject = subject;
      // this.number = number;
      // this.attributes = attributes.split(",");
    	this.name = name;
      // this.prof = prof;
      // this.description = description;
    	this.tags = tags;
      this.timeslots = this.parseTimeSlots(timeslotsString);
    	// this.timeslots =  this.parseTimeSlots(timeslotsString);
    	this.preReqs = preReqs;
//      console.log(this.attributes);
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

    Course.prototype.parseTimeSlots = function (toBeParsed) {
      //TODO make it less hacky.
    	var result = ([]);

    	for (var i = 0; i < toBeParsed.length; i++) {
    	    {

        //Get rid of numbers to parse out days.
        var days = toBeParsed[i].split(/([0-9]+)/)[0];

    		var timeArr = toBeParsed[i].split("-");

        //Get rid of letters to parse out times. Obtain starting time.
        var startTime = timeArr[0].split(/[a-zA-Z]+/)[1];

        startTime = startTime.replace(/ +/g,'');

        //Obtain ending time.
        var endTime = timeArr[1];

        //Array to hold starting and ending times.
        var times = new Array();
        times.push(startTime);
        times.push(endTime);

    		for (var j = 0; j < days.length; j++) {
          //Takes string containing days of the week and iterates through each day.
          var day = days.charAt(j);
    			var dayToInt = void 0;

          //Looks at UTF-16 representations of days of the week.
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

          if(dayToInt != -1){
          /* add */ (result.push(dayToInt + this.parseTime(times[0])) > 0);
          /* add */ (result.push(dayToInt + this.parseTime(times[1])) > 0);
          }


    		}
    	    };
    	}

    	var resultArray = (function (s){
          var a = new Array();
          console.log(s);
          while (s-- > 0){
            a.push(0);
            //console.log(a);
          }
    	     return a; })(/* size */ result.length);
    	for (var i = 0; i < result.length; i++) resultArray[i] = result[i];

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
	Course.prototype.parseTime = function (timeString) {
  var hoursAndMins = timeString.split(":");
  var minutes = parseInt(hoursAndMins[0]) * 60 + parseInt(hoursAndMins[1]);
	return minutes;
    };

    //} //END OF COMMENTED FALSE JUMP STATEMENT


    /**
     * Fetch the name of the Course.
     *
     * @post returns the name variable
     *TODO
     * @return {string} name
     */
    Course.prototype.getSubject = function () {
	return this.subject;
    };

          /**
     * Fetch the name of the Course.
     *
     * @post returns the name variable
     *TODO
     * @return {string} name
     */
    Course.prototype.getNumber = function () {
	return this.number;
    };

          /**
     * Fetch the name of the Course.
     *
     * @post returns the name variable
     *TODO
     * @return {string} name
     */
    Course.prototype.getAttributes = function () {
	return this.attributes;
    };






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

    //TODO Comments.

    Course.prototype.getTimeslotString = function(){
      return this.timeslotsString;
    };
    Course.prototype.getProf = function(){
      return this.prof;
    };
        Course.prototype.getDescription = function(){
      return this.description;
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

//End Course.js
