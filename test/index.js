angular
.module('inputTableTest', ['inputTable'])
.controller('inputTableController',function($scope) {
	$scope.tableData = {
		columns: [ 2000, 2001, 2002, 2003, 2004 ],
		rows: [ 'Cost', 'Payouts' ],
		values: [ [ 10, 20 ], [ 20, 30 ], [ 30, 40 ], [ 40, 50 ], [ 50, 60 ] ]
	}
});