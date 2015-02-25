angular.module('magicInputs',[]);
angular.module('magicInputs').factory('checkService',function($q){

  var Checked = [];
  var Elements = [];

  function saveId(element){
    var id = Elements.length;
    Elements.push(element.find('input'));
    return id;
  }

  function setChecked(id,group){
    if (Elements[id]){
      var checked = getChechedByGroup(group);
      if (checked && checked != id){
        Elements[checked].attr('checked',false);
      }
      Checked[group] = id;
      Elements[id].attr('checked',true);
    }else{
      console.log('error');
    }
  }


  // private
  function getChechedByGroup(group){
    id = Checked[group];
    if (id){
      return id;
    }else{
      return false;
    }
  }


  return {
    setChecked : setChecked,
    saveId : saveId

  }

});

angular.module('magicInputs').directive('magicRadio',function(checkService){


  var directiveDefinitionObject = {
    priority: 0,
    template: '<label ng-click="setChecked(id,group)"><input type="radio"/><span></span></label>',
    restrict: 'E',
    scope: false,

    compile: function compile(templateElement, templateAttrs) {
      var id = checkService.saveId(templateElement);
      var group = templateAttrs.group;
      templateElement.find('label').attr('ng-click','setChecked("'+ id +'","' + group + '")');

      templateElement.find('span').text(templateAttrs.title);

      return {
        pre: function ($scope, element, attrs, controller) {

        },
        post: function ($scope, element, attrs, controller) {
          $scope.setChecked = function(id,group){
            checkService.setChecked(id,group);
          }
        }
      }
    }

  }
  return directiveDefinitionObject;
});


