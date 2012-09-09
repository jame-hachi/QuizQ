/**
 * @author fvi
 * 
 * created@ 2012 08 16
 * 
 */

function ResultView(download,result_arr,fromwin){
	height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
	
	fromwin.setTitle('結果発表！');
	
	var collect   =0;
	var incollect =0;
	
	for(var cnt =0;cnt < result_arr.length;cnt++){
		if(result_arr[cnt] == 1)
			collect++;
		
		if(result_arr[cnt] ==-1)
			incollect++;
	}
	
	//今回　アンケート数も正解にするため incollectを除外した数で評価を行う。
	var point_child = require('/counter/counter').getCounter(result_arr.length - incollect);
	
	var point_mother = require('/counter/counter').getCounter(result_arr.length);
	
	

	
	
	var view = Titanium.UI.createView({
		backgroundImage:'/images/background/note.jpg',
		width:Titanium.UI.FILL,
		height:Titanium.UI.FILL,
		
	});
	
	var resultImage = Titanium.UI.createImageView({
		url:'/images/result/resultImage1.png',
		top:0,
		height:height * 0.1,
		width :'auto'
	});
	
	view.add(resultImage);
	//分子に関する処理
	for (var p_cnt = 0; p_cnt < point_child.length; p_cnt++) {

		var p_image = Titanium.UI.createImageView({
			width : width /6,
			height : height /10,
			url : '/images/number/' + point_child[p_cnt] + '.PNG',

			center : {
				x : width / 4+ p_cnt * width / 7,
				y : height *0.15
			}
		});

		view.add(p_image);
	}
	
	
	 var slash_image = Titanium.UI.createImageView({
	 	width:width/6,
	 	height:height/10,
	 	url:'/images/number/slash.PNG',
	 				center : {
				x : width /4+ (point_child.length ) * width / 7  ,
				y : height *0.15
			}
	 });
	 
	 view.add(slash_image);
	
		//分母に関する処理
	for (var p_cnt = 0; p_cnt < point_mother.length; p_cnt++) {

		var p_image = Titanium.UI.createImageView({
			width : width /6,
			height : height /10,
			url : '/images/number/' + point_mother[p_cnt] + '.PNG',

			center : {
				x : width / 4+ (p_cnt + point_child.length +2) * width / 7  ,
				y : height * 0.15
			}
		});

		view.add(p_image);
	}
	
	var result_tableView = Titanium.UI.createTableView({
		showVerticalScrollIndicator:true,
		top:height*0.25,
		width:Titanium.UI.FILL,
		height:height * 0.5,
		rowHeight:height *0.1
	});

	for(var cnt =0;cnt <result_arr.length;cnt++){
		var spl_row = require('/ui/common/ProjectTableRow').createRowObject('', download.quizs.Quiz[cnt].text, result_arr[cnt]);
		spl_row.row.originalNum = cnt;
		spl_row.row.ableChild = true;
		
		//回避処理
		result_tableView.appendRow(spl_row.row);
	}
	view.add(result_tableView);	
	
	
	result_tableView.addEventListener('click',function(e){
		if(e.row.getHasChild() && e.row.ableChild){
			e.row.ableChild = false;
			result_tableView.insertRowAfter(e.index,new require('/ui/common/quiz/ChildResultTableRow')(e.row.originalNum ,download.quizs.Quiz[e.row.originalNum]));
		}
	});
	
	
	
	var button = new require('/ui/common/button/button')('ok');
	button.setTop(height * 0.75);
	view.add(button);
	
	button.addEventListener('click',function(e){
		fromwin.close();
	});
	
	return view;
}


module.exports = ResultView;