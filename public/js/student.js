// Get references to page elements
var $studentText = $("#student-name");
var $submitBtn = $("#submit");
var $studentList = $("#student-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveStudent: function(student) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/students",
      data: JSON.stringify(student)
    });
  },
  getStudents: function() {
    return $.ajax({
      url: "api/students",
      type: "GET"
    });
  },
  deleteStudent: function(id) {
    return $.ajax({
      url: "api/students/" + id,
      type: "DELETE"
    });
  }
};

// refreshStudents gets new students from the db and repopulates the list
var refreshStudents = function() {
  API.getStudents().then(function(data) {
    console.log(data);
    var $students = data.map(function(student) {
      var $a = $("<a>")
        .text(student.studentName)
        .attr("href", "/student/" + student.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": student.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $studentList.empty();
    $studentList.append($students);
  });
};

// handleFormSubmit is called whenever we submit a new student
// Save the new student to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var student = {
    studentName: $studentText.val().trim()
  };

  if (!student.studentName) {
    alert("You must enter a student name.");
    return;
  }

  API.saveStudent(student).then(function() {
    refreshStudents();
  });

  $studentText.val("");
};

// handleDeleteBtnClick is called when an student's delete button is clicked
// Remove the student from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteStudent(idToDelete).then(function() {
    refreshStudents();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$studentList.on("click", ".delete", handleDeleteBtnClick);
