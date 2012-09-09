/**
 * @author fvi@
 * 
 * create at 2012 07 20
 */

exports.createMenuTab = function(number){
	
	height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
	
	// 1-3
	var image_path ="";
	
	switch(number){
		case 1:
			image_path = '/images/MenuTab/menu1_1.png';
			break;
		
		case 2:
			image_path = '/images/MenuTab/menu2_1.png';
			break;
		
		case 3:
			image_path = '/images/MenuTab/menu3_1.png';
			break;
		
		default:
			image_path = '/images/MenuTab/menu1_1.png';	
			break;
	}
	
	var tabImage = Titanium.UI.createView({
		backgroundImage:image_path,
		width:width,
		top:height * 0.85,
		height:'auto'
	});
	
	var tabButton1 = Titanium.UI.createButton({
		width:width/3,
		height:'auto',
		opacity:0.7,
		left:0
		
	});
	
	tabButton1.addEventListener('click',function(e){
		
		Titanium.App.fireEvent('changeView',{page_num:0});
	});
	tabImage.add(tabButton1);
	
		var tabButton2 = Titanium.UI.createButton({
		width:width/3,
		height:'auto',
		opacity:0.7,
		left:(width/3)
		
	});
	
	tabButton2.addEventListener('click',function(e){
		
		Titanium.App.fireEvent('changeView',{page_num:1});
	});
	tabImage.add(tabButton2);
	
	
		var tabButton3 = Titanium.UI.createButton({
		width:width/3,
		height:'auto',
		opacity:0.7,
		left:(width/3)*2
		
	});
	
	tabButton3.addEventListener('click',function(e){
		
		Titanium.App.fireEvent('changeView',{page_num:2});
	});
	tabImage.add(tabButton3);
	
	
	return {view:tabImage};
}
