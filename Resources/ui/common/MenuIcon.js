/**
 * @author fvi
 * 
 * create 2012/04/21
 * 
 * 
 */
function MenuIcon(backImage,icon,text){
	var height = Ti.Platform.displayCaps.platformHeight ,width = Ti.Platform.displayCaps.platformWidth;
	
	//状況の改善　どのプラットフォームでも対応できるようにする
	
	var iconView = Titanium.UI.createView({
		title:text,
		height:height / 5,
		width:width * 1.2 ,
		text:text,
		backgroundImage:backImage
	});

	var iconImage = Titanium.UI.createImageView({
		title:text,
		url:icon,
		height:height / 15,
		width:width / 15,
		top:height/2
		
	});
	
	var font_size = 15;
	
	if(height > 1000 || width > 500)
		font_size = 30;
	var iconLabel = Titanium.UI.createLabel({
		title:text,
		text:text,
		color:'black',
		font:{fontColor:'black'},
		height:height / 5,
		width:width / 1.5,
		font:{fontSize:font_size},
		
		textAlign:'center',
		top:30,
		
	});
	
	iconView.add(iconLabel);
	iconView.add(iconImage);
	
	
	return iconView;
	
}

module.exports = MenuIcon;
