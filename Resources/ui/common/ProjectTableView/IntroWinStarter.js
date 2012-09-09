/*
 * created @ 2012 08 21
 * 
 * created by fvi@
 * 
 * 
 */



exports.QuizDownLoadStart = function(id) {
	var query = id


	var actInd = Titanium.UI.createActivityIndicator({
		bottom : 10,
		height : 100,
		width : 100,
		message : 'now Loading',
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : 15,
			fontWeight : 'bold'
		}
		// style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
	});

	actInd.show();

	var Cloud = require('ti.cloud');
	Cloud.Objects.query({
		classname : 'Quiz',
		where : {
			ID: query
		}
	}, function(e) {
		if (e.success) {
			if(e.Quiz.length == 0){
				alert('該当するクイズが見つかりません\n 削除された可能性があります');
				actInd.hide();
				return;
			}
			//download.quizs.Quiz[0].Answer.s2,
			require('/ui/common/ProjectTableView/IntroWin').createIntroduction(id,e.Quiz[0]);

			actInd.hide();

		} else {
			alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
			
			actInd.hide();
		}
	});

}