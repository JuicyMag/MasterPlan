

/**
 * This is class has been designed to represent a single advisor 
 * with all the characteristics associated with that advisor 	
 * 
 * @pre - valid name, tags and advisees objects
 * @post - constructs an advisor object to store the state of an advisor (prof)
 *
 * @param:
 *         name - 
*/
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








}