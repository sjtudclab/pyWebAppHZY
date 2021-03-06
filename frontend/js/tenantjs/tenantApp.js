var tenantApp = angular.module("tenantApp", ['ngDialog', 'ngStorage']);

tenantApp.controller('tenantLoginCtrl', function($scope, $localStorage, $sessionStorage, $window, $http, ngDialog) {

  $scope.login = function(tenant) {
    var req = {
			method: 'POST',
			url: 'http://127.0.0.1:8080/pyWebApp/tenantLog',
			data: {
				account : tenant.account,
				password : tenant.password,
			},
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		};
    $http(req).success(function(data, status, headers, config){
			if (data.msg == "success") {
        console.log('login success');
        $sessionStorage.account = tenant.account;
        $sessionStorage.password = tenant.password;
        $sessionStorage.name = data.name;
        $window.location.href = '../../html/tenant/tenantmain.html';
			} else if (data.msg == "wrong") {
        console.log('wrong password');
        tenant.password = '';
			}
		}).error(function(data, status, headers, config){
      console.log(status);
		});
  };

  $scope.regTenant = function() {
    ngDialog.open({
			template: 'regtemplate',
      controller: ('tenantLoginCtrl', {
        $scope: $scope
      }),
      className: 'tenantRegNg',
      scope: $scope,
			showClose: false
    });
  };

  $scope.regWithInfo = function(reg) {
    if (reg.password != reg.secpas) {
      $scope.psdNotice = true;
      return;
    } else {
      $scope.psdNotice = false;
      var req = {
        method: 'POST',
        url: 'http://127.0.0.1:8080/pyWebApp/tenantReg',
        data: {
          account : reg.account,
          password : reg.password,
          name : reg.name
        },
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      };
      $http(req).success(function(data, status, headers, config){
        if (data.msg == "success") {
          console.log('reg success');
          $scope.actNotice = false;
          $scope.tenant.account = reg.account;
          $scope.tenant.password = reg.password;
          ngDialog.close();
        } else if (data.msg == "account exists") {
          $scope.actNotice = true;
        }
      }).error(function(data, status, headers, config){
        console.log(status);
      });

    }
  };

  function detectLogin() {
    if ($scope.tenant.account != '' && $scope.tenant.password != '') {
      $scope.actLogin = true;
    } else {
      $scope.actLogin = false;
    }
  }

  $scope.tenant = {account: '', password: ''};
  $scope.reg = {account: '', password: '', secpas: '', name: ''};

  $scope.$watch('tenant.account', detectLogin);
  $scope.$watch('tenant.password', detectLogin);

  $scope.actLogin = false;
  $scope.actNotice = false;
});


tenantApp.controller('tenantMainCtrl', function($scope, $http, $sessionStorage) {

  $scope.showuserinfo = function() {
    $scope.showInfo = true;
  };

  $scope.infoedit = function () {
    $scope.infoediting = !$scope.infoediting;
  };

  $scope.editcan = function() {
    $scope.infoediting = false;
  };

  $scope.editsure = function(newUserName) {
    $scope.infoediting = false;
    console.log(newUserName);
    var req = {
      method: 'POST',
      url: 'http://127.0.0.1:8080/pyWebApp/tenantEdit',
      data: {
        account : $scope.account,
        password : $scope.password,
        name : newUserName
      },
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    };
    $http(req).success(function(data, status, headers, config){
      if (data.msg == "success") {
        console.log('edit success');
        $scope.userName = newUserName;
        $sessionStorage.userName = newUserName;
      }
    }).error(function(data, status, headers, config){
      console.log(status);
    });
  };

  $scope.userName = $sessionStorage.name;
  $scope.account = $sessionStorage.account;
  $scope.password = $sessionStorage.password;
  $scope.showInfo = false;
  $scope.infoediting = false;
});
