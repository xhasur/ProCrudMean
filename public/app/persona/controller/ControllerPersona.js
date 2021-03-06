angular.module("App").controller('ControllerPersona', ControllerPersona);

function ControllerPersona($scope, $http, $log,$location,AllResource) {

    var objeto = {  tipo: "laptop", marca: "apple", nombre: "macbook air" };
localStorage.computador = objeto;
alert(localStorage.computador);


    //prueba
    $scope.persona = {};
    $scope.listar = function () {
           /*
            $http.get('/api/persona/listar')
                .success(function (data) {
                    $scope.persona.todos = data.result;
                    angular.element("listaPersonas");
                    $( "#listaPersonas" ).show();
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
             */
        AllResource.listarPersonas.listar(
                function(data) {

                    $scope.persona.todos = data.result;
                    angular.element("listaPersonas");
                    $( "#listaPersonas" ).show();

                },function (err) {
                    if(err.status=='500'){
                        console.log('Error de servicio');
                    }
                    else{
                        console.log('Error: ' + data);
                    }
                });

    }

    $scope.guardar = function () {
        var objectPerson = new Object();
        objectPerson.persona = $scope.persona;
        console.log(objectPerson);

        /*
        $http.post('/api/persona/insertar', objectPerson)
            .success(function (data) {
                console.log("se guardo corectamente");
                $scope.listar();
            })
            .error(function (data) {
                console.log('Error:' + data);
            });
        */
        AllResource.guardarPersonas.guardar(objectPerson,
            function(data) {
                console.log("se guardo corectamente");
                $scope.listar();
            },
            function (err) {
                if(err.status=='500'){
                    console.log('Error de servicio');
                }else
                {
                    console.log('Error:' + data);
                }
            }
        );
    };


    $scope.deletePersona = function (id) {
        console.log("-->"+id)
        $http.delete('/api/persona/eliminar/' + id)
            .success(function (data) {
                console.log("Se elimino correctamente");
                $scope.listar();
            })
            .error(function (data) {
                console.log('Error:' + data);
            });
    };


    $scope.cancelar= function () {
        $location.path("/");
    }
}