/*
 * created @ 2012 08 02
 * 
 * creator fvi@
 * 
 * 
 * 
 */

exports.LogoutACS = function() {
		var Cloud = require('ti.cloud');
	    Cloud.Users.logout(function (e) {
        if (e.success) {
            
        } else {
         //   alert('Error:\\n' +((e.error && e.message) || JSON.stringify(e)));
        }
    });
}
