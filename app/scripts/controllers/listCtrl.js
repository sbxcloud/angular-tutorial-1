(function(angular){
    angular
        .module('library')
        .controller('listCtrl', ['$scope','common',listCtrl]);

        function listCtrl($scope, common){
            const list = this, fac = common;

            function init(){
                list.cargarEditorial();
                list.cargarLista();
            }
            /**
             * funcion para ver la lista actual
             */
            list.cargarLista = function(){
                let data = fac.queryBuilder()
                    .setDomain(fac.domain)
                    .setModel('libro')
                    .fetchModels(['editorial'])
                    .compile();
                
                fac.query(fac.urls.find, data).then(function(){
                    let res = fac.response.data;

                    if(res.success){
                        let fetched = res.fetched_results;
                        for(let i = 0; i < res.results.length;i++){
                            res.results[i].editorial = fetched.editorial[res.results[i].editorial];
                        }
                        list.array = res.results;
                    }else{
                        alert('error cargando libros: '+res.error);
                    }
                });
            }

            /**
             * cargar lista de editoriales
             */

             list.cargarEditorial = function(){
                 let query = fac.queryBuilder()
                    .setDomain(fac.domain)
                    .setModel('editorial')
                    .compile();
                fac.query(fac.urls.find, query).then(function(){
                    let res = fac.response.data;
                    if(res.success){
                        list.editoriales = res.results;
                        console.log(list.editoriales)
                    }else{
                        alert('error cargando editoriales: '+res.error);
                    }
                });
             }
            /**
             * funcion para ingresar un libro
             */
            list.agregarLibro = function(){
                let data = {
                    nombre:list.nombre,
                    autor:list.autor,
                    editorial:list.editorial._KEY
                }
                let query = fac.queryBuilder()
                    .setDomain(fac.domain)
                    .setModel('libro')
                    .addObject(data)
                    .compile();

                fac.query(fac.urls.row, query).then(function(){
                    let res = fac.response.data;
                    if(res.success){
                        alert('Libro agredado.');
                        list.autor=null;
                        list.editorial=null;
                        list.nombre=null;
                        list.cargarLista();
                    }else{
                        alert('Error: ' +res.error);
                    }
                });
            }

            /**
             * funcion para ir al detalle del libro
             */

            init();

        }

})(angular);