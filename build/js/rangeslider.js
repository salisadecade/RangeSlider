function extend(){for(var t=Array.prototype.shift.call(arguments),e=0;e<arguments.length;e++)for(var s in arguments[e])arguments[e].hasOwnProperty(s)&&(t[s]=arguments[e][s]);return t}function debounce(t,e,s){var r;return function(){var i=this,n=arguments,a=function(){r=null,s||t.apply(i,n)},o=s&&!r;clearTimeout(r),r=setTimeout(a,e),o&&t.apply(i,n)}}function getOffset(t){var e=document.body.getBoundingClientRect(),s=t.getBoundingClientRect(),r={left:s.left-e.left,max:s.left-e.left+t.clientWidth};return r}function RangeSlider(t,e){if(!t)return void console.log("No node to attach Slider to");var s={initialValue:500,onRangeChange:function(){}};e=extend(s,e),this.domNode=t,this.ranges=t.querySelectorAll(".range"),this.size=this.ranges.length,this.pointer=t.querySelector(".range-slider .pointer"),this.rangeProgress=t.querySelector(".range-slider .range-progress"),this.currentRange=e.initialValue,this.ptDrag={},this.width=t.clientWidth,this.isFocussed=!1,this.initDragObject();var r=this,i=100/this.size;this.movePointer(i,"%"),this.pointer.addEventListener("mousedown",function(e){e.preventDefault(),r.isFocussed=!0,(0===r.ptDrag.minOffset||0===r.ptDrag.maxOffset)&&(r.initDragObject(),r.width=t.clientWidth),r.ptDrag.maxOffset=getOffset(r.ranges[r.size-1]).max,r.ptDrag.start=this.style.left,this.classList.remove("transitionable"),r.rangeProgress.classList.remove("transitionable")}),window.addEventListener("mousemove",debounce(function(t){if(r.isFocussed===!0&&t.clientX>=r.ptDrag.minOffset&&t.clientX<=r.ptDrag.maxOffset){var e=(t.clientX-r.ptDrag.minOffset)/r.width*100;r.movePointer(e,"%");var s=getOffset(r.pointer);r.ptDrag.lastOffset=s.left,s.left<r.ptDrag.minOffset&&(r.ptDrag.lastOffset=r.ptDrag.minOffset),s.left>r.ptDrag.maxOffset&&(r.ptDrag.lastOffset=r.ptDrag.maxOffset)}}),350),window.addEventListener("mouseup",function(t){if(r.isFocussed===!0){r.isFocussed=!1;var e=Array.prototype.filter.call(r.ranges,function(t){var e=getOffset(t);return r.ptDrag.lastOffset>=e.left&&r.ptDrag.lastOffset<=e.max});e[0].click(),r.pointer.classList.add("transitionable"),r.rangeProgress.classList.add("transitionable")}}),window.addEventListener("resize",function(t){r.isFocussed=!1,r.initDragObject()}),Array.prototype.forEach.call(r.ranges,function(t,s,n){t.style.width=i+"%",t.addEventListener("click",function(){Array.prototype.forEach.call(r.ranges,function(t,e,s){t.classList.remove("highlighted")}),this.classList.add("highlighted"),r.range!==this.getAttribute("data-value")&&(r.movePointer((s+1)*i,"%"),r.currentRange=this.getAttribute("data-value"),e.onRangeChange())})})}RangeSlider.prototype.getRange=function(){return this.currentRange},RangeSlider.prototype.monitorProgress=function(t){t>60?t>=85?this.rangeProgress.classList.add("danger"):(this.rangeProgress.classList.remove("danger"),this.rangeProgress.classList.add("caution")):this.rangeProgress.classList.remove("caution","danger")},RangeSlider.prototype.movePointer=function(t,e){this.pointer.style.left=t-1+e,this.rangeProgress.style.width=t+e,this.monitorProgress(t)},RangeSlider.prototype.initDragObject=function(){this.width=this.domNode.clientWidth,this.ptDrag={minOffset:getOffset(this.ranges[0]).left,maxOffset:getOffset(this.ranges[this.size-1]).max,lastOffset:0,start:0}};