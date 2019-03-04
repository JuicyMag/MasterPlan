import java.util.Scanner;
import java.util.ArrayList;
import java.util.Arrays;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashSet;
import java.util.Collections;
import java.lang.*;

  //TO DO LIST
  //1. scanf and printf (adding student realtime)(Garett) - Done
  //2. Checking Prereps(Daniel)
  //3. Commenting the code
  //4. Student initialization - DONE
  //5. Debugging
  //6. Frontend(Daniel)

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

    adviseeAssigned();

    // initCourses();
    
    // initStudents();

    // Scanner scan = new Scanner(System.in);

    // System.out.println("Welcome to the Course Recommender!");
    // System.out.println("Please key in your name:");
    // String studentName = scan.nextLine();
    // System.out.println("Please choose the tags you think best describes your interest:");
    // String studentTags = scan.nextLine();

    // System.out.println("Please enter your class year:");
    // int classYear = Integer.parseInt(scan.nextLine());
    // System.out.println("Please enter your pre-requisite courses:");
    // String studentPrereqs = scan.nextLine();

    // Student toBeAdded = new Student(studentName, studentTags.split(";"), classYear, studentPrereqs.split(";"));
    // students.add(toBeAdded);

    // System.out.println("\n\n");
    // for(int i = 0; i < students.size(); i++){
    //   Student student = students.get(i);

    //   int[] compatibilityValues = getCompatibility(student.getTags(), student);
    //   //TODO: bubblesort
    //   int[] mostCompatible = getMostCompatible(compatibilityValues, student);

    //   System.out.println("\nHello " + student.getName() +", the top " + numRecommended + " recommended courses for you are:");
    //   for(int j = 0; j < mostCompatible.length; j++){
    //     System.out.println(courses.get(mostCompatible[j]).getName());
    //   }


    //}
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

  /**
   * @pre have a file name of the students file present in the folder
   *
   * @post return a list of student objects in the
   * @return a list of students from the csv file
   * 
   *
  */
  private ArrayList<Student> initStudentsmatch(){
    ArrayList<Student> studentsToMatch = new ArrayList<Student> ();

    try{
      Scanner csvScan = new Scanner(new File("studentsmatch.csv"));

        //put ; in the csv file to separate
      while(csvScan.hasNextLine()){
        String oneStudent = csvScan.nextLine();
        String[] attributes = oneStudent.split(",");
        Student student = new Student(attributes[0], attributes[1].split(";"));
        studentsToMatch.add(student);
      }

      csvScan.close();
    } 
    catch(Exception e){
      System.out.println(e);
    }

    return studentsToMatch;

  }


  /**
   * @post an Array of advisors 
   * 
   * @pre have a file name of the advisors and the interests
   * present in the folder
   *
   * @return an array of advisors
   *
  */
  private ArrayList<Advisor> initAdvisorsmatch(){
    ArrayList<Advisor> advisorsToMatch = new ArrayList<Advisor> ();

    try{
      Scanner csvScan = new Scanner(new File("professorsmatch.csv"));

        //put ; in the csv file to separate
      while(csvScan.hasNextLine()){
        String oneAdvisor = csvScan.nextLine();
        String[] attributes = oneAdvisor.split(",");
        Advisor advisor = new Advisor(attributes[0], attributes[1].split(";"), new Student[0]);
        advisorsToMatch.add(advisor);
      }

      csvScan.close();
    } 
    catch(Exception e){
      System.out.println(e);
    }

    return advisorsToMatch;
  }




  /**
   * @param - student and advisor (non null)
   * 
   * @post - calculates the compatibility fraction and returns a compatibility object
   * @return - AdvStudCompat object
   *
  */
  private AdvStudCompat calculateCompat(Student student, Advisor advisor){

    //get students' and advisors' tags
    String[] studentTags = student.getTags();

    //initiate a hash set to put an advisor's tags
    //possibly change it to arraylist?
    HashSet <String> advisorTags = new HashSet<String> (Arrays.asList(advisor.getTags()));

    int count = 0;

    for(int i = 0; i < studentTags.length; i++){
      if(advisorTags.contains(studentTags[i])){
        count = count + 1;
      }
    }

    // the match percentage fraction
    float matchNum = ((float) count)/ ((float) advisorTags.size());

    //return a new AdvStudCompat object
    return new AdvStudCompat(student,advisor, matchNum);
  }



  // Merges two subarrays of arr[]. 
    // First subarray is arr[l..m] 
    // Second subarray is arr[m+1..r] 
  private void merge(AdvStudCompat[] arr, int l, int m, int r) { 
        // Find sizes of two subarrays to be merged 
    int n1 = m - l + 1; 
    int n2 = r - m; 

    System.out.println("in merge");

    /* Create temp arrays */
    AdvStudCompat L[] = new AdvStudCompat [n1]; 
    AdvStudCompat R[] = new AdvStudCompat [n2]; 

    /*Copy data to temp arrays*/
    for (int i=0; i<n1; ++i) 
      L[i] = arr[l + i]; 
    for (int j=0; j<n2; ++j) 
      R[j] = arr[m + 1+ j]; 


    /* Merge the temp arrays */

        // Initial indexes of first and second subarrays 
    int i = 0, j = 0; 

        // Initial index of merged subarry array 
    int k = l; 
    while (i < n1 && j < n2) 
    { 
      if (this.compareCompat(L[i], R[j]) < 0)
      { 
        arr[k] = L[i]; 
        i++; 
      } 
      else
      { 
        arr[k] = R[j]; 
        j++; 
      } 
      k++; 
    } 

    /* Copy remaining elements of L[] if any */
    while (i < n1) 
    { 
      arr[k] = L[i]; 
      i++; 
      k++; 
    } 

    /* Copy remaining elements of R[] if any */
    while (j < n2) 
    { 
      arr[k] = R[j]; 
      j++; 
      k++; 
    } 
  } 
  
    // Main function that sorts arr[l..r] using 
    // merge() 
  private void sort(AdvStudCompat[] arr, int l, int r) { 
    System.out.println("in sort");
    if (l < r) 
    { 
            // Find the middle point 
      int m = (l+r)/2; 

            // Sort first and second halves 
      this.sort(arr, l, m); 
      this.sort(arr , m+1, r); 

            // Merge the sorted halves 
      this.merge(arr, l, m, r); 
    }
  }


  private int compareCompat(AdvStudCompat a, AdvStudCompat b){
    //get compatibilities first
    float aCompat = a.getCompatibility();
    float bCompat = b.getCompatibility();
    System.out.println(aCompat);
    System.out.println(bCompat);

    //compare compatibilities
    return Float.compare(aCompat,bCompat);
  }



  /**
   * @param - a list of students and advisors 
   *
   * @post - returns a list of students who have been assigned advisors
   *
  */
  public Student[] adviseeAssigned(){
    Student[] matchedStudents; //final matched students
    int count; //no student is matched yet

    ArrayList<AdvStudCompat> compatibilities = new ArrayList<AdvStudCompat> ();

    //init advisees and their tags
      //init Students waiting for advisors
    ArrayList<Student> students = initStudentsmatch();
    ArrayList<Advisor> advisors = initAdvisorsmatch();

    matchedStudents = new Student[students.size()];
    count = 0;

    //calculate compatibility between each student and professor
    System.out.println(students.size());
    System.out.println("advisors" + advisors.size());

    for(int i = 0; i < students.size(); i++){
      for ( int j = 0; j < advisors.size(); j++){
        compatibilities.add(this.calculateCompat(students.get(i), advisors.get(j)));
      }
    }
    System.out.println(compatibilities.size());

    //put them in an array
    //AdvStudCompat[] compatibilitiesArray = compatibilities.toArray();
    Object[] objectArray = compatibilities.toArray();
    //AdvStudCompat[] compatibilitiesArray = new AdvStudCompat[objectArray.length];
    AdvStudCompat[] compatibilitiesArray = Arrays.stream(objectArray).toArray(AdvStudCompat[]::new);
    //int len = compatibilities.toArray().length;
    //Arrays.asList(objectArray).toArray(compatibilitiesArray);

    //String[] strings = Arrays.stream(objects).toArray(String[]::new);
    System.out.println(objectArray.length);
    System.out.println(compatibilitiesArray.length);

    System.out.println("before sort");
    //sort the compatibilities
    this.sort(compatibilitiesArray, 0, compatibilitiesArray.length-1);

    System.out.println("after sort");
    //assign and mark off advisors and students matched by adding all the matched students to the final array list

    System.out.println(compatibilitiesArray.length);

    for(int i = compatibilitiesArray.length-1; i >= 0; i--){
      System.out.println("here");
      AdvStudCompat compat = compatibilitiesArray[i];
      Student student = compat.getStudent();
      Advisor advisor = compat.getAdvisor();

      //make sure that the student has no advisor or the advisor has no enough students
      if(!student.hasAdvisor() || !advisor.hasEnoughStudents()){
        student.assignAdvisor(advisor);
        advisor.addStudent(student);
        matchedStudents[count] = student;
        count++;
      }
    }

    //print the name of Students with advisors
    System.out.println(Arrays.toString(matchedStudents));

    //return the list of students assigned
    return matchedStudents;
  }

  public static void main(String[] args){
    Runner r = new Runner();
  }
}
