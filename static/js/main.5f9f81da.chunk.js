(this["webpackJsonpcollage-editor"]=this["webpackJsonpcollage-editor"]||[]).push([[0],{101:function(e,t,n){},123:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(13),i=n.n(o),c=(n(101),n(6)),u=n(11),l=n(19),s=n.n(l),f=n(25),d=n(2),m=n(71),g=n.n(m),b=n(57),h=Object(b.a)({board:{position:"fixed",left:0,top:0,height:"100%",width:"100%"}}),p=function(e){return new Promise((function(t){return setTimeout(t,e)}))};function v(){return(v=Object(f.a)(s.a.mark((function e(t,n){var r,a,o,i,c,u,l,f,d,m,g,b,h,v,O;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=n.parentElement,a=r.getBoundingClientRect(),o=n.getBoundingClientRect(),i=t.getTransform(),c=o.width/i.scale,u=o.height/i.scale,l=(a.width-20)/c,f=(a.height-20)/u,d=l<f?l:f,Math.abs(d-i.scale)<.005&&(d=1),m=c*i.scale,g=u*i.scale,b=m>a.width?-m/2+a.width/2:a.width/2-m/2,h=g>a.height?-g/2+a.height/2:a.height/2-g/2,t.pause(),t.resume(),v=Math.abs(b-i.x),O=Math.abs(b-i.x),!(v>5||O>5)){e.next=24;break}return t.moveBy(b-i.x,h-i.y,!0),e.next=22,p(.25);case 22:e.next=25;break;case 24:t.moveBy(b-i.x,h-i.y,!1);case 25:t.smoothZoomAbs(i.x+c*i.scale/2,i.y+u*i.scale/2,d);case 26:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var O=Object(r.forwardRef)((function(e,t){var n=e.motionActive,o=void 0===n||n,i=e.backgroundColor,c=void 0===i?"#ffffff":i,l=e.onTransformChanged,s=e.onBackgroundClicked,f=e.children,m=Object(r.useRef)(null),b=Object(r.useRef)(null),p=Object(r.useRef)(null),O=Object(r.useState)(!1),E=Object(d.a)(O,2),j=E[0],y=E[1];Object(r.useImperativeHandle)(t,(function(){return{resetZoom:function(){m.current&&p.current&&function(e,t){v.apply(this,arguments)}(m.current,p.current)}}}));var w=Object(r.useCallback)((function(e){p.current=e,m.current=g()(e,{onTouch:function(e){var t=m.current.getTransform();b.current=Object(u.a)({},t)},disableKeyboardInteraction:!0}),y(!0)}),[]);Object(r.useEffect)((function(){if(l&&j){var e=m.current;e.on("transform",(function(t){var n=e.getTransform();l(Object(u.a)({},n))}))}}),[j,l]),Object(r.useEffect)((function(){m.current&&(o?m.current.resume():m.current.pause())}),[o,m]);var x=h(),k=function(e){if(e.target===e.currentTarget){var t=b.current,n=m.current.getTransform();t&&n&&t.x===n.x&&t.y===n.y&&t.scale===n.scale&&(null===s||void 0===s||s())}},S={};return c&&(S.backgroundColor=c),a.a.createElement("div",{className:x.board,style:S,onMouseDown:function(e){var t=m.current.getTransform();b.current=Object(u.a)({},t)},onMouseUp:k,onTouchEnd:k},a.a.createElement("div",{ref:w},f))})),E=n(73),j=n.n(E),y=[1,0,1,1,-1,0,-1,1,0,0,0,0,-1,0,-1,NaN],w=[0,-1,0,0,0,-1,0,0,1,-1,1,1,0,-1,0,NaN];function x(e){for(var t=0,n=0;;){if(e(t,n))return[t,n];0===t?(t=n+1,n=0):(t-=1,n+=1)}}function k(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=t||x(e),r=[],a=n[0],o=n[1],i=0,c=0,u=NaN,l=NaN,s=0;do{s=0,e(a-1,o-1)&&(s+=1),e(a,o-1)&&(s+=2),e(a-1,o)&&(s+=4),e(a,o)&&(s+=8),6===s?(i=-1===l?-1:1,c=0):9===s?(i=0,c=1===u?-1:1):(i=y[s],c=w[s]),i!==u&&c!==l&&(r.push({x:a,y:o}),u=i,l=c),a+=i,o+=c}while(n[0]!==a||n[1]!==o);return r}var S={},C=function(){var e=Object(f.a)(s.a.mark((function e(t,n){var r,a,o,i,c,u,l,f,d;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r=S[t])){e.next=3;break}return e.abrupt("return",r);case 3:return a=new Promise((function(e,n){var r=new Image;r.crossOrigin="anonymous",r.onload=function(t){e(r)},r.onerror=function(e){n("Could not load image from ".concat(t,"."))},r.src=t})),e.next=6,a;case 6:return o=e.sent,i=n.width=o.width,c=n.height=o.height,(u=n.getContext("2d")).clearRect(0,0,n.width,n.height),u.drawImage(o,0,0),l=u.getImageData(0,0,n.width,n.height).data,f=k((function(e,t){return l[4*(t*i+e)+3]>99})),d={width:i,height:c,boundingPoints:f,dataUrl:n.toDataURL()},s=d,S[t]=s,e.abrupt("return",d);case 18:case"end":return e.stop()}var s}),e)})));return function(t,n){return e.apply(this,arguments)}}(),R=function(e){var t=[];return e.boundingPoints.forEach((function(e){return t.push("".concat(e.x,"px ").concat(e.y,"px"))})),t.join(",")},I=function(e){var t=[];return e.boundingPoints.forEach((function(e){return t.push("".concat(e.x,",").concat(e.y))})),t.join(" ")},P=n(22),U=Object(b.a)({container:{display:"inline-block",position:"absolute",cursor:"pointer"},svgEntity:{left:0,top:0}}),N=a.a.memo((function(e){var t=e.url,n=e.canvas,o=e.initialX,i=void 0===o?0:o,c=e.initialY,l=void 0===c?0:c,m=e.rotate,g=void 0===m?0:m,b=e.glued,h=e.onInitialStateAvailable,p=e.onMovingStart,v=e.onMovingEnd,O=e.onMove,E=e.onMouseEnter,y=e.onMouseLeave,w=e.onSelect,x=e.dragScale,k=void 0===x?1:x,S=U(),N=Object(r.useState)({width:0,height:0,style:{}}),M=Object(d.a)(N,2),B=M[0],T=M[1],A=Object(r.useState)({width:0,height:0,href:""}),F=Object(d.a)(A,2),L=F[0],D=F[1],Y=Object(r.useState)(""),z=Object(d.a)(Y,2),X=z[0],G=z[1],Z=Object(r.useRef)(null),J=Object(r.useRef)({left:i,right:0,top:l,bottom:0}),_=Object(r.useRef)(new P.a.Polygon);Object(r.useEffect)((function(){(function(){var e=Object(f.a)(s.a.mark((function e(){var r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C(t,n);case 2:r=e.sent,a=R(r),T({width:r.width,height:r.height}),D({width:r.width,height:r.height,href:r.dataUrl}),G("polygon(".concat(a,")")),Z.current={url:t,imageSize:{width:r.width,height:r.height},rawPolygon:new P.a.Polygon(r.boundingPoints.map((function(e){return P.a.point(e.x,e.y)}))),borderPoints:I(r)},_.current=W(Z.current.rawPolygon,J.current,g),null===h||void 0===h||h(Object(u.a)(Object(u.a)({},Z.current),{},{inUse:!0,rotate:g,boundingRect:J.current,transformedPolygon:_.current}));case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[t,n,h]);var H=function(e,t){var n=Z.current.imageSize,r={left:i+e.x,top:l+e.y,right:i+e.x+n.width,bottom:l+e.y+n.height},a=_.current;return t&&(a=W(Z.current.rawPolygon,r,g)),Object(u.a)(Object(u.a)({},Z.current),{},{inUse:!0,rotate:g,boundingRect:r,transformedPolygon:a})},W=function(e,t,n){var r=n*Math.PI/180,a=e.box.center,o=(new P.a.Matrix).translate(t.left,t.top).translate(a.x,a.y).rotate(r).translate(-a.x,-a.y);return e.transform(o)},K=function(){null===E||void 0===E||E(Object(u.a)(Object(u.a)({},Z.current),{},{inUse:!0,rotate:g,boundingRect:J.current,transformedPolygon:_.current}))},q=function(){null===y||void 0===y||y(Object(u.a)(Object(u.a)({},Z.current),{},{inUse:!0,rotate:g,boundingRect:J.current,transformedPolygon:_.current}))};return a.a.createElement(j.a,{scale:k,positionOffset:{x:i,y:l},onStart:function(e,t){return function(e){if(b)return!1;null===p||void 0===p||p(H(e,!1))}(t)},onStop:function(e,t){return function(e){var t=H(e,!0);null===v||void 0===v||v(t),J.current=t.boundingRect,_.current=t.transformedPolygon}(t)},onDrag:function(e,t){return n=t,void(null===O||void 0===O||O(H(n,!1)));var n},onMouseDown:function(){null===w||void 0===w||w(Object(u.a)(Object(u.a)({},Z.current),{},{inUse:!0,rotate:g,boundingRect:J.current,transformedPolygon:_.current}))}},a.a.createElement("div",null,a.a.createElement("div",{style:{clipPath:X,transform:"rotate(".concat(g,"deg)")},className:S.container,onMouseEnter:function(){return K()},onMouseLeave:function(){return q()}},a.a.createElement("svg",Object.assign({className:S.svgEntity},B),a.a.createElement("image",L)))))})),M=n(81),B=n(143),T=n(159),A=function(){var e=Object(f.a)(s.a.mark((function e(t){var n,r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new URL("workshop.json",t).href,e.prev=1,e.next=4,fetch(n,{method:"GET",mode:"no-cors"});case 4:if(!(r=e.sent).ok){e.next=13;break}return e.next=8,r.json();case 8:if((a=e.sent)&&a.name&&a.images instanceof Array){e.next=11;break}throw new Error("Workshop data is not correctly formatted.");case 11:return a.images=a.images.map((function(e){return new URL(e,t).href})),e.abrupt("return",a);case 13:throw new Error("Could not load workshop. Response from server: ".concat(r.status," ").concat(r.statusText));case 16:throw e.prev=16,e.t0=e.catch(1),new Error("Could not load workshop; ".concat(e.t0));case 19:case"end":return e.stop()}}),e,null,[[1,16]])})));return function(t){return e.apply(this,arguments)}}(),F=Object(B.a)((function(e){var t=e.palette;return{selectionBorderSvg:{position:"absolute",pointerEvents:"none"},selectionBorderPolygon:{fill:"none",strokeWidth:"3px",strokeLinejoin:"round",stroke:function(e){return"primary"===e.color?t.primary.main:t.primary.light}}}})),L=function(e){var t=e.img,n=e.color,r=F({img:t,color:n});return a.a.createElement("svg",{className:r.selectionBorderSvg,width:t.imageSize.width,height:t.imageSize.height,style:{left:t.boundingRect.left,top:t.boundingRect.top,transform:"rotate(".concat(t.rotate,"deg)")}},a.a.createElement("polygon",{className:r.selectionBorderPolygon,points:t.borderPoints}))},D=Object(B.a)((function(){return{selectionLayer:{position:"fixed",left:0,top:0,height:"100%",width:"100%",pointerEvents:"none"}}})),Y=function(e){var t=e.hoverImage,n=e.selectedImage,r=D(),o=n?a.a.createElement(L,{color:"primary",img:n}):null,i=t&&t.url!==(null===n||void 0===n?void 0:n.url)?a.a.createElement(L,{color:"secondary",img:t}):null;return a.a.createElement("div",{className:r.selectionLayer},o,i)},z=n(83),X=n(145),G=n(146),Z=n(147),J=n(148),_=n(149),H=n(150),W=n(161),K=n(151),q=n(162),Q=n(160),V=n(152),$=n(153),ee=n(154),te=n(155),ne=n(156),re=n(157),ae=n(158),oe=n(74),ie=n.n(oe),ce=n(75),ue=n.n(ce),le=n(79),se=n.n(le),fe=n(62),de=n.n(fe),me=n(77),ge=n.n(me),be=n(76),he=n.n(be),pe=n(78),ve=n.n(pe),Oe=n(35),Ee=n(144),je=Object(B.a)((function(e){var t=e.palette;return{bar:{top:"auto;",bottom:0,boxShadow:"0px -4px 5px 0px rgba(0, 0, 0, 0.21)",overflow:"hidden"},barTitle:{paddingRight:"10px"},divider:{marginLeft:"10px"},buttonContainer:{marginLeft:"10px"},boxGrid:{height:"600px"},boxImage:{},grow:{flexGrow:1},swappableSection:{position:"relative",alignSelf:"stretch",alignItems:"center",display:"flex",flexGrow:1},swappableSet:{position:"absolute",left:0},imgBoundingBox:{backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center",height:"100%",width:"100%",boxSizing:"border-box",borderColor:"transparent",cursor:"pointer","&:active":{borderColor:t.primary.main},"&:focus":{borderColor:t.primary.main},"&:hover":{borderColor:t.primary.main}},imgTileBar:{background:"none",padding:"5px",boxSizing:"content-box"},imgActionUsePhoto:{background:"linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",color:"white"},boxDrawer:{width:"100%",height:"100%",left:0,top:0,padding:"10px",userSelect:"none"},colorPicker:{visibility:"hidden",width:"0px"}}})),ye=a.a.memo((function(e){var t,n=e.activeImage,o=e.workshopName,i=e.boardBackgroundColor,c=e.allImages,u=(e.onZoomToFit,e.onUpOne),l=e.onDownOne,s=e.onRemoveImage,f=e.onUseImage,m=e.onBackgroundColorChange,g=e.onDeleteAll,b=je(),h=Object(r.useState)(!1),p=Object(d.a)(h,2),v=p[0],O=p[1],E=Object(r.useState)(!1),j=Object(d.a)(E,2),y=j[0],w=j[1],x=Object(Oe.a)(),k=Object(Ee.a)(x.breakpoints.up("sm")),S=Object(r.useRef)(null),C=function(e){return function(t){(!t||"keydown"!==t.type||"Tab"!==t.key&&"Shift"!==t.key)&&O(e)}},R=function(e){null===f||void 0===f||f(e),O(!1)},I=function(e){w(!1),e&&(null===g||void 0===g||g())};return t=o?k?a.a.createElement(a.a.Fragment,null,a.a.createElement(z.a,{variant:"h6"},o),a.a.createElement(z.a,{variant:"subtitle2"},"CollageIT")):a.a.createElement(z.a,{variant:"subtitle2"},o):a.a.createElement(z.a,{variant:"h6"},"CollageIT"),a.a.createElement(a.a.Fragment,null,a.a.createElement(X.a,null),a.a.createElement(G.a,{className:b.bar,color:"primary",elevation:16,position:"fixed"},a.a.createElement(Z.a,null,a.a.createElement("div",{className:b.barTitle},t),a.a.createElement(J.a,{className:b.divider,orientation:"vertical",flexItem:!0}),a.a.createElement("div",{className:b.swappableSection},a.a.createElement("div",{className:b.swappableSet},a.a.createElement(_.a,{direction:"up",in:null!==n,mountOnEnter:!0,unmountOnExit:!0},a.a.createElement("div",null,a.a.createElement(H.a,{edge:"end",color:"inherit",onClick:u},a.a.createElement(ie.a,null)),a.a.createElement(H.a,{edge:"end",color:"inherit",onClick:l},a.a.createElement(ue.a,null)),a.a.createElement(H.a,{edge:"end",color:"inherit",onClick:s},a.a.createElement(he.a,null))))),a.a.createElement("div",{className:b.swappableSet},a.a.createElement(_.a,{direction:"down",in:null===n,mountOnEnter:!0,unmountOnExit:!0},a.a.createElement("div",null,a.a.createElement(H.a,{edge:"end",color:"inherit",onClick:C(!0)},a.a.createElement(de.a,null)),a.a.createElement(H.a,{edge:"end",color:"inherit",onClick:function(){var e;null===(e=S.current)||void 0===e||e.click()}},a.a.createElement(ge.a,null)),a.a.createElement("input",{className:b.colorPicker,type:"color",ref:S,value:null!==i&&void 0!==i?i:"#FFFFFF",onChange:function(e){return null===m||void 0===m?void 0:m(e.target.value)}}),a.a.createElement(H.a,{edge:"end",color:"inherit",onClick:function(){return w(!0)}},a.a.createElement(ve.a,null)))))))),a.a.createElement(W.a,{open:v,anchor:"bottom",onOpen:C(!0),onClose:C(!1)},a.a.createElement(G.a,{position:"static",color:"primary"},a.a.createElement(Z.a,null,a.a.createElement(z.a,{variant:"h4"},a.a.createElement(de.a,null)," Box"))),a.a.createElement("div",{className:b.boxDrawer},a.a.createElement(K.a,{className:b.boxGrid,cellHeight:160,cols:k?6:2,spacing:10},c.filter((function(e){return!e.inUse})).map((function(e){return a.a.createElement(q.a,{key:e.url,cols:1},a.a.createElement(Q.a,{className:b.imgBoundingBox,style:{backgroundImage:"url(".concat(e.url,")")},border:2,onDoubleClick:function(){return R(e.url)}},a.a.createElement(V.a,{titlePosition:"top",actionIcon:a.a.createElement(H.a,{"aria-label":"use image",className:b.imgActionUsePhoto,onClick:function(){return R(e.url)}},a.a.createElement(se.a,null)),actionPosition:"right",className:b.imgTileBar})))}))))),a.a.createElement($.a,{open:y,onClose:function(){return I(!1)}},a.a.createElement(ee.a,null,"Delete All Images?"),a.a.createElement(te.a,null,a.a.createElement(ne.a,null,"This will remove all your images from the collage and start again. Are you sure?")),a.a.createElement(re.a,null,a.a.createElement(ae.a,{onClick:function(){return I(!1)},color:"primary",autoFocus:!0},"No, I'm still using them!"),a.a.createElement(ae.a,{onClick:function(){return I(!0)},color:"primary"},"Yep, I'm sure, remove my images."))))})),we=n(80),xe=n.n(we),ke=Object(B.a)((function(e){e.palette;return{rotator:{position:"absolute",cursor:"grab",pointerEvents:"all"}}})),Se=function(e){var t=e.center,n=ke();return a.a.createElement("svg",Object.assign({className:n.rotator,width:50,height:50,style:{left:t.x-25,top:t.y-25}},e),a.a.createElement(xe.a,null))},Ce=Object(B.a)((function(){return{overlayLayer:function(e){return{position:"fixed",left:0,top:0,height:"100%",width:"100%",pointerEvents:e.isRotateActive?"auto":"none",cursor:e.isRotateActive?"grabbing":"cursor"}}}})),Re=function(e){var t,n,o,i=e.selectedImage,c=e.currentBoardTransform,u=e.onRotationChanged,l=e.onRotationEnded,s=Object(r.useState)(!1),f=Object(d.a)(s,2),m=f[0],g=f[1],b=Object(r.useRef)(0),h=Object(r.useRef)(0),p=Ce({isRotateActive:m});if(i){var v=new P.a.Box(i.boundingRect.left,i.boundingRect.top,i.boundingRect.right,i.boundingRect.bottom),O=P.a.point(i.boundingRect.left+i.imageSize.width/2,i.boundingRect.top-100),E=i.rotate*Math.PI/180,j=O.rotate(E,v.center),y=c.x+j.x*c.scale,w=c.y+j.y*c.scale,x={x:c.x+v.center.x*c.scale,y:c.y+v.center.y*c.scale},k=function(e,t){var n=Math.atan2(e-x.x,t-x.y);return Math.round(n*(180/Math.PI)*-1+100)};t=a.a.createElement(Se,{center:{x:y,y:w},onMouseDown:function(e){b.current=k(e.pageX,e.pageY)-i.rotate,h.current=0,g(!0)}}),m&&(n=function(e){var t=k(e.pageX,e.pageY)-b.current;h.current=t,u(i,t)},o=function(){l(i,h.current),g(!1)})}return a.a.createElement("div",{className:p.overlayLayer,onMouseUp:o,onMouseLeave:o,onMouseMove:n},t)},Ie=Object(M.a)({palette:{primary:{main:"#FF66B2",light:"#FF007F"}}}),Pe=Object(B.a)((function(e){return{computeCanvas:{visibility:"hidden",position:"fixed",left:-9999},selectionLayer:{position:"fixed",left:0,top:0,height:"100%",width:"100%",pointerEvents:"none"}}}));var Ue=function(){var e=Pe(),t=Object(r.useRef)(null),n=Object(r.useRef)(null),o=Object(r.useRef)(),i=Object(r.useState)(""),l=Object(d.a)(i,2),m=l[0],g=l[1],b=Object(r.useState)("#ffffff"),h=Object(d.a)(b,2),p=h[0],v=h[1],E=Object(r.useState)([]),j=Object(d.a)(E,2),y=j[0],w=j[1],x=Object(r.useState)([]),k=Object(d.a)(x,2),S=k[0],C=k[1],R=Object(r.useState)((function(){return new URL("/big-workshop/",window.location.href).href})),I=Object(d.a)(R,1)[0],U=Object(r.useState)(!0),M=Object(d.a)(U,2),B=M[0],F=M[1],L=Object(r.useState)(null),D=Object(d.a)(L,2),z=D[0],X=D[1],G=Object(r.useState)(null),Z=Object(d.a)(G,2),J=Z[0],_=Z[1],H=Object(r.useState)(null),W=Object(d.a)(H,2),K=W[0],q=W[1],Q=Object(r.useState)({x:0,y:0,scale:1}),V=Object(d.a)(Q,2),$=V[0],ee=V[1];Object(r.useEffect)((function(){(function(){var e=Object(f.a)(s.a.mark((function e(){var t,n,r,a,i,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,A(I);case 3:t=e.sent,g(t.name),n=localStorage.getItem("data_".concat(I)),r=t.images.map((function(e){return{url:e,inUse:!1,initialX:0,initialY:0,rotate:0}})),a=r,n&&(i=JSON.parse(n))&&(v(i.backgroundColor),c=i.images.map((function(e){return{inUse:e.inUse,url:e.url,initialX:e.x,initialY:e.y,rotate:e.rotate}})),a=[],r.forEach((function(e){var t=c.find((function(t){return t.url===e.url}));t?(a.push(t),e.inUse=t.inUse):a.push({url:e.url,inUse:!1,initialX:0,initialY:0,rotate:0})}))),w(r),C(a),o.current=a.map((function(e){return{url:e.url,inUse:e.inUse,rotate:e.rotate,borderPoints:"",rawPolygon:new P.a.Polygon,transformedPolygon:new P.a.Polygon,boundingRect:{left:e.initialX,top:e.initialY,right:0,bottom:0},imageSize:{width:0,height:0}}})),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),console.error(e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(){return e.apply(this,arguments)}})()()}),[I]);var te=Object(r.useCallback)((function(){if(I&&o.current){var e={backgroundColor:p,images:o.current.map((function(e){return{url:e.url,inUse:e.inUse,x:e.boundingRect.left,y:e.boundingRect.top,rotate:e.rotate}}))};localStorage.setItem("data_".concat(I),JSON.stringify(e))}}),[p,I]);Object(r.useEffect)((function(){te()}),[p,S,I,te]);var ne=Object(r.useCallback)((function(e){var t=o.current;if(t){var n=t.findIndex((function(t){return t&&t.url===e.url}));t[n]=Object(u.a)(Object(u.a)({},e),{},{inUse:t[n].inUse})}}),[]),re=function(e){X(e)},ae=function(e){X(null)},oe=function(e){q(e)},ie=function(e){F(!0),q(null),z&&z.url===e.url&&X(e),J&&J.url===e.url&&_(e),ne(e),te()},ce=function(e){_(e)},ue=function(e,t){var n=P.a.BooleanOperations;if(e.transformedPolygon.box.not_intersect(t.transformedPolygon.box))return!1;if(e.transformedPolygon.intersect(t.transformedPolygon).length>0)return!0;var r=n.innerClip(e.transformedPolygon,t.transformedPolygon);return r[0].length>0||r[1].length>0},le=function(e,t){var n=o.current;if(n){var r=n.findIndex((function(t){return(null===t||void 0===t?void 0:t.url)===e.url}));if(-1!==r){var a=n[r],i=t(r,a,n);if(i!==r){n.splice(r,1),i<r?i++:i--,n.splice(i,0,a);var u=Object(c.a)(S),l=u.splice(r,1);u.splice(i,0,l[0]),C(u)}}}},se=function(e,t,n){for(var r=e+1;r<n.length;r++){var a=n[r];if(a&&a.inUse&&ue(a,t))return r+1}return e},fe=function(e,t,n){for(var r=e-1;r>=0;r--){var a=n[r];if(a&&a.inUse&&ue(a,t))return r-1}return e},de=function(e,t){var n=y.findIndex((function(t){return t.url===e}));if(-1!==n&&y[n].inUse!==t){var r=Object(c.a)(y);r[n].inUse=t,w(r);var a=Object(c.a)(S),i=S.findIndex((function(t){return t.url===e}));if(-1!==i){var u=a[i];u.inUse=t,t&&(a.splice(i,1),a.push(u)),C(a);var l=o.current,s=l[i];s.inUse=t,t?(l.splice(i,1),l.push(s)):_(null)}else console.warn("Image in general list but not in ordered list.")}},me=Object(r.useCallback)((function(e){ee(e)}),[ee]);return a.a.createElement(T.a,{theme:Ie},a.a.createElement("div",{className:"App"},a.a.createElement(O,{ref:n,backgroundColor:p,motionActive:B,onTransformChanged:me,onBackgroundClicked:function(){return _(null)}},S.filter((function(e){return e.inUse})).map((function(e){return a.a.createElement(N,{canvas:t.current,url:e.url,key:e.url,glued:!1,initialX:e.initialX,initialY:e.initialY,rotate:e.rotate,dragScale:$.scale,onInitialStateAvailable:ne,onMovingStart:function(){return F(!1)},onMove:oe,onMouseEnter:re,onMouseLeave:ae,onMovingEnd:ie,onSelect:ce})})),a.a.createElement(Y,{hoverImage:z,selectedImage:null!==K&&void 0!==K?K:J,key:"_selection"})),a.a.createElement(Re,{selectedImage:null!==K&&void 0!==K?K:J,currentBoardTransform:$,onRotationChanged:function(e,t){var n=Object(u.a)(Object(u.a)({},e),{},{rotate:t});ne(n),J&&J.url===n.url&&_(n);var r=Object(c.a)(S),a=r.findIndex((function(t){return t.url===e.url}));r[a].rotate=t,C(r)},onRotationEnded:function(e,t){var n=Object(u.a)(Object(u.a)({},e),{},{rotate:t});J&&J.url===n.url&&_(n),ne(n),te()}}),a.a.createElement(ye,{activeImage:J,boardBackgroundColor:p,workshopName:m,allImages:y,onZoomToFit:function(){var e;return null===(e=n.current)||void 0===e?void 0:e.resetZoom()},onUpOne:function(){return le(J,se)},onDownOne:function(){return le(J,fe)},onRemoveImage:function(){return de(J.url,!1)},onUseImage:function(e){return de(e,!0)},onBackgroundColorChange:function(e){return v(e)},onDeleteAll:function(){w(y.map((function(e){return Object(u.a)(Object(u.a)({},e),{},{inUse:!1})}))),C(S.map((function(e){return Object(u.a)(Object(u.a)({},e),{},{inUse:!1})}))),o.current.forEach((function(e){e&&(e.inUse=!1)}))}}),a.a.createElement("canvas",{ref:t,className:e.computeCanvas})))};i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(Ue,null)),document.getElementById("root"))},96:function(e,t,n){e.exports=n(123)}},[[96,1,2]]]);
//# sourceMappingURL=main.5f9f81da.chunk.js.map