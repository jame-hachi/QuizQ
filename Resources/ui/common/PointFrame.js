/**
 * @author fvi@
 *
 * 2012 06 27
 */

function PointFrame(point, size) {

	var width = null;
	var height = null;

	if (size) {
		if (size.width)
			width = size.width;
		if (size.height)
			height = size.height;
	}

	if (!width)
		width = Ti.Platform.displayCaps.platformWidth / 1.5;

	if (!height)
		height = Ti.Platform.displayCaps.platformHeight / 8;

	var view = Titanium.UI.createView({
		backgroundImage : '/images/number/Plate.PNG',
		width : width,
		height : height
	});

	var point_arry = require('/counter/counter').getCounter(point);

	for ( p_cnt = 0; p_cnt < point_arry.length; p_cnt++) {

		var p_image = Titanium.UI.createImageView({
			width : width /6,
			height : height /1.5,
			url : '/images/number/' + point_arry[p_cnt] + '.PNG',

			center : {
				x : width / 8+ p_cnt * width / 7,
				y : height/2
			}
		});

		view.add(p_image);
	}

	return view

}

module.exports = PointFrame; 