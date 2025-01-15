import{a as u,c as K,r as c,aC as R,bl as W,a9 as J,h as l,T as X,d as Y,ax as Z,w as p,aK as q,g as ee,bm as te,j as ae,ay as ie,R as re,$ as ne,k as d,m as s,Q as x,q as g,t as B,s as v,x as f,U as z,z as le,v as oe}from"./index.c94746c7.js";import{Q as se,a as L,b as ue}from"./TouchPan.d8df971a.js";const ce={ratio:[String,Number]};function de(e,a){return u(()=>{const i=Number(e.ratio||(a!==void 0?a.value:void 0));return isNaN(i)!==!0&&i>0?{paddingBottom:`${100/i}%`}:null})}const ge=1.7778;var $=K({name:"QImg",props:{...ce,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},loadingShowDelay:{type:[Number,String],default:0},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:ge},placeholderSrc:String,errorSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:a,emit:i}){const m=c(e.initialRatio),b=de(e,m),_=ee(),{registerTimeout:D,removeTimeout:k}=R(),{registerTimeout:j,removeTimeout:I}=R(),w=u(()=>e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null),A=u(()=>e.errorSrc!==void 0?{src:e.errorSrc,__qerror:!0}:null),r=[c(null),c(w.value)],n=c(0),S=c(!1),h=c(!1),O=u(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),U=u(()=>({width:e.width,height:e.height})),H=u(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition q-img__image--`),M=u(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));function E(){if(I(),e.loadingShowDelay===0){S.value=!0;return}j(()=>{S.value=!0},e.loadingShowDelay)}function T(){I(),S.value=!1}function F({target:t}){q(_)===!1&&(k(),m.value=t.naturalHeight===0?.5:t.naturalWidth/t.naturalHeight,Q(t,1))}function Q(t,o){o===1e3||q(_)===!0||(t.complete===!0?P(t):D(()=>{Q(t,o+1)},50))}function P(t){q(_)!==!0&&(n.value=n.value^1,r[n.value].value=null,T(),t.getAttribute("__qerror")!=="true"&&(h.value=!1),i("load",t.currentSrc||t.src))}function V(t){k(),T(),h.value=!0,r[n.value].value=A.value,r[n.value^1].value=w.value,i("error",t)}function N(t){const o=r[t].value,y={key:"img_"+t,class:H.value,style:M.value,alt:e.alt,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...o};return n.value===t?Object.assign(y,{class:y.class+"current",onLoad:F,onError:V}):y.class+="loaded",l("div",{class:"q-img__container absolute-full",key:"img"+t},l("img",y))}function G(){return S.value===!1?l("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},Y(a[h.value===!0?"error":"default"])):l("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},a.loading!==void 0?a.loading():e.noSpinner===!0?void 0:[l(Z,{color:e.spinnerColor,size:e.spinnerSize})])}{let t=function(){p(()=>e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null,o=>{k(),h.value=!1,o===null?(T(),r[n.value^1].value=w.value):E(),r[n.value].value=o},{immediate:!0})};W.value===!0?J(t):t()}return()=>{const t=[];return b.value!==null&&t.push(l("div",{key:"filler",style:b.value})),r[0].value!==null&&t.push(N(0)),r[1].value!==null&&t.push(N(1)),t.push(l(X,{name:"q-transition--fade"},G)),l("div",{key:"main",class:O.value,style:U.value,role:"img","aria-label":e.alt},t)}}}),me=te("user",()=>({user:c({id:1,username:"admin",password:"admin",token:"123456",name:"Admin",avatar:"https://avatars.githubusercontent.com/u/113019222?v=4",roles:["admin","user"]})}),{persist:!0});const C="ri:user-line",Se=ae({__name:"GlobalUserItem",props:{avatarOnly:{type:Boolean,default:!1},clickable:{type:Boolean,default:!1}},setup(e){const{user:a}=ie(me()),i=e;return(m,b)=>i.avatarOnly?(g(),d(x,{key:1,color:"grey-6",class:"cursor-pointer","text-color":"white"},{default:s(()=>[f(a).avatar?(g(),d($,{key:0,ratio:1/1,src:f(a).avatar},{error:s(()=>[v(z,{name:C,size:"xs",class:"absolute-center"})]),_:1},8,["src"])):(g(),d(z,{key:1,name:C,size:"xs"})),B(m.$slots,"popup")]),_:3})):re((g(),d(se,{key:0,clickable:i.clickable},{default:s(()=>[B(m.$slots,"popup"),v(L,{avatar:""},{default:s(()=>[v(x,{size:"xl",color:"grey-6","text-color":"white"},{default:s(()=>[f(a).avatar?(g(),d($,{key:0,ratio:1/1,src:f(a).avatar},null,8,["src"])):(g(),d(z,{key:1,name:C,size:"sm"}))]),_:1})]),_:1}),v(L,null,{default:s(()=>[v(ue,{class:"text-body1"},{default:s(()=>[le(oe(f(a).name),1)]),_:1})]),_:1})]),_:3},8,["clickable"])),[[ne,i.clickable]])}});export{$ as Q,Se as _,me as u};
