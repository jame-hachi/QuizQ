/**
 * @author fvi
 *
 * created @ 2012 07 22
 *
 */

exports.getRandom = function(length) {
	var a = 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + '0123456789';
	a = a.split('');
	var s = '';
	for (var i = 0; i < length; i++) {
		s += a[Math.floor(Math.random() * a.length)];
	}
	return s;
}
