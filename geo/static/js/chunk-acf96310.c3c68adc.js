(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-acf96310"],{"0b97":function(e,t,a){"use strict";a("4d4c")},"18cf":function(e,t,a){"use strict";a("d645")},"1da4":function(e,t,a){},2019:function(e,t,a){"use strict";a("bab3")},"25d8":function(e,t,a){"use strict";a("f289")},"4d4c":function(e,t,a){},"5b13":function(e,t,a){"use strict"},7714:function(e,t,a){"use strict";a("1da4")},"8c93":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"legendClass",staticClass:"legendClass"},[e.isFold?a("div",{staticClass:"foldState",on:{click:e.unShowData}},[a("span",[e._v(e._s(e.title))])]):a("div",{staticClass:"showState"},[a("div",{staticClass:"head",on:{click:e.unShowData}},[a("span",{staticClass:"title"},[a("span",[e._v(e._s(e.title))])])]),a("div",{staticClass:"body"},[e._l(e.items,(function(t){return[a("li",{key:t.key,staticClass:"legendItem",attrs:{index:t.index}},[a("div",{staticClass:"color",style:t.style}),a("div",{staticClass:"legendText",style:e.legentText},[e._v(e._s(t.text))])])]}))],2)])])},n=[],l={name:"legendClass",props:{title:{default:null},items:{default:Array},legentText:{default:null}},data(){return{isFold:!1}},methods:{unShowData(){this.isFold=!this.isFold}}},s=l,o=(a("7714"),a("2877")),u=Object(o["a"])(s,i,n,!1,null,"1f0ae8ec",null);t["a"]=u.exports},a324:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"map"}},[a("Legend",{staticStyle:{bottom:"20px",left:"10px",width:"200px",height:"auto"},attrs:{title:e.title,items:e.items}}),a("div",{staticClass:"timeLine"},[a("Timeline",{on:{changeData:e.changeLayer}})],1),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showData,expression:"showData"}],staticClass:"dataPan",class:{active:e.showData}},[a("div",{staticClass:"item changzhu"},[a("div",{staticClass:"title"},[a("h2",[e._v(e._s(e.layerProp.county)+"流出人口")])]),a("div",{staticClass:"content"},[a("keep-alive",[a(e.isLiuchu,{ref:"liuchu_pan",tag:"component",attrs:{datas:e.liuchuDatas}})],1)],1),a("div",{staticClass:"foot"},[a("div",{staticClass:"foot-item",class:{active:"liuchu_hj"==e.isLiuchu},on:{click:function(t){e.isLiuchu="liuchu_hj"}}},[e._v(" 户籍 ")]),a("div",{staticClass:"foot-item",class:{active:"liuchu_zb"==e.isLiuchu},on:{click:function(t){e.isLiuchu="liuchu_zb"}}},[e._v(" 占比 ")])])])])],1)},n=[],l=a("8c93"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"timeline"}},[a("div",{ref:"timeline-table",staticClass:"timeline-table"})])},o=[],u=a("313e");let c={timeline:{axisType:"category",lineStyle:{show:!0},symbol:"circle",itemStyle:{normal:{color:"rgba(194,53,49, 0.5)"}},controlStyle:{showPrevBtn:!0,showNextBtn:!0,normal:{color:"rgba(194,53,49, 0.5)",borderColor:"rgba(194,53,49, 0.5)"}},orient:"horizontal",inverse:!1,x:0,x2:0,y:0,width:"90%",height:"80%",loop:!1,autoPlay:!1,playInterval:1e3,realtime:!0},baseOption:{tooltip:{trigger:"axis"}}};class r{constructor(){this.chart=void 0,this.lastIndex=0}static makeTimeline(e,t,a){let i=new r,n=t.timeline.data.length,l=u["util"].merge(c,t,!0);l=l||{},i.chart=u["init"](e,null,{}),i.chart.on("timelineChanged",e=>{let t=i.lastIndex,l=e.currentIndex;console.log("last index:"+t+",current index:"+l),0!==n?t!=l?(i.lastIndex=l,console.log("move "+t+" to "+l),a.callback(i,e)):t===l&&(0===t?a.last(i,e):a.next(i,e)):console.log("no data.")}),i.chart.setOption(l)}update(e){let t=u["util"].merge(c,e,!0),a=t.timeline.currentIndex;this.chart.setOption(t),this.lastIndex=void 0!=a?a:0}}var h={name:"Timeline",data(){return{}},mounted:function(){let e=this,t=this.$refs["timeline-table"],a=this,i={timeline:{data:[202201,202202,202203,202204,202205,202206,202207,202208,202209],label:{formatter:function(e){return e}}}},n=[1,20],l={callback:(t,a)=>{let i=a.currentIndex;e.changeData(i)},last:(e,t)=>{let l=t.currentIndex;if(curPage>n[0]){curPage-=1,i.timeline.data=a.getDataJson(start,len,-1);let t=i.timeline.data.length-1;i.timeline.currentIndex=t,e.update(i),start-=len}console.log("-curPage:"+curPage+",curIndex:"+l)},next:(e,t)=>{let l=t.currentIndex;curPage<n[1]&&(curPage+=1,i.timeline.data=a.getDataJson(start,len,1),i.timeline.currentIndex=0,e.update(i),start+=len),console.log("+curPage:"+curPage+",curIndex:"+l)}};r.makeTimeline(t,i,l)},methods:{changeData(e){console.log("子组件");let t=[202201,202202,202203,202204,202205,202206,202207,202208,202209];this.$parent.changeLayer(e,t[e])}}},d=h,y=(a("0b97"),a("2877")),m=Object(y["a"])(d,s,o,!1,null,"2c90b1a5",null),g=m.exports,f=a("e624"),p=(a("5b13"),a("b21f")),v=a("b775");function x(e,t){return Object(v["a"])({url:e,method:"get",params:t})}function b(e,t){return Object(v["a"])({url:e,method:"get",params:t})}var k=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"lc_hujiData"}})},_=[];let j;var w={name:"liuchu_hj",props:{datas:{type:Object,default:()=>({})}},mounted(){var e=document.getElementById("lc_hujiData");j=echarts.init(e)},methods:{setChart(e){this.$nextTick(()=>{j.resize()});let t=[{key:"北京",value:e.huji.beijing},{key:"天津",value:e.huji.tianjin},{key:"河北",value:e.huji.hebei},{key:"山西",value:e.huji.shanxi},{key:"内蒙古",value:e.huji.neimenggu},{key:"辽宁",value:e.huji.liaoling},{key:"吉林",value:e.huji.jilin},{key:"黑龙江",value:e.huji.heilongjiang},{key:"上海",value:e.huji.shanghai},{key:"江苏",value:e.huji.jiangsu},{key:"浙江",value:e.huji.zhejiang},{key:"安徽",value:e.huji.anhui},{key:"福建",value:e.huji.fujian},{key:"江西",value:e.huji.jiangxi},{key:"山东",value:e.huji.shandong},{key:"河南",value:e.huji.henan},{key:"湖北",value:e.huji.hubei},{key:"湖南",value:e.huji.hunan},{key:"广东",value:e.huji.guangdong},{key:"广西",value:e.huji.guangxi},{key:"海南",value:e.huji.hainan},{key:"重庆",value:e.huji.chongqing},{key:"四川",value:e.huji.sichuan},{key:"贵州",value:e.huji.guizhou},{key:"云南",value:e.huji.yunnan},{key:"西藏",value:e.huji.xizang},{key:"陕西",value:e.huji.shannxi},{key:"甘肃",value:e.huji.gansu},{key:"青海",value:e.huji.qinghai},{key:"宁夏",value:e.huji.ningxia},{key:"新疆",value:e.huji.xinjiang}];t.sort((e,t)=>e.value-t.value);let a=[],i=[];t.forEach(e=>{i.push(e.key),a.push(e.value)});let n={tooltip:{trigger:"item",formatter:"{b}:{c}"},grid:{x:50,y:10,y2:20},xAxis:{type:"value",boundaryGap:[0,.02],splitLine:{show:!1},axisLabel:{show:!1},axisLine:{show:!1},axisTick:{show:!1}},yAxis:{type:"category",data:i,splitLine:{show:!1},axisLabel:{textStyle:{color:"#00FFFF"},interval:0},axisLine:{show:!0,lineStyle:{color:"#00FFFF"}}},color:"#00FFFF",series:[{type:"bar",data:a,itemStyle:{normal:{label:{show:!0,position:"right",textStyle:{color:"#00FFFF",fontSize:10}}}}}]};j.setOption(n,!0)}}},F=w,C=(a("25d8"),Object(y["a"])(F,k,_,!1,null,"38f0ef6c",null)),L=C.exports,S=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},B=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"lc_zhanbiData"}},[a("div",{attrs:{id:"lc_barpan"}}),a("div",{attrs:{id:"lc_piepan"}})])}];let D,I;var z={name:"liuchu_zb",props:{datas:{type:Object,default:()=>({})}},mounted(){var e=document.getElementById("lc_barpan");D=echarts.init(e);var t=document.getElementById("lc_piepan");I=echarts.init(t),this.setChart(this.datas)},methods:{setChart(e){this.$nextTick(()=>{D.resize(),I.resize()});let t=[{key:"1月",value:e.monthdata[0]},{key:"2月",value:e.monthdata[1]},{key:"3月",value:e.monthdata[2]},{key:"4月",value:e.monthdata[3]},{key:"5月",value:e.monthdata[4]},{key:"6月",value:e.monthdata[5]},{key:"7月",value:e.monthdata[6]},{key:"8月",value:e.monthdata[7]},{key:"9月",value:e.monthdata[8]}],a=[],i=[];t.forEach(e=>{a.push(e.key),i.push(e.value)});let n={title:{left:"center",text:"区县月度流出人口",textStyle:{color:"#BDBDBD"}},tooltip:{trigger:"item",formatter:"{b}:{c}"},grid:{x:50,y:50,y2:30},yAxis:{type:"value",boundaryGap:[0,.02],splitLine:{show:!1},axisLabel:{show:!0},axisLine:{show:!0,lineStyle:{color:"#00FFFF"}},axisTick:{show:!1}},xAxis:{type:"category",data:a,splitLine:{show:!1},axisLabel:{textStyle:{color:"#00FFFF"},interval:0},axisLine:{show:!0,lineStyle:{color:"#00FFFF"}}},color:"#00FFFF",series:[{type:"bar",data:i,itemStyle:{normal:{label:{show:!0,position:"top",textStyle:{color:"#00FFFF",fontSize:10}}}}}]};D.setOption(n,!0);let l=e.countydata;l.sort((e,t)=>e.temp-t.temp);let s=[];l.forEach(e=>{s.push({name:e.county,value:e.temp})});var o={title:{left:"center",text:"当月流出占全市流出比值",textStyle:{color:"#BDBDBD"}},tooltip:{trigger:"item",formatter:"{b}{d}%"},series:[{type:"pie",radius:["30%","80%"],avoidLabelOverlap:!0,selectedMode:!0,itemStyle:{normal:{label:{show:!0,position:"inner",textStyle:{color:"#fff",fontSize:13},formatter:"{b}\n{d}%"},labelLine:{show:!1}},emphasis:{label:{show:!0,formatter:"{b}\n{d}%"}}},data:s}]};I.setOption(o,!0)}}},P=z,G=(a("18cf"),Object(y["a"])(P,S,B,!1,null,"55d9a03f",null)),O=G.exports,R=a("e192"),E=a.n(R);a("ac6d");let T,M;var $={data(){return{showData:!1,isLiuchu:"liuchu_hj",liuchuDatas:{},title:"流出人口（万人）",items:[{index:1,text:"0 - 5",style:"backgroundColor:RGB(225,225,225)"},{index:2,text:"5 - 10",style:"backgroundColor:RGB(224,250,242)"},{index:3,text:"10 - 15",style:"backgroundColor:RGB(220,240,229)"},{index:4,text:"15 - 30",style:"backgroundColor:RGB(132,196,214)"},{index:5,text:"30 - 60",style:"backgroundColor:RGB(50,107,171)"},{index:6,text:"60 - 120",style:"backgroundColor:RGB(6,51,154)"}],timeIndex:202201,layerProp:{city:"番禺区",cityid:68,county:"广州番禺区"}}},components:{Legend:l["a"],Timeline:g,liuchu_hj:L,liuchu_zb:O},mounted(){this.initMap(),this.loadWMS(),this.mouseEvent()},methods:{init(){M.getCanvas().style.cursor="pointer",Object(f["a"])(M,[113.35,22.9],6.5)},initMap(){console.log("daffdsa"),E.a.accessToken="pk.eyJ1IjoiemFjaHlhbmc4MyIsImEiOiJja211MjRsbm4waXMwMm5wZDE3d3BuZjBuIn0.lcRS0kbOWjzFw-UikwbyHQ",M=new E.a.Map({container:"map",style:{version:8,glyphs:"mapbox://fonts/mapbox/{fontstack}/{range}.pbf",sources:{mapsource:{type:"raster",tiles:["https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"],tileSize:256}},layers:[{id:"mapsource",type:"raster",source:"mapsource",minzoom:0,maxzoom:18}]},center:[113.35,22.9],attributionControl:!1,zoom:6.5,antialias:!1}),M.getCanvas().style.cursor="pointer"},loadWMS(){M.on("load",(function(){M.addSource("sfg_liuchu",{type:"vector",scheme:"tms",tiles:["https://zwfw.credit.gdgov.cn/geoserver/gwc/service/tms/1.0.0/gpzi%3Asfg_liuchu@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf"]}),M.addLayer({id:"sfg_liuchu",source:"sfg_liuchu","source-layer":"sfg_liuchu",type:"fill",paint:{"fill-outline-color":"#455a64","fill-color":["case",["<",["get","1mon"],5],"RGB(225,225,225)",["<",["get","1mon"],10],"RGB(224,250,242)",["<",["get","1mon"],15],"RGB(220,240,229)",["<",["get","1mon"],30],"RGB(132,196,214)",["<",["get","1mon"],60],"RGB(50,107,171)","RGB(6,51,154)"]}}),M.addLayer({id:"sfg_liuchu_sym",source:"sfg_liuchu","source-layer":"sfg_liuchu",type:"symbol",layout:{"icon-image":"","text-field":"{county}\n{1mon}","text-size":12,"text-anchor":"top"}}),M.addLayer({id:"sfg_liuchu-hl",type:"line",source:"sfg_liuchu","source-layer":"sfg_liuchu",paint:{"line-color":"#18ffff","line-width":3},filter:["in","cityid",""]})}))},changeLayer(e,t){var a,i;switch(e){case 0:a="1mon",i="{county}\n{1mon}";break;case 1:a="2mon",i="{county}\n{2mon}";break;case 2:a="3mon",i="{county}\n{3mon}";break;case 3:a="4mon",i="{county}\n{4mon}";break;case 4:a="5mon",i="{county}\n{5mon}";break;case 5:a="6mon",i="{county}\n{6mon}";break;case 6:a="7mon",i="{county}\n{7mon}";break;case 7:a="8mon",i="{county}\n{8mon}";break;case 8:a="9mon",i="{county}\n{9mon}";break;case 9:a="10mon",i="{county}\n{10mon}";break}var n={"fill-outline-color":"#455a64","fill-color":["case",["<",["get",a],5],"RGB(225,225,225)",["<",["get",a],10],"RGB(224,250,242)",["<",["get",a],15],"RGB(220,240,229)",["<",["get",a],30],"RGB(132,196,214)",["<",["get",a],60],"RGB(50,107,171)","RGB(6,51,154)"]},l={"icon-image":"","text-field":i,"text-size":12,"text-anchor":"top"};M.removeLayer("sfg_liuchu"),M.addLayer({id:"sfg_liuchu",source:"sfg_liuchu","source-layer":"sfg_liuchu",type:"fill",paint:n}),M.removeLayer("sfg_liuchu_sym"),M.addLayer({id:"sfg_liuchu_sym",source:"sfg_liuchu","source-layer":"sfg_liuchu",type:"symbol",layout:l}),M.removeLayer("sfg_liuchu-hl"),M.addLayer({id:"sfg_liuchu-hl",source:"sfg_liuchu","source-layer":"sfg_liuchu",type:"line",paint:{"line-color":"#18ffff","line-width":3},filter:["in","cityid",""]}),this.timeIndex=t,this.getData()},mouseEvent(){let e=this;M.on("click",e.getInfo)},getInfo(e){let t=this;var a=M.queryRenderedFeatures(e.point);if("sfg_liuchu"==a[0].layer.id){var i=a[0].properties;T=[i["1mon"],i["2mon"],i["3mon"],i["4mon"],i["5mon"],i["6mon"],i["7mon"],i["8mon"],i["9mon"]],M.setFilter("sfg_liuchu-hl",["in","cityid",a[0].properties.cityid])}t.layerProp={cityid:i.cityid,city:i.city,county:i.county},this.getData()},getData(){let e=this;b("/shengfagai/liuchu-qx/getQuxian",{city:e.layerProp.city,time:e.timeIndex}).then(t=>{e.liuchuDatas={monthdata:T,countydata:t.data.data,county:e.layerProp.county}});let t={cityid:e.layerProp.cityid,time:e.timeIndex};x("/shengfagai/liuchu-hj/getHuji",t).then(t=>{e.liuchuDatas.huji=t.data.data[0],e.showData=!0,e.$refs["liuchu_pan"].setChart(e.liuchuDatas)})}},destroyed(){let e=this;Object(p["a"])(M,["sfg_liuchu-hl","sfg_liuchu_sym","sfg_liuchu"]),M.off("click",e.getInfo)}},A=$,q=(a("2019"),Object(y["a"])(A,i,n,!1,null,"28051355",null));t["default"]=q.exports},b21f:function(e,t,a){"use strict";function i(e,t){t.forEach(t=>{e.getLayer(t)&&e.removeLayer(t),e.getSource(t)&&e.removeSource(t)})}a.d(t,"a",(function(){return i}))},b775:function(e,t,a){"use strict";var i=a("bc3a"),n=a.n(i),l=a("5c96");const s=n.a.create({baseURL:"https://zwfw.credit.gdgov.cn/yxjc/geo-api/"});s.interceptors.request.use(e=>e,e=>(console.log(e),Promise.reject(e))),s.interceptors.response.use(e=>200===e.status?Promise.resolve(e):Promise.reject(e),e=>(console.log("err"+e),Object(l["Message"])({message:e.message,type:"error",duration:1e4}),Promise.reject(e))),t["a"]=s},bab3:function(e,t,a){},d645:function(e,t,a){},e624:function(e,t,a){"use strict";function i(e,t,a,i=0){e.setCenter(t),e.setZoom(a),e.setPitch(i)}a.d(t,"a",(function(){return i}))},f289:function(e,t,a){}}]);
//# sourceMappingURL=chunk-acf96310.c3c68adc.js.map