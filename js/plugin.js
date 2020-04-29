!function(s,f,d,g){var o="parallax",n={relativeInput:!1,clipRelativeInput:!1,calibrationThreshold:100,calibrationDelay:500,supportDelay:1e3,calibrateX:!1,calibrateY:!0,invertX:!0,invertY:!0,limitX:!1,limitY:!1,scalarX:10,scalarY:10,frictionX:.1,frictionY:.1,originX:.5,originY:.5};function a(t,i){this.element=t,this.$context=s(t).data("api",this),this.$layers=this.$context.find(".layer");var e={calibrateX:this.$context.data("calibrate-x")||null,calibrateY:this.$context.data("calibrate-y")||null,invertX:this.$context.data("invert-x")||null,invertY:this.$context.data("invert-y")||null,limitX:parseFloat(this.$context.data("limit-x"))||null,limitY:parseFloat(this.$context.data("limit-y"))||null,scalarX:parseFloat(this.$context.data("scalar-x"))||null,scalarY:parseFloat(this.$context.data("scalar-y"))||null,frictionX:parseFloat(this.$context.data("friction-x"))||null,frictionY:parseFloat(this.$context.data("friction-y"))||null,originX:parseFloat(this.$context.data("origin-x"))||null,originY:parseFloat(this.$context.data("origin-y"))||null};for(var r in e)null===e[r]&&delete e[r];s.extend(this,n,i,e),this.calibrationTimer=null,this.calibrationFlag=!0,this.enabled=!1,this.depths=[],this.raf=null,this.bounds=null,this.ex=0,this.ey=0,this.ew=0,this.eh=0,this.ecx=0,this.ecy=0,this.erx=0,this.ery=0,this.cx=0,this.cy=0,this.ix=0,this.iy=0,this.mx=0,this.my=0,this.vx=0,this.vy=0,this.onMouseMove=this.onMouseMove.bind(this),this.onDeviceOrientation=this.onDeviceOrientation.bind(this),this.onOrientationTimer=this.onOrientationTimer.bind(this),this.onCalibrationTimer=this.onCalibrationTimer.bind(this),this.onAnimationFrame=this.onAnimationFrame.bind(this),this.onWindowResize=this.onWindowResize.bind(this),this.initialise()}a.prototype.transformSupport=function(t){for(var i=d.createElement("div"),e=!1,r=null,o=!1,n=null,s=null,a=0,h=this.vendors.length;a<h;a++)if(s=null!==this.vendors[a]?(n=this.vendors[a][0]+"transform",this.vendors[a][1]+"Transform"):n="transform",i.style[s]!==g){e=!0;break}switch(t){case"2D":o=e;break;case"3D":if(e){var u=d.body||d.createElement("body"),l=d.documentElement,c=l.style.overflow,p=!1;d.body||(p=!0,l.style.overflow="hidden",l.appendChild(u),u.style.overflow="hidden",u.style.background=""),u.appendChild(i),i.style[s]="translate3d(1px,1px,1px)",o=(r=f.getComputedStyle(i).getPropertyValue(n))!==g&&0<r.length&&"none"!==r,l.style.overflow=c,u.removeChild(i),p&&(u.removeAttribute("style"),u.parentNode.removeChild(u))}}return o},a.prototype.ww=null,a.prototype.wh=null,a.prototype.wcx=null,a.prototype.wcy=null,a.prototype.wrx=null,a.prototype.wry=null,a.prototype.portrait=null,a.prototype.desktop=!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),a.prototype.vendors=[null,["-webkit-","webkit"],["-moz-","Moz"],["-o-","O"],["-ms-","ms"]],a.prototype.motionSupport=!!f.DeviceMotionEvent,a.prototype.orientationSupport=!!f.DeviceOrientationEvent,a.prototype.orientationStatus=0,a.prototype.transform2DSupport=a.prototype.transformSupport("2D"),a.prototype.transform3DSupport=a.prototype.transformSupport("3D"),a.prototype.propertyCache={},a.prototype.initialise=function(){"static"===this.$context.css("position")&&this.$context.css({position:"relative"}),this.accelerate(this.$context),this.updateLayers(),this.updateDimensions(),this.enable(),this.queueCalibration(this.calibrationDelay)},a.prototype.updateLayers=function(){this.$layers=this.$context.find(".layer"),this.depths=[],this.$layers.css({position:"absolute",display:"block",left:0,top:0}),this.$layers.first().css({position:"relative"}),this.accelerate(this.$layers),this.$layers.each(s.proxy(function(t,i){this.depths.push(s(i).data("depth")||0)},this))},a.prototype.updateDimensions=function(){this.ww=f.innerWidth,this.wh=f.innerHeight,this.wcx=this.ww*this.originX,this.wcy=this.wh*this.originY,this.wrx=Math.max(this.wcx,this.ww-this.wcx),this.wry=Math.max(this.wcy,this.wh-this.wcy)},a.prototype.updateBounds=function(){this.bounds=this.element.getBoundingClientRect(),this.ex=this.bounds.left,this.ey=this.bounds.top,this.ew=this.bounds.width,this.eh=this.bounds.height,this.ecx=this.ew*this.originX,this.ecy=this.eh*this.originY,this.erx=Math.max(this.ecx,this.ew-this.ecx),this.ery=Math.max(this.ecy,this.eh-this.ecy)},a.prototype.queueCalibration=function(t){clearTimeout(this.calibrationTimer),this.calibrationTimer=setTimeout(this.onCalibrationTimer,t)},a.prototype.enable=function(){this.enabled||(this.enabled=!0,this.orientationSupport?(this.portrait=null,f.addEventListener("deviceorientation",this.onDeviceOrientation),setTimeout(this.onOrientationTimer,this.supportDelay)):(this.cx=0,this.cy=0,this.portrait=!1,f.addEventListener("mousemove",this.onMouseMove)),f.addEventListener("resize",this.onWindowResize),this.raf=requestAnimationFrame(this.onAnimationFrame))},a.prototype.disable=function(){this.enabled&&(this.enabled=!1,this.orientationSupport?f.removeEventListener("deviceorientation",this.onDeviceOrientation):f.removeEventListener("mousemove",this.onMouseMove),f.removeEventListener("resize",this.onWindowResize),cancelAnimationFrame(this.raf))},a.prototype.calibrate=function(t,i){this.calibrateX=t===g?this.calibrateX:t,this.calibrateY=i===g?this.calibrateY:i},a.prototype.invert=function(t,i){this.invertX=t===g?this.invertX:t,this.invertY=i===g?this.invertY:i},a.prototype.friction=function(t,i){this.frictionX=t===g?this.frictionX:t,this.frictionY=i===g?this.frictionY:i},a.prototype.scalar=function(t,i){this.scalarX=t===g?this.scalarX:t,this.scalarY=i===g?this.scalarY:i},a.prototype.limit=function(t,i){this.limitX=t===g?this.limitX:t,this.limitY=i===g?this.limitY:i},a.prototype.origin=function(t,i){this.originX=t===g?this.originX:t,this.originY=i===g?this.originY:i},a.prototype.clamp=function(t,i,e){return t=Math.max(t,i),t=Math.min(t,e)},a.prototype.css=function(t,i,e){var r=this.propertyCache[i];if(!r)for(var o=0,n=this.vendors.length;o<n;o++)if(r=null!==this.vendors[o]?s.camelCase(this.vendors[o][1]+"-"+i):i,t.style[r]!==g){this.propertyCache[i]=r;break}t.style[r]=e},a.prototype.accelerate=function(t){for(var i=0,e=t.length;i<e;i++){var r=t[i];this.css(r,"transform","translate3d(0,0,0)"),this.css(r,"transform-style","preserve-3d"),this.css(r,"backface-visibility","hidden")}},a.prototype.setPosition=function(t,i,e){i+="px",e+="px",this.transform3DSupport?this.css(t,"transform","translate3d("+i+","+e+",0)"):this.transform2DSupport?this.css(t,"transform","translate("+i+","+e+")"):(t.style.left=i,t.style.top=e)},a.prototype.onOrientationTimer=function(t){this.orientationSupport&&0===this.orientationStatus&&(this.disable(),this.orientationSupport=!1,this.enable())},a.prototype.onCalibrationTimer=function(t){this.calibrationFlag=!0},a.prototype.onWindowResize=function(t){this.updateDimensions()},a.prototype.onAnimationFrame=function(){this.updateBounds();var t=this.ix-this.cx,i=this.iy-this.cy;(Math.abs(t)>this.calibrationThreshold||Math.abs(i)>this.calibrationThreshold)&&this.queueCalibration(0),this.portrait?(this.mx=this.calibrateX?i:this.iy,this.my=this.calibrateY?t:this.ix):(this.mx=this.calibrateX?t:this.ix,this.my=this.calibrateY?i:this.iy),this.mx*=this.ew*(this.scalarX/100),this.my*=this.eh*(this.scalarY/100),isNaN(parseFloat(this.limitX))||(this.mx=this.clamp(this.mx,-this.limitX,this.limitX)),isNaN(parseFloat(this.limitY))||(this.my=this.clamp(this.my,-this.limitY,this.limitY)),this.vx+=(this.mx-this.vx)*this.frictionX,this.vy+=(this.my-this.vy)*this.frictionY;for(var e=0,r=this.$layers.length;e<r;e++){var o=this.depths[e],n=this.$layers[e],s=this.vx*o*(this.invertX?-1:1),a=this.vy*o*(this.invertY?-1:1);this.setPosition(n,s,a)}this.raf=requestAnimationFrame(this.onAnimationFrame)},a.prototype.onDeviceOrientation=function(t){if(!this.desktop&&null!==t.beta&&null!==t.gamma){this.orientationStatus=1;var i=(t.beta||0)/30,e=(t.gamma||0)/30,r=f.innerHeight>f.innerWidth;this.portrait!==r&&(this.portrait=r,this.calibrationFlag=!0),this.calibrationFlag&&(this.calibrationFlag=!1,this.cx=i,this.cy=e),this.ix=i,this.iy=e}},a.prototype.onMouseMove=function(t){var i=t.clientX,e=t.clientY;!this.orientationSupport&&this.relativeInput?(this.clipRelativeInput&&(i=Math.max(i,this.ex),i=Math.min(i,this.ex+this.ew),e=Math.max(e,this.ey),e=Math.min(e,this.ey+this.eh)),this.ix=(i-this.ex-this.ecx)/this.erx,this.iy=(e-this.ey-this.ecy)/this.ery):(this.ix=(i-this.wcx)/this.wrx,this.iy=(e-this.wcy)/this.wry)};var h={enable:a.prototype.enable,disable:a.prototype.disable,updateLayers:a.prototype.updateLayers,calibrate:a.prototype.calibrate,friction:a.prototype.friction,invert:a.prototype.invert,scalar:a.prototype.scalar,limit:a.prototype.limit,origin:a.prototype.origin};s.fn[o]=function(e){var r=arguments;return this.each(function(){var t=s(this),i=t.data(o);i||(i=new a(this,e),t.data(o,i)),h[e]&&i[e].apply(i,Array.prototype.slice.call(r,1))})}}(window.jQuery||window.Zepto,window,document),function(){for(var n=0,t=["ms","moz","webkit","o"],i=0;i<t.length&&!window.requestAnimationFrame;++i)window.requestAnimationFrame=window[t[i]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[i]+"CancelAnimationFrame"]||window[t[i]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,i){var e=(new Date).getTime(),r=Math.max(0,16-(e-n)),o=window.setTimeout(function(){t(e+r)},r);return n=e+r,o}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}(),function(d){d.fn.qrcode=function(u){var e;function i(t){this.mode=e,this.data=t}function l(t,i){this.typeNumber=t,this.errorCorrectLevel=i,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function c(t,i){if(null==t.length)throw Error(t.length+"/"+i);for(var e=0;e<t.length&&0==t[e];)e++;this.num=Array(t.length-e+i);for(var r=0;r<t.length-e;r++)this.num[r]=t[r+e]}function p(t,i){this.totalCount=t,this.dataCount=i}function s(){this.buffer=[],this.length=0}i.prototype={getLength:function(){return this.data.length},write:function(t){for(var i=0;i<this.data.length;i++)t.put(this.data.charCodeAt(i),8)}},l.prototype={addData:function(t){this.dataList.push(new i(t)),this.dataCache=null},isDark:function(t,i){if(t<0||this.moduleCount<=t||i<0||this.moduleCount<=i)throw Error(t+","+i);return this.modules[t][i]},getModuleCount:function(){return this.moduleCount},make:function(){if(this.typeNumber<1){var t=1;for(t=1;t<40;t++){for(var i=p.getRSBlocks(t,this.errorCorrectLevel),e=new s,r=0,o=0;o<i.length;o++)r+=i[o].dataCount;for(o=0;o<this.dataList.length;o++)i=this.dataList[o],e.put(i.mode,4),e.put(i.getLength(),f.getLengthInBits(i.mode,t)),i.write(e);if(e.getLengthInBits()<=8*r)break}this.typeNumber=t}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,i){this.moduleCount=4*this.typeNumber+17,this.modules=Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++){this.modules[e]=Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++)this.modules[e][r]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,i),7<=this.typeNumber&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=l.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,i)},setupPositionProbePattern:function(t,i){for(var e=-1;e<=7;e++)if(!(t+e<=-1||this.moduleCount<=t+e))for(var r=-1;r<=7;r++)i+r<=-1||this.moduleCount<=i+r||(this.modules[t+e][i+r]=0<=e&&e<=6&&(0==r||6==r)||0<=r&&r<=6&&(0==e||6==e)||2<=e&&e<=4&&2<=r&&r<=4)},getBestMaskPattern:function(){for(var t=0,i=0,e=0;e<8;e++){this.makeImpl(!0,e);var r=f.getLostPoint(this);(0==e||r<t)&&(t=r,i=e)}return i},createMovieClip:function(t,i,e){for(t=t.createEmptyMovieClip(i,e),this.make(),i=0;i<this.modules.length;i++){e=+i;for(var r=0;r<this.modules[i].length;r++){var o=+r;this.modules[i][r]&&(t.beginFill(0,100),t.moveTo(o,e),t.lineTo(1+o,e),t.lineTo(1+o,e+1),t.lineTo(o,e+1),t.endFill())}}return t},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=0==t%2);for(t=8;t<this.moduleCount-8;t++)null==this.modules[6][t]&&(this.modules[6][t]=0==t%2)},setupPositionAdjustPattern:function(){for(var t=f.getPatternPosition(this.typeNumber),i=0;i<t.length;i++)for(var e=0;e<t.length;e++){var r=t[i],o=t[e];if(null==this.modules[r][o])for(var n=-2;n<=2;n++)for(var s=-2;s<=2;s++)this.modules[r+n][o+s]=-2==n||2==n||-2==s||2==s||0==n&&0==s}},setupTypeNumber:function(t){for(var i=f.getBCHTypeNumber(this.typeNumber),e=0;e<18;e++){var r=!t&&1==(i>>e&1);this.modules[Math.floor(e/3)][e%3+this.moduleCount-8-3]=r}for(e=0;e<18;e++)r=!t&&1==(i>>e&1),this.modules[e%3+this.moduleCount-8-3][Math.floor(e/3)]=r},setupTypeInfo:function(t,i){for(var e=f.getBCHTypeInfo(this.errorCorrectLevel<<3|i),r=0;r<15;r++){var o=!t&&1==(e>>r&1);r<6?this.modules[r][8]=o:r<8?this.modules[r+1][8]=o:this.modules[this.moduleCount-15+r][8]=o}for(r=0;r<15;r++)o=!t&&1==(e>>r&1),r<8?this.modules[8][this.moduleCount-r-1]=o:r<9?this.modules[8][15-r-1+1]=o:this.modules[8][15-r-1]=o;this.modules[this.moduleCount-8][8]=!t},mapData:function(t,i){for(var e=-1,r=this.moduleCount-1,o=7,n=0,s=this.moduleCount-1;0<s;s-=2)for(6==s&&s--;;){for(var a=0;a<2;a++)if(null==this.modules[r][s-a]){var h=!1;n<t.length&&(h=1==(t[n]>>>o&1)),f.getMask(i,r,s-a)&&(h=!h),this.modules[r][s-a]=h,-1==--o&&(n++,o=7)}if((r+=e)<0||this.moduleCount<=r){r-=e,e=-e;break}}}},l.PAD0=236,l.PAD1=17,l.createData=function(t,i,e){i=p.getRSBlocks(t,i);for(var r=new s,o=0;o<e.length;o++){var n=e[o];r.put(n.mode,4),r.put(n.getLength(),f.getLengthInBits(n.mode,t)),n.write(r)}for(o=t=0;o<i.length;o++)t+=i[o].dataCount;if(r.getLengthInBits()>8*t)throw Error("code length overflow. ("+r.getLengthInBits()+">"+8*t+")");for(r.getLengthInBits()+4<=8*t&&r.put(0,4);0!=r.getLengthInBits()%8;)r.putBit(!1);for(;!(r.getLengthInBits()>=8*t)&&(r.put(l.PAD0,8),!(r.getLengthInBits()>=8*t));)r.put(l.PAD1,8);return l.createBytes(r,i)},l.createBytes=function(t,i){for(var e=0,r=0,o=0,n=Array(i.length),s=Array(i.length),a=0;a<i.length;a++){var h=i[a].dataCount,u=i[a].totalCount-h;r=Math.max(r,h),o=Math.max(o,u);n[a]=Array(h);for(var l=0;l<n[a].length;l++)n[a][l]=255&t.buffer[l+e];for(e+=h,l=f.getErrorCorrectPolynomial(u),h=new c(n[a],l.getLength()-1).mod(l),s[a]=Array(l.getLength()-1),l=0;l<s[a].length;l++)u=l+h.getLength()-s[a].length,s[a][l]=0<=u?h.get(u):0}for(l=a=0;l<i.length;l++)a+=i[l].totalCount;for(e=Array(a),l=h=0;l<r;l++)for(a=0;a<i.length;a++)l<n[a].length&&(e[h++]=n[a][l]);for(l=0;l<o;l++)for(a=0;a<i.length;a++)l<s[a].length&&(e[h++]=s[a][l]);return e},e=4;for(var f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var i=t<<10;0<=f.getBCHDigit(i)-f.getBCHDigit(f.G15);)i^=f.G15<<f.getBCHDigit(i)-f.getBCHDigit(f.G15);return(t<<10|i)^f.G15_MASK},getBCHTypeNumber:function(t){for(var i=t<<12;0<=f.getBCHDigit(i)-f.getBCHDigit(f.G18);)i^=f.G18<<f.getBCHDigit(i)-f.getBCHDigit(f.G18);return t<<12|i},getBCHDigit:function(t){for(var i=0;0!=t;)i++,t>>>=1;return i},getPatternPosition:function(t){return f.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,i,e){switch(t){case 0:return 0==(i+e)%2;case 1:return 0==i%2;case 2:return 0==e%3;case 3:return 0==(i+e)%3;case 4:return 0==(Math.floor(i/2)+Math.floor(e/3))%2;case 5:return 0==i*e%2+i*e%3;case 6:return 0==(i*e%2+i*e%3)%2;case 7:return 0==(i*e%3+(i+e)%2)%2;default:throw Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var i=new c([1],0),e=0;e<t;e++)i=i.multiply(new c([1,o.gexp(e)],0));return i},getLengthInBits:function(t,i){if(1<=i&&i<10)switch(t){case 1:return 10;case 2:return 9;case e:case 8:return 8;default:throw Error("mode:"+t)}else if(i<27)switch(t){case 1:return 12;case 2:return 11;case e:return 16;case 8:return 10;default:throw Error("mode:"+t)}else{if(!(i<41))throw Error("type:"+i);switch(t){case 1:return 14;case 2:return 13;case e:return 16;case 8:return 12;default:throw Error("mode:"+t)}}},getLostPoint:function(t){for(var i=t.getModuleCount(),e=0,r=0;r<i;r++)for(var o=0;o<i;o++){for(var n=0,s=t.isDark(r,o),a=-1;a<=1;a++)if(!(r+a<0||i<=r+a))for(var h=-1;h<=1;h++)o+h<0||i<=o+h||0==a&&0==h||s==t.isDark(r+a,o+h)&&n++;5<n&&(e+=3+n-5)}for(r=0;r<i-1;r++)for(o=0;o<i-1;o++)n=0,t.isDark(r,o)&&n++,t.isDark(r+1,o)&&n++,t.isDark(r,o+1)&&n++,t.isDark(r+1,o+1)&&n++,0!=n&&4!=n||(e+=3);for(r=0;r<i;r++)for(o=0;o<i-6;o++)t.isDark(r,o)&&!t.isDark(r,o+1)&&t.isDark(r,o+2)&&t.isDark(r,o+3)&&t.isDark(r,o+4)&&!t.isDark(r,o+5)&&t.isDark(r,o+6)&&(e+=40);for(o=0;o<i;o++)for(r=0;r<i-6;r++)t.isDark(r,o)&&!t.isDark(r+1,o)&&t.isDark(r+2,o)&&t.isDark(r+3,o)&&t.isDark(r+4,o)&&!t.isDark(r+5,o)&&t.isDark(r+6,o)&&(e+=40);for(o=n=0;o<i;o++)for(r=0;r<i;r++)t.isDark(r,o)&&n++;return e+10*(t=Math.abs(100*n/i/i-50)/5)}},o={glog:function(t){if(t<1)throw Error("glog("+t+")");return o.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;256<=t;)t-=255;return o.EXP_TABLE[t]},EXP_TABLE:Array(256),LOG_TABLE:Array(256)},t=0;t<8;t++)o.EXP_TABLE[t]=1<<t;for(t=8;t<256;t++)o.EXP_TABLE[t]=o.EXP_TABLE[t-4]^o.EXP_TABLE[t-5]^o.EXP_TABLE[t-6]^o.EXP_TABLE[t-8];for(t=0;t<255;t++)o.LOG_TABLE[o.EXP_TABLE[t]]=t;return c.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var i=Array(this.getLength()+t.getLength()-1),e=0;e<this.getLength();e++)for(var r=0;r<t.getLength();r++)i[e+r]^=o.gexp(o.glog(this.get(e))+o.glog(t.get(r)));return new c(i,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var i=o.glog(this.get(0))-o.glog(t.get(0)),e=Array(this.getLength()),r=0;r<this.getLength();r++)e[r]=this.get(r);for(r=0;r<t.getLength();r++)e[r]^=o.gexp(o.glog(t.get(r))+i);return new c(e,0).mod(t)}},p.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],p.getRSBlocks=function(t,i){var e=p.getRsBlockTable(t,i);if(null==e)throw Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+i);for(var r=e.length/3,o=[],n=0;n<r;n++)for(var s=e[3*n+0],a=e[3*n+1],h=e[3*n+2],u=0;u<s;u++)o.push(new p(a,h));return o},p.getRsBlockTable=function(t,i){switch(i){case 1:return p.RS_BLOCK_TABLE[4*(t-1)+0];case 0:return p.RS_BLOCK_TABLE[4*(t-1)+1];case 3:return p.RS_BLOCK_TABLE[4*(t-1)+2];case 2:return p.RS_BLOCK_TABLE[4*(t-1)+3]}},s.prototype={get:function(t){return 1==(this.buffer[Math.floor(t/8)]>>>7-t%8&1)},put:function(t,i){for(var e=0;e<i;e++)this.putBit(1==(t>>>i-e-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var i=Math.floor(this.length/8);this.buffer.length<=i&&this.buffer.push(0),t&&(this.buffer[i]|=128>>>this.length%8),this.length++}},"string"==typeof u&&(u={text:u}),u=d.extend({},{render:"canvas",width:256,height:256,typeNumber:-1,correctLevel:2,background:"#ffffff",foreground:"#000000"},u),this.each(function(){var t;if("canvas"==u.render){(t=new l(u.typeNumber,u.correctLevel)).addData(u.text),t.make();var i=document.createElement("canvas");i.width=u.width,i.height=u.height;for(var e=i.getContext("2d"),r=u.width/t.getModuleCount(),o=u.height/t.getModuleCount(),n=0;n<t.getModuleCount();n++)for(var s=0;s<t.getModuleCount();s++){e.fillStyle=t.isDark(n,s)?u.foreground:u.background;var a=Math.ceil((s+1)*r)-Math.floor(s*r),h=Math.ceil((n+1)*r)-Math.floor(n*r);e.fillRect(Math.round(s*r),Math.round(n*o),a,h)}}else for((t=new l(u.typeNumber,u.correctLevel)).addData(u.text),t.make(),i=d("<table></table>").css("width",u.width+"px").css("height",u.height+"px").css("border","0px").css("border-collapse","collapse").css("background-color",u.background),e=u.width/t.getModuleCount(),r=u.height/t.getModuleCount(),o=0;o<t.getModuleCount();o++)for(n=d("<tr></tr>").css("height",r+"px").appendTo(i),s=0;s<t.getModuleCount();s++)d("<td></td>").css("width",e+"px").css("background-color",t.isDark(o,s)?u.foreground:u.background).appendTo(n);t=i,jQuery(t).appendTo(this)})}}(jQuery),function r(o,n,s){function a(e,t){if(!n[e]){if(!o[e]){var i="function"==typeof require&&require;if(!t&&i)return i(e,!0);if(h)return h(e,!0);throw(i=Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",i}i=n[e]={exports:{}},o[e][0].call(i.exports,function(t){var i=o[e][1][t];return a(i||t)},i,i.exports,r,o,n,s)}return n[e].exports}for(var h="function"==typeof require&&require,t=0;t<s.length;t++)a(s[t]);return a}({1:[function(t,i,e){if(!T)var T={map:function(t,e){var r={};return e?t.map(function(t,i){return r.index=i,e.call(r,t)}):t.slice()},naturalOrder:function(t,i){return t<i?-1:i<t?1:0},sum:function(t,r){var o={};return t.reduce(r?function(t,i,e){return o.index=e,t+r.call(o,i)}:function(t,i){return t+i},0)},max:function(t,i){return Math.max.apply(null,i?T.map(t,i):t)}};function M(t,i,e){return(t<<2*D)+(i<<D)+e}function x(t){function i(){e.sort(t),r=!0}var e=[],r=!1;return{push:function(t){e.push(t),r=!1},peek:function(t){return r||i(),void 0===t&&(t=e.length-1),e[t]},pop:function(){return r||i(),e.pop()},size:function(){return e.length},map:function(t){return e.map(t)},debug:function(){return r||i(),e}}}function L(t,i,e,r,o,n,s){this.r1=t,this.r2=i,this.g1=e,this.g2=r,this.b1=o,this.b2=n,this.histo=s}function _(){this.vboxes=new x(function(t,i){return T.naturalOrder(t.vbox.count()*t.vbox.volume(),i.vbox.count()*i.vbox.volume())})}function C(t,s){function i(t){var i,e,r,o,n=t+"1";for(t+="2",e=0,a=s[n];a<=s[t];a++)if(c[a]>l/2){for(r=s.copy(),o=s.copy(),i=(i=a-s[n])<=(e=s[t]-a)?Math.min(s[t]-1,~~(a+e/2)):Math.max(s[n],~~(a-1-i/2));!c[i];)i++;for(e=p[i];!e&&c[i-1];)e=p[--i];return r[t]=i,o[n]=r[t]+1,[r,o]}}if(s.count()){var e=s.r2-s.r1+1,r=s.g2-s.g1+1,o=T.max([e,r,s.b2-s.b1+1]);if(1==s.count())return[s.copy()];var a,n,h,u,l=0,c=[],p=[];if(o==e)for(a=s.r1;a<=s.r2;a++){for(u=0,n=s.g1;n<=s.g2;n++)for(h=s.b1;h<=s.b2;h++)u+=t[M(a,n,h)]||0;l+=u,c[a]=l}else if(o==r)for(a=s.g1;a<=s.g2;a++){for(u=0,n=s.r1;n<=s.r2;n++)for(h=s.b1;h<=s.b2;h++)u+=t[M(n,a,h)]||0;l+=u,c[a]=l}else for(a=s.b1;a<=s.b2;a++){for(u=0,n=s.r1;n<=s.r2;n++)for(h=s.g1;h<=s.g2;h++)u+=t[M(n,h,a)]||0;l+=u,c[a]=l}return c.forEach(function(t,i){p[i]=l-t}),i(o==e?"r":o==r?"g":"b")}}var D,E;E=8-(D=5),L.prototype={volume:function(t){return this._volume&&!t||(this._volume=(this.r2-this.r1+1)*(this.g2-this.g1+1)*(this.b2-this.b1+1)),this._volume},count:function(t){var i=this.histo;if(!this._count_set||t){var e,r,o;for(t=0,e=this.r1;e<=this.r2;e++)for(r=this.g1;r<=this.g2;r++)for(o=this.b1;o<=this.b2;o++)index=M(e,r,o),t+=i[index]||0;this._count=t,this._count_set=!0}return this._count},copy:function(){return new L(this.r1,this.r2,this.g1,this.g2,this.b1,this.b2,this.histo)},avg:function(t){var i=this.histo;if(!this._avg||t){var e,r,o,n,s=1<<8-D,a=t=0,h=0,u=0;for(r=this.r1;r<=this.r2;r++)for(o=this.g1;o<=this.g2;o++)for(n=this.b1;n<=this.b2;n++)t+=e=i[e=M(r,o,n)]||0,a+=e*(r+.5)*s,h+=e*(o+.5)*s,u+=e*(n+.5)*s;this._avg=t?[~~(a/t),~~(h/t),~~(u/t)]:[~~(s*(this.r1+this.r2+1)/2),~~(s*(this.g1+this.g2+1)/2),~~(s*(this.b1+this.b2+1)/2)]}return this._avg},contains:function(t){var i=t[0]>>E;return gval=t[1]>>E,bval=t[2]>>E,i>=this.r1&&i<=this.r2&&gval>=this.g1&&gval<=this.g2&&bval>=this.b1&&bval<=this.b2}},_.prototype={push:function(t){this.vboxes.push({vbox:t,color:t.avg()})},palette:function(){return this.vboxes.map(function(t){return t.color})},size:function(){return this.vboxes.size()},map:function(t){for(var i=this.vboxes,e=0;e<i.size();e++)if(i.peek(e).vbox.contains(t))return i.peek(e).color;return this.nearest(t)},nearest:function(t){for(var i,e,r,o=this.vboxes,n=0;n<o.size();n++)((e=Math.sqrt(Math.pow(t[0]-o.peek(n).color[0],2)+Math.pow(t[1]-o.peek(n).color[1],2)+Math.pow(t[2]-o.peek(n).color[2],2)))<i||void 0===i)&&(i=e,r=o.peek(n).color);return r},forcebw:function(){var t=this.vboxes;t.sort(function(t,i){return T.naturalOrder(T.sum(t.color),T.sum(i.color))}),(i=t[0].color)[0]<5&&i[1]<5&&i[2]<5&&(t[0].color=[0,0,0]);var i,e=t[i=t.length-1].color;251<e[0]&&251<e[1]&&251<e[2]&&(t[i].color=[255,255,255])}},t={quantize:function(t,i){function e(t,i){for(var e,r=1,o=0;o<1e3;)if((e=t.pop()).count()){var n=C(u,e);if(e=n[0],n=n[1],!e)break;if(t.push(e),n&&(t.push(n),r++),i<=r)break;if(1e3<o++)break}else t.push(e),o++}if(!t.length||i<2||256<i)return!1;var r,o,n,s,a,h,u=(r=t,h=Array(1<<3*D),r.forEach(function(t){n=t[0]>>E,s=t[1]>>E,a=t[2]>>E,o=M(n,s,a),h[o]=(h[o]||0)+1}),h);u.forEach(function(){});var l,c,p,f,d,g,m,v,y,b,w=(l=u,y=m=d=1e6,b=v=g=0,t.forEach(function(t){c=t[0]>>E,p=t[1]>>E,f=t[2]>>E,c<d?d=c:g<c&&(g=c),p<m?m=p:v<p&&(v=p),f<y?y=f:b<f&&(b=f)}),new L(d,g,m,v,y,b,l)),A=new x(function(t,i){return T.naturalOrder(t.count(),i.count())});for(A.push(w),e(A,.75*i),w=new x(function(t,i){return T.naturalOrder(t.count()*t.volume(),i.count()*i.volume())});A.size();)w.push(A.pop());for(e(w,i-w.size()),A=new _;w.size();)A.push(w.pop());return A}},i.exports=t.quantize},{}],2:[function(o,t,i){(function(){var f,d,t,n=[].slice;function i(t,i){this.rgb=t,this.population=i}function e(t,i,e){var r,o,n,s,a,h,u,l,c,p;for(this.swatches=(r=this.swatches,o=this,function(){return r.apply(o,arguments)}),void 0===i&&(i=64),void 0===e&&(e=5),c=(u=new f(t)).getImageData().data,l=u.getPixelCount(),t=[],h=0;h<l;)p=c[(n=4*h)+0],a=c[n+1],s=c[n+2],125<=(n=c[n+3])&&(250<p&&250<a&&250<s||t.push([p,a,s])),h+=e;this._swatches=this.quantize(t,i).vboxes.map(function(t){return new d(t.color,t.vbox.count())}),this.maxPopulation=this.findMaxPopulation,this.generateVarationColors(),this.generateEmptySwatches(),u.removeCanvas()}function r(t){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),document.body.appendChild(this.canvas),this.width=this.canvas.width=t.width,this.height=this.canvas.height=t.height,this.context.drawImage(t,0,0,this.width,this.height)}window.Swatch=(i.prototype.hsl=void 0,i.prototype.rgb=void 0,i.prototype.population=1,i.yiq=0,i.prototype.getHsl=function(){return this.hsl?this.hsl:this.hsl=t.rgbToHsl(this.rgb[0],this.rgb[1],this.rgb[2])},i.prototype.getPopulation=function(){return this.population},i.prototype.getRgb=function(){return this.rgb},i.prototype.getHex=function(){return"#"+(16777216+(this.rgb[0]<<16)+(this.rgb[1]<<8)+this.rgb[2]).toString(16).slice(1,7)},i.prototype.getTitleTextColor=function(){return this._ensureTextColors(),this.yiq<200?"#fff":"#000"},i.prototype.getBodyTextColor=function(){return this._ensureTextColors(),this.yiq<150?"#fff":"#000"},i.prototype._ensureTextColors=function(){if(!this.yiq)return this.yiq=(299*this.rgb[0]+587*this.rgb[1]+114*this.rgb[2])/1e3},d=i),window.Vibrant=(e.prototype.quantize=o("quantize"),e.prototype._swatches=[],e.prototype.TARGET_DARK_LUMA=.26,e.prototype.MAX_DARK_LUMA=.45,e.prototype.MIN_LIGHT_LUMA=.55,e.prototype.TARGET_LIGHT_LUMA=.74,e.prototype.MIN_NORMAL_LUMA=.3,e.prototype.TARGET_NORMAL_LUMA=.5,e.prototype.MAX_NORMAL_LUMA=.7,e.prototype.TARGET_MUTED_SATURATION=.3,e.prototype.MAX_MUTED_SATURATION=.4,e.prototype.TARGET_VIBRANT_SATURATION=1,e.prototype.MIN_VIBRANT_SATURATION=.35,e.prototype.WEIGHT_SATURATION=3,e.prototype.WEIGHT_LUMA=6,e.prototype.WEIGHT_POPULATION=1,e.prototype.VibrantSwatch=void 0,e.prototype.MutedSwatch=void 0,e.prototype.DarkVibrantSwatch=void 0,e.prototype.DarkMutedSwatch=void 0,e.prototype.LightVibrantSwatch=void 0,e.prototype.LightMutedSwatch=void 0,e.prototype.HighestPopulation=0,e.prototype.generateVarationColors=function(){return this.VibrantSwatch=this.findColorVariation(this.TARGET_NORMAL_LUMA,this.MIN_NORMAL_LUMA,this.MAX_NORMAL_LUMA,this.TARGET_VIBRANT_SATURATION,this.MIN_VIBRANT_SATURATION,1),this.LightVibrantSwatch=this.findColorVariation(this.TARGET_LIGHT_LUMA,this.MIN_LIGHT_LUMA,1,this.TARGET_VIBRANT_SATURATION,this.MIN_VIBRANT_SATURATION,1),this.DarkVibrantSwatch=this.findColorVariation(this.TARGET_DARK_LUMA,0,this.MAX_DARK_LUMA,this.TARGET_VIBRANT_SATURATION,this.MIN_VIBRANT_SATURATION,1),this.MutedSwatch=this.findColorVariation(this.TARGET_NORMAL_LUMA,this.MIN_NORMAL_LUMA,this.MAX_NORMAL_LUMA,this.TARGET_MUTED_SATURATION,0,this.MAX_MUTED_SATURATION),this.LightMutedSwatch=this.findColorVariation(this.TARGET_LIGHT_LUMA,this.MIN_LIGHT_LUMA,1,this.TARGET_MUTED_SATURATION,0,this.MAX_MUTED_SATURATION),this.DarkMutedSwatch=this.findColorVariation(this.TARGET_DARK_LUMA,0,this.MAX_DARK_LUMA,this.TARGET_MUTED_SATURATION,0,this.MAX_MUTED_SATURATION)},e.prototype.generateEmptySwatches=function(){var t;if(void 0===this.VibrantSwatch&&void 0!==this.DarkVibrantSwatch&&((t=this.DarkVibrantSwatch.getHsl())[2]=this.TARGET_NORMAL_LUMA,this.VibrantSwatch=new d(e.hslToRgb(t[0],t[1],t[2]),0)),void 0===this.DarkVibrantSwatch&&void 0!==this.VibrantSwatch)return(t=this.VibrantSwatch.getHsl())[2]=this.TARGET_DARK_LUMA,this.DarkVibrantSwatch=new d(e.hslToRgb(t[0],t[1],t[2]),0)},e.prototype.findMaxPopulation=function(){var t,i,e,r,o;for(t=e=0,i=(r=this._swatches).length;t<i;t++)o=r[t],e=Math.max(e,o.getPopulation());return e},e.prototype.findColorVariation=function(t,i,e,r,o,n){var s,a,h,u,l,c,p,f;for(u=void 0,s=l=0,a=(c=this._swatches).length;s<a;s++)p=(f=c[s]).getHsl()[1],h=f.getHsl()[2],o<=p&&p<=n&&i<=h&&h<=e&&!this.isAlreadySelected(f)&&(h=this.createComparisonValue(p,r,h,t,f.getPopulation(),this.HighestPopulation),void 0===u||l<h)&&(u=f,l=h);return u},e.prototype.createComparisonValue=function(t,i,e,r,o,n){return this.weightedMean(this.invertDiff(t,i),this.WEIGHT_SATURATION,this.invertDiff(e,r),this.WEIGHT_LUMA,o/n,this.WEIGHT_POPULATION)},e.prototype.invertDiff=function(t,i){return 1-Math.abs(t-i)},e.prototype.weightedMean=function(){var t,i,e,r,o;for(r=1<=arguments.length?n.call(arguments,0):[],t=e=i=0;t<r.length;)i+=r[t]*(o=r[t+1]),e+=o,t+=2;return i/e},e.prototype.swatches=function(){return{Vibrant:this.VibrantSwatch,Muted:this.MutedSwatch,DarkVibrant:this.DarkVibrantSwatch,DarkMuted:this.DarkMutedSwatch,LightVibrant:this.LightVibrantSwatch,LightMuted:this.LightMuted}},e.prototype.isAlreadySelected=function(t){return this.VibrantSwatch===t||this.DarkVibrantSwatch===t||this.LightVibrantSwatch===t||this.MutedSwatch===t||this.DarkMutedSwatch===t||this.LightMutedSwatch===t},e.rgbToHsl=function(t,i,e){var r,o,n,s,a;if(t/=255,i/=255,e/=255,o=void 0,n=((s=Math.max(t,i,e))+(a=Math.min(t,i,e)))/2,s===a)o=a=0;else{switch(r=s-a,a=.5<n?r/(2-s-a):r/(s+a),s){case t:o=(i-e)/r+(i<e?6:0);break;case i:o=(e-t)/r+2;break;case e:o=(t-i)/r+4}o/=6}return[o,a,n]},e.hslToRgb=function(t,i,e){var r,o,n;return r=o=n=void 0,r=function(t,i,e){return e<0&&(e+=1),1<e&&--e,e<1/6?t+6*(i-t)*e:e<.5?i:e<2/3?t+(i-t)*(2/3-e)*6:t},0===i?n=o=r=e:(n=r(e=2*e-(i=e<.5?e*(1+i):e+i-e*i),i,t+1/3),o=r(e,i,t),r=r(e,i,t-1/3)),[255*n,255*o,255*r]},t=e),window.CanvasImage=(r.prototype.clear=function(){return this.context.clearRect(0,0,this.width,this.height)},r.prototype.update=function(t){return this.context.putImageData(t,0,0)},r.prototype.getPixelCount=function(){return this.width*this.height},r.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)},r.prototype.removeCanvas=function(){return this.canvas.parentNode.removeChild(this.canvas)},f=r)}).call(this)},{quantize:1}]},{},[2]);