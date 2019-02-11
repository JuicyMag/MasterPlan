/**
* This class is designed to represent a course from the course catalog.
*/
public class Course{

  private String name; //Holds the name of the course
  private String[] tags; //Holds the tags associated with the course
  private String[] timeslots; //Holds the timeslots of the course
  private String[] preReqs; //Holds the list of preReqs of the course.

  /**
   * Construct a Course instance.
   *
   * @pre name, tags, timeslots, and preReqs are all valid and of the correct type.
   * @post constructs a Course instance with the given input.
   *
   * @param name Name of Course.
   * @param tags Tags associated to the Course.
   * @param timeslots Timeslots associated to the Course.
   * @param preReqs Pre-requisite courses required by the Course.
   */
  public Course(String name, String[] tags, String[] timeslots, String[] preReqs){
    this.name = name;
    this.tags = tags;
    this.timeslots = timeslots;
    this.preReqs = preReqs;
  }

  /**
   * Fetch the name of the Course.
   *
   * @post returns the name variable
   *
   * @return name
   */
  public String getName(){
    return name;
  }


  /**
   * Fetch the list of tags assoicated to the Course.
   *
   * @post returns tags
   *
   * @return tags
   */
  public String[] getTags(){
    return tags;
  }


  /**
   * Fetch the timeslots that the Course takes.
   *
   * @post returns timeslots
   *
   * @return timeslots
   */
  public String[] getTimeslots(){
    return timeslots;
  }


  /**
   * Fetch the pre-requisites of the Course.
   *
   * @post returns preReqs
   *
   * @return preReqs
   */
  public String[] getPreReqs(){
    return preReqs;
  }
}
