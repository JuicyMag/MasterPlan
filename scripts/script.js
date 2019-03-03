var courseTitle = "Programming Languages";
var courseDescription = "By the end of this course you will appreciate why some programming language features encourage programs with desirable qualities while others lead to ambiguous or buggy code.";
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

var tags = [];
var tagRow = $("#selected-tags");

updateTags();

function updateTags(){
  tagRow.empty();

  for(var i = 0; i<tags.length; i++){
    var newTag = document.createElement('div');
    newTag.className = "tag";
      var tagButton = document.createElement('button');
      tagButton.className = "btn btn-sm";
      tagButton.innerHTML = "X";
      tagButton.value = tags[i];
      tagButton.addEventListener("click", function(){
        tags.splice(tags.indexOf($(this).val()),1);
        updateTags();
      });
    newTag.innerHTML = tags[i];
    newTag.prepend(tagButton);
    tagRow.append(newTag);
  }
}

var shoppingCart = $("#shopping-cart");
var allCourses = $("#all-courses");
var shoppingCartBtn = $("#shopping-cart-button");
var allCoursesBtn = $("#all-courses-button");


$("#all-courses-button").click(function(){
  allCourses.removeClass("hide");
  allCoursesBtn.css('border-top', '1px solid #3F2953');
  allCoursesBtn.css('border-left', '1px solid #3F2953');
  allCoursesBtn.css('border-right', '1px solid #3F2953');
  shoppingCart.addClass("hide");
  shoppingCartBtn.css('border', 'none');
});


$("#shopping-cart-button").click(function(){
  shoppingCart.removeClass("hide");
  shoppingCartBtn.css('border-top', '1px solid #3F2953');
  shoppingCartBtn.css('border-left', '1px solid #3F2953');
  shoppingCartBtn.css('border-right', '1px solid #3F2953');
  allCourses.addClass("hide");
  allCoursesBtn.css('border', 'none');
});





$('#add-tags-button').on('click', function(){
    var selText = $('#tag-options .full-width').filter(':not(.hide)').find('.select-styled').text();
    if(!tags.includes(selText) && selText !== "Choose a category!")tags.push(selText);
    updateTags();
});

var counter = 1;

$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        selectValueHelper($(this).attr('rel'),$this.parent().parent().attr('id'));
    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

  });


function selectValueHelper(text, source){
  if(source === 'subject') {
    var nodes = $('#tag-options').children().addClass('hide');
    if (text.length) { // if somethings' selected
      nodes.filter('.'+text).removeClass('hide');
    }
  }
}
