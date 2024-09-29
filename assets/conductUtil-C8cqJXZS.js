import{a5 as A,a7 as x,ar as O,ab as C,ac as F,a8 as _,o as B}from"./index-alDrBFfS.js";function w(e,r){return e[r]}var M=["children"];function P(e,r){return"".concat(e,"-").concat(r)}function W(e){return e&&e.type&&e.type.isTreeNode}function S(e,r){return e??r}function T(e){var r=e||{},l=r.title,t=r._title,a=r.key,f=r.children,o=l||"title";return{title:o,_title:t||[o],key:a||"key",children:f||"children"}}function J(e){function r(l){var t=F(l);return t.map(function(a){if(!W(a))return O(!a,"Tree/TreeNode can only accept TreeNode as children."),null;var f=a.key,o=a.props,p=o.children,y=_(o,M),v=x({key:f},y),u=r(p);return u.length&&(v.children=u),v}).filter(function(a){return a})}return r(e)}function L(e,r,l){var t=T(l),a=t._title,f=t.key,o=t.children,p=new Set(r===!0?[]:r),y=[];function v(u){var d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;return u.map(function(n,i){for(var c=P(d?d.pos:"0",i),h=S(n[f],c),s,g=0;g<a.length;g+=1){var K=a[g];if(n[K]!==void 0){s=n[K];break}}var k=x(x({},B(n,[].concat(C(a),[f,o]))),{},{title:s,key:h,parent:d,pos:c,children:null,data:n,isStart:[].concat(C(d?d.isStart:[]),[i===0]),isEnd:[].concat(C(d?d.isEnd:[]),[i===u.length-1])});return y.push(k),r===!0||p.has(h)?k.children=v(n[o]||[],k):k.children=[],k})}return v(e),y}function $(e,r,l){var t={};A(l)==="object"?t=l:t={externalGetKey:l},t=t||{};var a=t,f=a.childrenPropName,o=a.externalGetKey,p=a.fieldNames,y=T(p),v=y.key,u=y.children,d=f||u,n;o?typeof o=="string"?n=function(h){return h[o]}:typeof o=="function"&&(n=function(h){return o(h)}):n=function(h,s){return S(h[v],s)};function i(c,h,s,g){var K=c?c[d]:e,k=c?P(s.pos,h):"0",E=c?[].concat(C(g),[c]):[];if(c){var m=n(c,k),N={node:c,index:h,pos:k,key:m,parentPos:s.node?s.pos:null,level:s.level+1,nodes:E};r(N)}K&&K.forEach(function(b,j){i(b,j,{node:c,pos:k,level:s?s.level+1:-1},E)})}i(null)}function Q(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},l=r.initWrapper,t=r.processEntity,a=r.onProcessFinished,f=r.externalGetKey,o=r.childrenPropName,p=r.fieldNames,y=arguments.length>2?arguments[2]:void 0,v=f||y,u={},d={},n={posEntities:u,keyEntities:d};return l&&(n=l(n)||n),$(e,function(i){var c=i.node,h=i.index,s=i.pos,g=i.key,K=i.parentPos,k=i.level,E=i.nodes,m={node:c,nodes:E,index:h,key:g,pos:s,level:k},N=S(g,s);u[s]=m,d[N]=m,m.parent=u[K],m.parent&&(m.parent.children=m.parent.children||[],m.parent.children.push(m)),t&&t(m,n)},{externalGetKey:v,childrenPropName:o,fieldNames:p}),a&&a(n),n}function R(e,r){var l=r.expandedKeys,t=r.selectedKeys,a=r.loadedKeys,f=r.loadingKeys,o=r.checkedKeys,p=r.halfCheckedKeys,y=r.dragOverNodeKey,v=r.dropPosition,u=r.keyEntities,d=w(u,e),n={eventKey:e,expanded:l.indexOf(e)!==-1,selected:t.indexOf(e)!==-1,loaded:a.indexOf(e)!==-1,loading:f.indexOf(e)!==-1,checked:o.indexOf(e)!==-1,halfChecked:p.indexOf(e)!==-1,pos:String(d?d.pos:""),dragOver:y===e&&v===0,dragOverGapTop:y===e&&v===-1,dragOverGapBottom:y===e&&v===1};return n}function U(e){var r=e.data,l=e.expanded,t=e.selected,a=e.checked,f=e.loaded,o=e.loading,p=e.halfChecked,y=e.dragOver,v=e.dragOverGapTop,u=e.dragOverGapBottom,d=e.pos,n=e.active,i=e.eventKey,c=x(x({},r),{},{expanded:l,selected:t,checked:a,loaded:f,loading:o,halfChecked:p,dragOver:y,dragOverGapTop:v,dragOverGapBottom:u,pos:d,active:n,key:i});return"props"in c||Object.defineProperty(c,"props",{get:function(){return O(!1,"Second param return from event is node data instead of TreeNode instance. Please read value directly instead of reading from `props`."),e}}),c}function G(e,r){var l=new Set;return e.forEach(function(t){r.has(t)||l.add(t)}),l}function q(e){var r=e||{},l=r.disabled,t=r.disableCheckbox,a=r.checkable;return!!(l||t)||a===!1}function z(e,r,l,t){for(var a=new Set(e),f=new Set,o=0;o<=l;o+=1){var p=r.get(o)||new Set;p.forEach(function(d){var n=d.key,i=d.node,c=d.children,h=c===void 0?[]:c;a.has(n)&&!t(i)&&h.filter(function(s){return!t(s.node)}).forEach(function(s){a.add(s.key)})})}for(var y=new Set,v=l;v>=0;v-=1){var u=r.get(v)||new Set;u.forEach(function(d){var n=d.parent,i=d.node;if(!(t(i)||!d.parent||y.has(d.parent.key))){if(t(d.parent.node)){y.add(n.key);return}var c=!0,h=!1;(n.children||[]).filter(function(s){return!t(s.node)}).forEach(function(s){var g=s.key,K=a.has(g);c&&!K&&(c=!1),!h&&(K||f.has(g))&&(h=!0)}),c&&a.add(n.key),h&&f.add(n.key),y.add(n.key)}})}return{checkedKeys:Array.from(a),halfCheckedKeys:Array.from(G(f,a))}}function H(e,r,l,t,a){for(var f=new Set(e),o=new Set(r),p=0;p<=t;p+=1){var y=l.get(p)||new Set;y.forEach(function(n){var i=n.key,c=n.node,h=n.children,s=h===void 0?[]:h;!f.has(i)&&!o.has(i)&&!a(c)&&s.filter(function(g){return!a(g.node)}).forEach(function(g){f.delete(g.key)})})}o=new Set;for(var v=new Set,u=t;u>=0;u-=1){var d=l.get(u)||new Set;d.forEach(function(n){var i=n.parent,c=n.node;if(!(a(c)||!n.parent||v.has(n.parent.key))){if(a(n.parent.node)){v.add(i.key);return}var h=!0,s=!1;(i.children||[]).filter(function(g){return!a(g.node)}).forEach(function(g){var K=g.key,k=f.has(K);h&&!k&&(h=!1),!s&&(k||o.has(K))&&(s=!0)}),h||f.delete(i.key),s&&o.add(i.key),v.add(i.key)}})}return{checkedKeys:Array.from(f),halfCheckedKeys:Array.from(G(o,f))}}function V(e,r,l,t){var a=[],f;t?f=t:f=q;var o=new Set(e.filter(function(u){var d=!!w(l,u);return d||a.push(u),d})),p=new Map,y=0;Object.keys(l).forEach(function(u){var d=l[u],n=d.level,i=p.get(n);i||(i=new Set,p.set(n,i)),i.add(d),y=Math.max(y,n)}),O(!a.length,"Tree missing follow keys: ".concat(a.slice(0,100).map(function(u){return"'".concat(u,"'")}).join(", ")));var v;return r===!0?v=z(o,p,y,f):v=H(o,r.halfCheckedKeys,p,y,f),v}export{V as a,U as b,Q as c,R as d,S as e,T as f,w as g,L as h,J as i};
