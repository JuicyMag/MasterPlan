//TODO code formatting, updating comments

//Css variables
var shoppingCart = $("#shopping-cart");
var allCourses = $("#all-courses");
var allCoursesContainer = $("#all-courses-container");
var shoppingCartBtn = $("#shopping-cart-button");
var allCoursesBtn = $("#all-courses-button");
var searchoptions = $("#search-options");
var schedule = $("#schedule");
var recommended = $('#recommended-courses-container');
var recommendedBtn = $('#recommended-button');
var byTags = $(".by-tags");


var searchByTags = true;


var selectedCourses = []; //Selected Courses
var recommendedCourses = [1,6,8,28,35] //Recommended Courses: TODO: remove hardcode.
var highlightedCourses = []; //Highlighted Courses
var searchedCourses = [];

var allTags ="network engineering , mathematical science , education , ESSENTIALS , modeling , software , computer science graduate school , developmental economics , systems architecture , calculus , cryptocurrencies , welfare economics , nuclear physics , equity , differential equations , theatre , math graduate school , us politics , microeconomics , Science and Technology Studies , econometrics , music , social issues , english , graduate school , software engineering , web development , Tags , systems engineering , africa , anthropology , data analytics , environmental , biology , neuroscience , hardware engineering , volumes , music history , philosophy , animation , inequality , finacial markets , science , integration , shakespeare , social justice , performance analysis , inequalities , computational mathematics , electromagnetism , racial equality , economics graduate school , teaching , science graduate school , medical research , computer science , physics , music of the world , special relativity , power , political issues , financial markets , chemistry , immigration , venture capital , start up , quantitative trading , business , middle ages , consulting , globalization , ESSENTIAL , entrepreneurship , mathematics graduate school , comparative politics , entrepreneur , contemporary metaphysics , private equity , Women’s, Gender, and Sexuality Studies , social sciences , logic , intro class , statistics , number theory , physics gradute school , applied mathematics , leadership studies , wall street , asset management , global development , graphics , law school , mathematics graudate school , ethics , research , finace , sustainibility , publication , global economics , africana studies , big data , programming , climate change , law , political economy , history , engineering , datascience , micro economics , modelling , public policy , political science , macroeconomics , proof based mathematics , taxation , politics , literary imitation , cognitive psychology , natural resources , mathematics , sociology , renaissance , cost benefit analysis , corporate finance , banking , playwrighting , Sociology , critical thinking , psychology , advanced macroeconomics , applied math , data analysis , race , political science graduate school , gender studies , quantum theory , technology , meritocracy , app development , economics , statistician , behavioral psychology , social psychology , regression , ecosystems , macroecnomics , feminism , arguments , monetary economics , finance , applied mathematics , legal system".toLowerCase().replace(/\b\w/g, l => l.toUpperCase()).split(" , ").sort();
var allSubjects = ["AFR","AMST","ANSO","ANTH","ARAB","ARTH","ASST","ASTR","ASPH","BIMO","BIOL","CHEM","CHIN","CLAS","COGS","COMP","CSCI","CMAJ","CRLA","DANC","ECON","ENGL","ENVI","EXPR","RLFR","GEOS","GERM","GBST","CLGR","CRHE","CRHI","HIST","HSCI","INTR","RLIT","JAPN","JWST","JLST","CRKO","CLLA","LATS","LEAD","MAST","MATH","MUS","NSCI","PHIL","PHYS","POEC","PSCI","CRPO","PSYC","PHLH","REL","RLSP","ARTS","CRSW","RUSS","SCST","SOC","SPEC","STAT","THEA","WGSS"];
var allSubjectsNames = ["Africana Studies", "American Studies", "Anthropology & Sociology", "Anthropology", "Arabic Studies", "Art History","Asian Studies", "Astronomy",  "Astrophysics", "Biochemistry & Molecular Biology", "Biology", "Chemistry", "Chinese", "Classics", "Cognitive Science", "Comparative Literature","Computer Science",  "Contract Major", "Critical Languages",  "Dance", "Economics", "English", "Environmental Studies", "Experiential Studies", "French", "Geosciences", "German","Global Studies", "Greek", "Hebrew", "Hindi", "History", "History of Science", "Interdisciplinary Studies","Italian", "Japanese", "Jewish Studies","Justice & Law Studies",  "Korean", "Latin","Latina/o Studies", "Leadership Studies", "Maritime Studies", "Mathematics", "Music", "Neuroscience", "Philosophy",  "Physics", "Political Economy", "Political Science","Portugese", "Psychology","Public Health", "Religion", "Spanish", "Studio Art", "Swahili", "Russian", "Science & Technology Studies", "Sociology", "Special", "Statistics", "Theatre", "Women's, Gender & Sexuality Studies"];

//Initializing the Schedule variables.
var scheduler = new Scheduler([]);
//Initializing the array of courses.
var courseArray = [];
var courseData = [];
var attributes = [];
var divisions = [];

//Number of Courses to Recommend.
const numRecommended = 5;

var tags = [];
var subjects = [];
var tagRow = $("#selected-tags");

//Dummy Student
var bobTags = ["Programming", "Compiler"];
var bobClassesTaken = ["CSCI 134", "CSCI 136", "CSCI 237", "ECON 110", "ECON 120", "MATH 130", "ECON 255", "ECON 251",
  "ECON 505", "POEC 253", "MATH 102", "MATH 130", "MATH 140", "MATH 151", "MATH 200", "MATH 250", "MATH 209", "MATH 150",
  "PHYS 131"];
var Bob = new Student("Bob", null, 2021, bobClassesTaken);


// collects tags from previous pages
var inputTags = decodeURIComponent(window.location.search);
inputTags = inputTags.substring(1);
var input = inputTags.split("&");
//console.log(input);

var departmentTags = [];
var careerTags = [];
var career = false;
for(var i = 0; i<input.length; i++){
  // console.log(career);
  if(input[i] == '*') {
    career = true;
    i++;
  }
  if(career) careerTags.push(input[i]);
  else departmentTags.push(input[i]);
}
// console.log(departmentTags);
// console.log(careerTags);





updateCalendar();

function createSubject(input){
	var newTag = document.createElement('button');
	newTag.className = "tag btn btn-outline-dark subject-element";
	newTag.innerHTML = input;

	return newTag;
}

function createTag(input){
	var newTag = document.createElement('button');
	newTag.className = "tag btn btn-outline-dark tag-element";
	newTag.innerHTML = input;

	return newTag;
}


for(var i = 0; i < allTags.length; i++){
  $("#tag-container")[0].appendChild(createTag(allTags[i]));
}

for(var i = 0; i < allSubjectsNames.length; i++){
  $("#subject-container")[0].appendChild(createSubject(allSubjectsNames[i]));
}

//Initialize the courses from JSON file.
loadJSON(function(json) {
  courseData = json;
  for(var i = 0; i < courseData.length; i ++){
    courseArray.push(new Course(courseData[i].Subject, courseData[i].ClassNumber, courseData[i].Number, courseData[i].Attributes, courseData[i].Professor,courseData[i].Title,courseData[i].Description,courseData[i].Tags.split(";"),courseData[i].Timeslot,courseData[i].Prereqs));
  }
  recommendedCourses = getMostCompatible(getCompatibility(departmentTags.concat(careerTags),Bob),Bob);
  updateFull();
  updateRecommended();
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

  if(preReqs.length == 0) return true;
  if(preReqs[0] == "" || preReqs[0] == "none") return true;

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
      //compatibility ++; //added so that courses whose pre-reqs are fulfilled are prioritized.
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
	    a.push(0); return a; })(courseArray.length);
	var shadow = (function (s) { var a = []; while (s-- > 0)
	    a.push(0); return a; })(courseArray.length);
	var count = 0;


  //Loops through all courses
	for (var i = 0; i < values.length; i++) {
    //Compares each course with current least compatible course
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

	var maxCompatible = ([]);
	for (var i = 0; i < courseArray.length; i++) {
		if (checkPrereqs(/* get */ courseArray[result[i]], Bob) && shadow[i]>0) {

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
    newClass.className = "row class col";

      var newClassDescription = document.createElement('div');
      newClassDescription.className = "col right";
        var newClassName = document.createElement('div');
        newClassName.innerHTML = course.getName();
        newClassName.className = "className";
        var newClassNum = document.createElement('div');
        newClassNum.innerHTML = course.getCourseNum();
        newClassNum.className = "classNum hide";
        var newClassDescr = document.createElement('div');
        newClassDescr.innerHTML = course.getDescription();
        newClassDescr.className = "classDescr hide";
        var newRowTags = document.createElement('div');
        newRowTags.className = "tags";
        newRowTags.innerHTML = course.getTags().join(", ");


        var newTitle = document.createElement('div');
        newTitle.className = "";
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

          if(selectedCourses.indexOf(course)>-1) {
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
          if(highlightedCourses.indexOf(course)>-1) {
            highlightButton.classList.add('selected');
            highlightButton.innerHTML = "Starred";
          }

          var showButtonDiv = document.createElement('div');
          showButtonDiv.style.display ="inline-block";
          showButtonDiv.style.overflow = "hidden";
          showButtonDiv.className = "row";

          var showButton = document.createElement('button');
          showButton.className = "btn btn-sm show-button";
          showButton.innerHTML = "Show";

        selectButtonDiv.appendChild(selectButton);
        highlightButtonDiv.appendChild(highlightButton);
        showButtonDiv.appendChild(showButton);

      newTitle.appendChild(newClassProf);
      newTitle.appendChild(newClassTime);
      //newTitle.appendChild(highlightButtonDiv);
      //newTitle.appendChild(selectButtonDiv);

      newClassName.appendChild(highlightButtonDiv);
      newClassName.appendChild(selectButtonDiv);
      newClassName.appendChild(showButtonDiv);

      newClassDescription.appendChild(newClassName);
      newClassDescription.appendChild(newTitle);
      newClassDescription.appendChild(newRowTags);
      newClassDescription.appendChild(newClassNum);
      newClassDescription.appendChild(newClassDescr);

    newClass.appendChild(newClassDescription);

    return newClass;
}

/*
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

        if(selectedCourses.indexOf(course)>-1) {
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
        if(highlightedCourses.indexOf(course)>-1) {
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
        var newClassNum = document.createElement('div');
        newClassNum.innerHTML = course.getCourseNum();
        newClassNum.className = "classNum hide";
        var newClassDescr = document.createElement('div');
        newClassDescr.innerHTML = course.getDescription();
        newClassDescr.className = "classDescr";
        var newRowTags = document.createElement('div');
        newRowTags.className = "row tags";

        newRowTags.innerHTML = course.getTags().join(", ");
      newClassDescription.appendChild(newClassName);
      newClassDescription.appendChild(newClassNum);
      newClassDescription.appendChild(newClassDescr);
      newClassDescription.appendChild(newRowTags);
    newClass.appendChild(newTitle);
    newClass.appendChild(newClassDescription);

    return newClass;
}*/


function createShortClass(course){
  var newClass = document.createElement('div');
    newClass.className = "row class";

      var newClassDescription = document.createElement('div');
      newClassDescription.className = "col right";
        var newClassName = document.createElement('div');
        newClassName.innerHTML = course.getName();
        newClassName.className = "shortclassName";
        var newClassNum = document.createElement('div');
        newClassNum.innerHTML = course.getCourseNum();
        newClassNum.className = "classNum hide";
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
        if(selectedCourses.indexOf(course)>-1) {
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
        if(highlightedCourses.indexOf(course)>-1) {
          highlightButton.classList.add('selected');
          highlightButton.innerHTML = "Starred";
        }

      selectButtonDiv.appendChild(selectButton);
      highlightButtonDiv.appendChild(highlightButton);

      newClassDescription.appendChild(selectButtonDiv);
      newClassDescription.appendChild(highlightButtonDiv);
      newClassDescription.appendChild(newClassName);
      newClassDescription.appendChild(newClassNum);
      newClassDescription.appendChild(newClassProf);
      newClassDescription.appendChild(newClassTime);
      newClassDescription.appendChild(newRowTags);

    newClass.appendChild(newClassDescription);

    return newClass;
}




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
  $('#notice').text("");
  allCoursesContainer.removeClass("hide");
  searchoptions.removeClass("hide");
  shoppingCart.addClass("hide");
  schedule.addClass("hide");
  recommended.addClass("hide");
  recommendedBtn.css('background-color', 'rgb(111, 73, 147)');
  shoppingCartBtn.css('background-color', 'rgb(111, 73, 147)');
  allCoursesBtn.css('background-color', 'rgb(72, 48, 96)');
});

$("#search-button").click(function(){
  $('#notice').text("");
  searchedCourses = searchClasses($("#search-box input")[0].value);

  console.log(searchedCourses);
  updateFull();
});

function searchClasses(input){
  var clone = [];

  for(var i = 0; i < courseArray.length; i++){
    if(subjects.includes(courseArray[i].getSubject())){
      clone.push(courseArray[i]);
    }
  }

  //console.log(clone.length);
  if(clone.length == 0) clone = courseArray.slice(0);
  console.log(clone.length);

  var cloneArray = [];

  attributes = [];
  if($('#dpe').is(':checked')) attributes.push("DPE_DPE");
  if($('#qfr').is(':checked')) attributes.push("QFR_QFR");
  if($('#wi').is(':checked')) attributes.push("WAC_WAC");

  divisions = [];
  if($('#div1').is(':checked')) divisions.push("DIV_D1");
  if($('#div2').is(':checked')) divisions.push("DIV_D2");
  if($('#div3').is(':checked')) divisions.push("DIV_D3");


  for(var i = 0; i < clone.length; i++){
    var check = false;
    for(var j = 0; j < attributes.length; j++){
      if(clone[i].getAttributes().includes(attributes[j])) check = true;
    }
    if(check) cloneArray.push(clone[i]);
  }

  if(attributes.length == 0) cloneArray = clone.slice(0);

  clone = [];

  for(var i = 0; i < cloneArray.length; i++){
    var check = false;
    for(var j = 0; j < divisions.length; j++){
      if(cloneArray[i].getAttributes().includes(divisions[j])) check = true;
    }
    if(check) clone.push(cloneArray[i]);
  }

  if(divisions.length == 0) clone = cloneArray.slice(0);


  //console.log(input);
  var result = [];
  for(var i = 0; i < clone.length; i++){
    var courseTitle = clone[i].getName();
    //console.log(courseTitle);
    //console.log(courseTitle.toUpperCase().includes(input.toUpperCase()));
    if(courseTitle.toUpperCase().includes(input.toUpperCase())) {
      result.push(courseArray.indexOf(clone[i]));
    }
  }


  return result;

}

$(document).on('click', '.tag-element', function(event) {
    event.preventDefault();
  if(!$(this)[0].classList.contains('selected')){
    tags.push($(this)[0].innerHTML);
  }
  else{
    tags.splice(tags.indexOf($(this)[0].innerHTML),1);
  }
  $(this).toggleClass('selected');
  console.log(tags);
  Bob.updateStudentTags(tags);
  searchedCourses = searchClasses($("#search-box input")[0].value);
  updateFull();
  updateTagList();
});



$("#unselect-tags").click(function(){

  tags = [];

  var tagElements = $(".tag-element");
  //console.log(tagElements);
  for(var i = 0 ; i < tagElements.length; i ++){
    //console.log(subjectElements[i]);
    tagElements[i].classList.remove('selected');
  }

  Bob.updateStudentTags(tags);
  updateFull();
});


$("#unselect-subjects").click(function(){

  subjects = [];

  var subjectElements = $(".subject-element");
  console.log(subjectElements);
  for(var i = 0 ; i < subjectElements.length; i ++){
    console.log(subjectElements[i]);
    subjectElements[i].classList.remove('selected');
  }

  updateFull();
});

$('#expand').on('click', function(){
    $("#options-container").toggle();
    $(this).text(function(i, text){
        return text === "Show More Options" ? "Hide" : "Show More Options";
    })
});

$(document).on('click', '.subject-element', function(event) {
  event.preventDefault();
  var code = allSubjects[allSubjectsNames.indexOf($(this)[0].innerHTML.replace("&amp;","&"))];
  console.log($(this)[0].innerHTML.replace("&amp;","&"));
  console.log(allSubjectsNames.indexOf($(this)[0].innerHTML.replace("&amp;","&")));
  console.log(code);

  if(!$(this)[0].classList.contains('selected')){
    subjects.push(code);
  }
  else{
    subjects.splice(subjects.indexOf(code),1);
  }
  $(this).toggleClass('selected');
  console.log(subjects);
  searchedCourses = searchClasses($("#search-box input")[0].value);
  updateFull();
  updateSubjects();
});



$("#recommended-button").click(function(){
  $('#notice').text("");
  allCoursesContainer.addClass("hide");
  searchoptions.addClass("hide");
  shoppingCart.addClass("hide");
  recommended.removeClass("hide");
  recommendedBtn.css('background-color', 'rgb(72, 48, 96)');
  shoppingCartBtn.css('background-color', 'rgb(111, 73, 147)');
  allCoursesBtn.css('background-color', 'rgb(111, 73, 147)');
});


$("#shopping-cart-button").click(function(){
  $('#notice').text("");
  shoppingCart.removeClass("hide");
  schedule.removeClass("hide");
  searchoptions.addClass("hide");
  allCoursesContainer.addClass("hide");
  recommended.addClass("hide");
  shoppingCartBtn.css('background-color', 'rgb(72, 48, 96)');
  recommendedBtn.css('background-color', 'rgb(111, 73, 147)');
  allCoursesBtn.css('background-color', 'rgb(111, 73, 147)');
});

$("#expand-schedule").click(function(){
  $("#expanded-schedule-container").removeClass("hide");
});

$(".close-button").click(function(){
  $("#expanded-schedule-container").addClass("hide");
  $("#view-tags-container").addClass("hide");
  $("#view-subjects-container").addClass("hide");
});

$(".okay-button").click(function(){
  $("#expanded-schedule-container").addClass("hide");
  $("#view-tags-container").addClass("hide");
  $("#view-subjects-container").addClass("hide");
});


function checkConflicts(thisCourse, otherCourse) {
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
}

$(document).on('click', '.select-button',function(){
  $('#notice').text("");


  var $this = $(this);
  $this.toggleClass('selected');
  if($this.text() === "Added"){
    $this.text("Add");
    selectedCourses.splice(findCourse(selectedCourses, 1, $this.parent().parent().parent().find(".classNum").text()));
  }
  else{
    var conflict = false;
    var thisCourse = courseArray[findCourse(courseArray, $this.parent().parent().parent().find(".classNum").text())];
    var count = 0;

    for(count = 0; count < selectedCourses.length; count++){

      if(checkConflicts(thisCourse, selectedCourses[count])){
        conflict = true;
        break;
      }
    }

    if(conflict){
      var s = "Failed to add " + thisCourse.getSubject() + " " + thisCourse.getNumber() + " due to conflict with " +
                        selectedCourses[count].getSubject() + " " + selectedCourses[count].getNumber() + "!";
      $('#notice').text(s);

    }
    else{
      $this.text("Added");
      selectedCourses.push(courseArray[findCourse(courseArray,      $this.parent().parent().parent().find(".classNum").text())]);
      if(!$this.parent().parent().find(".highlight-button").hasClass('selected'))
        $this.parent().parent().find(".highlight-button").trigger("click");
    }

  }
  updateSelected();
  updateHighlighted();
  updateFull();
  updateRecommended();
});

$(document).on('click', '.show-button',function(){
  $('#notice').text("");

  if($(this).text() === 'Show'){
    $(this).text("Hide");
    $(this).parent().parent().parent().find(".classDescr").toggle();
  }
  else{
    $(this).text("Show");
    $(this).parent().parent().parent().find(".classDescr").toggle();
  }

})

$(document).on('click', '.highlight-button',function(){
  $('#notice').text("");

  var $this = $(this);
  $this.toggleClass('selected');
  if($this.text() === "Starred"){
    $this.text("Star");
    highlightedCourses.splice(findCourse(highlightedCourses, 1, $this.parent().parent().parent().find(".classNum").text()));
  }
  else{
    $this.text("Starred");
    console.log(findCourse(courseArray, $this.parent().parent().parent().find(".right").find(".classNum").text()));
    highlightedCourses.push(courseArray[findCourse(courseArray, $this.parent().parent().parent().find(".classNum").text())]);

  }
  updateHighlighted();
  updateFull();
  updateRecommended();
});

$(document).on('click', '.mini-select-button',function(){
  $('#notice').text("");

  var $this = $(this);
  $this.toggleClass('selected');
  if($this.text() === "Added"){
    $this.text("Add");
      console.log($this.parent().find(".shortclassName").text());
    selectedCourses.splice(findCourse(selectedCourses, 1, $this.parent().parent().find(".classNum").text()));
  }
  else{
    $this.text("Added");
    console.log($this.parent().parent().find(".shortclassName").text());
    selectedCourses.push(courseArray[findCourse(courseArray,      $this.parent().parent().find(".classNum").text())]);
    if(!$this.parent().find(".highlight-button").hasClass('selected'))
      $this.parent().find(".highlight-button").trigger("click");
  }
  updateSelected();
  updateHighlighted();
  updateRecommended();
  updateFull();
});

$(document).on('click', '.mini-highlight-button',function(){
  $('#notice').text("");

  var $this = $(this);
  $this.toggleClass('selected');
  if($this.text() === "Starred"){
    $this.text("Star");
    highlightedCourses.splice(findCourse(highlightedCourses, 1, $this.parent().parent().find(".shortclassNum").text()));
  }
  else{
    $this.text("Starred");
    highlightedCourses.push(courseArray[findCourse(courseArray, $this.parent().parent().find(".shortclassNum").text())]);
  }
  updateHighlighted();
  updateFull();
  updateRecommended();
});


$(document).on('click', '#search-class-button',function(){
  $('#notice').text("");

  $("#by-classes").removeClass('hide');
  $("#by-tags").addClass('hide');
  $(".search-options-home").addClass('hide');
  searchByTags = false;
});

$(document).on('click', '#search-tags-button',function(){
  $('#notice').text("");

  $("#by-classes").addClass('hide');
  $("#by-tags").removeClass('hide');
  $(".search-options-home").addClass('hide');
  searchByTags = true;
});


$(document).on('click', '.back',function(){
  $('#notice').text("");

  $("#by-classes").addClass('hide');
  $("#by-tags").addClass('hide');
  $(".search-options-home").removeClass('hide');
});


// no error handling TODO
function findCourse(array, courseNum){
  for(var i = 0; i < array.length; i++)  {
    if(array[i].getCourseNum().toString()=== courseNum) return i;
  }
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
  //console.log(withTags);
  $("#all-courses").empty();
  console.log(tags.length);


  if($("#search-box input")[0].value === "" && attributes.length == 0 && divisions.length == 0&& subjects.length == 0 && tags.length ===0 ){
    for(var i = 0; i < courseArray.length; i++){
      $("#all-courses")[0].appendChild(createClass(courseArray[i]));
    }
    $("#num-courses").text(courseArray.length + " courses found!");
  }
  else {
    if(tags.length!==0){
      console.log("hi");
      var compatibilityValues = getCompatibility(Bob.getTags(), Bob);
      var mostCompatible = getMostCompatible(compatibilityValues, Bob);

      mostCompatible = mostCompatible.filter(value => searchedCourses.includes(value));
      for(var i = 0; i < mostCompatible.length; i++){
        $("#all-courses")[0].appendChild(createClass(courseArray[mostCompatible[i]]));
      }
      $("#num-courses").text(mostCompatible.length + " courses found!");
    }

    else{
      if(searchedCourses.length != 0){
        for(var i = 0; i < searchedCourses.length; i++){
          $("#all-courses")[0].appendChild(createClass(courseArray[searchedCourses[i]]));
        }
        $("#num-courses").text(searchedCourses.length + " courses found!");
      }
      else if(searchedCourses.length == 0 && $("#search-box input")[0].value !== ""){
        for(var i = 0; i < searchedCourses.length; i++){
          $("#all-courses")[0].appendChild(createClass(courseArray[searchedCourses[i]]));
        }
        $("#num-courses").text(searchedCourses.length + " courses found!");
      }
      else{
        for(var i = 0; i < courseArray.length; i++){
          $("#all-courses")[0].appendChild(createClass(courseArray[i]));
        }
        $("#num-courses").text(courseArray.length + " courses found!");
      }
    }
  }
}


function updateRecommended(){
  $("#recommended-courses").empty();
  for(var i = 0; i < recommendedCourses.length; i++){
    $("#recommended-courses")[0].appendChild(createClass(courseArray[recommendedCourses[i]]));
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

$('#choose-tags-button').on('click', function(){
    $("#view-tags-container").removeClass("hide");
});

$('#expand-subject-button').on('click', function(){
    $("#view-subjects-container").removeClass("hide");
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

function updateSubjects(){
    $("#subject-list").empty();
    for(var i = 0; i < subjects.length; i++){
      var newSubject = createSubject(allSubjectsNames[allSubjects.indexOf(subjects[i])]);
      newSubject.classList.add("selected");
      $("#subject-list")[0].appendChild(newSubject);
    }
    $("#subject-container").empty();
    for(var i = 0; i < allSubjectsNames.length; i++){
      var newSubject = createSubject(allSubjectsNames[i]);
      if(subjects.indexOf(allSubjects[i])!= -1) newSubject.classList.add("selected");
      $("#subject-container")[0].appendChild(newSubject);
    }

}
function updateTagList(){
  $("#tag-list").empty();
    for(var i = 0; i < tags.length; i++){
      var newTag = createTag(tags[i]);
      newTag.classList.add('selected');
      $("#tag-list")[0].appendChild(newTag);
    }
  $("#tag-container").empty();
  for(var i = 0; i < allTags.length; i++){
    var newTag = createTag(allTags[i]);
    if(tags.indexOf(allTags[i])!=-1) newTag.classList.add("selected");
    $("#tag-container")[0].appendChild(newTag);
  }
}
