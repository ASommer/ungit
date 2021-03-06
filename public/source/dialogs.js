
var ko = require('../vendor/js/knockout-2.2.1');
var signals = require('signals');
var inherits = require('util').inherits;

function DialogViewModel(title) {
	this.closed = new signals.Signal();
	this.title = ko.observable(title);
	this.taDialogName = ko.observable('');
}
DialogViewModel.prototype.setCloser = function(closer) {
	this.close = closer;
}
DialogViewModel.prototype.onclose = function() {
	this.closed.dispatch();
}

function FormDialogViewModel(title) {
	DialogViewModel.call(this, title);
	this.items = ko.observable([]);
	this.isSubmitted = ko.observable(false);
	this.showCancel = ko.observable(true);
}
inherits(FormDialogViewModel, DialogViewModel);
FormDialogViewModel.prototype.template = 'formDialog';
FormDialogViewModel.prototype.submit = function() {
	this.isSubmitted(true);
	this.close();
}


function CredentialsDialogViewModel() {
	FormDialogViewModel.call(this);
	this.title('Remote requires authentication');
	this.taDialogName('credentials-dialog');
	this.showCancel(false);
	this.username = ko.observable();
	this.password = ko.observable();
	this.items([
		{ name: 'Username', value: this.username, placeholder: 'Username', type: 'text', autofocus: true, taName: 'username' },
		{ name: 'Password', value: this.password, placeholder: 'Password', type: 'password', autofocus: false, taName: 'password' }
	]);
}
inherits(CredentialsDialogViewModel, FormDialogViewModel);
exports.CredentialsDialogViewModel = CredentialsDialogViewModel;


function AddRemoteDialogViewModel() {
	FormDialogViewModel.call(this);
	this.title('Add new remote');
	this.taDialogName('add-remote');
	this.name = ko.observable();
	this.url = ko.observable();
	this.items([
		{ name: 'Name', value: this.name, placeholder: 'Name', type: 'text', autofocus: true, taName: 'name' },
		{ name: 'Url', value: this.url, placeholder: 'Url', type: 'text', autofocus: false, taName: 'url' }
	]);
}
inherits(AddRemoteDialogViewModel, FormDialogViewModel);
exports.AddRemoteDialogViewModel = AddRemoteDialogViewModel;


function PromptDialogViewModel(title, details) {
	DialogViewModel.call(this, title);
	this.alternatives = ko.observable();
	this.details = ko.observable(details);
}
inherits(PromptDialogViewModel, DialogViewModel);
PromptDialogViewModel.prototype.template = 'prompt';
exports.PromptDialogViewModel = PromptDialogViewModel;

function YesNoDialogViewModel(title, details) {
	PromptDialogViewModel.call(this, title, details);
	var self = this;
	this.taDialogName('yes-no-dialog');
	this.result = ko.observable(false);
	this.alternatives([
		{ label: 'Yes', primary: true, taId: 'yes', click: function() { self.result(true); self.close(); } },
		{ label: 'No', primary: false, taId: 'no', click: function() { self.result(false); self.close(); } },
	])
}
inherits(YesNoDialogViewModel, PromptDialogViewModel);
exports.YesNoDialogViewModel = YesNoDialogViewModel;