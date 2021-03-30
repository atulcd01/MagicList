	var $scope, $location;
	var app = angular.module("Application", ['ngSanitize']);
	var ids = -1;


	app.controller('Controller', function($scope, $location, anchorSmoothScroll, $timeout, $interval) {
		$scope.emptylist = [];
		$scope.getLocalList = function(vname) {
				return (((localStorage.getItem(vname) == 'undefined') || (localStorage.getItem(vname) == null) || localStorage.getItem(vname) == '[]') || (localStorage.getItem(vname).length == 0)) ?
				$scope.emptylist : JSON.parse(localStorage.getItem(vname));
		}


		//localStorage.setItem('listdetails', JSON.stringify($scope.emptylist));
		//localStorage.setItem("listitems",JSON.stringify($scope.emptylist));
		$scope.showCreateList = false;
		$scope.setlistitems = '';
		$scope.value = [];
		$scope.fieldid = 0;
		$scope.listitems = $scope.getLocalList('listitems'); // add values also otherwise there will be empty objects
		$scope.listdetails =  $scope.getLocalList('listdetails');;
		$scope.listfields = [];
		$scope.listfields.push({
			 id:0,
			 name: "",
			 type: "text"
			});
		$scope.selectedlist = [];

		$scope.closeCrt = function() {
			$scope.showCreateList = false;
		};



		$scope.getId = function() {
			 $scope.fieldid = $scope.fieldid + 1;
			 return $scope.fieldid;
		}

	$scope.addfield = function() {
			$scope.listfields.push({
				 id:$scope.getId(),
				 name: "",
				 type: "text"
				});
	};

	$scope.removeItemfromList = function(name) {
		angular.forEach($scope.listdetails, function(list) {
			if(list.name==name){
				if($scope.selectedlist.name==list.name)
				$scope.selectedlist=[];
				$scope.listdetails.splice($scope.listdetails.indexOf(list), 1);
				$scope.listitems.splice($scope.listitems.indexOf(name.toUpperCase()), 1);
			}
			});
			localStorage.setItem('listdetails', JSON.stringify($scope.listdetails));
			localStorage.setItem("listitems",JSON.stringify($scope.listitems));
	};

	$scope.deletefield=function(id) {
		if($scope.listfields.length>1)
		angular.forEach($scope.listfields, function(list) {
			if(list.id==id){
				$scope.listfields.splice($scope.listfields.indexOf(list), 1);;
			}
			});
	};

	$scope.addItemtoList = function() {
			$scope.errortext = "";
			if ($scope.listitems.indexOf($scope.listname.toUpperCase()) == -1) {

				$scope.listdetails.push({
					 name: $scope.listname,
					 fields: $scope.listfields,
					 insidelist:[]
				});
				$scope.listitems.push($scope.listname.toUpperCase());
				//alert($scope.listitems)
				localStorage.setItem('listdetails', JSON.stringify($scope.listdetails));
				localStorage.setItem("listitems",JSON.stringify($scope.listitems));
				$scope.closeCrt();
				$scope.listfields=[];
				$scope.listname = '';
			}else {
				$scope.errortext = "The item is already present.";
				$scope.listname = '';
				//$scope.gotoElement('0_items');
			}
		};

	$scope.showList = function(selectedlist) {
		$scope.selectedlist = selectedlist;
		closeNav();
	}

	$scope.addItem = function() {
		console.log($scope.value);
			$scope.selectedlist.insidelist.push({
					 value:$scope.value
				});
				angular.forEach($scope.listdetails, function(list) {
					if(list.name==$scope.selectedlist.name){
						list = $scope.selectedlist;
					}
					});

					localStorage.setItem('listdetails', JSON.stringify($scope.listdetails));

					$scope.value=[];
				};

		$scope.removeItem = function(index) {
			console.log(index);
			$scope.selectedlist.insidelist.splice(index, 1);

					angular.forEach($scope.listdetails, function(list) {
						if(list.name==$scope.selectedlist.name){
							list = $scope.selectedlist;
						}
						});
			localStorage.setItem('listdetails', JSON.stringify($scope.listdetails));
			$scope.value=[];
					};









	//old code goes here
		$scope.loginflg = false;
	    var now = new Date();
	    $scope.hour = now.getHours() == 0 ? 24 : now.getHours();
	    var dt = new Date();
	    $scope.errortext = "";
	    $scope.daydata = [
	    ];
	    $scope.toogleAdd = false;
	    $scope.toogleEdit = false;
	    $scope.toogleDay = true;
	    $scope.toogleEvent = false;
	    $scope.toogleExpense = false;

	    if(localStorage.getItem('items') == 'undefined'
	    	 || localStorage.getItem('items') == null
	    	 || localStorage.getItem('items') == '[]'
	    	 || localStorage.getItem('items').length == 0) {
	    	$scope.items =$scope.daydata ;
	    	$scope.itemsnames = [];
	    	} else{
	    	$scope.items = JSON.parse(localStorage.getItem('items'));
	    	$scope.itemsnames = localStorage.getItem('itemsnames').split(',');
	    	}
	    $scope.transactiondata = [
	    ];
	    $scope.transactions = (((localStorage.getItem('transactions') == 'undefined') || (localStorage.getItem('transactions') == null) || localStorage.getItem('transactions') == '[]') || (localStorage.getItem('transactions').length == 0)) ?
	    $scope.transactiondata : JSON.parse(localStorage.getItem('transactions'));

	    $scope.expensedata = [
	        ];
	    $scope.expenses = (((localStorage.getItem('expenses') == 'undefined') || (localStorage.getItem('expenses') == null) || localStorage.getItem('expenses') == '[]') || (localStorage.getItem('expenses').length == 0)) ?
	    $scope.expensedata : JSON.parse(localStorage.getItem('expenses'));

	    $scope.expense = 0;
	    $scope.earn = 0;

	    var now1 = new Date(2018, 11, 01);
	    var now2 = new Date(2050, 11, 31);
	    $scope.filterfromdate = now1.getTime();
	    $scope.filtertodate = now2.getTime();

	    $scope.closeAll = function() {
	    	$scope.toogleDay = false;
	    	$scope.toogleAdd=false;
	    	$scope.toogleEdit=false;
	    	$scope.toogleEvent=false;
	    	$scope.toogleEventsAdd=false;
	    	$scope.toogleEventsEdit=false;
	    	$scope.toogleExpense=false;
	    	$scope.toogleExpensesAdd=false;
	    	$scope.toogleExpensesEdit=false;
	    	$scope.toogleShopList=false;
	    	$scope.toogleReportFilter=false;
	    	closeNav();
		};

		$scope.showDay = function() {
			$scope.closeAll();
			$scope.toogleDay = true;

		};

		var daytime = 60 * 60 * 23 * 1000;
		$scope.showShop = function() {
			$scope.closeAll();
			$scope.toogleShopList = true;
			$scope.expense = 0;
			$scope.earn = 0;
			filterdaytime = eval($scope.filtertodate+daytime)
			angular.forEach($scope.transactions, function(todo) {
				if(todo.time>=$scope.filterfromdate && todo.time<=filterdaytime)
					$scope.earn = eval(todo.total + $scope.earn);
			    });
			angular.forEach($scope.expenses, function(todo) {
				if(todo.dateofpayment>=$scope.filterfromdate && todo.dateofpayment<=filterdaytime)
					$scope.expense = eval(todo.amountpaid + $scope.expense);
			    });

			$scope.drawchart();
		    };

	    $scope.showEvents = function() {
	    	$scope.closeAll();
	        $scope.toogleEvent = true;
	        if($scope.transactions!=''){
	        angular.forEach($scope.transactions, function(todo) {
	            todo.daysLeft = $scope.daysLeft(todo.time);
	        });
		    $scope.transactions.sort($scope.compare);
		    $timeout(function() {
		        $scope.updateEvents();
		    }, 3);
	        }
		};

		$scope.showExpense = function() {
			$scope.closeAll();
			$scope.toogleExpense = true;
		    };


		$scope.gotoSecondPage = function(todo, c) {
	        $scope.toogleDay = false;
	        $scope.closeAll();
	        if (c == 'add') {
	            $scope.toogleAdd = true;
	            $scope.id = eval(ids++);
	        } else if (c == 'edit') {
	            $scope.toogleEdit = true;
	            $scope.todoSmallHeader = todo.name;
	            $scope.todoSmallDesc = todo.smdesc;
	            $scope.todoTime = todo.time;
	            $scope.id = todo.id;
		    todo.done=true;
	        }
	    };

		$scope.addTodo = function() {
			$scope.closeAll();
			$scope.errortext = "";
			if ($scope.itemsnames.indexOf($scope.todoSmallHeader) == -1) {
				$scope.items.push({
					name: $scope.todoSmallHeader,
					smdesc: $scope.todoSmallDesc,
					done: false,
					id: $scope.id
				});
				$scope.itemsnames.push($scope.todoSmallHeader);
				localStorage.setItem('items', JSON.stringify($scope.items));
				localStorage.setItem("itemsnames",$scope.itemsnames );
				$scope.toogleDay = true;
				$scope.todoSmallHeader = '';
				$scope.todoSmallDesc = '';
				$scope.errortext = "";
			}else {
				$scope.errortext = "";
				$scope.gotoElement('0_items');
			}
		};

	    $scope.editTodo = function() {
	    	$scope.closeAll();
	    	var oldTodos = $scope.items;
	    	$scope.items = [];
	    	angular.forEach(oldTodos, function(todo) {
	    		if (!todo.done)
	    			$scope.items.push(todo);
	    		if (todo.done) {
	    			$scope.items.push({
	    				name: $scope.todoSmallHeader,
	    				smdesc: $scope.todoSmallDesc,
	    				done: false,
	    				id: $scope.id
	    			});
	    		}
	    	});
	    	$scope.todoSmallHeader = '';
	    	$scope.todoSmallDesc = '';
	    	localStorage.setItem('items', JSON.stringify($scope.items));
	    	$scope.toogleDay = true;
	    	$scope.errortext = "";
	    };

	    $scope.deleteItem = function() {
	    	var oldTodos = $scope.items;
	    	$scope.items = [];
	    	var name='';
	    	angular.forEach(oldTodos, function(todo) {
	    		if (!todo.done){
	    			$scope.items.push(todo);
	    		}
	    		else {
	    			name=todo.name;
	    		}
	    	});
	    	$scope.todoSmallHeader = '';
	    	$scope.todoSmallDesc = '';
	    	$scope.errortext = "";
	    	localStorage.setItem('items', JSON.stringify($scope.items));
	    	$scope.itemsnames.splice($scope.itemsnames.indexOf(name), 1);
			localStorage.setItem("itemsnames", $scope.itemsnames);
			$scope.closeAll();
			$scope.toogleDay = true;
	    };

	    $scope.cancel = function() {
	    	$scope.closeAll();
	    	$scope.toogleDay = true;
	    	$scope.todoSmallHeader = '';
	    	$scope.todoLongDesc = '';
	    	$scope.todoSmallDesc = '';
	    	var items = $scope.items;
	    	angular.forEach(items, function(todo) {
	    		if (todo.done) {
	    			todo.done = false;
	    		}
	    	});
	    };

	    $scope.getStringDate = function(input) {
	        var t = '';
	        if (input != null) {
	            var y = input.getFullYear();
	            var m = input.getMonth().lenght > 1 ? input.getMonth() : '0' + input.getMonth();
	            var d = input.getDate().lenght > 1 ? input.getDate() : '0' + input.getDate();
	            t = y + m + d;
	        }
	        return t;
	    }

	    $scope.complete=function(string){
			var output=[];
			angular.forEach($scope.items,function(country){
				if(string!=undefined && country.name.toLowerCase().indexOf(string.toLowerCase())>=0){
					output.push(country);
				}
			});
			$scope.filterCountry=output;
		}

		$scope.fillTextbox=function(string){
			$scope.country=string.name;
			$scope.prize=string.smdesc;
			$scope.filterCountry=null;
		}

	    $scope.addTransactionPage = function(todo, c) {
	    	$scope.closeAll();
	        if (c == 'a') {
	            $scope.toogleEventsAdd = true;
	            $scope.id = eval(ids++);
	            $scope.prize=null;
	        } else if (c == 'e') {
	            $scope.toogleEventsEdit = true;
	            $scope.todoSmallHeader = todo.name;
	            $scope.prize=todo.prize;
	            input = todo.time;
	            $scope.bday = new Date(todo.time);
	            $scope.todoLongDesc = todo.lgdesc;
	            $scope.id = todo.id;
	            todo.done = true;
	        }
	    };

	    $scope.addTransaction = function() {
	        var tm = $scope.bday;
	        $scope.closeAll();
	        if ($scope.bday == null)
	            $scope.bday = new Date();
	//alert('prize: '+$scope.prize)
		if($scope.filterCountry != null)
			return ;
	        $scope.transactions.push({
	            name: $scope.country,
	            time: $scope.bday.getTime(),
	            done: false,
	            lgdesc: $scope.todoLongDesc,
	            daysLeft: $scope.daysLeft($scope.bday),
	            id: $scope.id,
	            prize: $scope.prize,
	            total:eval($scope.prize*$scope.todoLongDesc)
	        });
	        $scope.bday = '';
	        $scope.todoLongDesc = '';
		$scope.country='';
	        localStorage.setItem('transactions', JSON.stringify($scope.transactions));
	        $scope.toogleEvent = true;
	        $scope.transactions.sort($scope.compare);
	        $timeout(function() {
	            $scope.updateEvents();
	        }, 3);
	    };

	    $scope.editTransaction = function() {
	        //get the event
	        var oldTodos = $scope.transactions;
	        $scope.transactions = [];
	        angular.forEach(oldTodos, function(todo) {
	            if (!todo.done)
	                $scope.transactions.push(todo);
	            if (todo.done) {
	                $scope.transactions.push({
	                    name: $scope.todoSmallHeader,
	                    done: false,
	                    lgdesc: $scope.todoLongDesc,
	                    time: $scope.bday.getTime(),
	                    daysLeft: $scope.daysLeft($scope.bday),
	                    id: $scope.id,
	                    prize: $scope.prize,
	                    total:eval($scope.prize*$scope.todoLongDesc)
	                });
	                tm = todo.time;
	                todo.done = false;
	            }
	        });
	        $scope.todoSmallHeader = '';
	        $scope.bday = '';
	        $scope.todoLongDesc = '';
	        localStorage.setItem('transactions', JSON.stringify($scope.transactions));
	        $scope.closeAll();
	        $scope.toogleEvent = true;
	        $scope.transactions.sort($scope.compare);
	        $timeout(function() {
	            $scope.updateEvents();
	        }, 3);
	    };
	// end leena

	    $scope.deleteEvents = function() {
	    	$scope.closeAll();
	        $scope.toogleEvent = true;
	        $scope.todoSmallHeader = '';
	        $scope.todoLongDesc = '';
	        $scope.todoSmallDesc = '';
	        $scope.bday = '';
	        var tm = 1;
	        var items = $scope.transactions;
	        $scope.transactions = [];
	        angular.forEach(items, function(todo) {
	            if (!todo.done)
	                $scope.transactions.push(todo);
	        });
	        localStorage.setItem('transactions', JSON.stringify($scope.transactions));
	        if($scope.transactions!="")
	        $timeout(function() {
	            $scope.updateEvents();
	        }, 3);



	    };


	    $scope.cancelEvents = function() {
	    	$scope.closeAll();
	        $scope.toogleEvent = true;

	        $scope.todoSmallHeader = '';
	        $scope.todoLongDesc = '';
	        $scope.todoSmallDesc = '';
	        $scope.bday = '';
	        var tm = 1;
	        var items = $scope.transactions;
	        angular.forEach(items, function(todo) {
	            if (todo.done) {
	                todo.done = false;
	            }
	        });
	        $timeout(function() {
	            $scope.updateEvents();
	        }, 3);
	    };

	    $scope.compare = function(a, b) {
	        return (a.daysLeft - b.daysLeft);
	    }


	    $scope.activeEvent = 0;

	    $scope.updateEvents = function() {
	        var keepGoing = true;
	        var oldTodos = $scope.transactions;
	        angular.forEach(oldTodos, function(todo) {

	            if (keepGoing) {
	                if (todo.daysLeft >= 0) {
	                    $scope.activeEvent = "e_" + todo.daysLeft;
	                    keepGoing = false;
	                }
	            }


	        });
	        if($scope.activeEvent!=0)
	        $scope.gotoElement($scope.activeEvent);
	    }

	    $scope.update = function() {
	        now = new Date();
	        $scope.hour = now.getHours() == 0 ? 24 : now.getHours();
	        $scope.gotoElement($scope.hour);
	    }
	    $scope.gotoId = function(id) {

	        $scope.gotoElement(id);
	    }

	    $scope.daysLeft = function(input) {
	        var inputDate = new Date(input);

	        var today = new Date();

	        //today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

	        inputDate.setFullYear(today.getFullYear());

	        a = inputDate;
	        b = today;
	        var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	        var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
	        var timeDiff = utc1 - utc2;
	        //var timeDiff = inputDate.getTime() - today.getTime();

	        var diff = timeDiff / (1000 * 3600 * 24);


	        return Math.round(diff);
	    };

	    $scope.mathfloor = function(input) {

	        return Math.floor(input);
	    };

	    $scope.mathabs = function(input) {

	        return Math.abs(input);
	    };

	    $scope.getSmallDescription = function(input) {
	        var res = 'TODAY';
	        if (input > 0) {
	            if (input > 30) {
	                res = 'Approximately ' + Math.floor(input / 30) + ' months and ' + input % 30 + ' days left';
	            } else {
	                res = input + ' days left'
	            }
	        }
	        if (input < 0) {
	            if (input < -30) {
	                res = 'Approximately ' + Math.floor(Math.abs(input) / 30) + ' months and ' + Math.abs(input) % 30 + ' days over'
	            } else {
	                res = Math.abs(input) + ' days over';
	            }

	        }
	        return res;
	    };
	    $scope.otherShare = function(todo, dateformat) {

	        var name = todo.name == undefined ? '' : todo.name;
	        var lgdesc = todo.lgdesc == undefined ? '' : todo.lgdesc;
	        var message = dateformat + ' ' + name + ' ' + lgdesc;
	        //alert(message);
	        window.plugins.socialsharing.share(message, null, null, null);
	    };


	///adding expensename tab here start

	    $scope.addExpensePage = function(todo, c) {
	    	$scope.closeAll();
	        if (c == 'a') {
	            $scope.toogleExpensesAdd = true;
	            $scope.id = eval(ids++);
	        } else if (c == 'e') {
	            $scope.toogleExpensesEdit = true;
	            $scope.expensename = todo.name;
	            input = todo.dateofpayment;
	            $scope.dateofpayment = new Date(todo.dateofpayment);
	            $scope.amountpaidto = todo.amountpaidto;
	            $scope.amountpaid= todo.amountpaid
	            $scope.id = todo.id;
	            todo.done = true;
	        }
	    };

	    $scope.addExpense = function() {
	        var tm = $scope.dateofpayment;
	        if ($scope.dateofpayment == null)
	            $scope.dateofpayment = new Date();

	        $scope.expenses.push({
	            name: $scope.expensename,
	            dateofpayment: $scope.dateofpayment.getTime(),
	            done: false,
	            amountpaidto: $scope.amountpaidto,
	            daysLeft: $scope.daysLeft($scope.dateofpayment),
	            id: $scope.id,
	            amountpaid: $scope.amountpaid,
	            total:eval($scope.amountpaid*$scope.amountpaidto)
	        });
	        $scope.dateofpayment = '';
	        $scope.amountpaidto = '';
		$scope.expensename='';
	        localStorage.setItem('expenses', JSON.stringify($scope.expenses));
	        $scope.closeAll();
	        $scope.toogleExpense = true;
	        $scope.expenses.sort($scope.compare);
	        $timeout(function() {
	            $scope.updateExpenses();
	        }, 3);
	    };

	    $scope.editExpense = function() {
	        var oldTodos = $scope.expenses;
	        $scope.expenses = [];
	        angular.forEach(oldTodos, function(todo) {
	            if (!todo.done)
	                $scope.expenses.push(todo);
	            if (todo.done) {
	                $scope.expenses.push({
	                    name: $scope.expensename,
	                    done: false,
	                    amountpaidto: $scope.amountpaidto,
	                    dateofpayment: $scope.dateofpayment.getTime(),
	                    daysLeft: $scope.daysLeft($scope.dateofpayment),
	                    id: $scope.id,
	                    amountpaid: $scope.amountpaid,
	                    total:eval(todo.amountpaid*$scope.amountpaidto)
	                });
	                tm = todo.dateofpayment;
	                todo.done = false;
	            }
	        });
	        $scope.expensename = '';
	        $scope.dateofpayment = '';
	        $scope.amountpaidto = '';
	        localStorage.setItem('expenses', JSON.stringify($scope.expenses));
	        $scope.closeAll();
	        $scope.toogleExpense = true;
	        $scope.expenses.sort($scope.compare);
	        $timeout(function() {
	            $scope.updateExpenses();
	        }, 3);
	    };
	// end leena

	    $scope.deleteExpenses = function() {
	    	$scope.closeAll();
	    	$scope.toogleExpense = true;
	        $scope.expensename = '';
	        $scope.amountpaidto = '';
	        $scope.amountpaid = '';
	        $scope.dateofpayment = '';
	        var tm = 1;
	        var items = $scope.expenses;
	        $scope.expenses = [];
	        angular.forEach(items, function(todo) {
	            if (!todo.done)
	                $scope.expenses.push(todo);
	        });
	        localStorage.setItem('expenses', JSON.stringify($scope.expenses));
	        if($scope.expenses!="")
	        $timeout(function() {
	            $scope.updateExpenses();
	        }, 3);



	    };


	    $scope.cancelExpenses = function() {
	    	$scope.closeAll();
	        $scope.toogleExpense = true;

	        $scope.expensename = '';
	        $scope.amountpaidto = '';
	        $scope.amountpaid = '';
	        $scope.dateofpayment = '';
	        var tm = 1;
	        var items = $scope.expenses;
	        angular.forEach(items, function(todo) {
	            if (todo.done) {
	                todo.done = false;
	            }
	        });
	        $timeout(function() {
	            $scope.updateExpenses();
	        }, 3);
	    };

	$scope.activeExpense = 0;

	    $scope.updateExpenses = function() {
	        var keepGoing = true;
	        var oldTodos = $scope.expenses;
	        angular.forEach(oldTodos, function(todo) {

	            if (keepGoing) {
	                if (todo.daysLeft >= 0) {
	                    $scope.activeExpense = "e_" + todo.daysLeft;
	                    keepGoing = false;
	                }
	            }


	        });
	        if($scope.activeExpense!=0)
	        $scope.gotoElement($scope.activeExpense);
	    }


	//ends here

	    $scope.addFilterPage = function(todo, c) {
	    		$scope.closeAll();
	            $scope.toogleReportFilter = true;
	    };


	    $scope.editReport = function() {

	    	$scope.filterfromdate = $scope.fromdate.getTime();
	        $scope.filtertodate = $scope.fromto.getTime();
	        $scope.showShop();
	    };

	    $scope.cancelReport = function() {
	    	$scope.closeAll();
	        $scope.toogleShopList = true;

	    };


	  /*  $timeout(function() {
		 $scope.gotoElement($scope.hour);

	    }, 500);

	$timeout(function() {



	        angular.forEach($scope.items, function(todo) {
	            todo.id = ids++;

	        });

	        angular.forEach($scope.transactions, function(todo) {
	            todo.id = ids++;

	        });


	    }, 500*2);*/
	/* added code for shopping list */



	 $scope.drawchart = function () {
	 var chartData={
			    "type":"pie",  // Specify your chart type here.
			    "series":[  // Insert your series data here.
			        { "values": [$scope.expense]},
			        { "values": [$scope.earn]}
			    ]
			  };
			  zingchart.render({ // Render Method[3]
			    id:'chartDiv',
			    data:chartData,
			    height:400,
			    width:300
			  });
	 }



	 $scope.gotoElement = function(eID) {
	    // anchorSmoothScroll.scrollTo(eID);
	 };


	 $scope.validate = function() {
	 	var xyz =$scope.a+$scope.b+$scope.c+$scope.d;
	    //alert(xyz);
	 	//$scope.a='';$scope.b='';$scope.c='';$scope.d='';
	 	if(xyz.length==4)
	    if(localStorage.getItem('xyz')==undefined){
	 	   localStorage.setItem('xyz',xyz);
		   $scope.loginflg = false;
	 	   $scope.showDay();
		   alert ('Password set. Use it for Login.');
	    }else{
	 	   if(localStorage.getItem('xyz')==xyz){
	 		   //alert('success');
	 		   //$location.href='index.html';
	 		   $scope.loginflg = false;
	 		   $scope.showDay();
	 		  // window.location.href = 'dayplan.html';
	 	   }
	    }
	 	$scope.a='';$scope.b='';$scope.c='';$scope.d='';
	 };

	});




	moveOnMax =function (field, nextFieldID) {
		//alert(field.value.length);
		    if (field.value.length == 1) {
		        document.getElementById(nextFieldID).focus();
		    }
		}

	confirmPass =function (field, nextFieldID, ) {
			//alert(field.value.length);
			    if (field.value.length == 1) {

			        angular.element(document.getElementById('ios')).scope().validate();
			        document.getElementById(nextFieldID).focus();
			        document.getElementById(nextFieldID).value='';
			        document.getElementById('a').value='';
			        document.getElementById('b').value='';
			        document.getElementById('c').value='';
			    }

			}


	shoppingfocus =function (obj ) {
	if(!(obj.style.backgroundColor=='darkblue')){
	  obj.style = "color:white;background-color:darkblue;";
	}
	else
	 obj.style = "color:#495057;background-color:white;";
	}



	app.service('anchorSmoothScroll', function() {

	    this.scrollTo = function(eID) {


	        var startY = currentYPosition();
	        var stopY = elmYPosition(eID);
	        var distance = stopY > startY ? stopY - startY : startY - stopY;
	        if (distance < 100) {
	            scrollTo(0, stopY);
	            return;
	        }
	        var speed = Math.round(distance / 100);
	        if (speed >= 20) speed = 20;
	        var step = Math.round(distance / 25);
	        var leapY = stopY > startY ? startY + step : startY - step;
	        var timer = 0;
	        if (stopY > startY) {
	            for (var i = startY; i < stopY; i += step) {
	                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
	                leapY += step;
	                if (leapY > stopY) leapY = stopY;
	                timer++;
	            }
	            return;
	        }
	        for (var i = startY; i > stopY; i -= step) {
	            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
	            leapY -= step;
	            if (leapY < stopY) leapY = stopY;
	            timer++;
	        }

	        function currentYPosition() {
	            // Firefox, Chrome, Opera, Safari
	            if (self.pageYOffset) return self.pageYOffset;
	            // Internet Explorer 6 - standards mode
	            if (document.documentElement && document.documentElement.scrollTop)
	                return document.documentElement.scrollTop;
	            // Internet Explorer 6, 7 and 8
	            if (document.body.scrollTop) return document.body.scrollTop;
	            return 0;
	        }

	        function elmYPosition(eID) {
	            var elm = document.getElementById(eID);
	            //alert('elm '+ eID );
	            var y = elm.offsetTop;
	            var node = elm;
	            while (node.offsetParent && node.offsetParent != document.body) {
	                node = node.offsetParent;
	                y += node.offsetTop;
	            }
	            return y;
	        }

	    };

	});
