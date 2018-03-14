import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';

import './about.html';

Template.about.helpers({

	getVersion() {
		return '2.0.0';
	}

})