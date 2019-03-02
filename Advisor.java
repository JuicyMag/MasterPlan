import java.util.Vector;


/**
 * This is class has been designed to represent a single advisor 
 * with all the characteristics associated with that advisor 	
*/
public class Advisor {

	//the different advisor's interests(tags)
	private Vector<String> tags;

	// current number of interests of this advisor

	// names of students being advised by this advisor
	private Vector<String> advisees;

	//maximum number of students this advisor can have
	private static final int NUM_STUDENTS = 8;

	// the maximum number of tags a single advisor can have
	private static final int NUM_TAGS = 10;

	// advisor name
	private String name;

	/*
	 * initialize the advisor object
	 *
	 * @params:
	 *      name - name(String) of the advisor
	 * 		tags - interests(String array) of the advisor
	 *		advisees - students(String array) currently assigned to this advisor
	 */
	public Advisor(String name, String[] tags, String[] advisees){
		this.name = name;
		this.tags = this.addAll(tags);
		this.advisees = this.addAll(advisees);
	}

	public Advisor(String name){
		this(name, new String[] {} , new String[] {});
	}

     /*
	  * helper function to add all values in a string array into a vector
	  *
	  * @param - String array
	  *
	  * return String vector
     */
	private Vector<String> addAll(String[] all){
		Vector<String> result = new Vector<String> ();

		if(all.length == 0){
			return result;
		}

		for(int i = 0; i < all.length;i++){
			result.add(all[i]);
		}

		return result; 
	}

	/*
	 * add an interest of the advisor
	 *
	 * @param - name(String) of the interest
	 *
	 * return a boolean of whether or not the advisor interests were added
	*/
	public boolean addTags(String tag){
		if(tags.size() < NUM_TAGS){
			tags.add(tag);
			return true;
		}
		System.out.println("You have reached the maximum number of tags, you can't add any more tag");
		return false;
	}
	
	/*
	 * add a student to the list of students being advised by this advisor
	 *
	 * @param - name(String) of the student 
	 *
	 * return a boolean of whether or not the student was added
	*/
	public boolean addStudent(String name){
		if(advisees.size() < NUM_STUDENTS){
			advisees.add(name);
			return true;
		}

		System.out.println("You have reached the maximum number of tags, you can't add any more tag");
		return false;
	}

	// /*
	//  * add a student to the list of students being advised by this advisor
	//  *
	//  * @param - name(String) of the student 
	//  *
	//  * return a boolean of whether or not the student was added
	// */
	// public boolean addAllStudents(String[] name){
	// 	if(advisee.size() < NUM_STUDENTS){
	// 		advisee.add(name);
	// 		return true;
	// 	}

	// 	System.out.println("You have reached the maximum number of tags, you can't add any more tag");
	// 	return false;
	// }


	/*
	 * remove a student to the list of students being advised by this advisor
	 *
	 * @param - name(String) of the student 
	 *
	 * return a boolean of whether the student was removed
	 * 
	*/
	public boolean removeStudent(String name){
		if(advisees.size() > 0){
			advisees.remove(name);
			return true;
		}

		System.out.println("There are no more students advised this advisor");
		return false;
	}

	/*
	 * get the name of the advisor
	 * 
	 * @param - none
	 * 
	 * return the name of the advisor
	*/
	public String getName(){
		return this.name;
	}

	/*
	 * get the list of students under this advisor
	 * 
	 * @param - none
	 *
	 * return the list of students in an array under this advisor
	*/
	public String[] getStudents(){
		return (String[]) advisees.toArray();
	}

	/* 
	 * get the list of this advisor's interests(tags)
	 * 
	 * @param - none
	 * 
	 *return the list of this advisor's interests in an array
	 *
	*/
	public String[] getTags(){
		return (String[]) tags.toArray();
	}

	/*
	 * get important information about an advisor: 
	 * name, interests, students being advised
	 *
	 * @param - none
	 * 
	 * return a string representing the essential information of that advisor
	*/

	public String toString(){
		String output = "Name: " + this.getName() + "\n" + "Interests: " + 
						tags.toString() + "\n" + "Students: " + advisees.toString();
		return output;
	}

	/*
	 * gets the number of students currently assigned to this advisor
	 * 
	 * @param - none 
	 *
	 * return the number of students currently assigned to this advisor 
	*/
	public int adviseesCount(){
		return advisees.size();
	}


	/*
	 * answers the question of whether the advisor has a maximum number
	 * of students being advised
	 * 
	 * @param - none
	 *
	 * return a boolean value representing whether the advisor has a maximum 
	 * number of students
	*/
	public boolean hasEnoughStudents(){
		return (advisees.size() >= NUM_STUDENTS);
	}

}