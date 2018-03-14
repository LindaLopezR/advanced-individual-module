import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';
import { Holidays } from 'meteor/igoandsee:holidays-collection';

import './holidays.html';

Template.holidays.rendered = function(){

  Session.set('IS_PERIOD', false);

	$('#loadingGemba').hide();
  $('.ui.checkbox').checkbox();

  $('#pickerHoliday').datetimepicker({
    inline:true,
    timepicker:false,
  });

  $('#pickerHolidayFinish').datetimepicker({
    inline:true,
    timepicker:false,
  });

	$('#formNewHoliday').form({
    inline : true,
    on     : 'blur',
    fields: {
      name: {
        identifier  : 'name',
        rules: [
            {
          		type   : 'empty',
              prompt : TAPi18n.__('enter_a_name')
          	}
      	]
      },
  	}
  });

  $('#wrapperFinish').hide();

};


Template.holidays.events({

	'submit #formNewHoliday'(e) {
		e.preventDefault();

		let name = $('input[name="name"]').val();
		let dateFrom = $('#pickerHoliday').val();
    let dateTo = $('#pickerHolidayFinish').val();
    let period = $('#cbPeriod').is(':checked');


    if(dateFrom == ''){
      Session.set('ERROR_MESSAGE',TAPi18n.__('invalid_dates'));
      $('#modalError').modal('show');
    }

    if(period == true && dateTo == ''){
      Session.set('ERROR_MESSAGE',TAPi18n.__('invalid_dates'));
      $('#modalError').modal('show');
    }

		$('#loadingGemba').show();

    let data = {
      name : name,
      dateFrom : dateFrom,
      dateTo   : dateTo,
      period   : period
    };

		Meteor.call('createHolidays', data, function(err, result){

			$('#loadingGemba').hide();
      if(err){
         console.log(err);
        Session.set('ERROR_MESSAGE', err.reason);
        $('#modalError').modal('show');
      }

      if(result){
        $('input[name="name"]').val('');
      }

		});

	},

  'click .btnDeleteHoliday'(e) {

    let id = $(e.target).closest('button').data('id');

     console.log(id);

    Session.set('OPTIONS_MESSAGE',TAPi18n.__('delete_this_holiday'));

    $('#modalOptions').modal({
        closable  : false,
        onDeny() {

        },
        onApprove() {

          Meteor.call('deleteHoliday', id, function(error, result){

            if(error){

              Session.set('ERROR_MESSAGE',TAPi18n.__('error_deleting_holiday'));
              $('#modalError').modal('show');

            }else if(result){
              Session.set('SUCCESS_MESSAGE',TAPi18n.__('holiday_deleted'));
              $('#modalSuccess').modal('show');
            }

          });

        }

    }).modal('show');

  },

  'change #cbPeriod'(e) {
      e.preventDefault();

      let value = $('#cbPeriod').is(':checked');
      Session.set('IS_PERIOD', value);
      if(value){
          $('#wrapperFinish').show();
      }else{
          $('#wrapperFinish').hide();
      }

  }

});


Template.holidays.helpers({

  isPeriod() {
    return Session.get('IS_PERIOD') || false;
  },

  showPlaceholder(){
    return Holidays.find().count() > 0;
  },

});
