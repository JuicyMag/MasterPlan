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
    this.adviseeAssigned();    
	 // this.initCourses();
	 // this.initStudents();

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
    /*private*/ 
    Runner.prototype.getMostCompatible = function (values, student) {
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
	/**
     * @pre have a file name of the students file present in the folder
     *
     * @post return a list of student objects in the
     * @return {Student[]} a list of students from the csv file
     *
     * @private
     */
    /*private*/ Runner.prototype.initStudentsmatch = function () {
        var studentsToMatch = ([]);
        this.students = ([]);
    var chrispineTags = ["Software","Finance","Bitcoin","Entrepreneurship","Startup","Artificial Intelligence"];
    var chrispineClassesTaken = ["CSCI 134", "CSCI 136"];
    var Chrispine = new Student("Chrispine", chrispineTags, 2021, chrispineClassesTaken);

    var victorTags = ["Pre-Med","Surgeon","Doctor","Physician","Research","Medical School"];
    var victorClassesTaken = ["CSCI 237", "CSCI 256"];
    var Victor = new Student("Victor", victorTags, 2021, victorClassesTaken);
    

    var sophieTags = ["Finance","Bitcoin","Surgeon","Doctor","Physician","Agriculture"];
    var sophieClassesTaken = ["CSCI 134", "CSCI 136"];
    var Sophie = new Student("Sophie", sophieTags, 2021, sophieClassesTaken);

    var elizaTags = ["Media","Advertisement","Social Worker","Chef","CEO","Engineer"];
    var elizaClassesTaken = ["CSCI 237", "CSCI 256"];
    var Eliza = new Student("Eliza", elizaTags, 2021, elizaClassesTaken);

    /* add */ (studentsToMatch.push(Chrispine) > 0);
                (studentsToMatch.push(Victor) > 0);

    (studentsToMatch.push(Sophie) > 0);
    (studentsToMatch.push(Eliza) > 0);


        return studentsToMatch;
    };
	 /**
     * @post an Array of advisors
     *
     * @pre have a file name of the advisors and the interests
     * present in the folder
     *
     * @return {Advisor[]} an array of advisors
     * @private
     */
    /*private*/ Runner.prototype.initAdvisorsmatch = function () {
        var advisorsToMatch = ([]);

//         Bill,Software;Finance;Bitcoin;Entrepreneurship;Startup;Artificial Intelligence
// Melinda,Pre-Med;Surgeon;Doctor;Physician;Research;Medical School
// Muta,Finance;Bitcoin;Surgeon;Doctor;Physician;Agriculture
// Koku,Media;Advertisement;Social Worker;Chef;CEO;Engineer

        

        var billTags = ["Software","Finance","Bitcoin","Entrepreneurship","Startup","Artificial Intelligence"];
        var Bill = new Advisor("Bill", billTags,[]);
        (advisorsToMatch.push(Bill) > 0);


        var melindaTags = ["Pre-Med","Surgeon","Doctor","Physician","Research","Medical School"];
        var Melinda = new Advisor("Melinda", billTags,[]);
        (advisorsToMatch.push(Melinda) > 0);

        var mutaTags = ["Finance","Bitcoin","Surgeon","Doctor","Physician","Agriculture"];
        var Muta = new Advisor("Muta", mutaTags, []);
        (advisorsToMatch.push(Muta) > 0);

        var kokuTags = ["Media","Advertisement","Social Worker","Chef","CEO","Engineer"];
        var Koku = new Advisor("Koku", kokuTags, []);
        (advisorsToMatch.push(Koku) > 0);

        return advisorsToMatch;
    };
	/**
     * @param - student and advisor (non null)
     *
     * @post - calculates the compatibility fraction and returns a compatibility object
     * @return {AdvStudCompat} - AdvStudCompat object
     * @param {Student} student
     * @param {Advisor} advisor
     * @private
     */
    /*private*/ Runner.prototype.calculateCompat = function (student, advisor) {
        var studentTags = student.getTags();
        var advisorTags = (advisor.getTags().slice(0).slice(0));
        var count = 0;
        for (var i = 0; i < studentTags.length; i++) {
            {
                if ((advisorTags.indexOf((studentTags[i])) >= 0)) {
                    count = count + 1;
                }
            }
            ;
        }
        var matchNum = count / advisorTags.length;
        return new AdvStudCompat(student, advisor, matchNum);
    };
	    /**
     * @post - Merges two subarrays of arr[]. First subarray is arr[l..m]
     *
     * @param - array with two subarrays to merge,
     * - left int pointer
     * - right int pointer
     *
     * @return {void} - a merged array
     *
     * @param {Array} arr
     * @param {number} l
     * @param {number} m
     * @param {number} r
     * @private
     */
    /*private*/ Runner.prototype.merge = function (arr, l, m, r) {
        var n1 = m - l + 1;
        var n2 = r - m;
        var L = (function (s) { var a = []; while (s-- > 0)
            a.push(null); return a; })(n1);
        var R = (function (s) { var a = []; while (s-- > 0)
            a.push(null); return a; })(n2);
        for (var i_1 = 0; i_1 < n1; ++i_1) {
            L[i_1] = arr[l + i_1];
        }
        for (var j_1 = 0; j_1 < n2; ++j_1) {
            R[j_1] = arr[m + 1 + j_1];
        }
        var i = 0;
        var j = 0;
        var k = l;
        while ((i < n1 && j < n2)) {
            {
                if (this.compareCompat(L[i], R[j]) < 0) {
                    arr[k] = L[i];
                    i++;
                }
                else {
                    arr[k] = R[j];
                    j++;
                }
                k++;
            }
        }
        ;
        while ((i < n1)) {
            {
                arr[k] = L[i];
                i++;
                k++;
            }
        }
        ;
        while ((j < n2)) {
            {
                arr[k] = R[j];
                j++;
                k++;
            }
        }
        ;
    };
	/**
     * @post - sort an array
     *
     * @param - array, left and right pointers for positions
     * to sort between
     *
     * @return {void} - a sorted array
     * @param {Array} arr
     * @param {number} l
     * @param {number} r
     * @private
     */
    /*private*/ Runner.prototype.sort = function (arr, l, r) {
        if (l < r) {
            var m = ((l + r) / 2 | 0);
            this.sort(arr, l, m);
            this.sort(arr, m + 1, r);
            this.merge(arr, l, m, r);
        }
    };
	/**
     * @post - return an integer representing the comparison between two floats
     *
     * @param - two floats
     *
     * @return {number} - 0 if a == b, +ve int if a > b, -ve int if a < b
     * @param {AdvStudCompat} a
     * @param {AdvStudCompat} b
     * @private
     */
    /*private*/ Runner.prototype.compareCompat = function (a, b) {
        var aCompat = a.getCompatibility();
        var bCompat = b.getCompatibility();
        return (aCompat - bCompat);
    };
	    /**
     * @param - a list of students and advisors
     *
     * @post - returns a list of students who have been assigned advisors
     * @return {Array}
     */
    Runner.prototype.adviseeAssigned = function () {
        var matchedStudents;
        var count;
        var compatibilities = ([]);
        var students = this.initStudentsmatch();
        var advisors = this.initAdvisorsmatch();
        matchedStudents = (function (s) { var a = []; while (s-- > 0)
            a.push(null); return a; })(students.length);
        count = 0;
        for (var i = 0; i < students.length; i++) {
            {
                for (var j = 0; j < advisors.length; j++) {
                    {
                        (compatibilities.push(this.calculateCompat(students[i],advisors[j])) > 0);
                    }
                    ;
                }
            };
        }
        var compatibilitiesArray = (function (s) { var a = []; while (s-- > 0)
            a.push(null); return a; })(compatibilities.length);
        for (var i = 0; i < compatibilities.length; i++) {
            {
                compatibilitiesArray[i] = compatibilities[i];
            }
            ;
        }
        this.sort(compatibilitiesArray, 0, compatibilitiesArray.length - 1);
        for (var i = compatibilitiesArray.length - 1; i >= 0; i--) {
            {
                var compat = compatibilitiesArray[i];
                var student = compat.getStudent();
                var advisor = compat.getAdvisor();
                if (!student.hasAdvisor() && !advisor.hasEnoughStudents()) {
                    student.assignAdvisor(advisor);
                    advisor.addAdvisee(student);
                    matchedStudents[count] = student;
                    count++;
                }
            }
            ;
        }
        console.log(matchedStudents.toString());
        return matchedStudents;
    };
    Runner.main = function (args) {
	var r = new Runner();
    };
    return Runner;
}());
Runner.numRecommended = 3;
Runner["__class"] = "Runner";
