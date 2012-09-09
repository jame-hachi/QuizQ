//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundImage:'/images/note.jpg'
		
	});
	
	return self;
}

module.exports = FirstView;
