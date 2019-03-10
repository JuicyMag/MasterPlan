/**
 * This class is designed to represent a student accessing this program.
 */

public class Student{

  private String name; //Holds the name of the Student
  private String[] tags; //Holds the tags associated to the Student.
  private int classYear; //Holds the class year of the Student.
  private String[] classesTaken; //Holds the classes taken by the student.
  private Advisor studentAdvisor; //this student's advisor

  /**
   * Construct a Student instance.
   *
   * @pre name, tags, classYear, and classesTaken are all valid and of the correct type.
   * @post constructs a Student instance with the given input.
   *
   * @param name Student's name.
   * @param tags Tags associated to the student.
   * @param classYear Student's class year.
   * @param classesTaken Classes taken by the student.
   */
  public Student(String name, String[] tags, int classYear, String[] classesTaken){
    this.name = name;
    this.tags = tags;
    this.classYear = classYear;
    this.classesTaken = classesTaken;
    studentAdvisor = null;
  }


  /**
   * Fetch the name variable of the Student instance.
   *
   * @post returns the name variable
   *
   * @return name
   */
  public String getName(){
    return name;
  }

  /**
   * Fetch the list of tags assoicated to the student.
   *
   * @post returns the tags variable
   *
   * @return tags
   */
  public String[] getTags(){
    return tags;
  }


  /**
   * Fetch the class year of the Student.
   *
   * @post returns the classYear variable
   *
   * @return classYear
   */
  public int getClassYear(){
    return classYear;
  }


  /**
   * Fetch the classes taken by the Student.
   *
   * @post returns the classesTaken variable
   *
   * @return classesTaken
   */
  public String[] getClassesTaken(){
    return classesTaken;
  }

  /**
   * @param - the advisor being assigned to this student
   *
   * @return nothing
  */
  public void assignAdvisor(Advisor advisor){
    studentAdvisor = advisor;
  }


  /**
   * @param - none
   *
   * @return the advisor who was just unassigned to this student
  */
  public Advisor unAssignAdvisor(){
    Advisor temp = studentAdvisor;
    studentAdvisor = null;

    return temp;
  }


  /**
   * @param  none
   *
   * @return the advisor for this student or null if none exists  
  */
  public Advisor getAdvisor(){
      return studentAdvisor;
  }

  /**
   * @param none
   *
   * @return a boolean representing whether the student has an advisor
  */
  public boolean hasAdvisor(){
    return (studentAdvisor != null); 
  }

  /** 
   * //change this later to something more meaning full
   * String representation of a student
   * @param none
   *
   * @return name of the student 
   *
  */
  public String toString(){
    if(hasAdvisor()){
      return (getName() + " Advisor: " + getAdvisor().getName());
    }
    return (getName() + "No advisor yet");
  }
}
