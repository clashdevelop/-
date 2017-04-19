var Balls = new Array();
// var dela  = ball();
// del.setId(123);
// Balls.push(new ball());
Balls.push(new ball());
Balls.push(new ball());
Balls.push(new ball());
removeFBalls(Balls,0);
function removeFBalls(array,index){
	if(index<=(array.length-1)){ 
		for(var i=index;i<array.length;i++){ 
			array[i]=array[i+1]; 
		} 
	}
	else{ 
		throw new Error('超出最大索引！'); 
	} 
	array.length=array.length-1; 
	return array; 
}
