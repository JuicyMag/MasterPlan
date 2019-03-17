

/**
 * This is class has been designed to represent a single advisor 
 * with all the characteristics associated with that advisor 	
 * 
 * @pre - valid name, tags and advisees objects
 * @post - constructs an advisor object to store the state of an advisor (prof)
 *
 * @param:
 *         name - String name of the advisor 
 *		   tags - array list of the interests of the advisor
 * 		   advisees - array list of student objects being advised by this advisor
 *
*/

//the maximum number of interest tags an advisor can have
var MAX_INTERESTS = 10;

//the maximum number of students an advisor can have
const MAX_STUDENTS = 8;

var Advisor = (function() {
	function Advisor(name, tags, advisees){
		if(name === undefined){
			this.name = null;
		}
		if(tags === undefined){
			this.tags = null;
		}
		if(advisees === undefined){
			advisees = null;
		}
		this.name = name;
		this.tags = tags;
		this.advisees = advisees;
	};

	/**
	 * get the name of the advisor
	 * 
	 * @param - none
	 * 
	 * return the name of the advisor
	*/
	Advisor.prototype.getName = function() {
		return this.name;
	};


	/** 
	 * get the list of this advisor's interests(tags)
	 * 
	 * @param - none
	 * 
	 *return the list of this advisor's interests in an array
	 *
	*/
	Advisor.prototype.getTags = function(){
		return this.tags;
	};

	/**
	 * get the list of students under this advisor
	 * 
	 * @param - none
	 *
	 * return the list of students in an array under this advisor
	*/
	Advisor.prototype.getAdvisees = function(){
		return this.advisees;
	}

	/**
	 * get important information about an advisor: 
	 * name, interests, students being advised
	 *
	 * @param - none
	 * 
	 * return a string representing the essential information of that advisor
	*/
	Advisor.prototype.toString = function(){
		return "Name: " + this.name + "\n" + "Interests: " + 
		this.tags.toString() + "\n" + "Students: " + this.advisees.toString();
	};


	/**
	 * gets the number of students currently assigned to this advisor
	 * 
	 * @param - none 
	 *
	 * return the number of students currently assigned to this advisor 
	*/
	Advisor.prototype.adviseesCount = function(){
		return this.advisees.length;
	};

	/**
	 * add an interest of the advisor
	 *
	 * @param - name(String) of the interest
	 *
	 * return a boolean of whether or not the advisor interests were added
	*/
	Advisor.prototype.addTag = function(tag){
		if(this.tags.length < MAX_INTERESTS){
			this.tags.push(tag);
			return true;
		}
		console.log("You have reached the maximum number of tags, you can't add any more tag");
		return false;
	};

	/**
	 * add a student to the list of students being advised by this advisor
	 *
	 * @param - name(String) of the student 
	 *
	 * return a boolean of whether or not the student was added
	*/
	Advisor.prototype.addAdvisee = function(advisee){
		if(this.advisees.length < MAX_STUDENTS){
			this.tags.push(advisee);
			return true;
		}
		console.log("You have reached the maximum number of students, you can't add any more students");
		return false;
	}

	/**
	 * answers the question of whether the advisor has a maximum number
	 * of students being advised
	 * 
	 * @param - none
	 *
	 * return a boolean value representing whether the advisor has a maximum 
	 * number of students
	*/
	Advisor.prototype.hasEnoughStudents = function(){
		return (this.advisees.length >= MAX_STUDENTS);
	}

	/**
	 * remove a student from the list of students being advised by this advisor
	 *
	 * @param - student object  
	 *
	 * return a boolean of whether the student was removed
	 * 
	*/
	Advisor.prototype.removeAdvisee = function(advisee){
		var index = indexOf(advisee);
		if((this.advisees.length > 0) && (index =! -1)){
			this.advisees.splice(index,1);
			return true;
		}

		console.log("There are no more students advised by this advisor or the student is not an advisee of the advisor");
		return false;
	}
}}());
Advisor["__class"] = "Advisor";