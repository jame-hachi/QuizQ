/**
 * @author fvi@
 * created@ 2012 07 18
 *
 *
 */

//STUB ADD
exports.AddProject = function() {
	height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
	var win = Titanium.UI.createWindow({
		title : 'クイズを作る',
		backgroundImage : '/images/background/note.jpg',
		exitOnClose : false,
		fullscreen : false,
		orientationModes : [Titanium.UI.PORTRAIT]
	});

	var backImageView = Titanium.UI.createImageView({
		image : '/images/background/back_lightblue.png',
		width : width,
		height : height * 0.8,
		top : 0
	});
	win.add(backImageView);

	var textArea = Titanium.UI.createTextArea({
		hintText : '問題をここに入れてください',
		width : Titanium.UI.FILL,
		height : height * 0.15,
		top : 0
	});

	win.add(textArea);

	var type_label = Titanium.UI.createLabel({
		text : 'クイズ形式:',
		color : 'black',
		width : width * 0.5,
		height : height * 0.1,
		top : height * 0.15,
		left : width * 0.05
	});

	win.add(type_label);
	var type_picker = Ti.UI.createPicker({
		height : height * 0.1,
		width : width * 0.5,
		top : height * 0.15,
		left : width * 0.5
	});
	var type_data = [];
	type_data[0] = Ti.UI.createPickerRow({
		title : '3択問題',
		custom_item : '3'
	});
	type_data[1] = Ti.UI.createPickerRow({
		title : '単語問題',
		custom_item : '4'
	});
	type_data[2] = Ti.UI.createPickerRow({
		title : 'アンケート',
		custom_item : '5'
	});
	type_picker.add(type_data);

	type_picker.addEventListener('change', function(e) {
		alert('column::' + e.rowIndex);
		win.remove(answerView.view);
		answerView = null;
		
		
		if (e.rowIndex == 0){
			answerView = new require('/ui/common/AddField/Three_Choice_Field')();
			answerView.view.setBackgroundImage('/images/background/back_lightblue.png');
			win.add(answerView.view);
		}
		if (e.rowIndex == 1) {
			answerView = new require('/ui/common/AddField/Word_Field')();
			win.add(answerView.view);
		}
		if(e.rowIndex==0){
			answerView = new require('/ui/common/AddField/Three_Choice_Field')();
			answerView.view.setBackgroundImage('/images/background/back_lightblue.png');
			win.add(answerView.view);
		}
	})

	win.add(type_picker);

	var answerView = new require('/ui/common/AddField/Three_Choice_Field')();
	answerView.view.setBackgroundImage('/images/background/back_lightblue.png');

	win.add(answerView.view);

	var project_image = new require('/ui/common/imageFrame/MenuProjectFrame')();

	project_image.setTop(height * 0.6);
	project_image.setLeft(width * 0.5);

	win.add(project_image);

	var and_button = Titanium.UI.createButton({
		backgroundImage : '/images/button/And/button.png',
		backgroundSelectedImage : '/images/button/And/button_pressed.png',
		height : height * 0.2,
		width : height * 0.2,
		top : height * 0.6,
		left : width * 0.05

	});
	and_button.setTouchEnabled(false);
	and_button.setOpacity(0.7);
	
	win.add(and_button);

	var button = new require('/ui/common/button/button')('add');
	button.setTop(height * 0.8);

	button.addEventListener('click', function(e) {

		require('/ACS/UpLoadQuiz').UploadQuiz({ID:require('/util/random').getRandom(20),type:3,text:textArea.value,junel:['テスト','練習'],Answer:{s1:answerView.choice1.value,s2:answerView.choice2.value,s3:answerView.choice3.value,text:''+answerView.picker.custom_item},junelNum:9999,other:{}});
		
		win.close();
	})
	win.add(button);

	win.open();
}

