var courseTitle = "Programming Languages";
var courseDescription = "Lorem ipsum dolor sit amelia, chrispine adispicing elit,"
  + "sed daniel eiusmod daniel tempor magnus garett.";
var courseNum = "CSCI 334";
var courseProf = "S.Freund";
var courseTime = "TR 9:55 - 11:10"
for (var i = 0; i < 5; i++) {
    var newClass = document.createElement('div');
    newClass.className = "row class";
      var newTitle = document.createElement('div');
      newTitle.className = "col col-lg-2 left";
        var newClassNumber = document.createElement('div');
        newClassNumber.innerHTML = courseNum;
        newClassNumber.className = "number";
        var newClassProf = document.createElement('div');
        newClassProf.innerHTML = courseProf;
        newClassProf.className = "professor";
        var newClassTime = document.createElement('div');
        newClassTime.innerHTML = courseTime;
        newClassTime.className = "classTime";
      newTitle.appendChild(newClassNumber);
      newTitle.appendChild(newClassProf);
      newTitle.appendChild(newClassTime);

      var newClassDescription = document.createElement('div');
      newClassDescription.className = "col right";
        var newClassName = document.createElement('div');
        newClassName.innerHTML = courseTitle;
        newClassName.className = "className";
        var newClassDescr = document.createElement('div');
        newClassDescr.innerHTML = courseDescription;
        newClassDescr.className = "classDescr";
        var newRowTags = document.createElement('div');
        newRowTags.className = "row tags";
          for(var j = 0; j <3; j++){
            var newTag = document.createElement('div');
            newTag.className = "tag";
            var tagButton = document.createElement('button');
            tagButton.className = "btn btn-sm";
            tagButton.innerHTML = "X";

            newTag.innerHTML = "Tag";
            newTag.prepend(tagButton);
            newRowTags.appendChild(newTag);
          }
      newClassDescription.appendChild(newClassName);
      newClassDescription.appendChild(newClassDescr);
      newClassDescription.appendChild(newRowTags);
    newClass.appendChild(newTitle);
    newClass.appendChild(newClassDescription);


    document.getElementsByClassName("classes")[0].appendChild(newClass);
}


document.getElementById("expand").onclick = function(){myFunction()};

function myFunction() {
  var x = document.getElementById("expand");
  if(x.innerHTML === "Expand schedule"){
    document.getElementById("expanded-schedule").style.display = "block";
  }
  else document.getElementById("expanded-schedule").style.display = "none";
}

document.getElementById("close").onclick = function(){myFunction1()};

function myFunction1() {
  var x = document.getElementById("close");
  if(x.innerHTML === "Close schedule"){
    document.getElementById("expanded-schedule").style.display = "none";
  }
  else document.getElementById("expanded-schedule").style.display = "block";
}
