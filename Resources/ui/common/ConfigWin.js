/**
 * @author fvi
 * created at 2012 07 19
 */

exports.OpenConfigWin = function() {
	height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

	var win = Titanium.UI.createWindow({
		title : '設定',
		backgroundImage : '/images/background/note.jpg',
		exitOnClose : false,
		fullscreen : false,
		orientationModes : [Titanium.UI.PORTRAIT]
	});

	var icon = new require('/ui/common/MenuIcon')('/images/postit/green_post1.png', '/images/icon/dark_gears.png', "設定");
	icon.setWidth(width * 0.8);
	icon.setTop(height * 0.03);
	icon.setLeft(width * 0.05);

	win.add(icon);

	var introSW_label = Titanium.UI.createLabel({
		text : '起動時に説明画面をつける',
		color : 'black',
		top : height * 0.3,
		font : {
			fontSize : 25
		}
	});

	var introSW = Titanium.UI.createSwitch({
		value : Titanium.App.Properties.getBool('isIntroNeed'),
		top : height * 0.4
	});

	introSW.addEventListener('change', function(e) {
		// e.valueにはスイッチの新しい値が true もしくは falseとして設定されます。

		Titanium.App.Properties.setBool('isIntroNeed', e.value);

		Titanium.UI.createNotification({
			duration : 2000,
			message : "設定を変更しました\n次回起動時から反映されます"
		}).show();

	});
	//サンプルに対する処理
	var introSW_label2 = Titanium.UI.createLabel({
		text : 'サンプルの問題を表示する',
		color : 'black',
		top : height * 0.55,
		font : {
			fontSize : 25
		}
	});

	var introSW2 = Titanium.UI.createSwitch({
		value : Titanium.App.Properties.getBool('isSampleNeed'),
		top : height * 0.65
	});

	introSW2.addEventListener('change', function(e) {
		Titanium.App.Properties.setBool('isSampleNeed', e.value);
		
		Titanium.App.fireEvent('addSampleQuiz');
		

		Titanium.UI.createNotification({
			duration : 2000,
			message : "設定を変更しました"
		}).show();

	});

	win.add(introSW_label2);
	win.add(introSW2);

	var account_man = Titanium.UI.createButton({
		title : 'アカウント管理',
		textAlign : 'center',
		top : height * 0.8,
		width : width * 0.75
	});

	account_man.addEventListener('click', function(e) {
		var back_view = Titanium.UI.createView({
			backgroundColor : 'white',
			width : Titanium.UI.FILL,
			height : height * 0.1,
			opacity : 1.0,
			layout : 'vertical'

		})
		var input_text = Ti.UI.createTextField({
			hintText : 'ID',
			width : Titanium.UI.FILL,
			textAlign : 'center',
			opacity : 1.0,
			left : 0
		});
		var input_password = Ti.UI.createTextField({
			hintText : 'Password',
			width : Titanium.UI.FILL,
			textAlign : 'center',
			passwordMask : true,
			opacity : 1.0,
			left : back_view.width * 0.5
		});

		back_view.add(input_text);
		back_view.add(input_password);
		
		var user_name='ゲスト';
		
		if(Titanium.App.Properties.hasProperty('user_name'))
			user_name = Titanium.App.Properties.getString('user_name');
			
		var dialog = Ti.UI.createOptionDialog({
			title : 'account status\n ID:'+user_name,
			androidView : back_view,
			buttonNames : ['Cancel', 'Ok']
		});

		dialog.addEventListener('click', function(e) {
			if (e.index == 1) {// we read it only if get it is pressed
				require('/ACS/LogoutACS').LogoutACS();
				
				require('/ACS/LoginACS').LoginACS(input_text.value,input_password.value);
				
				
				
				
			}
		});

		dialog.show();
	});

	win.add(introSW_label);
	win.add(introSW);
	win.add(account_man);

	win.open();

}
