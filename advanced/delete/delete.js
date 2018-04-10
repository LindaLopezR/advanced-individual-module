import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';
import { Gembas } from 'meteor/igoandsee:gembas-collection';
import { Locations } from 'meteor/igoandsee:locations-collection';

import './delete.html';

Template.delete.rendered = function(){

  $('#loadingGemba').hide();
  //$('select').dropdown();

};

Template.delete.helpers({

  getAllGembas() {
    return Gembas.find({enable:false});
  },

  getAllLocations() {
    return Locations.find({enable:false});
  }

});

Template.delete.events({

  'click #deleteGembas'(e) {
    e.preventDefault();

    let id = $( "#selectGembas option:selected" ).val();
    console.log(id);

    if(!id){
      Session.set('ERROR_MESSAGE',TAPi18n.__('invalid_gemba_walk'));
      $('#modalError').modal('show');
      return;
    }

    let password = $('#password').val();
    console.log(password);

    if(!password){
      Session.set('ERROR_MESSAGE',TAPi18n.__('invalid_password'));
      $('#modalError').modal('show');
      return;
    }

    Session.set('OPTIONS_MESSAGE',TAPi18n.__('delete_gemba_permanently'));
    $('#modalOptions').modal({
      closable  : false,
      onDeny() {

      },
      onApprove() {

        Meteor.call('deletePermanentlyGemba', id, password, function(err, result){
          if(err){
            let message = err.reason || TAPi18n.__('error_deleting_gemba');

            Session.set('ERROR_MESSAGE', message);
            $('#modalError').modal('show');
          }else if(result){
            Session.set('SUCCESS_MESSAGE',TAPi18n.__('gemba_deleted'));
            $('#modalSuccess').modal('show');
          }
        });

      }
    }).modal('show');

  },

  'click #deleteLocation'(e) {
    e.preventDefault();

    let id = $( "#selectLocation option:selected" ).val();
    console.log(id);

    if(!id){
      Session.set('ERROR_MESSAGE',TAPi18n.__('invalid_location'));
      $('#modalError').modal('show');
      return;
    }

    let password = $('#password').val();
    console.log(password);

    if(!password){
      Session.set('ERROR_MESSAGE',TAPi18n.__('invalid_password'));
      $('#modalError').modal('show');
      return;
    }

    Session.set('OPTIONS_MESSAGE',TAPi18n.__('delete_location_permanently'));
    $('#modalOptions').modal({
      closable  : false,
      onDeny() {

      },
      onApprove() {

        Meteor.call('deletePermanentlyLocation', id, password, function(err, result){
          if(err){
            let message = err.reason || TAPi18n.__('error_deleting_gemba');

            Session.set('ERROR_MESSAGE', message);
            $('#modalError').modal('show');
          }else if(result){
            Session.set('SUCCESS_MESSAGE',TAPi18n.__('location_deleted'));
            $('#modalSuccess').modal('show');
          }
        });

      }
    }).modal('show');

  },

});
