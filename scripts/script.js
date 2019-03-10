//TODO code formatting, updating comments

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
    function Course(name, prof, description, tags, timeslotsString, preReqs) {
    	if (this.name === undefined)
    	    this.name = null;
      if (this.prof === undefined)
    	    this.prof = null;
      if (this.description === undefined)
    	    this.description = null;
    	if (this.tags === undefined)
    	    this.tags = null;
    	if (this.timeslots === undefined)
    	    this.timeslots = null;
    	if (this.preReqs === undefined)
    	    this.preReqs = null;
    	this.name = name;
      this.prof = prof;
      this.description = description;
    	this.tags = tags;
      this.timeslotsString = timeslotsString;
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

    Course.prototype.parseTimeSlots = function (toBeParsed) {
    	var result = ([]);

    	for (var i = 0; i < toBeParsed.length; i++) {
    	    {

        //Get rid of numbers to parse out days.
        var days = toBeParsed[i].split(/([0-9]+)/)[0];


    		var timeArr = toBeParsed[i].split("-");
        //Get rid of letters to parse out times. Obtain starting time.
        var startTime = timeArr[0].split(/[a-zA-Z]+/)[1];

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

    			/* add */ (result.push(dayToInt + this.parseTime(times[0])) > 0);
          /* add */ (result.push(dayToInt + this.parseTime(times[1])) > 0);
    		}
    	    };
    	}

    	var resultArray = (function (s){
          var a = new Array();
          console.log(s);
          while (s-- > 0){
            a.push(0);
            console.log(a);
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

/**
 * Construct an empty Schedule instance.
 *
 * @post constructs an empty Schedule instance.
 * @param {Course[]} courses
 * @class
 */
var Schedule = (function () {
    function Schedule(courses) {
        /*private*/ this.courses = [null, null, null, null, null, null, null];
        this.courses = courses.slice(0);
    }
    /**
     * Returns @courses.
     *
     * @post returns @courses.
     *
     * @return {Array} @courses
     */
    Schedule.prototype.getCourses = function () {
        return this.courses;
    };
    return Schedule;
}());
Schedule["__class"] = "Schedule";


/**
 * Construct a Scheduler instance and generates possible schedules.
 *
 * @param {Array} possibleCourses An array holding all the possible Courses to examine.
 * @post constructs a Scheduler instance.
 * @class
 */
var Scheduler = (function () {
    function Scheduler(possibleCourses) {
        /*private*/ this.possibleSchedules = ([]);
        if (this.possibleCourses === undefined)
            this.possibleCourses = null;
        this.possibleCourses = possibleCourses;
        this.generateSchedules();
    }
    /**
     * Checks for conflicts in timeslots between two courses.
     *
     * @pre two valid courses are passed in
     * @post returns boolean value representing the presence of a conflict.
     *
     * @param {Course} thisCourse one of the courses to examine
     * @param {Course} otherCourse other course to examine
     * @return {boolean} true if there is a conflict, false otherwise.
     * @private
     */
    /*private*/ Scheduler.prototype.checkConflicts = function (thisCourse, otherCourse) {
        var thisTimeslots = thisCourse.getTimeslots();
        var otherTimeslots = otherCourse.getTimeslots();
        for (var i = 0; i < thisTimeslots.length; i += 2) {
            {
                for (var j = 0; j < otherTimeslots.length; j += 2) {
                    {
                        if (thisTimeslots[i] <= otherTimeslots[i + 1] && thisTimeslots[i + 1] > otherTimeslots[j])
                            return true;
                        else if (otherTimeslots[j] <= thisTimeslots[i] && otherTimeslots[j + 1] > thisTimeslots[i])
                            return true;
                    }
                    ;
                }
            }
            ;
        }
        return false;
    };
    /**
     * Generates all possible Schedules.
     *
     * @pre possibleCourses has been initialized, possibleCourses.length > MAX_COURSES
     * @post possibleSchedules is populated with all possible schedules.
     * @private
     */
    /*private*/ Scheduler.prototype.generateSchedules = function () {
        var chosen = ([]);
        this.generateScheduleHelper(chosen, 0, false);
    };
    /**
     * Helper method that generates courses recursively.
     *
     * @pre two valid courses are passed in
     * @post possibleSchedules is populated with all possible schedules.
     *
     * @param {Course[]} chosen ArrayList of courses that are possible thus far.
     * @param {number} currIndex index of the course currently examined.
     * @param {boolean} courseAdded boolean indicating whether a course was added with the
     * last recursion.
     * @private
     */
    /*private*/ Scheduler.prototype.generateScheduleHelper = function (chosen, currIndex, courseAdded) {
        if (courseAdded)
            (this.possibleSchedules.push(new Schedule(chosen)) > 0);
        if (currIndex === this.possibleCourses.length)
            return;
        else if (chosen.length === Scheduler.MAX_COURSES)
            return;
        this.generateScheduleHelper(chosen, currIndex + 1, false);
        for (var i = 0; i < chosen.length; i++) {
            {
                if (this.checkConflicts(/* get */ chosen[i], this.possibleCourses[currIndex]))
                    break;
                else if (i === chosen.length - 1) {
                    /* add */ (chosen.push(this.possibleCourses[currIndex]) > 0);
                    this.generateScheduleHelper(chosen, currIndex + 1, true);
                }
            }
            ;
        }
    };
    return Scheduler;
}());
Scheduler.MAX_COURSES = 5;
Scheduler["__class"] = "Scheduler";

//Dummy courses
var courseTitle = "CSCI 334 Programming Languages";
var courseDescription = "By the end of this course you will appreciate why some programming language features encourage programs with desirable qualities while others lead to ambiguous or buggy code.";
var courseTags = "Programming, Mobile Development";
var courseProf = "S.Freund";
var courseTime = ["TR9:55-11:10"];
var coursePreReqs = ""

//Dummy course 2
var courseTitle2 = "WGSS 334 Programming Feminists";
var courseDescription2 = "This course appreciates the valiant endeavours to of our female programmers and how they have contributed.";
var courseTags2 = "Programming, WGSS, Technology";
var courseProf2 = "W.O Men";
var courseTime2 = ["WF10:55-12:10"];
var coursePreReqs2 = ""

//Selected Courses
var selectedCourses = [];
//Highlighted Courses
var highlightedCourses = [];

//Initializing the array of courses.
var courseArray = [];
for (var i = 0; i<5; i++){
  courseArray.push(new Course(courseTitle, courseProf, courseDescription, courseTags, courseTime, coursePreReqs));
}
courseArray.push(new  Course(courseTitle2, courseProf2, courseDescription2, courseTags2, courseTime2, coursePreReqs2));

//Initializing the display for all courses
updateFull();
updateCalendar();

function createClass(course){
  var newClass = document.createElement('div');
    newClass.className = "row class";
      var newTitle = document.createElement('div');
      newTitle.className = "col col-lg-2 left";
        var newClassNumber = document.createElement('div');
        newClassNumber.className = "number";
        var newClassProf = document.createElement('div');
        newClassProf.innerHTML = course.getProf();
        newClassProf.className = "professor";
        var newClassTime = document.createElement('div');
        newClassTime.innerHTML = course.getTimeslotString();
        newClassTime.className = "classTime";
      newTitle.appendChild(newClassNumber);
      newTitle.appendChild(newClassProf);
      newTitle.appendChild(newClassTime);

      var newClassDescription = document.createElement('div');
      newClassDescription.className = "col right";
        var newClassName = document.createElement('div');
        newClassName.innerHTML = course.getName();
        newClassName.className = "className";
        var newClassDescr = document.createElement('div');
        newClassDescr.innerHTML = course.getDescription();
        newClassDescr.className = "classDescr";
        var newRowTags = document.createElement('div');
        newRowTags.className = "row tags";
          for(var j = 0; j <3; j++){
            var newTag = document.createElement('div');
            newTag.className = "tag";
            var tagButton = document.createElement('button');
            tagButton.className = "btn btn-sm";
            tagButton.innerHTML = "X";
            newTag.innerHTML = "Tag";
            newTag.prepend(tagButton);
            newRowTags.appendChild(newTag);
          }

          var selectButton = document.createElement('button');
          selectButton.className = "btn btn-sm select-button";
          selectButton.innerHTML = "Select";
          if(findCourse(selectedCourses, course.getName())>-1) {
            selectButton.classList.add('selected');
            selectButton.innerHTML = "Selected";
          }


          var highlightButton = document.createElement('button');
          highlightButton.className = "btn btn-sm highlight-button";
          highlightButton.innerHTML = "Highlight";
          if(findCourse(highlightedCourses, course.getName())>-1) {
            highlightButton.classList.add('selected');
            highlightButton.innerHTML = "Highlighted";
          }
          newRowTags.appendChild(highlightButton);
          newRowTags.appendChild(selectButton);
      newClassDescription.appendChild(newClassName);
      newClassDescription.appendChild(newClassDescr);
      newClassDescription.appendChild(newRowTags);
    newClass.appendChild(newTitle);
    newClass.appendChild(newClassDescription);

    return newClass;
}

var tags = [];
var tagRow = $("#selected-tags");

updateTags();

function updateTags(){
  tagRow.empty();

  for(var i = 0; i<tags.length; i++){
    var newTag = document.createElement('div');
    newTag.className = "tag";
      var tagButton = document.createElement('button');
      tagButton.className = "btn btn-sm";
      tagButton.innerHTML = "X";
      tagButton.value = tags[i];
      tagButton.addEventListener("click", function(){
        tags.splice(tags.indexOf($(this).val()),1);
        updateTags();
      });
    newTag.innerHTML = tags[i];
    newTag.prepend(tagButton);
    tagRow.append(newTag);
  }
}

var shoppingCart = $("#shopping-cart");
var allCourses = $("#all-courses");
var shoppingCartBtn = $("#shopping-cart-button");
var allCoursesBtn = $("#all-courses-button");


$("#all-courses-button").click(function(){
  allCourses.removeClass("hide");
  allCoursesBtn.css('border-top', '1px solid #3F2953');
  allCoursesBtn.css('border-left', '1px solid #3F2953');
  allCoursesBtn.css('border-right', '1px solid #3F2953');
  shoppingCart.addClass("hide");
  shoppingCartBtn.css('border', 'none');
});


$("#shopping-cart-button").click(function(){
  shoppingCart.removeClass("hide");
  shoppingCartBtn.css('border-top', '1px solid #3F2953');
  shoppingCartBtn.css('border-left', '1px solid #3F2953');
  shoppingCartBtn.css('border-right', '1px solid #3F2953');
  allCourses.addClass("hide");
  allCoursesBtn.css('border', 'none');
});




$(document).on('click', '.select-button',function(){
  var $this = $(this);
  $this.toggleClass('selected');
  if($this.text() === "Selected"){
    $this.text("Select");
    //console.log(findCourse(selectedCourses, $this.parent().parent().find(".className").text()));
    selectedCourses.splice(findCourse(selectedCourses, 1, $this.parent().parent().find(".className").text()));
  }
  else{
    $this.text("Selected");
    selectedCourses.push(courseArray[findCourse(courseArray, $this.parent().parent().find(".className").text())]);
    if(!$this.parent().find(".highlight-button").hasClass('selected'))
      $this.parent().find(".highlight-button").trigger("click");
  }
  updateSelected();
  updateHighlighted();
  updateFull();
});

$(document).on('click', '.highlight-button',function(){
  var $this = $(this);
  $this.toggleClass('selected');
  if($this.text() === "Highlighted"){
    $this.text("Highlight");
    highlightedCourses.splice(findCourse(highlightedCourses, 1, $this.parent().parent().find(".className").text()));
  }
  else{
    $this.text("Highlighted");
    highlightedCourses.push(courseArray[findCourse(courseArray, $this.parent().parent().find(".className").text())]);
  }
  updateHighlighted();
  updateFull();
});


// no error handling
function findCourse(array, name){
  for(var i = 0; i < array.length; i++)  if(array[i].getName()=== name) return i;
  return -1;
}

function updateSelected(){
  selCourse = $("#selected-course-container").empty();
  for(var i = 0; i < selectedCourses.length; i++){
    $("#selected-course-container")[0].appendChild(createClass(selectedCourses[i]));
  }
  updateCalendar();
}
function updateHighlighted(){
  $("#highlighted-course-container").empty();
  for(var i = 0; i < highlightedCourses.length; i++){
    if(!selectedCourses.includes(highlightedCourses[i]))
    $("#highlighted-course-container")[0].appendChild(createClass(highlightedCourses[i]));
  }
}
function updateFull(){
  $("#all-courses").empty();
  for(var i = 0; i < courseArray.length; i++){
    $("#all-courses")[0].appendChild(createClass(courseArray[i]));
  }
}

function updateCalendar(){
  var calendarHours = $('#calendar-hours');
  calendarHours.empty();


  var table = $('<td></td>').append($('<table></table>'));
  var row = $('<tr></tr>');
  var td = $('<td></td>');

  var startHour = 8;
  var endHour = 20;

  var hoursTable = table.clone();
  for(var i = startHour * 60; i < endHour * 60; i += 60 ){
    var newRow = row.clone();
    var newTd = td.clone();
    newTd.text(Math.floor(i/60) + ":" + ('00'+ i%60).slice(-2));
    newTd.appendTo(newRow);
    newRow.addClass('time');
    if(Math.floor(i/60)%2 === 1) newRow.addClass('odd');
    newRow.appendTo(hoursTable.children());
  }
  calendarHours.append(hoursTable);

  for(var i = 0; i < 5; i++){
    var dayTable = table.clone();
    for(var j = startHour * 60; j < endHour * 60; j += 5 ){
      var newRow = row.clone();
      var isCourse = false;

      for(var k = 0; k < selectedCourses.length; k++){
        counter = check(selectedCourses[k].getTimeslots(), i, (j - startHour * 60)/5);
        if (counter > 0){
          isCourse = true;
          var newTd = td.clone()
          newRow.height(selectedCourses[k].getTimeslots()[1]- selectedCourses[k].getTimeslots()[0]);
          newTd.text(selectedCourses[k].getName().substr(0,selectedCourses[k].getName().indexOf(" ",5)));
          newRow.append(newTd);
          newRow.addClass('course-timeslot');
          j += selectedCourses[k].getTimeslots()[1]- selectedCourses[k].getTimeslots()[0] -5;
        }
      }

      if(!isCourse) {
        newRow.append(td.clone());
        newRow.addClass("empty-timeslot");
        if(Math.floor(j/60)%2 === 1) newRow.addClass('odd');
      }

      newRow.appendTo(dayTable.children());
    }
    calendarHours.append(dayTable);
  }

}

function check(timeslots, d, slot){
    //console.log(timeslots + " " + d + " " + slot);
    for(var n = 0; n < timeslots.length; n+=2){
      if( (timeslots[n] <= d * 1440 + slot * 5 + 8 * 60) &&
        (timeslots[n + 1] > d * 1440 + slot * 5 + 8 * 60))
        return (timeslots[n + 1] - timeslots[n])/5;

      else if ((timeslots[n] > d * 1440 + slot * 5 + 8 * 60) &&
        (timeslots[n] < d * 1440 + slot * 5 + 8 * 60))
        return (timeslots[n + 1] - timeslots[n])/5
    }
    return 0

}

$('#add-tags-button').on('click', function(){
    var selText = $('#tag-options .full-width').filter(':not(.hide)').find('.select-styled').text();
    if(!tags.includes(selText) && selText !== "Choose a category!")tags.push(selText);
    updateTags();
});

var counter = 1;

$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        selectValueHelper($(this).attr('rel'),$this.parent().parent().attr('id'));
    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

  });


function selectValueHelper(text, source){
  if(source === 'subject') {
    var nodes = $('#tag-options').children().addClass('hide');
    if (text.length) { // if somethings' selected
      nodes.filter('.'+text).removeClass('hide');
    }
  }
}
