//TODO code formatting, updating comments

//Css variables
var shoppingCart = $("#shopping-cart");
var allCourses = $("#all-courses");
var shoppingCartBtn = $("#shopping-cart-button");
var allCoursesBtn = $("#all-courses-button");
var searchoptions = $("#search-options");
var schedule = $("#schedule");

var selectedCourses = []; //Selected Courses
var highlightedCourses = []; //Highlighted Courses

//Initializing the Schedule variables.
var scheduler = new Scheduler([]);
//Initializing the array of courses.
var courseArray = [];
var courseData = [];

//Number of Courses to Recommend.
const numRecommended = 5;

//Dummy Student
var bobTags = ["Programming", "Compiler"];
var bobClassesTaken = ["CSCI 134", "CSCI 136"];
var Bob = new Student("Bob", null, 2021, bobClassesTaken);

updateCalendar();

//Initialize the courses from JSON file.
loadJSON(function(json) {
  courseData = json;
  for(var i = 0; i < courseData.length; i ++){
    courseArray.push(new Course(courseData[i].Title, courseData[i].Professor, courseData[i].Description,courseData[i].Tags.split(";"),courseData[i].Timeslot,courseData[i].Prereqs));
  }
});

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'Courses.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
}


/**
 * Returns true if the pre-requisites for the course has been fulfilled, false otherwise.
 *
 * @post initialize the @students ArrayList from the input json file.
 *
 * @param {Course} course course to check pre-reqs..
 * @param {Student} student student we are interested in.
 * @return {Boolean} true if the pre-requisites for the course has been fulfilled, false otherwise.
 */
function checkPrereqs(course, student) {
	var preReqs = course.getPreReqs();
	var classesTaken = student.getClassesTaken();

  if(preReqs[0] == "") return true;

  //If any of the classes the student has taken is not found in the list of
  //pre-requisites in the class, return false.
	return (function (a, r) { for (var i = 0; i < r.length; i++) {
	    if (a.indexOf(r[i]) < 0 )
		return false;
	}

  return true; })(/* asList */ classesTaken.slice(0), /* asList */ preReqs.slice(0));
}

/**
 * Returns an array with the compatibility values of each course.
 *
 * @pre studentTags is of the proper data format
 * @post initialize the @students ArrayList from the input csv file.
 *
 * @param {Array} studentTags tags assoicated with the student.
 * @param {Student} student student we are interested in.
 * @return {Array} an int array representing the compatibility values of the
 * student with each course
 */
function getCompatibility(studentTags, student) {

  //Initializes an array with the same length as the total number of courses to 0.
	var compatibilityValues = (function (s) { var a = []; while (s-- > 0)
	    a.push(0); return a; })(/* size */ courseArray.length);

  //For each course,
	for (var i = 0; i < courseArray.length; i++) {
		var compatibility = 0;
		if (checkPrereqs(/* get */ courseArray[i], student)) {
      compatibility ++; //added so that courses whose pre-reqs are fulfilled are prioritized.
	    var courseTags = courseArray[i].getTags();

      //Compares tags, adds 1 for every matching tag.
	    for (var k = 0; k < studentTags.length; k++) {
		    for (var j = 0; j < courseTags.length; j++) {
			    var result = studentTags[k].toUpperCase().localeCompare(courseTags[j].toUpperCase());
			    if (result === 0)	compatibility++;
		    }
	    }
		}
		compatibilityValues[i] = compatibility;
	}
	return compatibilityValues;
}

/**
 * Returns an array with the indexes of the most compatible courses
 * in @courses
 *
 * @post Returns an array with the indexes of the most compatible courses
 * in @courses
 *
 * @param {Array} values array of compatibility values a student has with courses.
 * @param {Student} student the Student variable we are interested in.
 * @return {Array} an array with the indexes of the most compatible courses
 * in @courses
 */
function getMostCompatible(values, student) {
  //Creates a result array to store the indices of the courses, and a
  //shadow array to store the corresponding compatibility values.
	var result = (function (s) { var a = []; while (s-- > 0)
	    a.push(0); return a; })(numRecommended);
	var shadow = (function (s) { var a = []; while (s-- > 0)
	    a.push(0); return a; })(numRecommended);
	var count = 0;

  //Loops through all courses
	for (var i = 0; i < values.length; i++) {
    //Compares each course with current most compatible course
		for (var j = 0; j < result.length; j++) {
      // if new course is more compatible, look for course with lowest
      // compatibility and replace it.
			if (values[i] > shadow[j]) {
			    var min = 2147483647;
			    var minIndex = 0;
			    for (var k = 0; k < result.length; k++) {
				    if (shadow[k] < min) {
    					minIndex = k;
    					min = shadow[k];
				    }
			    }
			    result[minIndex] = i;
			    shadow[minIndex] = values[i];
			    break;
			}
		}
	}

  //Bubblesorts the result array.
	for (var i = 0; i < result.length - 1; i++) {
		for (var j = 0; j < result.length - 1; j++) {
			if (shadow[j] < shadow[j + 1]) {
			    var dummy = result[j];
			    result[j] = result[j + 1];
			    result[j + 1] = dummy;
			    dummy = shadow[j];
			    shadow[j] = shadow[j + 1];
			    shadow[j + 1] = dummy;
			}
		}
	}
  console.log(result);

	var maxCompatible = ([]);
	for (var i = 0; i < 5; i++) {
		if (checkPrereqs(/* get */ courseArray[result[i]], Bob)) {

		    if (!(Bob.getClassesTaken().slice(0).indexOf((courseArray[result[i]].getName())) >= 0)) {
    			if (!(maxCompatible.indexOf((result[i])) >= 0)) {
    			    /* add */ (maxCompatible.push(result[i]) > 0);
    			}
		    }
		}
	}
	var finalResult = (function (s) { var a = []; while (s-- > 0)
	    a.push(0); return a; })(/* size */ maxCompatible.length);
	var index = 0;
	for (var index622 = 0; index622 < maxCompatible.length; index622++) {
	    var val = maxCompatible[index622];
      finalResult[index++] = val;
	}
	return finalResult;
}


function createClass(course){
  var newClass = document.createElement('div');
    newClass.className = "row class";
      var newTitle = document.createElement('div');
      newTitle.className = "col col-lg-2 left";
        var newClassProf = document.createElement('div');
        newClassProf.innerHTML = course.getProf();
        newClassProf.className = "professor";
        var newClassTime = document.createElement('div');
        newClassTime.innerHTML = course.getTimeslotString().split("; ")[0];
        newClassTime.className = "classTime";

        var selectButtonDiv = document.createElement('div');
        selectButtonDiv.className = "row";
        selectButtonDiv.style.display ="inline-block";

        var selectButton = document.createElement('button');
        selectButton.className = "btn btn-sm select-button";
        selectButton.innerHTML = "Add";

        if(findCourse(selectedCourses, course.getName())>-1) {
          selectButton.classList.add('selected');
          selectButton.innerHTML = "Added";
        }

        var highlightButtonDiv = document.createElement('div');
        highlightButtonDiv.style.display ="inline-block";
        highlightButtonDiv.style.overflow = "hidden";
        highlightButtonDiv.className = "row";

        var highlightButton = document.createElement('button');
        highlightButton.className = "btn btn-sm highlight-button";
        highlightButton.innerHTML = "Star";
        if(findCourse(highlightedCourses, course.getName())>-1) {
          highlightButton.classList.add('selected');
          highlightButton.innerHTML = "Starred";
        }

      selectButtonDiv.appendChild(selectButton);
      highlightButtonDiv.appendChild(highlightButton);

      newTitle.appendChild(newClassProf);
      newTitle.appendChild(newClassTime);
      newTitle.appendChild(highlightButtonDiv);
      newTitle.appendChild(selectButtonDiv);

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
          /*for(var j = 0; j < course.getTags().length; j++){
            if(course.getTags()[j]===""){
              continue;
            }
            var newTag = document.createElement('div');
            newTag.className = "course-tag";
            newTag.innerHTML = course.getTags()[j];
            newRowTags.appendChild(newTag);
          }*/
        newRowTags.innerHTML = course.getTags().join(", ");
      newClassDescription.appendChild(newClassName);
      newClassDescription.appendChild(newClassDescr);
      newClassDescription.appendChild(newRowTags);
    newClass.appendChild(newTitle);
    newClass.appendChild(newClassDescription);

    return newClass;
}


function createShortClass(course){
  var newClass = document.createElement('div');
    newClass.className = "row class";

      var newClassDescription = document.createElement('div');
      newClassDescription.className = "col right";
        var newClassName = document.createElement('div');
        newClassName.innerHTML = course.getName();
        newClassName.className = "shortclassName";
        var newClassProf = document.createElement('div');
        newClassProf.innerHTML = course.getProf();
        newClassProf.className = "professor";
        var newClassTime = document.createElement('div');
        newClassTime.innerHTML = course.getTimeslotString().split("; ")[0];
        newClassTime.className = "classTime";
        var newRowTags = document.createElement('div');
        newRowTags.className = "row tags";
        newRowTags.innerHTML = course.getTags().join(", ");


        var selectButtonDiv = document.createElement('div');
        selectButtonDiv.className = "row";
        selectButtonDiv.style.display ="inline-block";

        var selectButton = document.createElement('button');
        selectButton.className = "btn btn-sm mini-select-button";
        selectButton.innerHTML = "Add";
        if(findCourse(selectedCourses, course.getName())>-1) {
          selectButton.classList.add('selected');
          selectButton.innerHTML = "Added";
        }

        var highlightButtonDiv = document.createElement('div');
        highlightButtonDiv.style.display ="inline-block";
        highlightButtonDiv.style.overflow = "hidden";
        highlightButtonDiv.className = "row";

        var highlightButton = document.createElement('button');
        highlightButton.className = "btn btn-sm mini-highlight-button";
        highlightButton.innerHTML = "Star";
        if(findCourse(highlightedCourses, course.getName())>-1) {
          highlightButton.classList.add('selected');
          highlightButton.innerHTML = "Starred";
        }

      selectButtonDiv.appendChild(selectButton);
      highlightButtonDiv.appendChild(highlightButton);


      newClassDescription.appendChild(selectButtonDiv);
      newClassDescription.appendChild(highlightButtonDiv);
            newClassDescription.appendChild(newClassName);
      newClassDescription.appendChild(newClassProf);
      newClassDescription.appendChild(newClassTime);
      newClassDescription.appendChild(newRowTags);


    newClass.appendChild(newClassDescription);

    return newClass;
}

var tags = [];
var tagRow = $("#selected-tags");


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

  Bob.updateStudentTags(tags);
  updateFull();
}



$("#all-courses-button").click(function(){
  allCourses.removeClass("hide");
  searchoptions.removeClass("hide");
  shoppingCart.addClass("hide");
  schedule.addClass("hide");
  shoppingCartBtn.css('color', '#888');
  allCoursesBtn.css('color', '#fff');
});


$("#shopping-cart-button").click(function(){
  shoppingCart.removeClass("hide");
  schedule.removeClass("hide");
  searchoptions.addClass("hide");
  allCourses.addClass("hide");
  shoppingCartBtn.css('color', '#fff');
  allCoursesBtn.css('color', '#888');
});

$("#expand-schedule").click(function(){
  $("#expanded-schedule-container").removeClass("hide");
});

$("#close-button").click(function(){
  $("#expanded-schedule-container").addClass("hide");
});


$(document).on('click', '.select-button',function(){
  var $this = $(this);
  $this.toggleClass('selected');
  if($this.text() === "Added"){
    $this.text("Add");
    selectedCourses.splice(findCourse(selectedCourses, 1, $this.parent().parent().parent().find(".right").find(".className").text()));
  }
  else{
    $this.text("Added");
    selectedCourses.push(courseArray[findCourse(courseArray,      $this.parent().parent().parent().find(".right").find(".className").text())]);
    if(!$this.parent().parent().find(".highlight-button").hasClass('selected'))
      $this.parent().parent().find(".highlight-button").trigger("click");
  }
  updateSelected();
  updateHighlighted();
  updateFull();
});

$(document).on('click', '.highlight-button',function(){
  var $this = $(this);
  $this.toggleClass('selected');
  if($this.text() === "Starred"){
    $this.text("Star");
    highlightedCourses.splice(findCourse(highlightedCourses, 1, $this.parent().parent().parent().find(".right").find(".className").text()));
  }
  else{
    $this.text("Starred");
    highlightedCourses.push(courseArray[findCourse(courseArray, $this.parent().parent().parent().find(".right").find(".className").text())]);
  }
  updateHighlighted();
  updateFull();
});

$(document).on('click', '.mini-select-button',function(){
  var $this = $(this);
  $this.toggleClass('selected');
  if($this.text() === "Added"){
    $this.text("Add");
      console.log($this.parent().find(".shortclassName").text());
    selectedCourses.splice(findCourse(selectedCourses, 1, $this.parent().parent().find(".shortclassName").text()));
  }
  else{
    $this.text("Added");
    console.log($this.parent().parent().find(".shortclassName").text());
    selectedCourses.push(courseArray[findCourse(courseArray,      $this.parent().parent().find(".shortclassName").text())]);
    if(!$this.parent().find(".highlight-button").hasClass('selected'))
      $this.parent().find(".highlight-button").trigger("click");
  }
  updateSelected();
  updateHighlighted();
  updateFull();
});

$(document).on('click', '.mini-highlight-button',function(){
  var $this = $(this);
  $this.toggleClass('selected');
  if($this.text() === "Starred"){
    $this.text("Star");
    highlightedCourses.splice(findCourse(highlightedCourses, 1, $this.parent().parent().find(".shortclassName").text()));
  }
  else{
    $this.text("Starred");
    highlightedCourses.push(courseArray[findCourse(courseArray, $this.parent().parent().find(".shortclassName").text())]);
  }
  updateHighlighted();
  updateFull();
});


// no error handling TODO
function findCourse(array, name){
  for(var i = 0; i < array.length; i++)  if(array[i].getName()=== name) return i;
  return -1;
}

function updateSelected(){
  selCourse = $("#selected-course-container").empty();
  for(var i = 0; i < selectedCourses.length; i++){
    $("#selected-course-container")[0].appendChild(createShortClass(selectedCourses[i]));
  }
  updateCalendar();
}
function updateHighlighted(){
  $("#highlighted-course-container").empty();
  console.log(highlightedCourses);
  for(var i = 0; i < highlightedCourses.length; i++){
    if(!selectedCourses.includes(highlightedCourses[i]))
    $("#highlighted-course-container")[0].appendChild(createShortClass(highlightedCourses[i]));
  }
}
function updateFull(){
  //console.log(Bob.getTags());
  var compatibilityValues = getCompatibility(Bob.getTags(), Bob);
  console.log(compatibilityValues);
  var mostCompatible = getMostCompatible(compatibilityValues, Bob);
  //console.log(mostCompatible);
  $("#all-courses").empty();
  if(tags.length !== 0){
    for(var i = 0; i < mostCompatible.length; i++){
      $("#all-courses")[0].appendChild(createClass(courseArray[mostCompatible[i]]));
    }
  }
}

function updateCalendar(){
  var miniCalendarHours = $('#mini-calendar-hours');
  var calendarHours = $('#calendar-hours');

  miniCalendarHours.empty();
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

  miniCalendarHours.append(hoursTable);
  calendarHours.append(hoursTable.clone());

  for(var i = 0; i < 5; i++){
    var dayTable = table.clone();
    var miniDayTable = table.clone();
    for(var j = startHour * 60; j < endHour * 60; j += 5 ){
      var newRow = row.clone();
      var miniNewRow = row.clone();
      var isCourse = false;

      for(var k = 0; k < selectedCourses.length; k++){
        counter = check(selectedCourses[k].getTimeslots(), i, (j - startHour * 60)/5);
        if (counter > 0){
          isCourse = true;
          var newTd = td.clone();
          miniNewRow.height((selectedCourses[k].getTimeslots()[1]- selectedCourses[k].getTimeslots()[0])/2);
          newRow.height((selectedCourses[k].getTimeslots()[1]- selectedCourses[k].getTimeslots()[0]));
          newTd.text(selectedCourses[k].getName().substr(0,selectedCourses[k].getName().indexOf(" ",5)));
          newTd.css('font-size','12px');
          newTd.css('border', '1px solid #3f2953');
          newTd.css('padding','0');
          newRow.append(newTd);
          miniNewRow.append(newTd.clone());
          newRow.addClass('course-timeslot');
          miniNewRow.addClass('course-timeslot');
          j += selectedCourses[k].getTimeslots()[1]- selectedCourses[k].getTimeslots()[0] -5;
        }
      }

      if(!isCourse) {
        newRow.append(td.clone());
        newRow.addClass("empty-timeslot");
        if(Math.floor(j/60)%2 === 1) newRow.addClass('odd');
        miniNewRow.append(td.clone());
        miniNewRow.addClass("empty-timeslot");
        if(Math.floor(j/60)%2 === 1) miniNewRow.addClass('odd');
      }
      miniNewRow.appendTo(miniDayTable.children());
      newRow.appendTo(dayTable.children());
    }
    miniCalendarHours.append(miniDayTable);
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
    if(!tags.includes(selText) && selText !== "Choose a category!" && selText !== "Select a tag")tags.push(selText);
    updateTags();
});

$('#clear-tags-button').on('click', function(){
    tags = [];
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
      var activeNode = nodes.filter('.'+text);
      activeNode.removeClass('hide');
      activeNode.children().children().filter('.select-styled').text("Select a tag");
    }
  }
}
