/**
 * Construct an AdvisorStudentCompat Object instance.
 *
 * @pre - valid student, advisor and compatibility objects
 * @post - constructs a AdvStudCompat object used by the runner class to match 
 *         students to advisors
 *        
 * @params:
 *         student - student(object) being matched
 *         advisor - advisor(object) being matched
 *         compatibility - float compatibility between this student and this advisor
 * 
 * @class
 */
var AdvStudCompat = (function () {
    function AdvStudCompat(student, advisor, compatibility) {
    	if (this.student === undefined){
        this.student = null;
      }
      if (this.advisor === undefined){
        this.advisor = null;
      }
      if (this.compatibility === undefined){
        this.compatibility = null;
      }
    	this.student = student;
      this.advisor = advisor;
      this.compatibility = compatibility;
    };

  /**
   * @pre - an existing compatibility object 
   * 
   * @param - none
   *
   * @return the float compatibility between the student and the advisor 
  */
  AdvStudCompat.prototype.getCompatibility = function(){
    return this.compatibility;
  };

  /**
   * @pre - an existing compatibility object 
   * 
   * @param - none
   *
   * @return the advisor to this compatibility object 
  */
  AdvStudCompat.prototype.getAdvisor = function(){
    return this.advisor;
  };

  /**
   * @pre - an existing compatibility object 
   * 
   * @param - none
   *
   * @return the student to this compatibility object 
  */
  AdvStudCompat.prototype.getStudent = function(){
    return this.student;
  };
  return AdvStudCompat;
}());
AdvStudCompat["__class"] = "AdvStudCompat";
