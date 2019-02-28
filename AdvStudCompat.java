
/***
 * 
 * This class is designed to represent the compatibility between a 
 * student and an advisor
 *
*/
public class AdvStudCompat{
	// a particular student 
	private Student student;

	// a particular advisor 
	private Advisor advisor;

	// the compatibility between the student and the advisor 
	private float compatibility;

	/**
	 * @param : 
	 *		 - a student
	 *		 - an advisor 
	 * 		 - the compatibility between the student and the advisor 
	 * 
	 * @return - instantiates a compatibility class object
	*/
	public AdvStudCompat(Student student, Advisor advisor, float compatibility){
		this.student = student;
		this.advisor = advisor;
		this.compatibility = compatibility;
	}

	/**
	 * @pre - an existing compatibility object 
	 * 
	 * @param - none
	 *
	 * @return the compatibility between the student and the advisor 
	*/
	public float getCompatibility(){
		return compatibility;
	}

	/**
	 * @pre - an existing compatibility object 
	 * 
	 * @param - none
	 *
	 * @return the advisor to this compatibility object 
	*/
	public Advisor getAdvisor(){
		return advisor;
	}

	/**
	 * @pre - an existing compatibility object 
	 * 
	 * @param - none
	 *
	 * @return the student to this compatibility object 
	*/
	public Student getStudent(){
		return student;
	}

	
}