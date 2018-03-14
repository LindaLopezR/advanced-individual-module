import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';

import moment from 'moment';

import './actionsLog.html';

Template.actionsLog.helpers({

    settings() {
        return {
            collection: 'actions-pages',
            rowsPerPage: 10,
            showColumnToggles : false,
            noDataTmpl: Template.noHistories,
            fields: [
                { 
                    key: 'date', 
                    label: TAPi18n.__('date'),
                    sortable: true,
                    sortOrder: 0, 
                    sortDirection: 'descending',
                    fn(value) { 
                        if(!value){
                            return TAPi18n.__('n_a');
                        }
                        return moment(value).format('MMMM DD YYYY hh:mm A');
                    }
                },
                { 
                    key: 'type', 
                    label: TAPi18n.__('action'),
                    sortable: false,
                    fn(value, object) { 

                        switch(value) {
                            case 1:
                                return TAPi18n.__('create_gemba_walk') + object.data.name;
                            case 2:
                                return TAPi18n.__('edit_gemba_walk') + object.data.newGemba.name;
                            case 3:
                                return TAPi18n.__('delete_gemba_walk') + object.data.name;
                            case 4:
                                return TAPi18n.__('create_gemba_walk') + object.data.name + TAPi18n.__('from_existing');
                            case 5:
                                return TAPi18n.__('update_company_information');
                            case 6:
                                return TAPi18n.__('create_category') + object.data.name;
                            case 7:
                                return TAPi18n.__('delete_category') + object.data.name;
                            case 8:
                                return TAPi18n.__('change') + object.data.profile.name + TAPi18n.__('s_password');
                            case 9:
                                return TAPi18n.__('create_holiday') + object.data.name;
                            case 10:
                                return TAPi18n.__('delete_holiday') + object.data.name;
                            case 11:
                                return TAPi18n.__('change_hostname') + object.data.newNetwork.hostName;
                            case 12:
                                return TAPi18n.__('change_gtm_offset') + object.data.newCompanyInfo.offset;;
                            case 13:
                                return TAPi18n.__('delete_user') + object.data.profile.name + ' ' + object.data.profile.lastName  + TAPi18n.__('permanently');
                            case 14:
                                return TAPi18n.__('delete_gemba_walk') + object.data.name + TAPi18n.__('permanently');
                            case 15:
                                return TAPi18n.__('delete_location') + object.data.name + TAPi18n.__('permanently');
                            case 16:
                                return TAPi18n.__('create_user') + object.data.profile.name + ' ' + object.data.profile.lastName ;
                            case 17:
                                return TAPi18n.__('edit_user') + object.data.newUser.profile.name + ' ' + object.data.newUser.profile.lastName ;
                            case 18:
                                return TAPi18n.__('delete_user') + object.data.profile.name + ' ' + object.data.profile.lastName ;
                            case 19:
                                return TAPi18n.__('create_location') + object.data.name;
                            case 20: 
                                return TAPi18n.__('edit_location') + object.data.newLocation.name;
                            case 21:
                                return TAPi18n.__('delete_location') + object.data.name;
                            case 22:
                                return TAPi18n.__('delete_location') + object.data.location.name + TAPi18n.__('from_gemba_walk') + object.data.gemba.name;
                            case 23:
                                return TAPi18n.__('delete_task') + object.data.task.name + TAPi18n.__('from_location') + object.data.location.name + TAPi18n.__('in_gemba_walk') + object.data.gemba.name;
                            case 24:
                                return TAPi18n.__('add_task') + object.data.task.name + TAPi18n.__('to_location') + object.data.location.name + TAPi18n.__('in_gemba_walk') + object.data.gemba.name;
                            case 25:
                                return TAPi18n.__('add_location') + object.data.location.name + TAPi18n.__('to_gemba_walk') + object.data.gemba.name;
                            case 26:
                                return TAPi18n.__('edit_location') + object.data.location.name + TAPi18n.__('in_gemba_walk') + object.data.gemba.name;
                            case 27:
                                return TAPi18n.__('edit_task') + object.data.newTask.name;
                        }

                        return value;
                    }
                }
            ]
        };
    }

});