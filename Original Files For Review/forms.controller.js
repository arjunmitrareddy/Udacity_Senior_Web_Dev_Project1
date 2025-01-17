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

		(function() {
			if (formCtrl.isFirefox || formCtrl.isSafari || formCtrl.isIE) {
				formCtrl.unsafe = true;
			}
			else if (formCtrl.isOpera || formCtrl.isEdge || formCtrl.isChrome) {
				formCtrl.unsafe = false;
			}
		})();

		$scope.$on('$routeChangeSuccess', function() {
			var path = $location.path();
			if (path.indexOf('dashboard') != -1) {
				geolocator();
				$(function() {
					$("#ename").focus();
				});
				formCtrl.addFeedbackForEvent();
			}
			else {
				$(function() {
					$("#rname").focus();
				});
			}
		});



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
						dob: formCtrl.unsafe ? {
							validators: {
								regexp: {
									regexp: /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g,
									message: "Date Should be in dd/mm/yyyy format"
								}
							}
						} : null

					}
				}).on('error.field.bv', function(e, data) {
					if ($('#rname').val() == '' || $('#remail').val() == '' || $('#rpassword').val() == '') {
						$('#rsubmit').prop("disabled",true);
					}
					data.bv.disableSubmitButtons(true);
				}).on('status.field.bv', function(e, data) {
					if ($('#rname').val() == '' || $('#remail').val() == '' || $('#rpassword').val() == '') {
						$('#rsubmit').prop("disabled",true);
					}
					else {
						data.bv.disableSubmitButtons(false);
					}
				})
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
				}).on('error.field.bv', function(e, data) {
					if ($('#lemail').val() == '' || $('#lpassword').val() == '') {
						$('#lsubmit').prop("disabled",true);
					}
					data.bv.disableSubmitButtons(true);
				}).on('status.field.bv', function(e, data) {
					if ($('#lemail').val() == '' || $('#lpassword').val() == '') {
						$('#lsubmit').prop("disabled",true);
					}
					else {
						data.bv.disableSubmitButtons(false);
					}
				})
			});
		};

		formCtrl.addFeedbackForEvent = function() {
			$(function() {
				$('#event_form').bootstrapValidator({
					feedbackIcons: {
						valid: 'glyphicon glyphicon-ok',
						invalid: 'glyphicon glyphicon-remove',
						validating: 'glyphicon glyphicon-refresh'
					},
					fields: {
						ename: {
							validators: {
								stringLength: {
									min: 2
								},
								notEmpty: {
									message: 'Please Enter The Event Name'
								}
							}
						},
						etype: {
							validators: {
								stringLength: {
									min: 2
								},
								notEmpty: {
									message: 'Please Enter The Type Of Event'
								}
							}
						},
						hname: {
							validators: {
								stringLength: {
									min: 2
								},
								notEmpty: {
									message: 'Please Enter The Host Name'
								}
							}
						},
						stdate: {
							validators: {
								regexp: formCtrl.unsafe ? {
									regexp: /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))([ ]){1}([0-2][0-3]:[0-5][0-9])$/g,
									message: "Value Should be in dd/mm/yyyy HH:MM format"
								} : null
							}
						},
						eddate: {
							validators: {
								callback: {
									callback: function() {
										var start = $('#stdate').val();
										var end = $('#eddate').val();
										var smYr = null;
										var smMn = null;
										var smDay = null;
										var smHr = null;
										if (formCtrl.unsafe) {
											if (end.substring(6, 10) < start.substring(6, 10)) {
												return false;
											}
											if (end.substring(6, 10) == start.substring(6, 10)) {
												smYr = true;
											}
											if (smYr && end.substring(3, 5) < start.substring(3, 5)) {
												return false;
											}
											if (smYr && end.substring(3, 5) == start.substring(3, 5)) {
												smMn = true;
											}
											if (smMn && smYr && end.substring(0, 2) < start.substring(0, 2)) {
												return false;
											}
											if (smMn && smYr && end.substring(0, 2) == start.substring(0, 2)) {
												smDay = true;
											}
											if (smDay && smMn && smYr && end.substring(11, 13) < start.substring(11, 13)) {
												return false;
											}
											if (smDay && smMn && smYr && end.substring(11, 13) == start.substring(11, 13)) {
												smHr = true;
											}
											if (smHr && smDay && smMn && smYr && end.substring(14, 16) < start.substring(14, 16)) {
												return false;
											}
										}
										else {
											var stDate = new Date(start.toString());
											var endDate = new Date(end.toString());
											var startObj = {
												day: stDate.getDate(),
												month: (stDate.getMonth()+1),
												year: stDate.getFullYear(),
												hour: stDate.getHours(),
												minutes: stDate.getMinutes()
											};

											var endObj = {
												day: endDate.getDate(),
												month: (endDate.getMonth()+1),
												year: endDate.getFullYear(),
												hours: endDate.getHours(),
												minutes: endDate.getMinutes()
											};

											if (endObj.year < startObj.year) {
												return false;
											}
											if (endObj.year == startObj.year) {
												smYr = true;
											}
											if (smYr && endObj.month < startObj.month) {
												return false;
											}
											if (smYr && endObj.month == startObj.month) {
												smMn = true;
											}
											if (smMn && smYr && endObj.day < startObj.day) {
												return false;
											}
											if (smMn && smYr && endObj.day == startObj.day) {
												smDay = true;
											}
											if (smDay && smMn && smYr && endObj.hours < startObj.hours) {
												return false;
											}
											if (smDay && smMn && smYr && endObj.hours == startObj.hours) {
												smHr = true;
											}
											if (smHr && smDay && smMn && smYr && endObj.minutes < startObj.minutes) {
												return false;
											}
										}
										if (start == end){
											return false;
										}
										return true;
									},
									message: "End Date & Date Should Be Greater Than Start Date & Time"
								},
								regexp: formCtrl.unsafe ? {
									regexp: /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))([ ]){1}([0-2][0-3]:[0-5][0-9])$/g,
									message: "Date Should be in dd/mm/yyyy HH:MM format"
								} : true
							}
						},
						eloc: {
							validators: {
								notEmpty: {
									message: 'Please Enter The Event Location'
								}
							}
						}
					}
				}).on('error.field.bv', function(e, data) {
					if ($('#ename').val() == '' || $('#etype').val() == '' || $('#hname').val() == '' || $('#estdate').val() == '' || $('#stdate').val() == '' || $('#eddate').val() == '' || $('#geocomplete').val() == '') {
						$('#esubmit').prop("disabled",true);
					}
					data.bv.disableSubmitButtons(true);
				}).on('status.field.bv', function(e, data) {
					if ($('#ename').val() == '' || $('#etype').val() == '' || $('#hname').val() == '' || $('#estdate').val() == '' || $('#stdate').val() == '' || $('#eddate').val() == '' || $('#geocomplete').val() == '') {
						$('#esubmit').prop("disabled",true);
					}
					else {
						data.bv.disableSubmitButtons(false);
					}
				})
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
			$(function() {
				$("#rname").focus();
			})
		};

		formCtrl.toggleLog = function() {
			formCtrl.showReg = false;
			formCtrl.showLog = true;
			formCtrl.showRegSpanClass = true;
			formCtrl.showLogSpanClass = false;
			formCtrl.addFeedbackForLogin();
			$(function() {
				$("#lemail").focus();
			})
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
			$(function() {
				$("#ename").focus();
			});
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