//Application Window Component Constructor
function ApplicationWindow() {
	//set properties
	var REMOVE_POINT_TIME = 6;//HOURS
	var INITIAL_POINT = 15;
	if (Titanium.App.Properties.getBool('isIntroNeed') == null)
		Titanium.App.Properties.setBool('isIntroNeed', true);

	if(Titanium.App.Properties.getDouble('lastTime') == null)
		Titanium.App.Properties.setDouble('lastTime',(new Date).getTime())
	
	
	if(Titanium.App.Properties.getInt('point')== null){
		Titanium.App.Properties.setInt('point',INITIAL_POINT);
		}else{
			//怠けポイントを換算する。
			var dlt_sec = (new Date).getTime() - Titanium.App.Properties.getDouble('lastTime');
			
			//初期値は６時間ごとに１ポイント減っていく
			var rmpoint = dlt_sec / (3000 * 60 * 60 * REMOVE_POINT_TIME); 
			if(rmpoint < 1)
				rmpoint = 0;
				
			var rst = Titanium.App.Properties.getInt('point') - rmpoint;
			
			
			if(rst <= 0)
				rst = 0;
			
			//起動特典　一回あたり　１ポイント
			rst++;
			
			Titanium.App.Properties.setInt('point',rst);
		}
		
	

	//load component dependencies
	height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
	var INTRODUCE_PAGES = 10;

	var FirstView = require('ui/common/FirstView');

	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor : '#ffffff',
		orientationModes : [Titanium.UI.PORTRAIT],
		exitOnClose:true,
		fullscreen:true
	});


	var introViews = [];
	if (Titanium.App.Properties.getBool('isIntroNeed')) {
		for (var cnt = 0; cnt < INTRODUCE_PAGES; cnt++) {
			var cnt_char = "" + (cnt + 1);
			var introView = new require('/ui/common/first_intro/first_introView')('intro_mes' + cnt_char,'/xicolo.png');
			introViews.push(introView)
		}
	}

	introViews.push(new require('/ui/common/TopView')());
	
	
	//新規プロジェクト追加画面の追加
//	introViews.push(new require('/ui/common/AddProject')());
	
	introViews.push(new require('/ui/common/ProjectListView')());
	
	introViews.push(new require('/ui/common/MatomeView')());
	

	// 上記のviewを配列としてviewsプロパティに引き渡します。
	var scrollView = Titanium.UI.createScrollableView({
		views : introViews,
		showPagingControl : true,
		pagingControlHeight : 30,
		pagingControlColor : 'black',
		maxZoomScale : 2.0
	});
	// スクロールビューを配置する
	self.add(scrollView);
	
	Titanium.App.addEventListener('changeView',function(e){
		//STUB
		scrollView.setCurrentPage(require('/ui/common/menuTab/ScrollPage').getScrollPageforMenu(e.page_num));
	})

	if (Titanium.Platform.osname == 'android') {

		//まずはじめにメニューを表示できるようにする

		self.activity.onCreateOptionsMenu = function(e) {
			var menu = e.menu;
			var menuItem = menu.add({
				title : "設定"
			});
			menuItem.setIcon("/images/icon/light_gears.png");
			menuItem.addEventListener("click", function(e) {
				require('/ui/common/ConfigWin').OpenConfigWin();
				//設定画面を展開する。
			});
		};

	}

	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
