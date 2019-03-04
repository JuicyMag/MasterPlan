import java.util.Scanner;
import java.util.ArrayList;
import java.util.Arrays;
import java.io.File;
import java.io.FileNotFoundException;

  //TO DO LIST
  //1. scanf and printf (adding student realtime)(Garett) - Done
  //2. Checking Prereps(Daniel)
  //3. Commenting the code
  //4. Student initialization - DONE
  //5. Debugging
  //6. Frontend(Daniel)

  //EDGE CASES TO FIX
  //1. Empty student tag shouldn't inhibit prereq based recommendation.

/**
  * This class is designed to run the necessary logic for a Course Recommender.
  */
public class Runner{

  private ArrayList<Course> courses; //Holds all the courses in the input file
  private ArrayList<Student> students; //Holds all the students in the input file
  public static final int numRecommended = 3; //Number of courses to be recommended

  /**
   * Construct a Runner instance to initialize the @courses and @students ArrayLists,
   * as well as with the necessary code for user interaction to gain input and recommend
   * courses accordingly.
   *
   * @post constructs a Runner instance and runs the program.
   */
  public Runner(){
    initCourses();
    
    initStudents();

    Scanner scan = new Scanner(System.in);

    System.out.println("Welcome to the Course Recommender!");
    System.out.println("Please key in your name:");
    String studentName = scan.nextLine();
    System.out.println("Please choose the tags you think best describes your interest:");
    String studentTags = scan.nextLine();

    System.out.println("Please enter your class year:");
    int classYear = Integer.parseInt(scan.nextLine());
    System.out.println("Please enter your pre-requisite courses:");
    String studentPrereqs = scan.nextLine();

    Student toBeAdded = new Student(studentName, studentTags.split(";"), classYear, studentPrereqs.split(";"));
    students.add(toBeAdded);

    System.out.println("\n\n");
    for(int i = 0; i < students.size(); i++){
      Student student = students.get(i);

      int[] compatibilityValues = getCompatibility(student.getTags(), student);
      //TODO: bubblesort
      int[] mostCompatible = getMostCompatible(compatibilityValues, student);

      System.out.println("\nHello " + student.getName() +", the top " + numRecommended + " recommended courses for you are:");
      for(int j = 0; j < mostCompatible.length; j++){
        System.out.println(courses.get(mostCompatible[j]).getName());
      }

           
    }
      //checking if checkPrereqs works - Done(Working now)
    /*
      String[] bobTags = {"Programming","Compiler"};
      String[] bobClassesTaken = {"CSCI 134", "CSCI 136"};
      Student Bob = new Student("Bob", bobTags, 2021, bobClassesTaken);
      String[] AlgorithmsPrereqs = {"CSCI 134", "CSCI 136"};
      String[] AlgorithmsTags = {"ProblemSolving","Proofs"};
      String[] AlgorithmsTimeslot = {"MWF 10:00 - 1:00"};
      Course Algorithms = new Course("Algorithms",AlgorithmsTags, AlgorithmsTimeslot, AlgorithmsPrereqs);
      System.out.println("Bob can take this course:" + checkPrereqs(Algorithms, Bob));
      

      //checking if getCompatibility works - Done(Working now) 
      int [] bobsCompatibility = getCompatibility(bobTags, Bob);
      for(int i = 0; i < bobsCompatibility.length; i++){
	  System.out.println("Bob's compatibility + " + bobsCompatibility[i]);
      }
      int [] bobsMostCompatible = getMostCompatible(bobsCompatibility, Bob);
      for(int i=0; i < bobsMostCompatible.length; i++){
	  System.out.println("Bob's Most Compatible is course # + " + bobsMostCompatible[i] + " in master courses array"); 
    
	  }*/
  }
    
   /* Check whether or not a student has taken all the preReqs for a class
   *
   * @pre requires you to import java.util.Arrays
   * @post - return a boolean representing whether or not a student has
   * all the preReqs for a particular Class
   *
   * @param Course whose prereqs are to be checked(can be optimized by passing in just the String Arrays themselves.) 
   * @param Student who wants to take a given course
   * @return a boolean representing whether all prerequisites are met for a given course. 
  */
  public boolean checkPrereqs(Course course, Student student){
      String[] preReqs = course.getPreReqs();
      String[] classesTaken = student.getClassesTaken();      
      return Arrays.asList(classesTaken).containsAll(Arrays.asList(preReqs));
  }

  /**
   * Returns an array with the compatibility values of each course.
   *
   * @pre studentTags is of the proper data format
   * @post initialize the @students ArrayList from the input csv file.
   *
   * @param studentTags tags assoicated with the student.
   * @param student student we are interested in.
   * @return an int array representing the compatibility values of the
   *         student with each course
   */
  private int[] getCompatibility(String[] studentTags, Student student){
    int[] compatibilityValues = new int[courses.size()];

    //for every course available
    for(int i = 0; i < courses.size(); i++){
      int compatibility = 0;
      if(checkPrereqs(courses.get(i), student)){
      String[] courseTags = courses.get(i).getTags();

      // get compatibility value via number of matching tags
      for(int k = 0; k < studentTags.length; k++){
        for(int j = 0; j < courseTags.length; j++){
          int result = studentTags[k].compareTo(courseTags[j]);
          if(result == 0) compatibility++;
        }
      }
      }
      compatibilityValues[i] = compatibility;
    }

    return compatibilityValues;
  }


  /**
   * Returns an array with the indexes of the most compatible courses
   * in @courses
   *
   * @post Returns an array with the indexes of the most compatible courses
   * in @courses
   *
   * @param values array of compatibility values a student has with courses.
   * @param student the Student variable we are interested in.
   * @return an array with the indexes of the most compatible courses
   *         in @courses
   */
  private int[] getMostCompatible(int[] values, Student student){
    //Holds the index of the current most compatible courses in @courses
    int[] result = new int[numRecommended];
    //Holds the compatibility values of the courses corrsponding in @result
    int[] shadow = new int[numRecommended];

    int count = 0;
    for(int i = 0; i < result.length; i++){
      //TODO
      
      for(int j = 0; j < result.length; j++){
        if(checkPrereqs(courses.get(j), student)){
          count = j;
          break;
        }
      }
      
      result[i] = count;
      count ++;
    }

    // Loops through all courses
    for(int i = 0; i < values.length; i++){
      // Compares each new course to the current most compatible courses
      for(int j = 0; j < result.length; j++){
        // if new course is more compatible, look for course with lowest
        // compatibility and replace it.
        if(values[i] > shadow[j]){
          int min = Integer.MAX_VALUE;
          int minIndex = 0;
          for(int k = 0; k < result.length; k++){
            if(shadow[k] < min){
              minIndex = k;
              min = shadow[k];
            }
          }
          result[minIndex] = i;
          shadow[minIndex] = values[i];
          break;
        }
      }
    }

    // Bubblesorts the result according to relevance.
    for(int i = 0; i < result.length - 1; i++){
      for(int j = 0; j < result.length - 1; j++){
        if(shadow[j] < shadow[j + 1]){
          int dummy = result[j];
          result[j] = result[j + 1];
          result[j + 1] = dummy;
          dummy = shadow[j];
          shadow[j] = shadow[j + 1];
          shadow[j + 1] = dummy;
        }
      }
    }
    ArrayList<Integer> maxCompatible = new ArrayList<Integer>(3);
 
    for(int i=0; i < 3; i++){
	if(checkPrereqs(courses.get(result[i]),student)){
	    if(!Arrays.asList(student.getClassesTaken()).contains(courses.get(result[i]).getName())){
		if(!maxCompatible.contains(result[i])){
		    maxCompatible.add(result[i]);
		}
	    }
	}
    }
  
    int[] finalResult = new int[maxCompatible.size()];
    int index = 0;
    for(int val:maxCompatible){
	finalResult[index++] = val;
    }
    return finalResult;
  }
    
  /**
   * Initialize the @students ArrayList from the input csv file.
   *
   * @pre input csv file has been sanitized.
   * @post initialize the @students ArrayList from the input csv file.
   */
  private void initStudents(){
    students = new ArrayList<Student>();

    try{
      Scanner csvScan = new Scanner(new File("Students.csv"));
      while (csvScan.hasNextLine()){
        String dummy = csvScan.nextLine();
        String[] attributes = dummy.split(",");
        students.add(new Student(attributes[0], attributes[1].split(";"),
          Integer.parseInt(attributes[2]), attributes[3].split(";")));
      }
      csvScan.close();
    }
    catch(Exception e){
      System.out.println(e);
    }
  }

  /**
   * Initialize the @courses ArrayList from the input csv file.
   *
   * @pre input csv file has been sanitized.
   * @post initialize the @courses ArrayList from the input csv file.
   */
  private void initCourses(){
    courses = new ArrayList<Course>();

    try {
      Scanner csvScan = new Scanner(new File("Courses.csv"));
      while (csvScan.hasNextLine()){
        String dummy = csvScan.nextLine();
        String[] attributes = dummy.split(",");
        courses.add(new Course(attributes[0], attributes[1].split(";"),
          attributes[2].split(";"), attributes[3].split(";")));
      }
      csvScan.close();
    }
    catch(Exception e){
      System.out.println(e);
    }
  }




  public static void main(String[] args){
    Runner r = new Runner();
  }
}
