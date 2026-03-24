import{defineComponent as w,ref as d,onMounted as P,openBlock as v,createElementBlock as y,createElementVNode as e,unref as t,toDisplayString as r,Fragment as A,renderList as $,normalizeClass as M,withDirectives as k,vModelText as _,createCommentVNode as N}from"/assets/dock/js/vendor/vue.esm.js";import{useRoute as T,useRouter as E}from"/assets/dock/js/vendor/vue-router.esm.js";import{_ as a}from"./useApi--RE_xnFc.js";import{u as R}from"./useDiscussions-B_eCRNTw.js";const S={class:"max-w-3xl mx-auto px-4 py-6"},G={class:"text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6"},V={class:"space-y-4"},q={class:"flex gap-2"},L=["onClick"],W=["placeholder"],j={key:0,class:"flex items-center gap-2"},B={class:"text-xs text-gray-500"},I={class:"text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"},O=["placeholder"],U={class:"flex justify-end gap-2"},z=["disabled"],F={name:"DockDiscussionNew"},Z=w({...F,setup(Y){const m=T(),g=E(),{create:h}=R(),l=d(""),s=d(""),c=d("General"),p=d(!1),f=[{value:"General",label:"General"},{value:"Decision",label:"Decision"},{value:"Meeting Protocol",label:"Meeting Protocol"},{value:"Retrospective",label:"Retrospective"},{value:"Proposal",label:"Proposal"}],x={General:"",Decision:`## Context

## Options Considered
1. 
2. 

## Decision

## Consequences
`,"Meeting Protocol":`## Attendees

## Agenda
1. 

## Discussion Notes

## Decisions
- 

## Action Items
- `,Retrospective:`## What went well
- 

## What could improve
- 

## Action items
- `,Proposal:`## Problem

## Proposed Solution

## Alternatives Considered
1. 

## Impact
`},i=d(m.query.link_doctype||""),u=d(m.query.link_name||"");P(()=>{i.value&&u.value&&(l.value=`Discussion: ${i.value} ${u.value}`)});function D(){(!s.value.trim()||Object.values(x).includes(s.value))&&(s.value=x[c.value]||"")}async function C(){if(!(!l.value.trim()||!s.value.trim())){p.value=!0;try{const b=i.value&&u.value?[{doctype:i.value,name:u.value}]:void 0,n=await h({title:l.value,content:`<p>${s.value.replace(/\n/g,"</p><p>")}</p>`,discussion_type:c.value,linked_records:b});g.push(`/discussions/${n.name}`)}finally{p.value=!1}}}return(b,n)=>(v(),y("div",S,[e("button",{class:"text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-4",onClick:n[0]||(n[0]=o=>t(g).push("/discussions"))}," ← "+r(t(a)("All Discussions")),1),e("h1",G,r(t(a)("New Discussion")),1),e("div",V,[e("div",q,[(v(),y(A,null,$(f,o=>e("button",{key:o.value,class:M(["text-xs px-3 py-1.5 rounded-md transition-colors",c.value===o.value?"bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900":"border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"]),onClick:H=>{c.value=o.value,D()}},r(t(a)(o.label)),11,L)),64))]),k(e("input",{"onUpdate:modelValue":n[1]||(n[1]=o=>l.value=o),type:"text",placeholder:t(a)("Discussion title"),class:"w-full text-lg font-medium border-b border-gray-200 dark:border-gray-700 py-2 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"},null,8,W),[[_,l.value]]),i.value&&u.value?(v(),y("div",j,[e("span",B,r(t(a)("Linked to"))+":",1),e("span",I,r(i.value)+": "+r(u.value),1)])):N("",!0),k(e("textarea",{"onUpdate:modelValue":n[2]||(n[2]=o=>s.value=o),placeholder:t(a)("Write your discussion content..."),class:"w-full min-h-[300px] text-sm border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 font-mono"},null,8,O),[[_,s.value]]),e("div",U,[e("button",{class:"text-sm px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300",onClick:n[3]||(n[3]=o=>t(g).push("/discussions"))},r(t(a)("Cancel")),1),e("button",{class:"text-sm px-4 py-2 rounded-md bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 transition-colors",disabled:!l.value.trim()||!s.value.trim()||p.value,onClick:C},r(p.value?t(a)("Creating..."):t(a)("Create Discussion")),9,z)])])]))}});export{Z as default};
