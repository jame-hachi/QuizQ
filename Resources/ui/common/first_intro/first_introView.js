/**
 * @author fvi@
 * created @ 2012 07 17
 *
 */

function IntroView(keyword,image_path) {
	height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
	
	var fontSize = width /18;
	
	var kword = L(keyword);

	if (!kword)
		kword = keyword;
		


	var view = Titanium.UI.createView({
		backgroundImage : '/images/background/note.jpg'
	})

	var label = Titanium.UI.createLabel({
		text : kword,
		color : 'black',
		textAlign:'center',
		shadowOffset : {
			x : 10,
			y : 10
		},
		font : {
			fontSize : fontSize
		},
		top : height * 0.45
	});

	var image = Titanium.UI.createImageView({
		image : image_path,
		width : 'auto',
		height : height / 3,
		top : 10
	});

	var arrow = Titanium.UI.createView({
		backgroundImage : '/images/FirstIntro/slide.png',
		width : width,
		height : 'auto',
		top : height * 0.8
	});

	view.add(label);
	view.add(image);
	view.add(arrow);

	return view;
}

module.exports = IntroView;
