import{Q as y}from"./QBtnGroup.3c9eea1c.js";import{Q as F}from"./QSpace.4593f9f4.js";import{j as b,al as R,r as E,a as L,a5 as S,u as p,s as o,_ as m,E as f,m as q,x as N,X as d,Y as u,q as g,Z as U}from"./index.c94746c7.js";const j={class:"row q-gutter-md q-py-md"},z=b({__name:"Cropper",props:{height:{default:500},img:{},fixed:{type:Boolean,default:!1},fixedNumber:{}},emits:["update"],setup(C,{emit:v}){const{open:h,files:i}=R({multiple:!1,accept:"image/*"}),r=C,k=v,t=E(),s=L(()=>{var n;let e;if(i.value&&i.value.length>0){const a=i.value[0];e=URL.createObjectURL(new Blob([a],{type:a.type}))}return{img:e!=null?e:r.img,size:1,outputType:"jpeg || png || webp",outputSize:1,full:!1,autoCrop:!0,canMove:!0,canMoveBox:!0,fixedBox:!1,original:!1,autoCropWidth:400,autoCropHeight:300,centerBox:!0,high:!0,infoTrue:!0,enlarge:1,maxImgSize:2e3,fixed:r.fixed,fixedNumber:(n=r.fixedNumber)!=null?n:[4,3],info:!0,mode:"100%"}}),x=()=>{t.value.getCropBlob(e=>{k("update",e)})},_=[{icon:"mdi-magnify-plus-outline",tooltip:"\u653E\u5927",onClick:()=>{t.value.changeScale(10)}},{icon:"mdi-magnify-minus-outline",tooltip:"\u7F29\u5C0F",onClick:()=>{t.value.changeScale(-10)}},{icon:"mdi-rotate-left",tooltip:"\u5DE6\u8F6C",onClick:()=>{t.value.rotateLeft()}},{icon:"mdi-rotate-right",tooltip:"\u53F3\u8F6C",onClick:()=>{t.value.rotateRight()}}];return S(()=>{URL.revokeObjectURL(s.value.img)}),(e,n)=>{const a=u("VueCropper"),B=u("BtnFlat"),c=u("Btn");return g(),p(d,null,[o(a,m({class:"rounded-borders",style:{height:`${e.height}px`},ref_key:"cropperRef",ref:t},s.value),null,16,["style"]),f("div",j,[o(y,{flat:""},{default:q(()=>[(g(),p(d,null,U(_,l=>o(B,m({dense:"",class:"q-px-sm",key:l.icon,ref_for:!0},l,{onClick:l.onClick}),null,16,["onClick"])),64))]),_:1}),o(F),f("div",null,[o(c,{class:"q-mr-md",label:"\u66F4\u6539\u56FE\u7247",icon:"eva-image-outline",onClick:n[0]||(n[0]=l=>N(h)())}),o(c,{label:"\u786E\u5B9A",icon:"eva-checkmark-outline",onClick:x})])])],64)}}});export{z as _};
