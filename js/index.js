var tx=angular.module("tx",[])
tx.controller("nav",["$scope",function($scope){
  $scope.color=["bs1","bs2","bs3","bs4","bs5","bs6","bs7"]
  if(localStorage.todos){
    $scope.lists=angular.fromJson(localStorage.todos)
  }else{
    $scope.lists=[]
  }
  $scope.li=$scope.lists[0]
  $scope.savadata=function(){
    localStorage.todos=angular.toJson($scope.lists)
  }
  $scope.add=function(){
    var len=$scope.lists.length
    var id=(len===0)?1001:(Math.max.apply(null,$scope.lists.map(function(v,i){
      return v.id
    }))+1)
    var list={
      id:id,
      name:"新列表"+(len+1),
      color:$scope.color[len%7],
      border:$scope.color[len%7]+"-border",
      text:$scope.color[len%7]+"-text",
      shijian:[]
    }
    $scope.lists.push(list)
    $scope.li=list
    $scope.savadata()
  }
  $scope.xuanzhong=function(index){
    $scope.li=$scope.lists[index]
  }
  $scope.addnew=function(){
    var xinjian={
      content:"",
      zhuangtai:false
    }
    $scope.li.shijian.push(xinjian)
    $scope.xin=xinjian
    $scope.savadata()
  }
  $scope.del=function(id){
    $scope.newlist=$scope.lists.filter(function(v,i){
      return v.id!==id
    })
    $scope.lists=$scope.newlist
    $scope.li=$scope.lists[0]
    $scope.savadata()

  }
  $scope.baocun=function(){
    $scope.savadata()
  }
  $scope.zhuangtai=function(v){
    v.zhuangtai=!v.zhuangtai
    $scope.savadata()
  }
  $scope.huanse=function(v){
    $scope.li.color=v
    $scope.li.text=v+"-text"
    $scope.savadata()
  }
  $scope.qingchu=function(li){
    $scope.qc=$scope.li.shijian.filter(function(v,i){
      return v.zhuangtai!==true
    })
    $scope.lists.map(function(v,i){
      if(v.id===li.id){
        v.shijian=$scope.qc
      }
    })
    $scope.savadata()
  }
  $scope.wancheng=function(li){
    $scope.nub=$scope.li.shijian.filter(function(v,i){
      return v.zhuangtai===true
    })
    return $scope.nub.length
  }
  $scope.weiwancheng=function(li){
    $scope.nub=$scope.li.shijian.filter(function(v,i){
      return v.zhuangtai!==true
    })
    return $scope.nub.length
  }
}])
