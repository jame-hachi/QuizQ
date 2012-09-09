/**
 * @author fvi
 * 
 * created @ 2012 08 02
 */

exports.LoginACS = function(id,password){
	  // Loginのサンプル
	  	var actInd = Titanium.UI.createActivityIndicator({
		bottom : 10,
		height : 100,
		width : 100,
		message : 'ログイン中',
		font:{fontFamily:'Helvetica Neue', fontSize:15,fontWeight:'bold'}
		// style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
	});
	  
    var Cloud = require('ti.cloud');  
      
    Cloud.Users.login({
        login:    id,
        password: password
    }, function (e) {
        if (e.success) {
            var user = e.users[0];
            alert('Success:\\n' +
                'id: ' + user.id + '\\n' +
                'first name: ' + user.first_name + '\\n' +
                'last name: ' + user.last_name);
                
                Titanium.App.Properties.setString('user_name',user.username);
                
                Titanium.App.fireEvent('ReLogin');
                actInd.hide();
        } else {
            alert('Error:\n' +
                ((e.error && e.message) || JSON.stringify(e)));
                actInd.hide();
                
        }
        });
}
