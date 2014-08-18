// Copyright StrongLoop 2014
/*
*
* Common Instance Container
*
* holds:
* - title view
* - tabs view
* - content view
*
*
*
*
* */
Common.directive('slCommonInstanceContainer', [
  function() {
    return {
      templateUrl: './scripts/modules/common/templates/common.instance.container.html',
      controller: function($scope) {


      },
      link: function(scope, el, attrs) {
        jQuery('[data-id="InstanceSliderBtn"]').click(function() {
          scope.toggleInstanceContainer();
        });

      }
    }
  }
]);
/*
*
*   Common Instance Title View
*
* */
Common.directive('slCommonInstanceTitleView', [
  function() {
    return {
      link: function(scope, el, attrs) {
        scope.$watch('activeInstance', function(newVal, oldVal) {
          if (scope.activeInstance) {
            React.renderComponent(CommonInstanceTitleView({scope: scope}), el[0]);
          }

        });
        scope.$watch('activeInstanceUpdated', function() {
          if (scope.activeInstance) {
            React.renderComponent(CommonInstanceTitleView({scope: scope}), el[0]);
          }
        }, true);

      }
    }
  }
]);

/*
*
*   Common Instance Tabs View
*
* */
Common.directive('slCommonInstanceTabsView', [
  'IAService',
  function(IAService) {
    return {
      link: function(scope, el, attrs) {
        function renderComp(){

          var tabItems = [];
         if (scope.openInstanceRefs && scope.openInstanceRefs.length) {
            for (var i = 0;i < scope.openInstanceRefs.length;i++) {
              var isActive = false;
              if (scope.openInstanceRefs[i].name === scope.activeInstance.name) {
                isActive = true;
              }
              tabItems.push({
                id:scope.openInstanceRefs[i].id,
                name:scope.openInstanceRefs[i].name,
                type:scope.openInstanceRefs[i].type,
                isActive:isActive
              });
            }
          }
          React.renderComponent(CommonInstanceTabsView({scope:scope, tabItems:tabItems}), el[0]);

        }

        scope.$watch('activeInstance', function(newVal, oldVal) {
          if (scope.activeInstance) {
            renderComp();
          }
        },true);
        scope.$watch('activeInstanceUpdated', function() {
          if (scope.activeInstance) {
            renderComp();
          }
        }, true);
//        scope = scope.$parent;
        scope.$watch('openInstanceRefs', function(newNames, oldNames) {
          if (scope.activeInstance) {
            renderComp();
          }
        }, true);
      }
    }
  }
]);







/*
 *
 *   Instance Create
 *
 * */
Common.directive('slCommonInstanceCreate', [
  'IAService',
  function(IAService) {
    return {
      replace: true,
      link: function(scope, el, attrs) {
        function renderComp(){
          var tabItems = [];

          for (var i = 0;i < scope.currentOpenModelNames.length;i++) {
            var isActive = false;
            if (scope.currentOpenModelNames[i] === IAService.getActiveInstance().name) {
              isActive = true;
            }
            tabItems.push({
              name:scope.currentOpenModelNames[i],
              isActive:isActive
            });
          }

          React.renderComponent(CommonCreateInstanceContainer({scope:scope, tabItems:tabItems}), el[0]);
        }

        scope.$watch('newModelInstance', function(newVal, oldVal) {
          renderComp();
        }, true);


//        scope.$watch('previewInstance', function(newVal, oldVal) {
//          React.renderComponent(CommonPreviewInstanceContainer({scope:scope}), el[0]);
//        });
      }
    }
  }
]);
/*
*
*   Instance Preview
*
* */
Common.directive('slCommonInstancePreview', [
  'IAService',
  function(IAService) {
    return {
      replace: true,
     // templateUrl: './scripts/modules/common/templates/common.instance.preview.html',
      link: function(scope, el, attrs) {
        function renderComp(){
          var tabItems = [];

          for (var i = 0;i < scope.currentOpenModelNames.length;i++) {
            var isActive = false;
            if (scope.currentOpenModelNames[i] === IAService.getActiveInstance().name) {
              isActive = true;
            }
            tabItems.push({
              name:scope.currentOpenModelNames[i],
              isActive:isActive
            });
          }

          React.renderComponent(CommonPreviewInstanceContainer({scope:scope, tabItems:tabItems}), el[0]);
        }

        scope.$watch('previewInstance', function(newVal, oldVal) {
          renderComp();
        });

      }
    }
  }
]);
// reference https://github.com/goodeggs/ng-focus-on
Common.directive('focusOn', function() {
  return function(scope, elem, attr) {
    return scope.$on('focusOn', function(e, name) {
      if (name === attr.focusOn) {
        return elem[0].select();
      }
    });
  };
});
Common.directive('slCommonLoadingIndicator', [
  function() {
    return {
      template: '<div class="loading-indicator"><img src="./images/mf_progress_radar.gif" /><p>discovering schema...</p></div>'
    }
  }
]);


