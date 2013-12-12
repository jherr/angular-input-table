function itHandlePaste( e ) {
	var scope = angular.element(e.srcElement).scope();
	scope.itHandlePaste( e, scope.$parent.$index, scope.$index );
	e.preventDefault = true;
	return false;
}
angular
.module('inputTable', [])
.directive('inputTable',function(){
	return {
		restrict: 'AE',
		template: '<table><tr><th></th><th ng-repeat="col in columns">{{col}}</th></tr><tr ng-repeat="row in rows"><th>{{row}}</th><td ng-repeat="col in columns"><input onpaste="return itHandlePaste(event)" ng-model="values[$index][$parent.$index].value" class="{{values[$index][$parent.$index].css}}"></td></tr></table>',
		scope:{
			data: '='
		},
		controller:function($scope,$element) {
			$scope.columns = $scope.data.columns;
			$scope.rows = $scope.data.rows;
			var iv = [];
			for( var c in $scope.data.values ) {
				var col = [];
				for( var r in $scope.data.values[ c ] ) {
					col.push( {
						value: $scope.data.values[ c ][ r ],
						original: $scope.data.values[ c ][ r ],
						css: ''
					} );
				}
				iv.push( col );
			}
			$scope.values = iv;

			$scope.updateData = function( row, column, data ) {
				for ( var nr in data ) {
					for( var nc in data[nr] ) {
						var r = parseInt( row ) + parseInt( nr );
						var c = parseInt( column ) + parseInt( nc );
						if ( c <= $scope.values.length && r <= $scope.values[c].length ) {
							$scope.values[c][r].value = data[nr][nc];
						}
					}
				}
				$scope.$digest();
			};

			$scope.itHandlePaste = function( e, row, column ) {
			    if (e && e.clipboardData && e.clipboardData.getData) {
			        var text = e.clipboardData.getData('text/plain');
			        var data = [];
			        var rows = text.split("\n");
			        for( var r in rows ) {
			        	data.push( rows[r].split("\t") );
			        }
			        $scope.updateData( row, column, data );
			    }
			    return false;
			};

			$scope.$watch( 'values', function() {
				var found = 0;
				for( var c in $scope.values ) {
					for( var r in $scope.values[ c ] ) {
						if( $scope.values[c][r].value != $scope.values[c][r].original ) {
							found += 1;
							$scope.values[c][r].css = 'input-table-changed';
						} else {
							$scope.values[c][r].css = '';
						}
					}
				}
			}, true );
		}
	}
});
