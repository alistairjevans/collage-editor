(this["webpackJsonpcollage-editor"]=this["webpackJsonpcollage-editor"]||[]).push([[0],{104:function(e,t,n){},126:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(14),i=n.n(o),c=(n(104),n(7)),u=n(12),l=n(20),s=n.n(l),d=n(27),f=n(3),m=n(2),g=n(72),b=n.n(g),h=n(22),p=n(58),v=n(74),x=n.n(v),O=Object(p.a)({board:{position:"fixed",left:0,top:0,height:"calc(100% - 56px)",width:"100%",touchAction:"none"},boardWatermark:{"&:before":{content:'""',backgroundImage:"url(".concat(x.a,")"),width:"100%",height:"100%",position:"absolute",filter:"contrast(0.5)"}},"@media (min-width: 600px)":{board:{height:"calc(100% - 64px)"}}});function y(){return(y=Object(d.a)(s.a.mark((function e(t,n,r){var a,o,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=n.parentElement,o=a.getBoundingClientRect(),i=r||new h.a.Box(o.left,o.top,o.right,o.bottom),60,i.xmin-=60,i.xmax+=60,i.ymin-=60,i.ymax+=60,t.pause(),t.resume(),t.showRectangle({left:i.xmin,right:i.xmax,top:i.ymin,bottom:i.ymax,height:i.ymax-i.ymin,width:i.xmax-i.xmin}),t.moveBy(0,0,!0);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var E=Object(r.forwardRef)((function(e,t){var n=e.motionActive,o=void 0===n||n,i=e.backgroundColor,c=void 0===i?"#ffffff":i,l=e.onTransformChanged,s=e.onBackgroundClicked,d=e.children,f=e.showWaterMark,g=Object(r.useRef)(null),h=Object(r.useRef)(null),p=Object(r.useRef)(null),v=Object(r.useState)(!1),x=Object(m.a)(v,2),E=x[0],w=x[1];Object(r.useImperativeHandle)(t,(function(){return{resetZoom:function(e){g.current&&p.current&&function(e,t,n){y.apply(this,arguments)}(g.current,p.current,e)}}}));var j=Object(r.useCallback)((function(e){p.current=e,g.current=b()(e,{onTouch:function(e){var t=g.current.getTransform();h.current=Object(u.a)({},t)},disableKeyboardInteraction:!0}),w(!0)}),[]);Object(r.useEffect)((function(){if(l&&E){var e=g.current;e.on("transform",(function(t){var n=e.getTransform();l(Object(u.a)({},n))}))}}),[E,l]),Object(r.useEffect)((function(){g.current&&(o?g.current.resume():g.current.pause())}),[o,g]);var k=O(),S=function(e){if(e.target===e.currentTarget){var t=h.current,n=g.current.getTransform();t&&n&&t.x===n.x&&t.y===n.y&&t.scale===n.scale&&(null===s||void 0===s||s())}},C={};return c&&(C.backgroundColor=c),a.a.createElement("div",{className:"".concat(k.board," ").concat(f?k.boardWatermark:""),style:C,onMouseDown:function(e){var t=g.current.getTransform();h.current=Object(u.a)({},t)},onMouseUp:S,onTouchEnd:S},a.a.createElement("div",{ref:j},d))})),w=n(75),j=n.n(w),k=[1,0,1,1,-1,0,-1,1,0,0,0,0,-1,0,-1,NaN],S=[0,-1,0,0,0,-1,0,0,1,-1,1,1,0,-1,0,NaN];function C(e){for(var t=0,n=0;;){if(e(t,n))return[t,n];0===t?(t=n+1,n=0):(t-=1,n+=1)}}function R(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=t||C(e),r=[],a=n[0],o=n[1],i=0,c=0,u=NaN,l=NaN,s=0;do{s=0,e(a-1,o-1)&&(s+=1),e(a,o-1)&&(s+=2),e(a-1,o)&&(s+=4),e(a,o)&&(s+=8),6===s?(i=-1===l?-1:1,c=0):9===s?(i=0,c=1===u?-1:1):(i=k[s],c=S[s]),i!==u&&c!==l&&(r.push({x:a,y:o}),u=i,l=c),a+=i,o+=c}while(n[0]!==a||n[1]!==o);return r}var I={},P=function(){var e=Object(d.a)(s.a.mark((function e(t,n){var r,a,o,i,c,u,l,d,f;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r=I[t])){e.next=3;break}return e.abrupt("return",r);case 3:return a=new Promise((function(e,n){var r=new Image;r.crossOrigin="anonymous",r.onload=function(t){e(r)},r.onerror=function(e){n("Could not load image from ".concat(t,"."))},r.src=t})),e.next=6,a;case 6:return o=e.sent,i=n.width=o.width,c=n.height=o.height,(u=n.getContext("2d")).clearRect(0,0,n.width,n.height),u.drawImage(o,0,0),l=u.getImageData(0,0,n.width,n.height).data,d=R((function(e,t){return l[4*(t*i+e)+3]>99})),f={width:i,height:c,boundingPoints:d,dataUrl:n.toDataURL()},s=f,I[t]=s,e.abrupt("return",f);case 18:case"end":return e.stop()}var s}),e)})));return function(t,n){return e.apply(this,arguments)}}(),U=function(e){var t=[];return e.boundingPoints.forEach((function(e){return t.push("".concat(e.x,"px ").concat(e.y,"px"))})),t.join(",")},N=function(e){var t=[];return e.boundingPoints.forEach((function(e){return t.push("".concat(e.x,",").concat(e.y))})),t.join(" ")},T=Object(p.a)({container:{display:"inline-block",position:"absolute",cursor:"pointer"},svgEntity:{left:0,top:0}}),B=a.a.memo((function(e){var t=e.url,n=e.canvas,o=e.initialX,i=void 0===o?0:o,c=e.initialY,l=void 0===c?0:c,f=e.rotate,g=void 0===f?0:f,b=e.glued,p=e.onInitialStateAvailable,v=e.onMovingStart,x=e.onMovingEnd,O=e.onMove,y=e.onMouseEnter,E=e.onMouseLeave,w=e.onSelect,k=e.dragScale,S=void 0===k?1:k,C=T(),R=Object(r.useState)({width:0,height:0,style:{}}),I=Object(m.a)(R,2),B=I[0],M=I[1],L=Object(r.useState)({width:0,height:0,href:""}),A=Object(m.a)(L,2),F=A[0],D=A[1],Y=Object(r.useState)(""),z=Object(m.a)(Y,2),X=z[0],W=z[1],Z=Object(r.useRef)(null),G=Object(r.useRef)({left:i,right:0,top:l,bottom:0}),H=Object(r.useRef)(new h.a.Polygon);Object(r.useEffect)((function(){(function(){var e=Object(d.a)(s.a.mark((function e(){var r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P(t,n);case 2:r=e.sent,a=U(r),M({width:r.width,height:r.height}),D({width:r.width,height:r.height,href:r.dataUrl}),W("polygon(".concat(a,")")),Z.current={url:t,imageSize:{width:r.width,height:r.height},rawPolygon:new h.a.Polygon(r.boundingPoints.map((function(e){return h.a.point(e.x,e.y)}))),borderPoints:N(r)},H.current=_(Z.current.rawPolygon,G.current,g),null===p||void 0===p||p(Object(u.a)(Object(u.a)({},Z.current),{},{inUse:!0,rotate:g,boundingRect:G.current,transformedPolygon:H.current}));case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[t,n,p]);var J=function(e,t){var n=Z.current.imageSize,r={left:i+e.x,top:l+e.y,right:i+e.x+n.width,bottom:l+e.y+n.height},a=H.current;return t&&(a=_(Z.current.rawPolygon,r,g)),Object(u.a)(Object(u.a)({},Z.current),{},{inUse:!0,rotate:g,boundingRect:r,transformedPolygon:a})},_=function(e,t,n){var r=n*Math.PI/180,a=e.box.center,o=(new h.a.Matrix).translate(t.left,t.top).translate(a.x,a.y).rotate(r).translate(-a.x,-a.y);return e.transform(o)},K=function(){null===y||void 0===y||y(Object(u.a)(Object(u.a)({},Z.current),{},{inUse:!0,rotate:g,boundingRect:G.current,transformedPolygon:H.current}))},q=function(){null===E||void 0===E||E(Object(u.a)(Object(u.a)({},Z.current),{},{inUse:!0,rotate:g,boundingRect:G.current,transformedPolygon:H.current}))};return a.a.createElement(j.a,{scale:S,positionOffset:{x:i,y:l},onStart:function(e,t){return function(e){if(b)return!1;null===v||void 0===v||v(J(e,!1))}(t)},onStop:function(e,t){return function(e){var t=J(e,!0);null===x||void 0===x||x(t),G.current=t.boundingRect,H.current=t.transformedPolygon}(t)},onDrag:function(e,t){return n=t,void(null===O||void 0===O||O(J(n,!1)));var n},onMouseDown:function(){null===w||void 0===w||w(Object(u.a)(Object(u.a)({},Z.current),{},{inUse:!0,rotate:g,boundingRect:G.current,transformedPolygon:H.current}))}},a.a.createElement("div",null,a.a.createElement("div",{style:{clipPath:X,transform:"rotate(".concat(g,"deg)")},className:C.container,onMouseEnter:function(){return K()},onMouseLeave:function(){return q()}},a.a.createElement("svg",Object.assign({className:C.svgEntity},B),a.a.createElement("image",F)))))})),M=n(84),L=n(146),A=n(162),F=function(){var e=Object(d.a)(s.a.mark((function e(t){var n,r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new URL("workshop.json",t).href,e.prev=1,e.next=4,fetch(n,{method:"GET",mode:"no-cors"});case 4:if(!(r=e.sent).ok){e.next=13;break}return e.next=8,r.json();case 8:if((a=e.sent)&&a.name&&a.images instanceof Array){e.next=11;break}throw new Error("Workshop data is not correctly formatted.");case 11:return a.images=a.images.map((function(e){return new URL(e,t).href})),e.abrupt("return",a);case 13:throw new Error("Could not load workshop. Response from server: ".concat(r.status," ").concat(r.statusText));case 16:throw e.prev=16,e.t0=e.catch(1),new Error("Could not load workshop; ".concat(e.t0));case 19:case"end":return e.stop()}}),e,null,[[1,16]])})));return function(t){return e.apply(this,arguments)}}(),D=Object(L.a)((function(e){var t=e.palette;return{selectionBorderSvg:{position:"absolute",pointerEvents:"none"},selectionBorderPolygon:{fill:"none",strokeWidth:"3px",strokeLinejoin:"round",stroke:function(e){return"primary"===e.color?t.primary.main:t.primary.light}}}})),Y=function(e){var t=e.img,n=e.color,r=D({img:t,color:n});return a.a.createElement("svg",{className:r.selectionBorderSvg,width:t.imageSize.width,height:t.imageSize.height,style:{left:t.boundingRect.left,top:t.boundingRect.top,transform:"rotate(".concat(t.rotate,"deg)")}},a.a.createElement("polygon",{className:r.selectionBorderPolygon,points:t.borderPoints}))},z=Object(L.a)((function(){return{selectionLayer:{position:"fixed",left:0,top:0,height:"100%",width:"100%",pointerEvents:"none"}}})),X=function(e){var t=e.hoverImage,n=e.selectedImage,r=z(),o=n?a.a.createElement(Y,{color:"primary",img:n}):null,i=t&&t.url!==(null===n||void 0===n?void 0:n.url)?a.a.createElement(Y,{color:"secondary",img:t}):null;return a.a.createElement("div",{className:r.selectionLayer},o,i)},W=n(86),Z=n(148),G=n(149),H=n(150),J=n(151),_=n(152),K=n(153),q=n(164),Q=n(154),V=n(165),$=n(163),ee=n(155),te=n(156),ne=n(157),re=n(158),ae=n(159),oe=n(160),ie=n(161),ce=n(76),ue=n.n(ce),le=n(77),se=n.n(le),de=n(82),fe=n.n(de),me=n(80),ge=n.n(me),be=n(63),he=n.n(be),pe=n(79),ve=n.n(pe),xe=n(78),Oe=n.n(xe),ye=n(81),Ee=n.n(ye),we=n(36),je=n(147),ke=Object(L.a)((function(e){var t=e.palette;return{bar:{top:"auto;",bottom:0,boxShadow:"0px -4px 5px 0px rgba(0, 0, 0, 0.21)",overflow:"hidden"},barSpreadButton:{marginRight:"12px"},barTitle:{paddingRight:"0px",marginLeft:"3px",paddingLeft:"3em",background:"url('/logo192.png')",backgroundSize:"contain",backgroundRepeat:"no-repeat"},barTitleLarge:{paddingRight:"10px",paddingLeft:"5em",background:"url('/logo192.png')",backgroundSize:"contain",backgroundRepeat:"no-repeat"},divider:{marginLeft:"10px"},buttonContainer:{marginLeft:"10px"},boxGrid:{height:"600px"},boxImage:{},grow:{flexGrow:1},swappableSection:{position:"relative",alignSelf:"stretch",alignItems:"center",display:"flex",flexGrow:1},swappableSet:{position:"absolute",left:0},imgBoundingBox:{backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center",height:"100%",width:"100%",boxSizing:"border-box",borderColor:"transparent",cursor:"pointer","&:active":{borderColor:t.primary.main},"&:focus":{borderColor:t.primary.main},"&:hover":{borderColor:t.primary.main}},imgTileBar:{background:"none",padding:"5px",boxSizing:"content-box"},imgActionUsePhoto:{background:"linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",color:"white"},boxDrawer:{width:"100%",height:"100%",left:0,top:0,padding:"10px",userSelect:"none"},colorPicker:{visibility:"hidden",width:"0px"}}})),Se=a.a.memo((function(e){var t,n=e.activeImage,o=e.workshopName,i=e.boardBackgroundColor,c=e.allImages,u=e.onZoomToFit,l=e.onUpOne,s=e.onDownOne,d=e.onRemoveImage,f=e.onUseImage,g=e.onBackgroundColorChange,b=e.onDeleteAll,h=e.onHeadingClicked,p=ke(),v=Object(r.useState)(!1),x=Object(m.a)(v,2),O=x[0],y=x[1],E=Object(r.useState)(!1),w=Object(m.a)(E,2),j=w[0],k=w[1],S=Object(we.a)(),C=Object(je.a)(S.breakpoints.up("sm")),R=Object(r.useRef)(null),I=function(e){return function(t){(!t||"keydown"!==t.type||"Tab"!==t.key&&"Shift"!==t.key)&&y(e)}},P=function(e){null===f||void 0===f||f(e),y(!1)},U=function(e){k(!1),e&&(null===b||void 0===b||b())};return t=o?C?a.a.createElement(a.a.Fragment,null,a.a.createElement(W.a,{variant:"h6"},o),a.a.createElement(W.a,{variant:"subtitle2"},"CollageIT")):a.a.createElement(W.a,{variant:"h6"},"\xa0"):a.a.createElement(W.a,{variant:"h6"},"CollageIT"),a.a.createElement(a.a.Fragment,null,a.a.createElement(Z.a,null),a.a.createElement(G.a,{className:p.bar,color:"primary",elevation:16,position:"fixed"},a.a.createElement(H.a,null,a.a.createElement("div",{className:C?p.barTitleLarge:p.barTitle,onClick:h},t),a.a.createElement(J.a,{className:p.divider,orientation:"vertical",flexItem:!0}),a.a.createElement("div",{className:p.swappableSection},a.a.createElement("div",{className:p.swappableSet},a.a.createElement(_.a,{direction:"up",in:null!==n,mountOnEnter:!0,unmountOnExit:!0},a.a.createElement("div",null,a.a.createElement(K.a,{className:p.barSpreadButton,edge:"end",color:"inherit",onClick:l,title:"Move Image Up"},a.a.createElement(ue.a,null)),a.a.createElement(K.a,{className:p.barSpreadButton,edge:"end",color:"inherit",onClick:s,title:"Move Image Down"},a.a.createElement(se.a,null)),a.a.createElement(K.a,{className:p.barSpreadButton,edge:"end",color:"inherit",onClick:d,title:"Remove Image"},a.a.createElement(Oe.a,null))))),a.a.createElement("div",{className:p.swappableSet},a.a.createElement(_.a,{direction:"down",in:null===n,mountOnEnter:!0,unmountOnExit:!0},a.a.createElement("div",null,a.a.createElement(K.a,{className:p.barSpreadButton,edge:"end",color:"inherit",onClick:I(!0),title:"Add New Image"},a.a.createElement(he.a,null)),a.a.createElement(K.a,{className:p.barSpreadButton,edge:"end",color:"inherit",onClick:function(){var e;null===(e=R.current)||void 0===e||e.click()},title:"Change Background Colour"},a.a.createElement(ve.a,null)),a.a.createElement("input",{className:p.colorPicker,type:"color",ref:R,value:null!==i&&void 0!==i?i:"#FFFFFF",onChange:function(e){return null===g||void 0===g?void 0:g(e.target.value)}}),a.a.createElement(K.a,{className:p.barSpreadButton,edge:"end",color:"inherit",onClick:u,title:"Zoom To Fit"},a.a.createElement(ge.a,null)),a.a.createElement(K.a,{className:p.barSpreadButton,edge:"end",color:"inherit",onClick:function(){return k(!0)},title:"Remove All Images"},a.a.createElement(Ee.a,null)))))))),a.a.createElement(q.a,{open:O,anchor:"bottom",onOpen:I(!0),onClose:I(!1)},a.a.createElement(G.a,{position:"static",color:"primary",onClick:I(!1)},a.a.createElement(H.a,null,a.a.createElement(W.a,{variant:"h4"},a.a.createElement(he.a,null)," Box"))),a.a.createElement("div",{className:p.boxDrawer},a.a.createElement(Q.a,{className:p.boxGrid,cellHeight:160,cols:C?6:2,spacing:10},c.filter((function(e){return!e.inUse})).map((function(e){return a.a.createElement(V.a,{key:e.url,cols:1},a.a.createElement($.a,{className:p.imgBoundingBox,style:{backgroundImage:"url(".concat(e.url,")")},border:2,onDoubleClick:function(){return P(e.url)}},a.a.createElement(ee.a,{titlePosition:"top",actionIcon:a.a.createElement(K.a,{"aria-label":"use image",className:p.imgActionUsePhoto,onClick:function(){return P(e.url)}},a.a.createElement(fe.a,null)),actionPosition:"right",className:p.imgTileBar})))}))))),a.a.createElement(te.a,{open:j,onClose:function(){return U(!1)}},a.a.createElement(ne.a,null,"Delete All Images?"),a.a.createElement(re.a,null,a.a.createElement(ae.a,null,"This will remove all your images from the collage and start again. Are you sure?")),a.a.createElement(oe.a,null,a.a.createElement(ie.a,{onClick:function(){return U(!1)},color:"primary",autoFocus:!0},"No, I'm still using them!"),a.a.createElement(ie.a,{onClick:function(){return U(!0)},color:"primary"},"Yep, I'm sure, remove my images."))))})),Ce=n(83),Re=n.n(Ce),Ie=Object(L.a)((function(e){e.palette;return{rotator:{position:"absolute",cursor:"grab",pointerEvents:"all",touchAction:"none",filter:"contrast(0.5)"}}})),Pe=function(e){var t=e.center,n=Ie();return a.a.createElement("svg",Object.assign({className:n.rotator,width:50,height:50,style:{left:t.x-25,top:t.y-25}},e),a.a.createElement(Re.a,null))},Ue=Object(L.a)((function(){return{overlayLayer:function(e){return{position:"fixed",left:0,top:0,height:"100%",width:"100%",pointerEvents:e.isRotateActive?"auto":"none",cursor:e.isRotateActive?"grabbing":"cursor",touchAction:"none"}}}})),Ne=function(e){var t,n,o,i,c,u=e.selectedImage,l=e.currentBoardTransform,s=e.onRotationChanged,d=e.onRotationEnded,f=Object(r.useState)(!1),g=Object(m.a)(f,2),b=g[0],p=g[1],v=Object(r.useRef)(0),x=Object(r.useRef)(0),O=Object(r.useState)(-1),y=Object(m.a)(O,2),E=y[0],w=y[1],j=Ue({isRotateActive:b});if(u){var k=new h.a.Box(u.boundingRect.left,u.boundingRect.top,u.boundingRect.right,u.boundingRect.bottom),S=h.a.point(u.boundingRect.left+u.imageSize.width/2,u.boundingRect.top-100),C=u.rotate*Math.PI/180,R=S.rotate(C,k.center),I=l.x+R.x*l.scale,P=l.y+R.y*l.scale,U={x:l.x+k.center.x*l.scale,y:l.y+k.center.y*l.scale},N=function(e,t){var n=Math.atan2(e-U.x,t-U.y);return Math.round(n*(180/Math.PI)*-1+100)};t=a.a.createElement(Pe,{center:{x:I,y:P},onMouseDown:function(e){v.current=N(e.pageX,e.pageY)-u.rotate,x.current=0,p(!0)},onTouchStart:function(e){-1===E&&(w(e.changedTouches[0].identifier),v.current=N(e.changedTouches[0].pageX,e.changedTouches[0].pageY)-u.rotate,x.current=0,p(!0))}}),b&&(n=function(e){var t=N(e.pageX,e.pageY)-v.current;x.current=t,s(u,t)},o=function(e){if(e.changedTouches[0].identifier===E){var t=e.changedTouches[0],n=N(t.pageX,t.pageY)-v.current;x.current=n,s(u,n),e.preventDefault()}},i=function(){d(u,x.current),p(!1)},c=function(e){e.changedTouches[0].identifier===E&&(d(u,x.current),p(!1),w(-1))})}return a.a.createElement("div",{className:j.overlayLayer,onMouseUp:i,onTouchEnd:c,onMouseLeave:i,onTouchMove:o,onMouseMove:n},t)},Te=Object(M.a)({palette:{primary:{main:"#FF66B2",light:"#FF007F"}}}),Be=Object(L.a)((function(e){return{computeCanvas:{visibility:"hidden",position:"fixed",left:-9999},selectionLayer:{position:"fixed",left:0,top:0,height:"100%",width:"100%",pointerEvents:"none"}}}));var Me=function(){var e="default";window.location.hash&&(e=window.location.hash.substring(1)||"default");var t=Be(),n=Object(r.useRef)(null),o=Object(r.useRef)(null),i=Object(r.useRef)(),l=Object(r.useState)(""),g=Object(m.a)(l,2),b=g[0],p=g[1],v=Object(r.useState)("#ffffff"),x=Object(m.a)(v,2),O=x[0],y=x[1],w=Object(r.useState)([]),j=Object(m.a)(w,2),k=j[0],S=j[1],C=Object(r.useState)([]),R=Object(m.a)(C,2),I=R[0],P=R[1],U=Object(r.useState)(new URL(e+"/",window.location.href).href),N=Object(m.a)(U,1)[0],T=Object(r.useState)(!0),M=Object(m.a)(T,2),L=M[0],D=M[1],Y=Object(r.useState)(null),z=Object(m.a)(Y,2),W=z[0],Z=z[1],G=Object(r.useState)(null),H=Object(m.a)(G,2),J=H[0],_=H[1],K=Object(r.useState)(null),q=Object(m.a)(K,2),Q=q[0],V=q[1],$=Object(r.useState)({x:0,y:0,scale:1}),ee=Object(m.a)($,2),te=ee[0],ne=ee[1],re=function(){var e,t,n,r=i.current,a=null,c=!0,u=Object(f.a)(r||[]);try{for(u.s();!(e=u.n()).done;){var l=e.value;if(null===l||void 0===l?void 0:l.inUse){var s=null===l||void 0===l?void 0:l.transformedPolygon.box;if(c)a=s,c=!1;else{var d=a.clone();s.xmin<d.xmin&&(d.xmin=s.xmin),s.ymin<d.ymin&&(d.ymin=s.ymin),s.xmax>d.xmax&&(d.xmax=s.xmax),s.ymax>d.ymax&&(d.ymax=s.ymax),a=d}}}}catch(m){u.e(m)}finally{u.f()}a?null===(t=o.current)||void 0===t||t.resetZoom(a):null===(n=o.current)||void 0===n||n.resetZoom()};Object(r.useEffect)((function(){var e=function(){return setTimeout(re,100)};return window.addEventListener("orientationchange",e),function(){return window.removeEventListener("orientationchange",e)}}),[]),Object(r.useEffect)((function(){return window.onhashchange=function(){window.location.reload()},function(){window.onhashchange=null}}),[]),Object(r.useEffect)((function(){(function(){var e=Object(d.a)(s.a.mark((function e(){var t,n,r,a,o,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,F(N);case 3:t=e.sent,p(t.name),n=localStorage.getItem("data_".concat(N)),r=t.images.map((function(e){return{url:e,inUse:!1,initialX:0,initialY:0,rotate:0}})),a=r,n&&(o=JSON.parse(n))&&(y(o.backgroundColor),c=o.images.map((function(e){return{inUse:e.inUse,url:e.url,initialX:e.x,initialY:e.y,rotate:e.rotate}})),a=[],r.forEach((function(e){var t=c.find((function(t){return t.url===e.url}));t?(a.push(t),e.inUse=t.inUse):a.push({url:e.url,inUse:!1,initialX:0,initialY:0,rotate:0})}))),S(r),P(a),i.current=a.map((function(e){return{url:e.url,inUse:e.inUse,rotate:e.rotate,borderPoints:"",rawPolygon:new h.a.Polygon,transformedPolygon:new h.a.Polygon,boundingRect:{left:e.initialX,top:e.initialY,right:0,bottom:0},imageSize:{width:0,height:0}}})),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),console.error(e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(){return e.apply(this,arguments)}})()()}),[N]);var ae=Object(r.useCallback)((function(){if(N&&i.current){var e={backgroundColor:O,images:i.current.map((function(e){return{url:e.url,inUse:e.inUse,x:e.boundingRect.left,y:e.boundingRect.top,rotate:e.rotate}}))};localStorage.setItem("data_".concat(N),JSON.stringify(e))}}),[O,N]);Object(r.useEffect)((function(){ae()}),[O,I,N,ae]);var oe=Object(r.useCallback)((function(e){var t,n=i.current;if(n){var r=n.findIndex((function(t){return t&&t.url===e.url})),a=!(null===(t=n[r])||void 0===t?void 0:t.borderPoints);n[r]=Object(u.a)(Object(u.a)({},e),{},{inUse:n[r].inUse}),a&&-1===n.findIndex((function(e){return(null===e||void 0===e?void 0:e.inUse)&&!e.borderPoints}))&&re()}}),[]),ie=function(e){Z(e)},ce=function(e){Z(null)},ue=function(e){V(e)},le=function(e){D(!0),V(null),W&&W.url===e.url&&Z(e),J&&J.url===e.url&&_(e),oe(e),ae()},se=function(e){_(e)},de=function(e,t){var n=h.a.BooleanOperations;if(e.transformedPolygon.box.not_intersect(t.transformedPolygon.box))return!1;if(e.transformedPolygon.intersect(t.transformedPolygon).length>0)return!0;var r=n.innerClip(e.transformedPolygon,t.transformedPolygon);return r[0].length>0||r[1].length>0},fe=function(e,t){var n=i.current;if(n){var r=n.findIndex((function(t){return(null===t||void 0===t?void 0:t.url)===e.url}));if(-1!==r){var a=n[r],o=t(r,a,n);if(o!==r){n.splice(r,1),o<r?o++:o--,n.splice(o,0,a);var u=Object(c.a)(I),l=u.splice(r,1);u.splice(o,0,l[0]),P(u)}}}},me=function(e,t,n){for(var r=e+1;r<n.length;r++){var a=n[r];if(a&&a.inUse&&de(a,t))return r+1}return e},ge=function(e,t,n){for(var r=e-1;r>=0;r--){var a=n[r];if(a&&a.inUse&&de(a,t))return r-1}return e},be=function(e,t){var n=k.findIndex((function(t){return t.url===e}));if(-1!==n&&k[n].inUse!==t){var r=Object(c.a)(k);r[n].inUse=t,S(r);var a=Object(c.a)(I),o=I.findIndex((function(t){return t.url===e}));if(-1!==o){var u=a[o];u.inUse=t,t&&(a.splice(o,1),a.push(u)),P(a);var l=i.current,s=l[o];s.inUse=t,t?(l.splice(o,1),l.push(s),re()):_(null)}else console.warn("Image in general list but not in ordered list.")}},he=Object(r.useCallback)((function(e){ne(e)}),[ne]);return a.a.createElement(A.a,{theme:Te},a.a.createElement("div",{className:"App"},a.a.createElement(E,{ref:o,showWaterMark:"default"===e.toLowerCase(),backgroundColor:O,motionActive:L,onTransformChanged:he,onBackgroundClicked:function(){return _(null)}},I.filter((function(e){return e.inUse})).map((function(e){return a.a.createElement(B,{canvas:n.current,url:e.url,key:e.url,glued:!1,initialX:e.initialX,initialY:e.initialY,rotate:e.rotate,dragScale:te.scale,onInitialStateAvailable:oe,onMovingStart:function(){return D(!1)},onMove:ue,onMouseEnter:ie,onMouseLeave:ce,onMovingEnd:le,onSelect:se})})),a.a.createElement(X,{hoverImage:W,selectedImage:null!==Q&&void 0!==Q?Q:J,key:"_selection"})),a.a.createElement(Ne,{selectedImage:null!==Q&&void 0!==Q?Q:J,currentBoardTransform:te,onRotationChanged:function(e,t){var n=Object(u.a)(Object(u.a)({},e),{},{rotate:t});oe(n),J&&J.url===n.url&&_(n);var r=Object(c.a)(I),a=r.findIndex((function(t){return t.url===e.url}));r[a].rotate=t,P(r)},onRotationEnded:function(e,t){var n=Object(u.a)(Object(u.a)({},e),{},{rotate:t});J&&J.url===n.url&&_(n),oe(n),ae()}}),a.a.createElement(Se,{activeImage:J,boardBackgroundColor:O,workshopName:b,allImages:k,onZoomToFit:function(){return re()},onUpOne:function(){return fe(J,me)},onDownOne:function(){return fe(J,ge)},onRemoveImage:function(){return be(J.url,!1)},onUseImage:function(e){return be(e,!0)},onBackgroundColorChange:function(e){return y(e)},onDeleteAll:function(){S(k.map((function(e){return Object(u.a)(Object(u.a)({},e),{},{inUse:!1})}))),P(I.map((function(e){return Object(u.a)(Object(u.a)({},e),{},{inUse:!1})}))),i.current.forEach((function(e){e&&(e.inUse=!1)}))},onHeadingClicked:function(){return _(null)}}),a.a.createElement("canvas",{ref:n,className:t.computeCanvas})))};i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(Me,null)),document.getElementById("root"))},74:function(e,t,n){e.exports=n.p+"static/media/watermark.ecd19ff4.png"},99:function(e,t,n){e.exports=n(126)}},[[99,1,2]]]);
//# sourceMappingURL=main.b0dd9148.chunk.js.map