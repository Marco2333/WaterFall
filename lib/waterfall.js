(function(window) {
	var Util,
		__bind = function(fn,context) { return function() { return fn.apply(context,arguments) }};

	Util = (function(){
		function Util() {}
		Util.prototype.extend = function(custom,defaults) {
			var key,value;
			for(key in custom) {
				if((value = custom[key]) != null) {
					defaults[key] = value;
				}
			}
			return defaults;
		}

		return Util;
	})();

	window.WaterFall = (function() {
		function WaterFall(options) {
			if(options == null) {
				options = {};
			}
			this.config = this.util().extend(options,this.defaults);
			this.start = __bind(this.start,this);
		}
		WaterFall.getMinHIndex = function(arr,val) {
			for (var i = 0; i < arr.length; i++) {
				if(arr[i] == val) {
					return i;
				}
			}
		}
		WaterFall.prototype.defaults = {
			container: "water-fall",
			boxClass: "box",
			colCount: 6
		};
		WaterFall.prototype.init = function() {
			var _ref;
			if((_ref = document.readyState) === "interactive" || _ref === "complete") {
				return this.start();
			} else {
				return document.addEventListener('DOMContentLoaded',this.start);
			}
		}
		WaterFall.prototype.start = function() {
			var i,len,rc,
				parent,boxes,boxWidth,
				minH,index,boxI,
				hArr = [];
				
			parent = this.parent =  document.getElementById(this.config.container);
			boxes = this.boxes = document.getElementsByClassName(this.config.boxClass);

			boxWidth = this.boxWidth = Math.floor(parent.clientWidth / this.config.colCount);

			console.log(boxWidth);
			parent.style.position = "relative";

			for(i = 0,len = this.boxes.length,rc = this.config.colCount; i < len; i++) {
				boxI = boxes[i];
				boxI.style.boxSizing = "border-box";
				boxI.style.width = boxWidth + 'px';
				if(i < rc) {
					hArr.push(boxI.offsetHeight);
					boxI.style.float = 'left';
				}
				else {
					minH = Math.min.apply(null,hArr);
					index = WaterFall.getMinHIndex(hArr,minH);
					boxI.style.position = 'absolute';
					boxI.style.top = minH + 'px';
					boxI.style.left = boxes[index].offsetLeft + 'px';
					hArr[index] += boxI.offsetHeight;
				}
			}
		}
		WaterFall.prototype.util = function() {
			return this._util || (this._util = new Util());
		}

		return WaterFall;
	})();

})(window);