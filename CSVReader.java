import java.io.File;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import java.io.FileWriter;
import java.io.BufferedWriter;
import java.lang.StringBuilder;

public class CSVReader
{
    public static void main(String[] args) throws FileNotFoundException,IOException
    {
        //Get scanner instance
        File csvFile = new File("Courses.csv");
        Scanner scanner = new Scanner(csvFile);

        //Represent CSV file as HashMap.
        HashMap<Integer, String> entries = new HashMap<Integer,String>();
        int lineNum = 1;
        while (scanner.hasNextLine())
        {
            entries.put(lineNum,scanner.nextLine());
            lineNum++;
        }

        // close the scanner
        scanner.close();
        Set<String> tags = new HashSet<String>();
        for(int i = 1; i < lineNum; i++){
          if(entries.get(i).split(",").length == 0 || entries.get(i).split(",").length == 1){
            continue;
          }
          else{

            String[] entrySplit = entries.get(i).split(",");
            System.out.println("index 1 " + entrySplit[3]);
            String tagsParse = entrySplit[1];
            System.out.println(tagsParse);
            System.out.println("tagsParse: " + tagsParse);

            String[] tagsArr = tagsParse.split(";");
            for(int j = 0; j < tagsArr.length; j++){
              if(tagsArr.length == 0){
                System.out.println("True");
              }
              else{
                tags.add(tagsArr[j]);
              }
            }
          }
        }
        FileWriter csvWrite = new FileWriter(csvFile,true);
        BufferedWriter output = new BufferedWriter(csvWrite);
        StringBuilder strBuild = new StringBuilder();
        strBuild.append("List of Tags in CSV: ");
        strBuild.append("[");
        try {
          for(String tag: tags){
            if(tag.isEmpty()){
              //Don't include in the StringBuilder
              System.out.println("Empty");
            }
            else{
              strBuild.append(tag);
              strBuild.append(" , ");
            }
          }
          strBuild.append("]");
          output.write(strBuild.toString());
        }
        catch(Exception e){
          System.out.println(e);
        }
        finally {
          if(output != null){
              output.close();
          }
          if(csvWrite != null){
              csvWrite.close();
          }
        }


        System.out.println(tags);
    }
}
