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
