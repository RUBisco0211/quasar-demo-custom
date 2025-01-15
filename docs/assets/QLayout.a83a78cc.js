import{c as T,r as s,bl as W,by as w,a as o,bH as v,aL as F,w as E,a5 as O,a1 as B,h as r,g as I,l as K}from"./index.c94746c7.js";import{Q as M}from"./QScrollObserver.31ce824b.js";import{Q as C}from"./QResizeObserver.509fa4bf.js";var A=T({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:t=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(t.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(t,{slots:H,emit:h}){const{proxy:{$q:i}}=I(),m=s(null),u=s(i.screen.height),g=s(t.container===!0?0:i.screen.width),b=s({position:0,direction:"down",inflectionPoint:0}),d=s(0),n=s(W.value===!0?0:w()),R=o(()=>"q-layout q-layout--"+(t.container===!0?"containerized":"standard")),p=o(()=>t.container===!1?{minHeight:i.screen.height+"px"}:null),q=o(()=>n.value!==0?{[i.lang.rtl===!0?"left":"right"]:`${n.value}px`}:null),x=o(()=>n.value!==0?{[i.lang.rtl===!0?"right":"left"]:0,[i.lang.rtl===!0?"left":"right"]:`-${n.value}px`,width:`calc(100% + ${n.value}px)`}:null);function P(e){if(t.container===!0||document.qScrollPrevented!==!0){const l={position:e.position.top,direction:e.direction,directionChanged:e.directionChanged,inflectionPoint:e.inflectionPoint.top,delta:e.delta.top};b.value=l,t.onScroll!==void 0&&h("scroll",l)}}function Q(e){const{height:l,width:a}=e;let c=!1;u.value!==l&&(c=!0,u.value=l,t.onScrollHeight!==void 0&&h("scrollHeight",l),S()),g.value!==a&&(c=!0,g.value=a),c===!0&&t.onResize!==void 0&&h("resize",e)}function $({height:e}){d.value!==e&&(d.value=e,S())}function S(){if(t.container===!0){const e=u.value>d.value?w():0;n.value!==e&&(n.value=e)}}let f=null;const z={instances:{},view:o(()=>t.view),isContainer:o(()=>t.container),rootRef:m,height:u,containerHeight:d,scrollbarWidth:n,totalWidth:o(()=>g.value+n.value),rows:o(()=>{const e=t.view.toLowerCase().split(" ");return{top:e[0].split(""),middle:e[1].split(""),bottom:e[2].split("")}}),header:v({size:0,offset:0,space:!1}),right:v({size:300,offset:0,space:!1}),footer:v({size:0,offset:0,space:!1}),left:v({size:300,offset:0,space:!1}),scroll:b,animate(){f!==null?clearTimeout(f):document.body.classList.add("q-body--layout-animate"),f=setTimeout(()=>{f=null,document.body.classList.remove("q-body--layout-animate")},155)},update(e,l,a){z[e][l]=a}};if(F(K,z),w()>0){let a=function(){e=null,l.classList.remove("hide-scrollbar")},c=function(){if(e===null){if(l.scrollHeight>i.screen.height)return;l.classList.add("hide-scrollbar")}else clearTimeout(e);e=setTimeout(a,300)},y=function(L){e!==null&&L==="remove"&&(clearTimeout(e),a()),window[`${L}EventListener`]("resize",c)},e=null;const l=document.body;E(()=>t.container!==!0?"add":"remove",y),t.container!==!0&&y("add"),O(()=>{y("remove")})}return()=>{const e=B(H.default,[r(M,{onScroll:P}),r(C,{onResize:Q})]),l=r("div",{class:R.value,style:p.value,ref:t.container===!0?void 0:m,tabindex:-1},e);return t.container===!0?r("div",{class:"q-layout-container overflow-hidden",ref:m},[r(C,{onResize:$}),r("div",{class:"absolute-full",style:q.value},[r("div",{class:"scroll",style:x.value},[l])])]):l}}});export{A as Q};
