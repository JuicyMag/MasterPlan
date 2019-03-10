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
