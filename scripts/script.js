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


//Dummy courses
var courseTitle = "CSCI 334 Programming Languages";
var courseDescription = "By the end of this course you will appreciate why some programming language features encourage programs with desirable qualities while others lead to ambiguous or buggy code.";
var courseTags = "Programming, Mobile Development";
var courseProf = "S.Freund";
var courseTime = ["TR 9:55-11:10"];
var coursePreReqs = ""

//Dummy course 2
var courseTitle2 = "WGSS 334 Programming Feminists";
var courseDescription2 = "This course appreciates the valiant endeavours to of our female programmers and how they have contributed.";
var courseTags2 = "Programming, WGSS, Technology";
var courseProf2 = "W.O Men";
var courseTime2 = ["WRF 10:55-12:10"];
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
    selectedCourses.splice(findCourse(selectedCourses, $this.parent().parent().find(".className").text()));
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
    highlightedCourses.splice(findCourse(highlightedCourses, $this.parent().parent().find(".className").text()));
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
