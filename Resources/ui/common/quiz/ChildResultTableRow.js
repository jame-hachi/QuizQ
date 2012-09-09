/*
 * created by fvi@ 
 * 
 * created @ 2012 08 17
 * 
 */

function TableRow(rowNum,download){
	
	height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
	
	var row = Titanium.UI.createTableViewRow({
		height:height * 0.2
	});
	
	var row_height = row.getHeight();
	
	var label = Titanium.UI.createLabel({
		text  : '面白いねを押してお気に入りで\n解説、豆知識を見てみよう！',
		color : 'black',
		textAlign:'center',
		top : row_height *0.05,
	});
	
	row.add(label);
	
	var good_button = Titanium.UI.createButton({
		backgroundImage:'/images/button/good/button.png',
		backgroundSelectedImage:'/images/button/good/button_pressed.png',
		backgroundDisabledImage:'/images/button/good/good_added.png',
		
		height:row_height*0.4,
		width:row_height* 1.2 ,//'auto　だとうまくいかなかったか　画像サイズに合わせてこうした。
		
		top:row_height *0.55
	});
	
	good_button.addEventListener('click',function(e){
		good_button.setEnabled(false);
		//alert('受け取りました::'+ download.text);
		
		Titanium.App.fireEvent('addFavorite',{content:download});
		try{
		require('/DB/SQL').InsertRow(download.ID,download.text,'BOOKMARK');
		alert('STUB::'+require('/DB/SQL').getBookMark().getRowCount());
		}catch(err){
			alert('DBERR::'+err.message);
		}
		
	});
	
	
	row.add(good_button);
	
	
	return row;
}

module.exports = TableRow;