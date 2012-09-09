/*
 * created @ 2012 08 18
 * 
 * created by fvi@
 * 
 */


exports.createIntroduction = function(quizID,download){
	height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

	var discribe_window = Titanium.UI.createWindow({
		title : 'タイトル: '+quizID,
		backgroundImage : '/images/note.jpg',
		exitOnClose : false,
		fullscreen : false
	});

	var rows =[];
	var tableView = Titanium.UI.createTableView({
		data : rows,
		width : Titanium.UI.FILL,
		height : height * 0.7,
		top : height * 0.05,
		showVerticalScrollIndicator:true

	});
	
	tableView.appendRow(Ti.UI.createTableViewRow({
		title:'クイズ文\n'+download.text,
		color:'black',
		height:height *0.2,
		width:Titanium.UI.FILL
	}));
	var quiz_type = '';
	
	switch(download.type){
		case 1:
			quiz_type = 'へぇ　豆知識問題';
			break;
		
		case 2:
			quiz_type = '２択問題';
			break;
		
		case 3:
			quiz_type = '３択問題';
			break;
		
		case 4:
			quiz_type ='アンケート形式問題';
			break;
		
		case 5:
			quiz_type = '単語形式問題';
			break;
			
		default :
			quiz_type ='まだ　指定されていません';
		
	}
	tableView.appendRow(Ti.UI.createTableViewRow({
		title:'クイズ形式\n'+quiz_type,
		color:'black',
		height:height *0.1,
		width:Titanium.UI.FILL
	}));
	
	tableView.appendRow(Ti.UI.createTableViewRow({
		title:'選択肢\n'+JSON.stringify(download.Answer),
		color:'black',
		height:height *0.2,
		width:Titanium.UI.FILL
	}));
	tableView.appendRow(Ti.UI.createTableViewRow({
		title:'正解\n'+download.Answer.text,
		color:'black',
		height:height *0.1,
		width:Titanium.UI.FILL
	}));
	
	var comment ='';
	 	comment = download.comment;
	 	
	 	
	if(!download.comment)
		comment = 'まだこのクイズには豆知識が追加されていないようです。\n豆知識は誰もが書き込めます。\n知っている豆知識を教えてください！'
		
		
	tableView.appendRow(Ti.UI.createTableViewRow({
		title:'豆知識\n'+comment,
		color:'black',
		height:height *0.3,
		width:Titanium.UI.FILL
	}));
	
	discribe_window.add(tableView);
	
	var share_button = new require('/ui/common/button/button')('share');

	share_button.setTop(height * 0.8);
	share_button.setWidth(width * 0.51);//アスペクト比は絶対！！
	share_button.setHeight(width * 0.17);
	share_button.setLeft(width *0.01);
	

	
	discribe_window.add(share_button);
	
	var ok_button = new require('/ui/common/button/button')('ok');

	ok_button.setTop(height * 0.8);
	ok_button.setWidth(width * 0.51);//アスペクト比は絶対！！
	ok_button.setHeight(width * 0.17);
	ok_button.setLeft(width * 0.50);
	discribe_window.add(ok_button);
	
	ok_button.addEventListener('click',function(e){
		discribe_window.close();
	});
	
	discribe_window.open();



}
