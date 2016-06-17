angular.module('myApp', []).controller('myCtrl', ['$scope','$templateCache','$http', function($scope,$templateCache,$http){

       var tmp = "<nav class='navbar navbar-inverse navbar-fixed-top'>"+
    "<div class='container-fluid'>\n"+
        "<div class='navbar-header'>\n"+
            "<button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>\n"+
                "<span class='sr-only'>Toggle navigation</span>\n"+
                "<span class='icon-bar'></span>\n"+
                "<span class='icon-bar'></span>\n"+
                "<span class='icon-bar'></span>\n"+
            "</button>\n"+
            "<a class='navbar-brand' href='./home.html'>数据采集任务监控管理系统</a>\n"+
        "</div>\n"+
        "<div id='navbar' class='collapse navbar-collapse navbar-right'>\n"+
            "<ul class='nav navbar-nav'>\n"+
                "<li><a href='./home.html' >首页</a></li>\n"+
                "<li><a href='#'>用户管理</a></li>\n"+
                "<li><a href='#'>参数设置</a></li>\n"+
               
            "</ul>\n"+
        "</div><!--/.nav-collapse -->\n"+
    "</div>"+
"</nav>";
       $templateCache.put('topmenu.html',tmp);     
       var temp = "<ul class='nav nav-sidebar'>"+
    "<li><h4 class='sub-header'>web服务器</h4></li>"+
    "<li><a href='./data_acqui.html' >数据采集任务代码包<span class='sr-only'>(current)</span></a></li>"+
    "<li><a href='./ex_data_acqui.html' >数据采集任务执行</a></li>"+
    "<li><a href='./data_engine.html' >数据采集任务执行引擎</a></li>"+
    "<li><a href='./data_repo.html' >数据仓库连接</a></li>"+

    
"</ul>";   
		$templateCache.put('sidemenu.html',temp);
        

        $http.get("http://127.0.0.1:8000/pyWebApp/gettask").success(function(response){
        $scope.tasks = response;
        var un_tasks = {};
        var all_tasks = {};
        for (var i = 0; i < response.length; i++) {
            if(response[i].fields.allocation == false)
                un_tasks[i] = response[i];
            else
                all_tasks[i] = response[i];
        };
        $scope.unallocated_tasks = un_tasks;
        $scope.allocated_tasks = all_tasks;
        }) 
        $scope.allocate = function(id){
            var tem = {"id" : id};
            alert(id);
            $http({
                method:'POST',
                url :"http://127.0.0.1:8000/pyWebApp/allocate",
                data : tem
            })
            alert("allocate success!");
        }



        $scope.show_input = false;
        $scope.show = function(){
            $scope.show_input = !$scope.show_input;
        }  
        $scope.addtask = function(){
            var task = {"name" : $scope.namee, "kind" : $scope.kind, "descript" : $scope.descript, "size" : $scope.sizee};
            $http({
                method:'POST',
                url :"http://127.0.0.1:8000/pyWebApp/addtask",
                data : task
            });
            alert("add task sccess!")
        }


        $scope.start = function(namee){
            $http.get("http://127.0.0.1:8000/pyWebApp/startosgi").success(function(response){
                alert(response);
            })
            alert("start success!");
        }

        
        $scope.stop = function(namee){
            $http({
                method:'POST',
                url :"http://127.0.0.1:8080/kettle/startTrans",
                data : {'name' : 'Row generator test', 'xml' : 'Y'},
                header : {'Content-Type' : 'application/json', 'Authorization' : 'Basic Y2x1c3RlcjpjbHVzdGVy'}
            });
            alert("stop success!");
        }

   }])