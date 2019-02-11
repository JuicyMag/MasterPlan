import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

  //TO DO LIST
  //1. scanf and printf (adding student realtime)(Garett)
  //2. Checking Prereps(Daniel)
  //3. Commenting the code
  //4. Student initialization
  //5. Debugging
  //6. Frontend(Daniel)

public class Runner{

  Course[] courses;

  public Runner(){
      csvReader();
  }


   /* Check whether or not a student has taken all the preReqs for a class
   *
   * @post - return a boolean representing whether or not a student has
   * all the preReqs for a particular Class
  */
  public boolean checkPrereqs(Course class, Student student){
      String[] preReqs = class.getPreReqs();
      String[] classesTaken = student.classesTaken();

      for(int i = 0; i < preReqs.length; i++){
        if(!classesTaken.contains(preReqs[i])){
          return false;
        }
      }
      return true;
  }

  /*
   * @param courses - an array of different courses in a semester
   * @param student - a student object
   *
   * @post returns an array of student compatibility with different courses
  */
  public int getCompatibility(String[] studentTags, String[] courseTags){
    int matchCount = 0;

    for(int i = 0, j = 0;i < studnetTags.length && j < courseTags.length;){
        int result = studentTags[i].compareTo(studentTags[j]);
        if(result == 0){
            matchCount++;
            i++;
            j++;
        }
    }
    return matchCount;
  }

  public void csvReader(){
    courses = new Course[30];
    try {
      Scanner csvScan = new Scanner(new File("Courses.csv"));
      csvScan.useDelimiter(",");
      int count = 0;
      while (csvScan.hasNextLine())
      {
        String dummy = csvScan.nextLine();
        String[] attributes = dummy.split(",");
        System.out.println(attributes.length);
        System.out.println(attributes[1].split(";"));
        courses[count] = new Course(attributes[0], attributes[1].split(""),attributes[2].split(";"), attributes[3].split(";"));
        count++;
        System.out.print(csvScan.next() + "|");
      }
      csvScan.close();
    }

    catch(Exception e) {
      System.out.println(e);
    }

  }


  /*
  public void initStudents(){

    try {
      Scanner csvScan = new Scanner(new File("Courses.csv"));
      csvScan.useDelimiter(",");
      while (csvScan.hasNext())
      {
        System.out.print(csvScan.next() + "|");
      }
      csvScan.close();
    }
    catch(Exception e) {
      System.out.println("File not found");
    }

  /*
  public void initCourses(){

  }
  */
  public static void main(String[] args){
    Runner r = new Runner();
  }
}
