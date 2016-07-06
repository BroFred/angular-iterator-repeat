angular.module('app')
.controller('mainCtrl',function($scope,$timeout){
  var treeNode = function(val){
    this.val=val;
    this.left=null;
    this.right=null;
  }
  $scope.Btree  = new treeNode(4);
  $scope.Btree.left=new treeNode(3);
  $scope.Btree.right=new treeNode(5);
  $scope.Btree.right.right = new treeNode(6);
  $scope.Btree.left.left=new treeNode(2);
  $scope.Btree.left.left.left=new treeNode(1);
  $timeout(function(){
    // $scope.Btree.left.left =null;

    // $scope.Btree.left.right =new treeNode(2);

    // $scope.Btree.val = $scope.Btree.right.val;
    // $scope.Btree.right.right = null;
    var temp =$scope.Btree.right;
    $scope.Btree.right=null;
    $timeout(function(){
      $scope.Btree.right=new treeNode(7);
      $timeout(function(){
        $scope.Btree.right.left = temp;
      })
    })
  })

})
