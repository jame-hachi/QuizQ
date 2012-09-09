/**
 * @author fvi@
 *
 * created @ 2012 08 06
 *http://blog.livedoor.jp/jimuguri/archives/51347962.html
 * blog.xole.net/article.php?id=769
 */

exports.CreateQuizWin = function(download) {

	height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

	var quizNum = 1;
	var answer = "";
	var restTime = 100;

	//ユーザーの正解数、問題数に関する変数郡
	var result = [];
	//正解　=1 ,不正解  = -1 ,それ以外　0

	var win = Titanium.UI.createWindow({
		title : 'クイズ！：' + download.length + '問中' + quizNum + '問目',
		backgroundImage : '/images/background/note.jpg',
		exitOnClose : false,
		fullscreen : false,
		orientationModes : [Titanium.UI.PORTRAIT],
		quizNum : 1
	});

	var timerImage = Titanium.UI.createImageView({
		image : '/images/icon/time1.png',
		width : width * 0.1,
		height : 'auto',
		top : height * 0.02,
		left : width * 0.05,
	});

	win.add(timerImage);

	var timerLabel = Titanium.UI.createLabel({
		text : restTime,
		color : 'black',
		top : height * 0.02,
		left : width * 0.15
	});

	var interval = setInterval(function() {
		restTime--;
		timerLabel.setText(restTime);

		if (restTime <= 0) {
			//ForceFinishQuiz();
			ForceFinishQuiz();
			clearInterval(interval);
			
		}
	}, 1000);

	win.add(timerLabel);
	var text_label = Titanium.UI.createLabel({
		text : 'クイズ　第' + quizNum + '問\n' + download.quizs.Quiz[0].text,
		color : 'black',
		top : height * 0.1

	});
	win.add(text_label);

	var ans_view = Titanium.UI.createView({
		top : height * 0.4,
		height : height * 0.3,
		width : width * 0.9,
		backgroundColor : 'gray',
		layout : 'vartical'
	});

	win.add(ans_view);

	var switch1 = Ti.UI.createSwitch({
		style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		title : download.quizs.Quiz[0].Answer.s1,
		value : false,
		top : 0,
		width : width * 0.8,
		height : ans_view.height / 3// necessary for textAlign to be effective
	});

	switch1.addEventListener('change', function(e) {

		if (e.value == true) {
			answer += '1';
		} else {
			answer = answer.replace(/1/g, '');
		}
	});
	var switch2 = Ti.UI.createSwitch({
		style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		title : download.quizs.Quiz[0].Answer.s2,
		value : false,
		top : ans_view.height * 0.33,
		width : width * 0.8,
		height : ans_view.height / 3// necessary for textAlign to be effective
	});

	switch2.addEventListener('change', function(e) {
		if (e.value == true) {
			answer += '2';
		} else {

			answer = answer.replace(/2/g, '');
		}
	});
	var switch3 = Ti.UI.createSwitch({
		style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		title : download.quizs.Quiz[0].Answer.s3,
		value : false,
		top : ans_view.height * 0.66,
		width : width * 0.8,
		height : ans_view.height / 3 // necessary for textAlign to be effective
	});
	switch3.addEventListener('change', function(e) {
		if (e.value == true) {
			answer += '3';
		} else {

			answer = answer.replace(/3/g, '');
		}
	});
	ans_view.add(switch1);
	ans_view.add(switch2);
	ans_view.add(switch3);

	var button = new require('/ui/common/button/button')('ok');
	button.setTop(height * 0.75);
	win.add(button);

	function ForceFinishQuiz() {
		//時間切れなどの場合に強制的に終了させる
		
		while (download.length >= quizNum) {
			result.push(-1);
			quizNum++;
		}
		
		win.add(new require('/ui/common/ResultQuizView')(download, result, win));

	}

	function SetQuiz() {

		if (download.length < quizNum) {
			win.add(new require('/ui/common/ResultQuizView')(download, result, win));
			clearInterval(interval);
			//	clearTimeout(over_time);
			return;
		}

		win.setTitle('クイズ！：' + download.length + '問中' + quizNum + '問目');
		text_label.setText('クイズ　第' + quizNum + '問\n' + download.quizs.Quiz[quizNum - 1].text)
		switch1.setTitle(download.quizs.Quiz[quizNum - 1].Answer.s1);
		switch2.setTitle(download.quizs.Quiz[quizNum - 1].Answer.s2);
		switch3.setTitle(download.quizs.Quiz[quizNum - 1].Answer.s3);
		if (download.quizs.Quiz[quizNum - 1].type == 3) {
			switch1.setVisible(true);
			switch2.setVisible(true);
			switch3.setVisible(true);

			switch1.setValue(false);
			switch2.setValue(false);
			switch3.setValue(false);
		}
		if (download.quizs.Quiz[quizNum - 1].type == 4) {
			switch1.setVisible(false);
			switch2.setVisible(false);
			switch3.setVisible(false);

		}

	}


	button.addEventListener('click', function(e) {
		//アンケート形式の場合の処理
		if (download.quizs.Quiz[quizNum - 1].type == 4) {
			alert('アンケートありがとうございます');
			result.push(1);
			quizNum++;
			SetQuiz();
			return;

		}
		//問題に関する　正解、不正解の処理
		if (answer == download.quizs.Quiz[quizNum - 1].Answer.text) {
			//正解処理
			alert('正解です');
			result.push(1);
			answer = '';
			quizNum++;
			SetQuiz();

		} else {
			//不正解処理
			alert('不正解です　answer:' + answer);
			result.push(-1);
			answer = '';
			quizNum++;
			SetQuiz();

		}
	});

	win.open();

}
