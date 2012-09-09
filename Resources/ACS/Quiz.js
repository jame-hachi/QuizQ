/**
 * @author fvi@
 *
 * created@ 2012 08 02
 *
 *
 */

exports.Query = function() {

	var Cloud = require('ti.cloud');
	Cloud.Objects.query({
		classname : 'Quiz',
		where : {
			junelNum : 9999
		}
	}, function(e) {
		if (e.success) {
			return {quizs:e,length:e.Quiz.length};
		} else {
			alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}
