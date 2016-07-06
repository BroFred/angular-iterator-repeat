var app = angular.module('app',[]);
app.directive('itRepeat', function(){
  return {
    transclude : 'element',
    compile : function(element, attr, linker){
      return function($scope, $element, $attr){
        var myLoop = $attr.itRepeat,
            match = myLoop.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/),
            indexString = match[1],
            collectionString = match[2],
            parent = $element.parent(),
            elements = {};
        var createScope= function(collection,pos){
          childScope = $scope.$new();
          // pass the current element of the collection into that scope
          childScope[indexString] = collection;

          linker(childScope, function(clone){
            // clone the transcluded element, passing in the new scope.
            if(pos){
              if(pos[1]==='l'){
                pos[0].before(clone);
              }
              if(pos[1]==='r'){
                pos[0].after(clone);
              }
            }
            else{
              parent.append(clone); // add to DOM
            }
            block = {};
            block.el = clone;
            block.scope = childScope;
            elements[collection.val]=block;
          });
        }
        var watchRegister = function(node,pos){
          if($scope.$eval(node+'.left')){
            watchRegister(node+'.left',pos)
          }
          var stop=$scope.$watchCollection(node,function(collection,oldV){
              if(collection&&collection.val!==oldV.val){
                elements[collection.val]=elements[oldV.val];
                delete elements[oldV.val]
                return;
              }
              if(!collection){
                elements[oldV.val].el.remove();
                elements[oldV.val].scope.$destroy();
                delete elements[oldV.val];
                stop()
                return;
              }
              if(elements[collection.val]&&collection.left!==null&&oldV.left===null){
                watchRegister(node+'.left',[elements[collection.val].el,'l']);
                return;
              }
              if(elements[collection.val]&&collection.right!==null&&oldV.right===null){
                watchRegister(node+'.right',[elements[collection.val].el,'r']);
                return;
              }
              if(elements[collection.val]){
                return;
              }
              createScope(collection,pos)

          });
          if($scope.$eval(node+'.right')){
            watchRegister(node+'.right',pos)
          }
        }
        watchRegister(collectionString);
      }
    }
  }
});
