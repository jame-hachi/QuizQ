/**
 * @author fvi@
 *
 * created@ 2012 08 09
 *
 *
 */

exports.QuizDownLoadStart = function(mode) {
	var query;

	if (mode.type == 'example')
		query = 9999;

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
			junelNum : query
		}
	}, function(e) {
		if (e.success) {

			//ランダム処理　なんとかアルゴリズム
			if (mode.shuffle) {
				var i = e.Quiz.length;
				while (i) {
					var j = Math.floor(Math.random() * i);
					var t = e.Quiz[--i];
					e.Quiz[i] = e.Quiz[j];
					e.Quiz[j] = t;
				}
			}

			require('/ui/common/quiz/QuizWin').CreateQuizWin({
				quizs : e,
				length : e.Quiz.length
			});

			actInd.hide();

		} else {
			alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
			
			actInd.hide();
		}
	});

}
