(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-44a6fb7d"],{"159b":function(t,e,n){var s=n("da84"),a=n("fdbc"),o=n("17c2"),i=n("9112");for(var r in a){var c=s[r],l=c&&c.prototype;if(l&&l.forEach!==o)try{i(l,"forEach",o)}catch(u){l.forEach=o}}},"17c2":function(t,e,n){"use strict";var s=n("b727").forEach,a=n("a640"),o=n("ae40"),i=a("forEach"),r=o("forEach");t.exports=i&&r?[].forEach:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}},"1d39":function(t,e,n){},2184:function(t,e,n){"use strict";var s=n("f62d"),a=n.n(s);a.a},"27f8":function(t,e,n){},4160:function(t,e,n){"use strict";var s=n("23e7"),a=n("17c2");s({target:"Array",proto:!0,forced:[].forEach!=a},{forEach:a})},7173:function(t,e,n){},a434:function(t,e,n){"use strict";var s=n("23e7"),a=n("23cb"),o=n("a691"),i=n("50c4"),r=n("7b0b"),c=n("65f0"),l=n("8418"),u=n("1dde"),f=n("ae40"),d=u("splice"),p=f("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,h=Math.min,b=9007199254740991,v="Maximum allowed length exceeded";s({target:"Array",proto:!0,forced:!d||!p},{splice:function(t,e){var n,s,u,f,d,p,g=r(this),y=i(g.length),C=a(t,y),S=arguments.length;if(0===S?n=s=0:1===S?(n=0,s=y-C):(n=S-2,s=h(m(o(e),0),y-C)),y+n-s>b)throw TypeError(v);for(u=c(g,s),f=0;f<s;f++)d=C+f,d in g&&l(u,f,g[d]);if(u.length=s,n<s){for(f=C;f<y-s;f++)d=f+s,p=f+n,d in g?g[p]=g[d]:delete g[p];for(f=y;f>y-s+n;f--)delete g[f-1]}else if(n>s)for(f=y-s;f>C;f--)d=f+s-1,p=f+n-1,d in g?g[p]=g[d]:delete g[p];for(f=0;f<n;f++)g[f+C]=arguments[f+2];return g.length=y-s+n,u}})},a640:function(t,e,n){"use strict";var s=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&s((function(){n.call(null,e||function(){throw 1},1)}))}},ae40:function(t,e,n){var s=n("83ab"),a=n("d039"),o=n("5135"),i=Object.defineProperty,r={},c=function(t){throw t};t.exports=function(t,e){if(o(r,t))return r[t];e||(e={});var n=[][t],l=!!o(e,"ACCESSORS")&&e.ACCESSORS,u=o(e,0)?e[0]:c,f=o(e,1)?e[1]:void 0;return r[t]=!!n&&!a((function(){if(l&&!s)return!0;var t={length:-1};l?i(t,1,{enumerable:!0,get:c}):t[1]=1,n.call(t,u,f)}))}},b34d:function(t,e,n){"use strict";var s=n("1d39"),a=n.n(s);a.a},b409:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Tabs",{attrs:{tabs:t.tabs}})},a=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"container-sm training"},[n("h2",[t._v("Обучение символов")]),n("TrainingControls",{on:{start:t.train},model:{value:t.options,callback:function(e){t.options=e},expression:"options"}}),n("Console")],1)},i=[],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{ref:"console",staticClass:"console bordered"},t._l(t.items,(function(e,s){return n("div",{key:s,staticClass:"item",class:{error:"error"===e.type,message:"message"===e.type,warning:"warning"===e.type}},[t._v(" "+t._s(e.message)+" ")])})),0)},c=[],l=(n("a434"),n("ac1f"),n("5319"),n("4a9d")),u={name:"Console",data:function(){return{items:[]}},methods:{addItem:function(t){var e=t.type,n=t.message;t.replace?this.items.splice(this.items.length-1,1,{type:e,message:n}):this.items.push({type:e,message:n}),this.$refs.console.scrollTop=this.$refs.console.scrollHeight},clearConsole:function(){this.items=[]}},mounted:function(){l["b"].$on("logFromPython",this.addItem),l["b"].$on("clearConsole",this.clearConsole)},beforeDestroy:function(){l["b"].$off("logFromPython",this.addItem),l["b"].$off("clearConsole",this.clearConsole)}},f=u,d=(n("b34d"),n("2877")),p=Object(d["a"])(f,r,c,!1,null,"12a923ae",null),m=p.exports,h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("form",{staticClass:"form-group border p-3",on:{submit:function(e){return e.preventDefault(),t.start(e)}}},[n("div",{staticClass:"d-flex justify-content-between align-items-end flex-wrap mb-3"},[n("label",{staticClass:"form-label settings__item"},[t._v(" Количество элетентов в скрытом слое "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.value.hiddenNodes,expression:"value.hiddenNodes",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.value.hiddenNodes},on:{input:function(e){e.target.composing||t.$set(t.value,"hiddenNodes",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),n("label",{staticClass:"form-label settings__item"},[t._v(" Количество эпох "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.value.epochs,expression:"value.epochs",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.value.epochs},on:{input:function(e){e.target.composing||t.$set(t.value,"epochs",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])]),n("input",{staticClass:"btn btn-primary",attrs:{type:"submit",value:"Старт"}})])])},b=[],v={name:"TrainingOptions",props:{value:{type:Object,required:!0}},methods:{start:function(){l["b"].$emit("clearConsole"),this.$emit("start")}}},g=v,y=(n("d6c3"),Object(d["a"])(g,h,b,!1,null,"282e78e8",null)),C=y.exports,S={name:"TrainLetters",components:{Console:m,TrainingControls:C},props:{payload:{type:String,default:"NONE"}},data:function(){return{options:{hiddenNodes:100,epochs:5}}},watch:{payload:function(){l["b"].$emit("clearConsole")}},methods:{train:function(){var t=784,e=10;this.$store.dispatch("training",{typeOfDataset:this.payload,hiddenNodes:this.options.hiddenNodes,inputNodes:t,outputNodes:e,epochs:this.options.epochs})}}},L=S,x=(n("bbf6"),Object(d["a"])(L,o,i,!1,null,"1276b6f4",null)),E=x.exports,T=n("b50c"),_={name:"Training",components:{Tabs:T["a"]},data:function(){return{tabs:[{title:"Обучение символов",component:E,payload:"LETTERS"},{title:"Обучение блоков ответов",component:E,payload:"BLOCKS"},{title:"Обучение блоков символов",component:E,payload:"LETTERS_BLOCK"}]}}},$=_,w=Object(d["a"])($,s,a,!1,null,null,null);e["default"]=w.exports},b50c:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-sm tabs"},[n("ul",{staticClass:"tab-list"},t._l(t.tabs,(function(e,s){return n("li",{key:e.title,class:{active:e.isActive},on:{click:function(e){return t.select(s)}}},[t._v(" "+t._s(e.title)+" ")])})),0),n("div",{staticClass:"tab-content"},[n("transition",{attrs:{name:"fade",appear:""}},[n("KeepAlive",[n(t.tabs[t.selectedIndex].component,{tag:"component",staticClass:"tab-components",attrs:{payload:t.tabs[t.selectedIndex].payload}})],1)],1)],1)])},a=[],o=(n("4160"),n("159b"),{name:"Tabs",props:{tabs:{type:Array,required:!0}},data:function(){return{selectedIndex:0}},created:function(){this.select(0)},methods:{select:function(t){this.selectedIndex=t,this.tabs.forEach((function(e,n){e.isActive=n===t}))}}}),i=o,r=(n("2184"),n("2877")),c=Object(r["a"])(i,s,a,!1,null,"eaaeb494",null);e["a"]=c.exports},b727:function(t,e,n){var s=n("0366"),a=n("44ad"),o=n("7b0b"),i=n("50c4"),r=n("65f0"),c=[].push,l=function(t){var e=1==t,n=2==t,l=3==t,u=4==t,f=6==t,d=5==t||f;return function(p,m,h,b){for(var v,g,y=o(p),C=a(y),S=s(m,h,3),L=i(C.length),x=0,E=b||r,T=e?E(p,L):n?E(p,0):void 0;L>x;x++)if((d||x in C)&&(v=C[x],g=S(v,x,y),t))if(e)T[x]=g;else if(g)switch(t){case 3:return!0;case 5:return v;case 6:return x;case 2:c.call(T,v)}else if(u)return!1;return f?-1:l||u?u:T}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6)}},bbf6:function(t,e,n){"use strict";var s=n("27f8"),a=n.n(s);a.a},d6c3:function(t,e,n){"use strict";var s=n("7173"),a=n.n(s);a.a},f62d:function(t,e,n){},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);