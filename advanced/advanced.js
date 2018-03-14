import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';

import './holidays/holidays.js';
import './delete/delete.js';
import './actionsLog/actionsLog.js';
import './about/about.js';
import './advanced.html';

Template.advanced.rendered = function(){
	Session.set('ACTIVE_TAB', 1);
};

Template.advanced.events({

	'click #tabHolidays'(e) {
		e.preventDefault();

		Session.set('ACTIVE_TAB', 4);
	},

	'click #tabAbout'(e) {
		e.preventDefault();

		Session.set('ACTIVE_TAB', 7);
	},

	'click #tabManage'(e) {
		e.preventDefault();

		Session.set('ACTIVE_TAB', 7);
	},

	'click #tabLog'(e) {
		e.preventDefault();

		Session.set('ACTIVE_TAB', 8);
	},

	'click #tabAbout'(e) {
		e.preventDefault();

		Session.set('ACTIVE_TAB', 9);
	},

});

Template.advanced.helpers({

	isTabActive(tab) {
		let active = Session.get('ACTIVE_TAB') || 1;
		return active == tab?'active':'';
	},

	getTabContent(tab) {
		let active = Session.get('ACTIVE_TAB') || 1;

		switch (active) {
			case 4:
				return 'holidays';
			case 5:
				return 'backup';
			case 7:
				return 'delete';
			case 8:
				return 'actionsLog';
			default:
				return 'about';
		}

	},

	getData() {
		return this;
	}

});
