
var app = angular.module("proofood", []);

app.controller('ProofoodCtrl', function($scope, $http) {
	var parseQueryString = function() {
		var str = window.location.search;
		var objURL = {};

		str.replace(/([^?=&]+)(=([^&]*))?/g, function($0, $1, $2, $3) {
			objURL[$1] = $3;
		});
		return objURL;
	};
	
	var query = parseQueryString();

	$scope.data = [];

	if (query.q) {
		$scope.q = decodeURI(query.q);
		_.each(query.q.split(','), function(item) {
			$scope.data.push({ val: decodeURI(item) });
		});
		//$scope.data.splice($scope.data.length-1);
		$scope.result = $scope.data.map(function(item) { return item.val; }).join(', ');
	}
	
	var searchKeyword = function(keyword) {
		$http.get('/xxx?q=' + keyword).then(function(resp) {

		}, function() {
			console.log('fail');
		});
	};

	$scope.testdata = [
		{
			serial_number: "1040130930",
			name: "豬肉",
			url: "",
			provider: "峰榮食品工業股份有限公司",
			date: "2015/01/30",
			info: "■實體通路：棉花田生機園地全國分店、頂好Wellcome超市全國分店"
		},
		{
			serial_number: "300195011710093",
			name: "豬肉",
			url: "",
			provider: "台灣農畜產工業股份有限公司",
			date: "2015/01/29",
			info: "■實體通路：台旭公司屏東工廠門市(屏東市建國路480號，08-7520525分機245)"
		},
		{
			serial_number: "1040129936",
			name: "豬肉",
			url: "",
			provider: "和榮意食品有限公司",
			date: "2015/01/29",
			info: "■實體通路：大潤發全國分店、聖德科斯全國分店、楓康超市全國分店"
		},
		{
			serial_number: "10401280531",
			name: "豬肉",
			url: "",
			provider: "台全珍豬工業股份有限公司",
			date: "2015/01/28",
			info: "■實體通路：新光三越百貨超市(天母店、A4、大有店)、Jasons Market(台北101、天母大葉高島屋、板橋遠百、新竹遠百)、板農活力超市(新北市板橋區府中路29號)、幸福美味美福內湖店(台北市內湖區民善街128號)、樂菲超市(台北市仁愛路四段418號1樓及B1)、太平洋鮮活超市(台北市大安區仁愛路四段151巷36號B1)、台北漁產超市、聖德科斯全國分店、自然法則(新竹市北大路111號)、地球人、樂活村、無毒的家、壹鼎百貨等有機店"
		}
	]

});