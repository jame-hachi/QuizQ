/*
 * Sample Tab for Apps 
 * created by fvi@
 * 
 * created 2012 07 20
 * 
 * 
 */


function MatomeView() {
	height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
	
	var view = new require('ui/common/FirstView')();
	
	var button = new require('/ui/common/button/button')('add');
	button.setTop(height * 0.7);
	
	button.addEventListener('click',function() {
		require('/ACS/LoginACS').LoginACS('admin','javasukidesuka');
	});
        
   
    
	view.add(button);
	
	
	var tabView = require('/ui/common/menuTab/MenuTab').createMenuTab(3);
	view.add(tabView.view);

	
	
	return view;
}

module.exports = MatomeView;