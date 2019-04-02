/**
 * Construct a Runner instance to initialize the @courses and @students ArrayLists,
 * as well as with the necessary code for user interaction to gain input and recommend
 * courses accordingly.
 *
 * @post constructs a Runner instance and runs the program.
 * @class
 */
var Runner = (function () {
    function AdvisorTester() {
	if (this.courses === undefined)
	    this.courses = null;
	if (this.students === undefined)
	    this.students = null;
    this.adviseeAssigned();    
	 // this.initCourses();
	 // this.initStudents();

	
    }


    
    Runner.main = function (args) {
       var r = new Runner();
   };
   return AdvisorTester;
}());
Runner.numRecommended = 3;
Runner["__class"] = "AdvisorTester";