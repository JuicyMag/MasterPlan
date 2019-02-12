
/**
 * This is class has been designed to represent a single advisor 
 * with all the characteristics associated with that advisor 	
*/

public class Advisor {

	//the different advisor's interests(tags)
	private String[] tags;

	// current number of interests of this advisor

	//names of students being advised by this advisor
	private String[] advisee;

	// number of students already assigned to this advisor
	private int adviseeCount;

	//maximum number of students this advisor can have
	private static final int NUM_STUDENTS = 8;

	// the maximum number of tags a single advisor can have
	private static final int NUM_TAGS = 10;

	// advisor name
	private String name;

	// initialize the advisor object
	public Advisor(Sting[] tags, String name, int adviseeCount){
		this.tags = tags;
		advisee = new String[NUM_STUDENTS];
		this.name = name;
		this.adviseeCount = adviseeCount;
	}

	/*
	 *add an interest of the advisor
	 *
	 *@param - name(String) of the interest
	 *
	 *return void
	*/
	public void addTags(String tag){
		if(tags.length < NUM_TAGS){
			tags
		}
	}
	
	/*
	 *add a student to the list of students being advised by this advisor
	 *
	 *@param - name(String) of the student 
	 *
	 *return void
	*/
	public void addStudent(String name){
		if(advisee.length < )
	}
}