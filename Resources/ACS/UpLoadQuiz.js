/**
 * @author fvi@
 *
 * created @ 2012 08/06
 *
 */

exports.UploadQuiz = function(quiz) {
	var actInd = Titanium.UI.createActivityIndicator({
		bottom : 10,
		height : 100,
		width : 100,
		message : 'now Loading',
		font:{fontFamily:'Helvetica Neue', fontSize:15,fontWeight:'bold'}
		// style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
	});

	actInd.show();

	var Cloud = require('ti.cloud');
	Cloud.Objects.create({
		classname : 'Quiz',
		fields : {
			ID : quiz.ID,
			type : quiz.type,
			text : quiz.text,
			junel : quiz.junel,
			Answer : quiz.Answer,
			junelNum : quiz.junelNum
		}
	}, function(e) {
		if (e.success) {
			//alert('success:\\n' + 'Count: ' + e.Quiz.length + '\n' + 'ID:' + e.Quiz[0].id);
			alert('クイズの追加か完了しました！　特典に１０Q追加されました');
			actInd.hide();
			
			Titanium.UI.createNotification({
			duration : 3000,
			message : "クイズを追加したので　10Qが追加されました"
		}).show();
		
		var rst = Titanium.App.Properties.getInt('point')

		if (rst <= 0)
			rst = 0;

		//起動特典　一回あたり　１ポイント
		rst += 10;

		Titanium.App.Properties.setInt('point', rst);

			
		} else {
			actInd.hide();
			alert('登録に失敗しました:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}
