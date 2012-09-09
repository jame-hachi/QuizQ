/**
 * @author fvi@
 * 2012 07 18 created
 *
 *
 */

function Topview() {

	//load component dependencies
	height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

	var view = new require('ui/common/FirstView')();


	var user_name = '';
	if(Titanium.App.Properties.getString('user_name') == null){
		user_name = 'ゲスト'
	}else{
		user_name = Titanium.App.Properties.getString('user_name');
		
	}
	
	var userLabel = Titanium.UI.createLabel({
		text:'こんにちは　'+user_name+'さん',
		textAlign:'center',
		color:'black',
		top:0
	});
	
	Titanium.App.addEventListener('createdUser',function(e){
		userLabel.setText('こんにちは' +Titanium.App.Properties.getString('user_name')+'さん');
	});
	Titanium.App.addEventListener('ReLogin',function(e){
		userLabel.setText('こんにちは' +Titanium.App.Properties.getString('user_name')+'さん');
	});
	
	view.add(userLabel);
	
	var countView = new require('/ui/common/PointFrame')(Titanium.App.Properties.getInt('point'));
	countView.setTop(height * 0.1);

	view.add(countView);

	var back_cork = Titanium.UI.createImageView({
		image : '/images/background/back_lightblue.png',
		width : width,
		height : height * 0.55,
		top : height * 0.27
	});

	view.add(back_cork);
	var rows = [{
		title : '完全ランダム　15問',
		textAlign : 'center',
		color : 'black',
		height : height * 0.12
	}, {
		title : 'ジャンル指定　15問',
		textAlign : 'center',
		color : 'black',
		height : height * 0.12
	}, {
		title : 'マイジャンル！ 15問',
		textAlign : 'center',
		color : 'black',
		height : height * 0.12
	}, {
		title : '百問組み手！',
		textAlign : 'center',
		color : 'black',
		height : height * 0.12
	},
	{
		title : '恐怖！　１問５秒　タイムアタック',
		textAlign : 'center',
		color : 'black',
		height : height * 0.12
	},
	{
		title : '一発でドボン',
		textAlign : 'center',
		color : 'black',
		height : height * 0.12
	}];
	var textArea = Titanium.UI.createTableView({
		data : rows,
		width : width * 0.95,
		height : height * 0.5,
		top : height * 0.3,
		showVerticalScrollIndicator:true

	});

	textArea.addEventListener('click', function(e) {
		require('/Quiz/QuizStarter').QuizDownLoadStart({type:'example',shuffle:true});

	});

	view.add(textArea);

	var tabView = require('/ui/common/menuTab/MenuTab').createMenuTab(1);
	view.add(tabView.view);

	//画像が読み込まれたときに発動。　view は画面のフォーカスが完了するまでloadを行わないので代用する
	view.addEventListener('load', function(e) {
		Titanium.UI.createNotification({
			duration : 3000,
			message : "起動特典として　1Qが追加されました"
		}).show();
	});

	return view;
}

module.exports = Topview;
