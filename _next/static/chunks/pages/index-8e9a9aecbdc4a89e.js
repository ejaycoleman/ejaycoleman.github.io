(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{3321:function(e,t,a){"use strict";a.d(t,{Z:function(){return I}});var o=a(3366),r=a(7462),n=a(7294),i=a(6010),l=a(7925),s=a(4780),c=a(1796),d=a(8271),u=a(7623),A=a(6830),p=a(8216),h=a(1588),v=a(7621);function g(e){return(0,v.Z)("MuiButton",e)}let m=(0,h.Z)("MuiButton",["root","text","textInherit","textPrimary","textSecondary","textSuccess","textError","textInfo","textWarning","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","outlinedSuccess","outlinedError","outlinedInfo","outlinedWarning","contained","containedInherit","containedPrimary","containedSecondary","containedSuccess","containedError","containedInfo","containedWarning","disableElevation","focusVisible","disabled","colorInherit","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]),x=n.createContext({});var f=a(5893);let b=["children","color","component","className","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],S=e=>{let{color:t,disableElevation:a,fullWidth:o,size:n,variant:i,classes:l}=e,c={root:["root",i,`${i}${(0,p.Z)(t)}`,`size${(0,p.Z)(n)}`,`${i}Size${(0,p.Z)(n)}`,"inherit"===t&&"colorInherit",a&&"disableElevation",o&&"fullWidth"],label:["label"],startIcon:["startIcon",`iconSize${(0,p.Z)(n)}`],endIcon:["endIcon",`iconSize${(0,p.Z)(n)}`]},d=(0,s.Z)(c,g,l);return(0,r.Z)({},l,d)},Z=e=>(0,r.Z)({},"small"===e.size&&{"& > *:nth-of-type(1)":{fontSize:18}},"medium"===e.size&&{"& > *:nth-of-type(1)":{fontSize:20}},"large"===e.size&&{"& > *:nth-of-type(1)":{fontSize:22}}),y=(0,d.ZP)(A.Z,{shouldForwardProp:e=>(0,d.FO)(e)||"classes"===e,name:"MuiButton",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,t[a.variant],t[`${a.variant}${(0,p.Z)(a.color)}`],t[`size${(0,p.Z)(a.size)}`],t[`${a.variant}Size${(0,p.Z)(a.size)}`],"inherit"===a.color&&t.colorInherit,a.disableElevation&&t.disableElevation,a.fullWidth&&t.fullWidth]}})(({theme:e,ownerState:t})=>{var a,o;let n="light"===e.palette.mode?e.palette.grey[300]:e.palette.grey[800],i="light"===e.palette.mode?e.palette.grey.A100:e.palette.grey[700];return(0,r.Z)({},e.typography.button,{minWidth:64,padding:"6px 16px",borderRadius:(e.vars||e).shape.borderRadius,transition:e.transitions.create(["background-color","box-shadow","border-color","color"],{duration:e.transitions.duration.short}),"&:hover":(0,r.Z)({textDecoration:"none",backgroundColor:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,c.Fq)(e.palette.text.primary,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"text"===t.variant&&"inherit"!==t.color&&{backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,c.Fq)(e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"outlined"===t.variant&&"inherit"!==t.color&&{border:`1px solid ${(e.vars||e).palette[t.color].main}`,backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,c.Fq)(e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"contained"===t.variant&&{backgroundColor:e.vars?e.vars.palette.Button.inheritContainedHoverBg:i,boxShadow:(e.vars||e).shadows[4],"@media (hover: none)":{boxShadow:(e.vars||e).shadows[2],backgroundColor:(e.vars||e).palette.grey[300]}},"contained"===t.variant&&"inherit"!==t.color&&{backgroundColor:(e.vars||e).palette[t.color].dark,"@media (hover: none)":{backgroundColor:(e.vars||e).palette[t.color].main}}),"&:active":(0,r.Z)({},"contained"===t.variant&&{boxShadow:(e.vars||e).shadows[8]}),[`&.${m.focusVisible}`]:(0,r.Z)({},"contained"===t.variant&&{boxShadow:(e.vars||e).shadows[6]}),[`&.${m.disabled}`]:(0,r.Z)({color:(e.vars||e).palette.action.disabled},"outlined"===t.variant&&{border:`1px solid ${(e.vars||e).palette.action.disabledBackground}`},"contained"===t.variant&&{color:(e.vars||e).palette.action.disabled,boxShadow:(e.vars||e).shadows[0],backgroundColor:(e.vars||e).palette.action.disabledBackground})},"text"===t.variant&&{padding:"6px 8px"},"text"===t.variant&&"inherit"!==t.color&&{color:(e.vars||e).palette[t.color].main},"outlined"===t.variant&&{padding:"5px 15px",border:"1px solid currentColor"},"outlined"===t.variant&&"inherit"!==t.color&&{color:(e.vars||e).palette[t.color].main,border:e.vars?`1px solid rgba(${e.vars.palette[t.color].mainChannel} / 0.5)`:`1px solid ${(0,c.Fq)(e.palette[t.color].main,.5)}`},"contained"===t.variant&&{color:e.vars?e.vars.palette.text.primary:null==(a=(o=e.palette).getContrastText)?void 0:a.call(o,e.palette.grey[300]),backgroundColor:e.vars?e.vars.palette.Button.inheritContainedBg:n,boxShadow:(e.vars||e).shadows[2]},"contained"===t.variant&&"inherit"!==t.color&&{color:(e.vars||e).palette[t.color].contrastText,backgroundColor:(e.vars||e).palette[t.color].main},"inherit"===t.color&&{color:"inherit",borderColor:"currentColor"},"small"===t.size&&"text"===t.variant&&{padding:"4px 5px",fontSize:e.typography.pxToRem(13)},"large"===t.size&&"text"===t.variant&&{padding:"8px 11px",fontSize:e.typography.pxToRem(15)},"small"===t.size&&"outlined"===t.variant&&{padding:"3px 9px",fontSize:e.typography.pxToRem(13)},"large"===t.size&&"outlined"===t.variant&&{padding:"7px 21px",fontSize:e.typography.pxToRem(15)},"small"===t.size&&"contained"===t.variant&&{padding:"4px 10px",fontSize:e.typography.pxToRem(13)},"large"===t.size&&"contained"===t.variant&&{padding:"8px 22px",fontSize:e.typography.pxToRem(15)},t.fullWidth&&{width:"100%"})},({ownerState:e})=>e.disableElevation&&{boxShadow:"none","&:hover":{boxShadow:"none"},[`&.${m.focusVisible}`]:{boxShadow:"none"},"&:active":{boxShadow:"none"},[`&.${m.disabled}`]:{boxShadow:"none"}}),C=(0,d.ZP)("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.startIcon,t[`iconSize${(0,p.Z)(a.size)}`]]}})(({ownerState:e})=>(0,r.Z)({display:"inherit",marginRight:8,marginLeft:-4},"small"===e.size&&{marginLeft:-2},Z(e))),z=(0,d.ZP)("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.endIcon,t[`iconSize${(0,p.Z)(a.size)}`]]}})(({ownerState:e})=>(0,r.Z)({display:"inherit",marginRight:-4,marginLeft:8},"small"===e.size&&{marginRight:-2},Z(e))),w=n.forwardRef(function(e,t){let a=n.useContext(x),s=(0,l.Z)(a,e),c=(0,u.Z)({props:s,name:"MuiButton"}),{children:d,color:A="primary",component:p="button",className:h,disabled:v=!1,disableElevation:g=!1,disableFocusRipple:m=!1,endIcon:Z,focusVisibleClassName:w,fullWidth:I=!1,size:E="medium",startIcon:R,type:k,variant:j="text"}=c,B=(0,o.Z)(c,b),M=(0,r.Z)({},c,{color:A,component:p,disabled:v,disableElevation:g,disableFocusRipple:m,fullWidth:I,size:E,type:k,variant:j}),$=S(M),Q=R&&(0,f.jsx)(C,{className:$.startIcon,ownerState:M,children:R}),D=Z&&(0,f.jsx)(z,{className:$.endIcon,ownerState:M,children:Z});return(0,f.jsxs)(y,(0,r.Z)({ownerState:M,className:(0,i.Z)(a.className,$.root,h),component:p,disabled:v,focusRipple:!m,focusVisibleClassName:(0,i.Z)($.focusVisible,w),ref:t,type:k},B,{classes:$,children:[Q,d,D]}))});var I=w},2023:function(e,t,a){"use strict";a.d(t,{Z:function(){return x}});var o=a(3366),r=a(7462),n=a(7294),i=a(6010),l=a(4780),s=a(8271),c=a(7623),d=a(1588),u=a(7621);function A(e){return(0,u.Z)("MuiCardActions",e)}(0,d.Z)("MuiCardActions",["root","spacing"]);var p=a(5893);let h=["disableSpacing","className"],v=e=>{let{classes:t,disableSpacing:a}=e;return(0,l.Z)({root:["root",!a&&"spacing"]},A,t)},g=(0,s.ZP)("div",{name:"MuiCardActions",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,!a.disableSpacing&&t.spacing]}})(({ownerState:e})=>(0,r.Z)({display:"flex",alignItems:"center",padding:8},!e.disableSpacing&&{"& > :not(:first-of-type)":{marginLeft:8}})),m=n.forwardRef(function(e,t){let a=(0,c.Z)({props:e,name:"MuiCardActions"}),{disableSpacing:n=!1,className:l}=a,s=(0,o.Z)(a,h),d=(0,r.Z)({},a,{disableSpacing:n}),u=v(d);return(0,p.jsx)(g,(0,r.Z)({className:(0,i.Z)(u.root,l),ownerState:d,ref:t},s))});var x=m},8312:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(281)}])},281:function(e,t,a){"use strict";a.r(t),a.d(t,{__N_SSG:function(){return j},default:function(){return B}});var o=a(5893),r={src:"/_next/static/media/6096450.4a745f34.jpeg",height:460,width:460,blurDataURL:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAgACAMBIgACEQEDEQH/xAAoAAEBAAAAAAAAAAAAAAAAAAAABAEBAQAAAAAAAAAAAAAAAAAAAQL/2gAMAwEAAhADEAAAAIBR/8QAIBAAAAQGAwAAAAAAAAAAAAAAAQIDEgAEBQYTFCEjQf/aAAgBAQABPwBS6ayeSZtMUFJwFxdhufBj/8QAFhEAAwAAAAAAAAAAAAAAAAAAAAFB/9oACAECAQE/AHD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AH//2Q==",blurWidth:8,blurHeight:8},n=a(9937),i=a(4267),l=a(3366),s=a(7462),c=a(7294),d=a(6010),u=a(4780),A=a(8271),p=a(7623),h=(0,a(8169).Z)((0,o.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),v=a(1588),g=a(7621);function m(e){return(0,g.Z)("MuiAvatar",e)}(0,v.Z)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);let x=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],f=e=>{let{classes:t,variant:a,colorDefault:o}=e;return(0,u.Z)({root:["root",a,o&&"colorDefault"],img:["img"],fallback:["fallback"]},m,t)},b=(0,A.ZP)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,t[a.variant],a.colorDefault&&t.colorDefault]}})(({theme:e,ownerState:t})=>(0,s.Z)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===t.variant&&{borderRadius:(e.vars||e).shape.borderRadius},"square"===t.variant&&{borderRadius:0},t.colorDefault&&(0,s.Z)({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:{backgroundColor:"light"===e.palette.mode?e.palette.grey[400]:e.palette.grey[600]}))),S=(0,A.ZP)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,t)=>t.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),Z=(0,A.ZP)(h,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,t)=>t.fallback})({width:"75%",height:"75%"}),y=c.forwardRef(function(e,t){let a=(0,p.Z)({props:e,name:"MuiAvatar"}),{alt:r,children:n,className:i,component:u="div",imgProps:A,sizes:h,src:v,srcSet:g,variant:m="circular"}=a,y=(0,l.Z)(a,x),C=null,z=function({crossOrigin:e,referrerPolicy:t,src:a,srcSet:o}){let[r,n]=c.useState(!1);return c.useEffect(()=>{if(!a&&!o)return;n(!1);let r=!0,i=new Image;return i.onload=()=>{r&&n("loaded")},i.onerror=()=>{r&&n("error")},i.crossOrigin=e,i.referrerPolicy=t,i.src=a,o&&(i.srcset=o),()=>{r=!1}},[e,t,a,o]),r}((0,s.Z)({},A,{src:v,srcSet:g})),w=v||g,I=w&&"error"!==z,E=(0,s.Z)({},a,{colorDefault:!I,component:u,variant:m}),R=f(E);return C=I?(0,o.jsx)(S,(0,s.Z)({alt:r,src:v,srcSet:g,sizes:h,ownerState:E,className:R.img},A)):null!=n?n:w&&r?r[0]:(0,o.jsx)(Z,{ownerState:E,className:R.fallback}),(0,o.jsx)(b,(0,s.Z)({as:u,ownerState:E,className:(0,d.Z)(R.root,i),ref:t},y,{children:C}))});var C=a(5861),z=a(2023),w=a(3321),I=a(5675),E=a.n(I),R=a(1664),k=a.n(R),j=!0,B=e=>{let{post:{title:t,slug:a}}=e;return(0,o.jsxs)(n.Z,{style:{padding:30},children:[(0,o.jsxs)(i.Z,{children:[(0,o.jsxs)("div",{style:{display:"flex",alignItems:"center",marginBottom:30,justifyContent:"center",flexDirection:"column"},children:[(0,o.jsx)(y,{sx:{width:90,height:90},children:(0,o.jsx)(E(),{src:r||"EC",alt:"alter",layout:"fill"})}),(0,o.jsxs)(C.Z,{variant:"h3",style:{marginTop:20},children:["I'm Elliott ",(0,o.jsx)("span",{role:"img","aria-label":"wave",children:"\uD83D\uDC4B"})]}),(0,o.jsx)(C.Z,{sx:{mt:1.5},color:"text.secondary",children:"Full Stack Software Engineer"})]}),(0,o.jsx)(C.Z,{sx:{mt:1.5},children:"TypeScript, React, Node, Azure"}),(0,o.jsxs)(C.Z,{children:["Read my latest blog post:"," ",(0,o.jsx)(k(),{as:"/posts/".concat(a),href:"/posts/[slug]",className:"hover:underline",children:t})]})]}),(0,o.jsxs)(z.Z,{children:[(0,o.jsx)(k(),{as:"/posts",href:"/posts",className:"hover:underline",children:(0,o.jsx)(w.Z,{variant:"contained",children:"Blog"})}),(0,o.jsx)(w.Z,{variant:"contained",href:"https://github.com/ejaycoleman",children:"Github"})]})]})}}},function(e){e.O(0,[873,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);