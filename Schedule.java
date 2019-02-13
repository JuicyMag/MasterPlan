import java.util.ArrayList;

/**
  * This class is designed to act as a schedule for selected courses.
  */
public class Schedule{

  // Course array list that tracks the courses in a possible schedule.
  private Course[] courses = new Course[7];

  /**
   * Construct an empty Schedule instance.
   *
   * @post constructs an empty Schedule instance.
   */
  public Schedule(ArrayList<Course> courses){
    this.courses = courses.toArray(new Course[courses.size()]);
  }

  /**
   * Returns @courses.
   *
   * @post returns @courses.
   *
   * @return @courses
   */
  public Course[] getCourses(){
    return courses;
  }

}
