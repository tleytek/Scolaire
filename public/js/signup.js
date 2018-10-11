$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $('form.signup');
  var emailInput = $('input#email-input');
  var passwordInput = $('input#password-input');
  var fnameInput = $('input#fname-input');
  var lnameInput = $('input#lname-input');
  var role;
  // var key = $('input#key-input');

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on('submit', function(event) {
    event.preventDefault();
    if ($('input#admin').prop('checked')) {
      role = 1;
    } else if ($('input#teacher').prop('checked')) {
      role = 2;
    }
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      fname: fnameInput.val().trim(),
      lname: lnameInput.val().trim(),
      role: role
      // key: key.val().trim()
    };

    if (
      !userData.email ||
      !userData.password ||
      !userData.fname ||
      !userData.lname ||
      !userData.role
      // ||!userData.key
    ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.fname,
      userData.lname,
      userData.role
      // , userData.key
    );
    emailInput.val('');
    passwordInput.val('');
    lnameInput.val('');
    fnameInput.val('');
    $('input#admin').checked = false;
    $('input#teacher').checked = false;
    // key.val('');
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  //missing "key"
  function signUpUser(email, password, fname, lname, role) {
    $.post('/api/signup', {
      email: email,
      password: password,
      fname: fname,
      lname: lname,
      role: role
      // ,
      // key: key
    })
      .then(function(data) {
        window.location.replace(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }
});
