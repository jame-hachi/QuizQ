/**
 * @author fvi@ created@ 20120627
 */


exports.getCounter = function(number){
	
	var result = [];
	
	var from = ''+number;
	for(cnt = 0;cnt < from.length;cnt++){
		
		result.push(from.charAt(cnt));
		
	}
	
	return result;
}
