/*
* @Author: Administrator
* @Date:   2016-11-01 14:28:04
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-01 14:34:10
* 
*/


;(function(w){
		function Cvs(cts,n){
			this.cts=cts;
			this.context=cts.getContext("2d");
			this.n=n;
			this.width=this.cts.width;
			this.height=this.cts.height;
		}
		Cvs.prototype={
			Circle:function(x,y,r,moveX,moveY){
				var circle=new Object();
					circle.x=x;
					circle.y=y;
					circle.r=r;
					circle.moveX=moveX;
					circle.moveY=moveY;
				return circle;	
			},
			circles:function(){
				var arr=[];
				for(var i=0;i<=this.n;i++){
					var newcircle=this.Circle(this.rand(this.width),this.rand(this.height),4,this.rand(40,-40)/40,this.rand(10,-10)/40);
					arr.push(newcircle);
				}
				return arr;
			},
			rand:function(max,min){
				min=min||0;
				return Math.floor(Math.random()*(max-min+1)+min);
			},
			drawLine:function (obj1,obj2){
				var X=Math.abs(obj1.x-obj2.x);
				var Y=Math.abs(obj1.y-obj2.y);
				if(X*X+Y*Y<=10000){
					this.context.beginPath();
					this.context.moveTo(obj1.x, obj1.y);
					this.context.lineTo(obj2.x, obj2.y);
					this.context.stroke();
				}	
			},
			drawCircle:function (arr){
				for(var j=0;j<arr.length;j++){
					this.context.beginPath();
					this.context.arc(arr[j].x, arr[j].y,arr[j].r,0,2*Math.PI);
					this.context.fill();
				}
			},
			draw:function(){
				var self=this;
				var arr=this.circles(this.n);
				this.context.lineWidth=1;
				this.context.strokeStyle='#aaa';
				this.context.fillStyle='#aaa';
				var timer=setInterval(function(){
					self.context.clearRect(0, 0, self.width, self.height);
					for(var k=0;k<arr.length;k++){
						arr[k].x+=arr[k].moveX;
						arr[k].y+=arr[k].moveY;
						if(arr[k].x>self.width){
							arr[k].x=0;
						}else if(arr[k].x<0){
							arr[k].x=self.width;
						}
						if(arr[k].y>self.height){
							arr[k].y=0;
						}else if(arr[k].y<0){
							arr[k].y=self.height;
						}
						for(var l=0;l<arr.length;l++){
							self.drawLine(arr[k],arr[l]);
						}
					}
					self.drawCircle(arr);	
				},30)
			}
		}
		w.Cvs=Cvs;
}(window));