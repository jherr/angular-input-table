Angular input Table
===================

A component for dynamically building editable tables. That also allows for intelligent pasting in of tabular data.

Here is an example app and controller that use the angular-input-table:

	angular
	.module('inputTableTest', ['inputTable'])
	.controller('inputTableController',function($scope) {
		$scope.tableData = {
			columns: [ 2000, 2001, 2002, 2003, 2004 ],
			rows: [ 'Cost', 'Payouts' ],
			values: [ [ 10, 20 ], [ 20, 30 ], [ 30, 40 ], [ 40, 50 ], [ 50, 60 ] ]
		}
	});

And how it's invoked on the page:

	<body ng-app="inputTableTest" ng-controller="inputTableController">
	<input-table data="tableData">
	</input-table>
	</body>

You can try out the index.html in the test directory if you want to see it in action.
