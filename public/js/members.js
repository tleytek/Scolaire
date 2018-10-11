$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then(function(dataName) {
    $('.member-name').text(dataName.fname);
  });

  $.get('/api/user_data').then(function(data) {
    if (data.id === 1) {
      $('#key-input').hide();
      $('#generateKey').on('click', function() {
        event.preventDefault();
        generateKey();
      });
    } else {
      console.log('Not admin');
      console.log(data.id);
      $('#generateKey').hide();
      if (data.validated == 0) {
        console.log(
          "Not validated. Hide everything except for 'KEY:___' form to fill in."
        );
        enterKey();
      } else {
        $('#key-input').hide();
        console.log(
          'Validated, aka KEY filled in was a match. Can view all Teacher items.'
        );
      }
    }
  });

  function enterKey() {
    var enterKey = $('input#key-input');
    $.ajax({
      type: 'POST',
      data: {
        enterKey: enterKey
      },
      url: '/api/verify'
    }).then(function(dataValidated) {
      console.log('Teacher validated - Front End: ' + dataValidated);
    });
  }

  function generateKey() {
    var test = 'test';
    $.ajax({
      type: 'POST',
      data: {
        test
        /*key*/
      }, //data:{int:key}
      url: '/api/members'
    }).then(function(data) {
      console.log('POST to /api/members SENT, KEY: ' + data.key); //data.key.int
      $('#displayKey').html(data.key); //data.key.int
    });
  }
});
