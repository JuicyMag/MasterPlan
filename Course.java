import java.util.ArrayList;

/**
* This class is designed to represent a course from the course catalog.
*/
public class Course{

  private String name; //Holds the name of the course
  private String[] tags; //Holds the tags associated with the course
  private int[] timeslots; //Holds the timeslots of the course parsed into integers.
  private String[] preReqs; //Holds the list of preReqs of the course.

  /**
   * Construct a Course instance.
   *
   * @pre name, tags, timeslots, and preReqs are all valid and of the correct type.
   * @post constructs a Course instance with the given input.
   *
   * @param name Name of Course.
   * @param tags Tags associated to the Course.
   * @param timeslotsString Unparsed timeslots associated to the Course.
   * @param preReqs Pre-requisite courses required by the Course.
   */
  public Course(String name, String[] tags, String[] timeslotsString, String[] preReqs){
    this.name = name;
    this.tags = tags;
    this.timeslots = parseTimeSlots(timeslotsString);
    this.preReqs = preReqs;
  }

  /**
   * Parses the raw timeslots into an array of integers.
   *
   * @post returns an array of integers which represent timeslots of the course.
   *
   * @param toBeParsed the string array representing all the timeslots of the course.
   * @return an array of integers which represent timeslots of the course.
   */
  private int[] parseTimeSlots(String[] toBeParsed){
    ArrayList<Integer> result = new ArrayList<Integer>();

    for(int i = 0; i < toBeParsed.length; i++){
        String days = toBeParsed[i].split(" ", 2)[0];
        //This has to be parsable - edge cases might happen
        //TODO DEAL WITH EDGE CASES
        String[] times = toBeParsed[i].split(" ", 2)[1].split(" - ");

        for(int j = 0; j < days.length(); j++){
          char day = days.charAt(j);
          int dayToInt;
          switch(day){
            case 'M':
              dayToInt = 0;
              break;
            case 'T':
              dayToInt = 1440;
              break;
            case 'W':
              dayToInt = 1440 * 2;
              break;
            case 'R':
              dayToInt = 1440 * 3;
              break;
            case 'F':
              dayToInt = 1440 * 4;
              break;
            default:
              dayToInt = 0;
              break;
          }

          result.add(dayToInt + parseTime(times[0]));
          result.add(dayToInt + parseTime(times[1]));
        }
    }

    //Converting ArrayList to primative Array
    int[] resultArray = new int[result.size()];

    for(int i = 0; i < result.size(); i++){
      resultArray[i] = result.get(i);
    }

    return resultArray;
  }

  /**
   * Parses the time from hh:ss format to an integer in terms of number
   * of minutes out the day.
   *
   * @post returns the integer representation of the time
   *
   * @return the integer representation of time
   */
  private int parseTime(String time){
    String[] hoursAndMins = time.split(":");
    return Integer.parseInt(hoursAndMins[0]) * 60 +Integer.parseInt(hoursAndMins[1]);
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
  public int[] getTimeslots(){
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
