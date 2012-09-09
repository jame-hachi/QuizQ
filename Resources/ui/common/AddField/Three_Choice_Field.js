/**
 * @author fvi@
 * 
 * created @ 2012 08 16
 * 
 */
function ThreeChoiceView() {
	height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
	

	
	var view = Titanium.UI.createView({
		backgroundColor:'white',
		height:height *0.3,
		width:Titanium.UI.FILL,
		top:height*0.27
	});
	
	
	var answer_picker  = Ti.UI.createPicker({
		top:height*0.1,
		height:height*0.1,
		width: width *0.4,
		left:width *0.6,
		custom_item:1	//正解選択肢の選択
		});
	var answer_data = [];
		answer_data[0]=Ti.UI.createPickerRow({title:'1が正解',custom_item:1});
		answer_data[1]=Ti.UI.createPickerRow({title:'2が正解',custom_item:2});
		answer_data[2]=Ti.UI.createPickerRow({title:'3が正解',custom_item:3});
	answer_picker.add(answer_data);
	
	answer_picker.addEventListener('change',function(e)
	{
		answer_picker.custom_item = e.row.custom_item;
	});

	var textArea1 = Titanium.UI.createTextField({
		top:0,
		left:width*0.05,
		hintText:'選択肢１',
		width:width/2
	});
	var textArea2 = Titanium.UI.createTextField({
		top:height*0.1,
		left:width*0.05,
		hintText:'選択肢2',
		width:width/2
	});
	var textArea3 = Titanium.UI.createTextField({
		top:height*0.2,
		left:width*0.05,
		hintText:'選択肢3',
		width:width/2
	});
	
	
	view.add(answer_picker);
	view.add(textArea1);
	view.add(textArea2);
	view.add(textArea3);
		
	return {view:view,choice1:textArea1,choice2:textArea2,choice3:textArea3,picker:answer_picker};
	
	
	
	
	
	
}
module.exports = ThreeChoiceView;
