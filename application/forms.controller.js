(function(){
	'use strict';
	angular.module('forms')
	 		.controller('formController', formController);

	formController.$inject = ['$location', '$rootScope', '$scope'];

	function formController($location, $rootScope, $scope) {


		var formCtrl = this;

		formCtrl.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		formCtrl.isFirefox = typeof InstallTrigger !== 'undefined';
		formCtrl.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		formCtrl.isIE = false || !!document.documentMode;
		formCtrl.isEdge = !formCtrl.isIE && !!window.StyleMedia;
		formCtrl.isChrome = !!window.chrome && !!window.chrome.webstore;

		formCtrl.unsafe = true;

		$scope.$on('$routeChangeSuccess', function() {
			console.log("Route Change");
			var path = $location.path();
			if (path.indexOf('dashboard') != -1) {
				geolocator();
			}
		});

		(function() {
			if (formCtrl.isFirefox || formCtrl.isSafari || formCtrl.isIE) {
				formCtrl.unsafe = true;
			}
			else if (formCtrl.isOpera || formCtrl.isEdge || formCtrl.isChrome) {
				formCtrl.unsafe = false;
			}
		})();

		var config = {
			apiKey: "AIzaSyBvxJcCMPG8KrvWdmYcFZ9_rvX3faCgpfw",
			authDomain: "forms-aec40.firebaseapp.com",
			databaseURL: "https://forms-aec40.firebaseio.com",
			storageBucket: "forms-aec40.appspot.com"
		};

		firebase.initializeApp(config, 'app' + Math.random());

		formCtrl.addFeedbackForRegister = function() {
			$(function() {
				$('#register_form').bootstrapValidator({
					feedbackIcons: {
						valid: 'glyphicon glyphicon-ok',
						invalid: 'glyphicon glyphicon-remove',
						validating: 'glyphicon glyphicon-refresh'
					},
					fields: {
						name: {
							validators: {
								stringLength: {
									min: 2
								},
								notEmpty: {
									message: 'Please Enter Your Name'
								}
							}
						},
						email: {
							validators: {
								notEmpty: {
									message: 'Please Enter Your Email Address'
								},
								emailAddress: {
									message: 'Please Enter a Valid Email Address'
								}
							}
						},
						password: {
							validators: {
								notEmpty: {
									message: 'Please Enter Your Password'
								},
								regexp:	{
									regexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i,
									message: ["Password Must Contain:  A Lowercase Alphabet, ",
										"An Uppercase alphabet, ",
										"A Number, ",
										"A Special Symbol, " +
										"Must Contain a minimum of 8 charecters "
									]
								}
							}
						},
						dob: {
							validators: {
								notEmpty: {
									message: 'Please Enter Your Date of Birth'
								}
							}
						}
					}
				});
			});
		};

		formCtrl.addFeedbackForLogin = function() {
			$(function() {
				$('#login_form').bootstrapValidator({
					feedbackIcons: {
						valid: 'glyphicon glyphicon-ok',
						invalid: 'glyphicon glyphicon-remove',
						validating: 'glyphicon glyphicon-refresh'
					},
					fields: {
						email: {
							validators: {
								notEmpty: {
									message: 'Please Enter Your Email Address'
								},
								emailAddress: {
									message: 'Please Enter a Valid Email Address'
								}
							}
						},
						password: {
							validators: {
								notEmpty: {
									message: 'Please Enter Your Password'
								}
							}
						}
					}
				});
			});
		};

		$(document).ready(function() {
			formCtrl.addFeedbackForRegister();
			formCtrl.addFeedbackForLogin();
		});

		formCtrl.userdata = {
			name: null,
			email: null,
			password: null,
			dob: null
		};

		formCtrl.userlogindata = {
			email: null,
			password: null
		};

		formCtrl.showReg = true;
		formCtrl.showRegSpanClass = false;

		formCtrl.showLog = false;
		formCtrl.showLogSpanClass = false;

		formCtrl.toggleReg = function() {
			formCtrl.showReg = true;
			formCtrl.showLog = false;
			formCtrl.showRegSpanClass = false;
			formCtrl.showLogSpanClass = true;
			formCtrl.addFeedbackForRegister();
			formCtrl.successMsg = null;
		};

		formCtrl.toggleLog = function() {
			formCtrl.showReg = false;
			formCtrl.showLog = true;
			formCtrl.showRegSpanClass = true;
			formCtrl.showLogSpanClass = false;
			formCtrl.addFeedbackForLogin();
		};

		formCtrl.passwordChecker = function() {
			var regex = '(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$';
			var pass = document.querySelector('rpassword');
			if (!regex.test(pass.value)) {
				pass.setCustomValidity(" Password Must Contain a Lowercase Alphabet \n" +
					" Password Must Contain an Uppercase Alphabet \n" +
					" Password Must Contain a Number \n" +
					" Password Must Contain a Special Symbol"
				)
			}
			else {
				pass.setCustomValidity("");
			}
		};
		formCtrl.successMsg = null;

		formCtrl.register = function() {
			localStorage.setItem("name", formCtrl.userdata.name);
			localStorage.setItem("email", formCtrl.userdata.email);
			localStorage.setItem("password", formCtrl.userdata.password);
			localStorage.setItem("dob", formCtrl.userdata.dob);
			formCtrl.successMsg = "Registration Successful!";
			formCtrl.toggleLog();
			clearValues();
		};

		function clearValues() {
			formCtrl.userdata.name = null;
			formCtrl.userdata.email = null;
			formCtrl.userdata.password = null;
			formCtrl.userdata.dob = null;
		}
		formCtrl.authError = false;
		formCtrl.login = function() {
			if (localStorage.getItem("email") == formCtrl.userlogindata.email && localStorage.getItem("password") == formCtrl.userlogindata.password) {
				$location.path("dashboard");
				geolocator();
				$rootScope.user = {
					name : localStorage.getItem("name"),
					email : localStorage.getItem("email"),
					dob: localStorage.getItem("dob")
				};
				formCtrl.authError = false;
			}
			else {
				formCtrl.authError = true;
			}
		};

		formCtrl.logout = function() {
			localStorage.removeItem('name');
			localStorage.removeItem('email');
			localStorage.removeItem('password');
			localStorage.removeItem('dob');
			$rootScope.user = null;
			$location.path("/");
		};

		formCtrl.showEvents = true;

		formCtrl.event = {
			name: null,
			type: null,
			host: null,
			start: null,
			end: null,
			guests: null,
			location : null,
			message: null
		};

		formCtrl.allEvents = [];

		formCtrl.addEvent = function() {
			process(formCtrl.event);
			formCtrl.showEvents = false;
			var clone = angular.merge({}, formCtrl.event);
			formCtrl.allEvents.push(clone);
		};

		formCtrl.createNewEvent = function() {
			formCtrl.showEvents = true;
			nullify();
		};

		formCtrl.checkLocation = function() {
			return $("#geocomplete").val() == '';
		};

		function process(obj) {
			obj.start = obj.start.toString();
			obj.end = obj.end.toString();
			obj.location = $("#geocomplete").val();
		}

		function nullify() {
			formCtrl.event.name = null;
			formCtrl.event.type = null;
			formCtrl.event.host = null;
			formCtrl.event.start = null;
			formCtrl.event.end = null;
			formCtrl.event.guests = null;
			formCtrl.event.location = null;
			formCtrl.event.message = null;
		}
		function geolocator() {
			$(function(){
				$("#geocomplete").geocomplete()
			});
		}


	}

})();