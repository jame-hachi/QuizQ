/**
 * @author fvi
 * 
 * created at 2012 07 20
 */


exports.getScrollPageforMenu = function(menu_page){
	
	var PAGE_LENGTH = 10;
	var page = menu_page;
	
	if(Titanium.App.Properties.getBool('isIntroNeed'))
		page += PAGE_LENGTH;
		
	return page;
}
