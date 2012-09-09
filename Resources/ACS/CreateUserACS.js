/**
 * @author fvi
 * 
 * created 2012 08 02
 */

exports.CreateUserACS = function(email,user_name,pw,pw_confilm){
		var result = false;
		var actInd = Titanium.UI.createActivityIndicator({
		bottom : 10,
		height : 100,
		width : 100,
		message : '登録中',
		font:{fontFamily:'Helvetica Neue', fontSize:15,fontWeight:'bold'}
		// style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
	});
	
	actInd.show();
	
	var Cloud = require('ti.cloud');
	 
    Cloud.Users.create({
        email:email,
        first_name: '',
        last_name: '',
        username:user_name,
        password: pw,
        password_confirmation: pw_confilm
    }, function (e) {
        if (e.success) {
        	
        	actInd.hide();
        	
            var user = e.users[0];
            alert('Success:\\n' +
                'id: ' + user.id + '\\n' +
                'first name: ' + user.first_name + '\\n' +
                'last name: ' + user.last_name);
             
             
             result = true;
             
             Titanium.App.fireEvent('createdUser',{command:'createuserview'});
            
        } else {
            alert('Error:\\n' +
                ((e.error && e.message) || JSON.stringify(e)));
               actInd.hide();    
        }
    });
    
    
}
