function AppCtrl($scope,$http)
{
    
    var refresh=function(){
        $http.get('/thieveList').then(success);
        
        function success(response){
            $scope.thieveList=response.data;


        }
       
    };

    refresh();
    
    $scope.adddata = function()
    {
        console.log("I received the data!");
        console.log($scope.t);
        console.log("I received the data!");
        $http.post('/thieveList',$scope.t).then(success);
        
        function success(response)
        {
            console.log(response.data);
            refresh();
        }
     };
    
    $scope.deldata =function(id)
    {
        console.log(id);
        $http.delete('/thieveList/'+id).then(success);

        function success(response)
        {
            refresh();
        }
        

     };

    $scope.editdata =function(id)
    {
        console.log(id);
        $http.get('/thieveList/'+id).then(success);
        function success(response)
        {
            $scope.t=response.data;
        }
    };

    $scope.moddata =function()
    {
        $http.put('/thieveList/'+$scope.t._id,$scope.t).then(success);
        function success(response)
        {
            refresh();
        }
    };

     
};    
angular.module('AppCtrl', []).controller('AppCtrl', ['$scope','$http', AppCtrl]);    