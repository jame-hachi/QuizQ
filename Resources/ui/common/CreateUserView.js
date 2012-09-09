/**
 * @author fvi
 *
 * created @ 2012 08 16
 */

exports.CreateUserWin = function() {

	height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
	var win = Titanium.UI.createWindow({
		title : 'ようこそ　xicolo Quizへ',
		backgroundImage : '/images/background/note.jpg',
		exitOnClose : false,
		fullscreen : false,
		orientationModes : [Titanium.UI.PORTRAIT],
	});
	
	var scrollView = Titanium.UI.createScrollView({
		width:Titanium.UI.FILL,
		height:Titanium.UI.FILL,
		contentHeight:height*2,
		contentWidth:width,
		top:0,
		backgroundDisabledImage:'/images/background/note.jpg'
	});
	win.add(scrollView);

	var introLabel = Titanium.UI.createLabel({
		
		text : 'xicolo Quizへようこそ！\nまずはじめにメンバーの登録を行います。\n登録はあとからでも行えます。',
		textAlign : 'center',
		color:'black',
		top : height * 0.05
	});
		scrollView.add(introLabel);
		
		
	var mail = Titanium.UI.createTextField({
		hintText:'メールアドレス：example@abc.com',
		textAlign:'left',
		width:Titanium.UI.FILL,
		height:height *0.1,
		
		top:height * 0.2
	});
	
	scrollView.add(mail);
	
	var name = Titanium.UI.createTextField({
		hintText:'ユーザーID:(例) tom cat123',
		textAlign:'left',
		width:Titanium.UI.FILL,
		height:height *0.1,
		
		top:height * 0.3
	});
	
	scrollView.add(name);

	
	var pw = Titanium.UI.createTextField({
		hintText:'パスワード',
		textAlign:'left',
		width:Titanium.UI.FILL,
		height:height *0.1,
		
		top:height * 0.4
	});
	
	scrollView.add(pw);
	
		var pw2 = Titanium.UI.createTextField({
		hintText:'パスワード確認用',
		textAlign:'left',
		width:Titanium.UI.FILL,
		height:height *0.1,
		
		top:height * 0.5
	});
	
	scrollView.add(pw2);

	var later_button = new require('/ui/common/button/button')('later');
	later_button.setTop(height * 0.75);
	later_button.setWidth(width * 0.51);//アスペクト比は絶対！！
	later_button.setHeight(width * 0.17);
	later_button.setLeft(width *0.01);
	
	win.add(later_button);
	
	later_button.addEventListener('click',function(e){
		win.close();
	});
	
	

	var button = new require('/ui/common/button/button')('ok');
	
	button.setTop(height * 0.75);
	button.setWidth(width * 0.51);//アスペクト比は絶対！！
	button.setHeight(width * 0.17);
	button.setLeft(width * 0.50);
	
	win.add(button);

	button.addEventListener('click', function(e) {
		if(pw.value != pw2.value){
			alert('パスワードと確認用パスワードが異なります。');
			return;
		}
		
		if(!mail.value.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)){
			alert("正しいメールアドレスではありません。\nもう一度入力してください");
			return;
		}
		
		if(name.value == '')	{
			alert('ユーザー名を入力してください');
			return;
		}
		
		require('/ACS/LogoutACS').LogoutACS();
		
		require('/ACS/CreateUserACS').CreateUserACS(mail.value, name.value,pw.value, pw2.value);

			
	});
	
	Titanium.App.addEventListener('createdUser',function(e){
		Titanium.App.Properties.setString('user_name',name.value);
		
		
		if(e.command = 'createuserview')
			win.close();
	})

	win.open();

}

