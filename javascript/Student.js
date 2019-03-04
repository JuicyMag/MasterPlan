/**
 * Construct a Student instance.
 *
 * @pre name, tags, classYear, and classesTaken are all valid and of the correct type.
 * @post constructs a Student instance with the given input.
 *
 * @param {string} name Student's name.
 * @param {Array} tags Tags associated to the student.
 * @param {number} classYear Student's class year.
 * @param {Array} classesTaken Classes taken by the student.
 * @class
 */
var Student = (function () {
    function Student(name, tags, classYear, classesTaken) {
	if (this.name === undefined)
	    this.name = null;
	if (this.tags === undefined)
	    this.tags = null;
	if (this.classYear === undefined)
	    this.classYear = 0;
	if (this.classesTaken === undefined)
	    this.classesTaken = null;
	this.name = name;
	this.tags = tags;
	this.classYear = classYear;
	this.classesTaken = classesTaken;
    }
        /**
     * Fetch the name variable of the Student instance.
     *
     * @post returns the name variable
     *
     * @return {string} name
     */
    Student.prototype.getName = function () {
	return this.name;
    };
        /**
     * Fetch the list of tags assoicated to the student.
     *
     * @post returns the tags variable
     *
     * @return {Array} tags
     */
    Student.prototype.getTags = function () {
	return this.tags;
    };
        /**
     * Fetch the class year of the Student.
     *
     * @post returns the classYear variable
     *
     * @return {number} classYear
     */
    Student.prototype.getClassYear = function () {
	return this.classYear;
    };
        /**
     * Fetch the classes taken by the Student.
     *
     * @post returns the classesTaken variable
     *
     * @return {Array} classesTaken
     */
    Student.prototype.getClassesTaken = function () {
	return this.classesTaken;
    };
    return Student;
}());
Student["__class"] = "Student";
