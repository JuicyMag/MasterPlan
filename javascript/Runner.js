/**
 * Construct a Runner instance to initialize the @courses and @students ArrayLists,
 * as well as with the necessary code for user interaction to gain input and recommend
 * courses accordingly.
 *
 * @post constructs a Runner instance and runs the program.
 * @class
 */
var Runner = (function () {
    function Runner() {
	if (this.courses === undefined)
	    this.courses = null;
	if (this.students === undefined)
	    this.students = null;
	this.initCourses();
	this.initStudents();
	for (var i = 0; i < this.students.length; i++) {
	    {
		var student = this.students[i];
		var compatibilityValues = this.getCompatibility(student.getTags(), student);
		var mostCompatible = this.getMostCompatible(compatibilityValues, student);
		console.info("\nHello " + student.getName() + ", the top " + Runner.numRecommended + " recommended courses for you are:");
		for (var j = 0; j < mostCompatible.length; j++) {
		    {
			console.info(/* get */ this.courses[mostCompatible[j]].getName());
		    }
		    ;
		}
	    }
	    ;
	}
    }
    Runner.prototype.checkPrereqs = function (course, student) {
	var preReqs = course.getPreReqs();
	var classesTaken = student.getClassesTaken();
	return (function (a, r) { for (var i = 0; i < r.length; i++) {
	    if (a.indexOf(r[i]) < 0)
		return false;
	} return true; })(/* asList */ classesTaken.slice(0), /* asList */ preReqs.slice(0));
    };
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
     * @private
     */
    /*private*/ Runner.prototype.getCompatibility = function (studentTags, student) {
	var compatibilityValues = (function (s) { var a = []; while (s-- > 0)
	    a.push(0); return a; })(/* size */ this.courses.length);
	for (var i = 0; i < this.courses.length; i++) {
	    {
		var compatibility = 0;
		if (this.checkPrereqs(/* get */ this.courses[i], student)) {
		    var courseTags = this.courses[i].getTags();
		    for (var k = 0; k < studentTags.length; k++) {
			{
			    for (var j = 0; j < courseTags.length; j++) {
				{
				    var result = studentTags[k].localeCompare(courseTags[j]);
				    if (result === 0)
					compatibility++;
				}
				;
			    }
			}
			;
		    }
		}
		compatibilityValues[i] = compatibility;
	    }
	    ;
	}
	return compatibilityValues;
    };
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
     * @private
     */
    /*private*/ Runner.prototype.getMostCompatible = function (values, student) {
	var result = (function (s) { var a = []; while (s-- > 0)
	    a.push(0); return a; })(Runner.numRecommended);
	var shadow = (function (s) { var a = []; while (s-- > 0)
	    a.push(0); return a; })(Runner.numRecommended);
	var count = 0;
	for (var i = 0; i < result.length; i++) {
	    {
		for (var j = 0; j < result.length; j++) {
		    {
			if (this.checkPrereqs(/* get */ this.courses[j], student)) {
			    count = j;
			    break;
			}
		    }
		    ;
		}
		result[i] = count;
		count++;
	    }
	    ;
	}
	for (var i = 0; i < values.length; i++) {
	    {
		for (var j = 0; j < result.length; j++) {
		    {
			if (values[i] > shadow[j]) {
			    var min = 2147483647;
			    var minIndex = 0;
			    for (var k = 0; k < result.length; k++) {
				{
				    if (shadow[k] < min) {
					minIndex = k;
					min = shadow[k];
				    }
				}
				;
			    }
			    result[minIndex] = i;
			    shadow[minIndex] = values[i];
			    break;
			}
		    }
		    ;
		}
	    }
	    ;
	}
	for (var i = 0; i < result.length - 1; i++) {
	    {
		for (var j = 0; j < result.length - 1; j++) {
		    {
			if (shadow[j] < shadow[j + 1]) {
			    var dummy = result[j];
			    result[j] = result[j + 1];
			    result[j + 1] = dummy;
			    dummy = shadow[j];
			    shadow[j] = shadow[j + 1];
			    shadow[j + 1] = dummy;
			}
		    }
		    ;
		}
	    }
	    ;
	}
	var maxCompatible = ([]);
	for (var i = 0; i < 3; i++) {
	    {
		if (this.checkPrereqs(/* get */ this.courses[result[i]], student)) {
		    if (!(student.getClassesTaken().slice(0).indexOf((this.courses[result[i]].getName())) >= 0)) {
			if (!(maxCompatible.indexOf((result[i])) >= 0)) {
			    /* add */ (maxCompatible.push(result[i]) > 0);
			}
		    }
		}
	    }
	    ;
	}
	var finalResult = (function (s) { var a = []; while (s-- > 0)
	    a.push(0); return a; })(/* size */ maxCompatible.length);
	var index = 0;
	for (var index622 = 0; index622 < maxCompatible.length; index622++) {
	    var val = maxCompatible[index622];
	    {
		finalResult[index++] = val;
	    }
	}
	return finalResult;
    };
        /**
     * Initialize the @students ArrayList from the input csv file.
     *
     * @pre input csv file has been sanitized.
     * @post initialize the @students ArrayList from the input csv file.
     * @private
     */
    /*private*/ Runner.prototype.initStudents = function () {
	this.students = ([]);
	var bobTags = ["Programming", "Compiler"];
	var bobClassesTaken = ["CSCI 134", "CSCI 136"];
	var Bob = new Student("Bob", bobTags, 2021, bobClassesTaken);
	/* add */ (this.students.push(Bob) > 0);
    };
        /**
     * Initialize the @courses ArrayList from the input csv file.
     *
     * @pre input csv file has been sanitized.
     * @post initialize the @courses ArrayList from the input csv file.
     * @private
     */
    /*private*/ Runner.prototype.initCourses = function () {
	this.courses = ([]);
	var AlgorithmsPrereqs = ["CSCI 134", "CSCI 136"];
	var AlgorithmsTags = ["ProblemSolving", "Proofs"];
	var AlgorithmsTimeslot = ["MWF 10:00 - 1:00"];
	var Algorithms = new Course("Algorithms", AlgorithmsTags, AlgorithmsTimeslot, AlgorithmsPrereqs);
	/* add */ (this.courses.push(Algorithms) > 0);
    };
    Runner.main = function (args) {
	var r = new Runner();
    };
    return Runner;
}());
Runner.numRecommended = 3;
Runner["__class"] = "Runner";
