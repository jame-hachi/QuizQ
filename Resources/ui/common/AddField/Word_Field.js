/**
 * @author fvi@
 * 
 * created @ 2012 08 16
 * 
 */
function ThreeChoiceView() {
	height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
	

	
	var view = Titanium.UI.createView({
		backgroundImage:'/images/background/back_lightblue.png',
		height:height *0.3,
		width:Titanium.UI.FILL,
		top:height*0.27
	});
	


	var textArea1 = Titanium.UI.createTextField({
		top:0,
		hintText:'正解の単語を入れてください\n(例：りんご　バナナ　ぶどう)',
		width:Titanium.UI.FILL
	});
	var textArea2 = Titanium.UI.createTextField({
		top:height*0.15,
		
		hintText:'一発不正解の単語を入れてください\n(例:ゴリラ　ラッパ　パセリ)',
		width:Titanium.UI.FILL
	});

	
	view.add(textArea1);
	view.add(textArea2);
		
	return {view:view,choice1:textArea1,choice2:textArea2};
	
	
	
	
	
	
}
module.exports = ThreeChoiceView;
