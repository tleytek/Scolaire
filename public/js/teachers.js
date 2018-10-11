// Get references to page elements
var $teacherText = $("#teacher-name");
var $submitBtn = $("#submit");
var $teacherList = $("#teacher-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveTeacher: function(teacher) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/teachers",
      data: JSON.stringify(teacher)
    });
  },
  getTeachers: function() {
    return $.ajax({
      url: "api/teachers",
      type: "GET"
    });
  },
  deleteTeacher: function(id) {
    return $.ajax({
      url: "api/teachers/" + id,
      type: "DELETE"
    });
  }
};

// refreshTeachers gets new teachers from the db and repopulates the list
var refreshTeachers = function() {
  API.getTeachers().then(function(data) {
    console.log(data);
    var $teachers = data.map(function(teacher) {
      var $a = $("<a>")
        .text(teacher.teacherName)
        .attr("href", "/teacher/" + teacher.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": teacher.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $teacherList.empty();
    $teacherList.append($teachers);
  });
};

// handleFormSubmit is called whenever we submit a new teacher
// Save the new teacher to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var teacher = {
    teacherName: $teacherText.val().trim()
  };

  if (!teacher.teacherName) {
    alert("You must enter a teacher name.");
    return;
  }

  API.saveTeacher(teacher).then(function() {
    refreshTeachers();
  });

  $teacherText.val("");
};

// handleDeleteBtnClick is called when an teacher's delete button is clicked
// Remove the teacher from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteTeacher(idToDelete).then(function() {
    refreshTeachers();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$teacherList.on("click", ".delete", handleDeleteBtnClick);
