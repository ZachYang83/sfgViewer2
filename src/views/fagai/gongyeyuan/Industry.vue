<template>
  <div id="map">
    <div class="search">
      <el-cascader
        placeholder="搜索工业园"
        :options="options"
        filterable
        clearable
        @change="regionOptionChange"
      ></el-cascader>
    </div>
    <Legend
      :title="title"
      :items="items"
      style="bottom: 20px; left: 10px; width: 200px; height: auto"
    >
    </Legend>
    <div class="timeLine">
      <Timeline @changeData="changeLayer"></Timeline>
    </div>
    <div class="dataPan" v-show="showData" v-bind:class="{ active: showData }">
      <div class="item changzhu">
        <div class="title">
          <h2>工业园工作与流动人口</h2>
        </div>
        <div class="content">
          <keep-alive>
            <component
              :is="idGongyeyuan"
              ref="gongyeyuan_pan"
              :datas="liuchuDatas"
            ></component>
          </keep-alive>
        </div>
        <div class="foot">
          <div
            class="foot-item"
            @click="idGongyeyuan = 'gyy_pop'"
            :class="{ active: idGongyeyuan == 'gyy_pop' }"
          >
            月度人口
          </div>
          <div
            class="foot-item"
            @click="idGongyeyuan = 'gyy_hj'"
            :class="{ active: idGongyeyuan == 'gyy_hj' }"
          >
            工作人口户籍
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Legend from "components/common/Legend.vue";
import Timeline from "./Timeline.vue";
import { init_map } from "utils/initMap.js";
import gongyeyuan from "./option.js";
import {
  add_tms,
  add_wms,
  addgeojson_S,
  addgeojson_L,
} from "utils/loadLayer.js";
import { removeLayers } from "utils/removeLayers.js";
import { getHuji, getGyyById } from "api/fagai/industry.js";
import gyy_hj from "../gongyeyuan/dataPan/Huji.vue";
import gyy_pop from "@/views/fagai/gongyeyuan/dataPan/Chart.vue";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

let workData;
let liudongData;
let MAP;
export default {
  data() {
    return {
      showData: false,
      idGongyeyuan: "gyy_pop",
      liuchuDatas: {},
      title: "工作人口（万人）",
      items: [
        {
          index: 1,
          text: "0 - 5",
          style: "backgroundColor:RGBA(225,225,225)",
        },
        {
          index: 2,
          text: "5 - 10",
          style: "backgroundColor:RGBA(224,250,242)",
        },
        {
          index: 3,
          text: "10 - 20",
          style: "backgroundColor:RGBA(220,240,229)",
        },
        {
          index: 4,
          text: "20 - 30",
          style: "backgroundColor:RGBA(132,196,214)",
        },
        {
          index: 5,
          text: "30 - 50",
          style: "backgroundColor:RGBA(50,107,171)",
        },
        {
          index: 6,
          text: "50以上",
          style: "backgroundColor:RGBA(6,51,154)",
        },
      ],
      timeIndex: 202201,
      layerProp: {
        name: "广州-天河·公园智谷片区",
        id: 142,
      },
      options: gongyeyuan,
    };
  },
  components: {
    Legend,
    Timeline,
    gyy_hj,
    gyy_pop,
  },
  mounted() {
    this.initMap();
    this.loadWMS();
    this.mouseEvent();
  },
  methods: {
    init() {
      MAP.getCanvas().style.cursor = "pointer";
      init_map(MAP, [113.35, 22.9], 6.5);
    },
    initMap() {
      console.log("daffdsa");
      mapboxgl.accessToken =
        "pk.eyJ1IjoiemFjaHlhbmc4MyIsImEiOiJja211MjRsbm4waXMwMm5wZDE3d3BuZjBuIn0.lcRS0kbOWjzFw-UikwbyHQ";

      MAP = new mapboxgl.Map({
        container: "map",
        // style: "mapbox://styles/mapbox/dark-v9",
        // glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
        // style:"mapbox://styles/mapbox/satellite-v9",
        style: {
          version: 8,
          glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
          sources: {
            mapsource: {
              type: "raster",
              tiles: [
                "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
              ],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: "mapsource",
              type: "raster",
              source: "mapsource",
              minzoom: 0,
              maxzoom: 18,
            },
          ],
        },
        center: [113.35, 22.9],
        attributionControl: false,
        zoom: 6.5,
        antialias: false,
        // pitch: 60,
        // bearing: -5,
      });
      MAP.getCanvas().style.cursor = "pointer";
    },
    loadWMS() {
      MAP.on("load", function () {
        MAP.addSource("sfg_gongyeyuan", {
          type: "vector",
          scheme: "tms",
          tiles: [
            "https://zwfw.credit.gdgov.cn/geoserver/gwc/service/tms/1.0.0/gpzi%3Asfg_gongyeyuan@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
            // "http://8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Asfg_gongyeyuan@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
          ],
        });
        MAP.addLayer({
          id: "sfg_gongyeyuan",
          source: "sfg_gongyeyuan",
          "source-layer": "sfg_gongyeyuan",
          type: "fill",
          paint: {
            "fill-outline-color": "#455a64",
            "fill-color": [
              "case",
              ["<", ["get", "work1"], 20000],
              "RGBA(225,225,225,0.7)",
              ["<", ["get", "work1"], 50000],
              "RGBA(224,250,242,0.7)",
              ["<", ["get", "work1"], 100000],
              "RGBA(220,240,229,0.7)",
              ["<", ["get", "work1"], 200000],
              "RGBA(132,196,214,0.7)",
              ["<", ["get", "work1"], 500000],
              "RGBA(50,107,171,0.7)",
              "RGBA(6,51,154,0.7)",
            ],
          },
        });
        MAP.addLayer({
          id: "sfg_gongyeyuan_sym",
          source: "sfg_gongyeyuan",
          "source-layer": "sfg_gongyeyuan",
          type: "symbol",
          layout: {
            "icon-image": "",
            "text-field": "{Name}\n{work1}", //此属性为需要显示的字段
            "text-size": 12,
            "text-anchor": "top",
          },
          paint: {
            "text-color": "#ffffff",
          },
        });
        MAP.addLayer({
          id: "sfg_gongyeyuan-line",
          type: "line",
          source: "sfg_gongyeyuan",
          "source-layer": "sfg_gongyeyuan",
          paint: {
            "line-color": "#ff4081",
            "line-width": 1,
          },
        });
        MAP.addLayer({
          id: "sfg_gongyeyuan-hl",
          type: "line",
          source: "sfg_gongyeyuan",
          "source-layer": "sfg_gongyeyuan",
          paint: {
            "line-color": "#18ffff",
            "line-width": 3,
            // "text-color": "#ffff00",
          },
          filter: ["in", "Name", ""],
        });
      });
    },
    changeLayer(index) {
      var field;
      var text;
      switch (index) {
        case 0:
          field = "work1";
          text = "{Name}\n{work1}";
          break;
        case 1:
          field = "work2";
          text = "{Name}\n{work2}";
          break;
        case 2:
          field = "work3";
          text = "{Name}\n{work3}";
          break;
        case 3:
          field = "work4";
          text = "{Name}\n{work4}";
          break;
        case 4:
          field = "work5";
          text = "{Name}\n{work5}";
          break;
        case 5:
          field = "work6";
          text = "{Name}\n{work6}";
          break;
        case 6:
          field = "work7";
          text = "{Name}\n{work7}";
          break;
        case 7:
          field = "work8";
          text = "{Name}\n{work8}";
          break;
        case 8:
          field = "work9";
          text = "{Name}\n{work9}";
          break;
        case 9:
          field = "work10";
          text = "{Name}\n{work10}";
          break;
      }
      var paintO = {
        "fill-outline-color": "#455a64",
        "fill-color": [
          "case",
          ["<", ["get", field], 20000],
          "RGBA(225,225,225,0.7)", //<10.8
          ["<", ["get", field], 50000],
          "RGBA(224,250,242,0.7)", //>=10.8 & <17.2
          ["<", ["get", field], 100000],
          "RGBA(220,240,229,0.7)",
          ["<", ["get", field], 200000],
          "RGBA(132,196,214,0.7)",
          ["<", ["get", field], 500000],
          "RGBA(50,107,171,0.7)",
          "RGBA(6,51,154,0.7)", // 默认值, >=50.1
        ],
      };
      var layoutO = {
        "icon-image": "",
        "text-field": text, //此属性为需要显示的字段
        "text-size": 12,
        "text-anchor": "top",
      };
      MAP.removeLayer("sfg_gongyeyuan");
      MAP.addLayer({
        id: "sfg_gongyeyuan",
        source: "sfg_gongyeyuan",
        "source-layer": "sfg_gongyeyuan",
        type: "fill",
        paint: paintO,
      });
      MAP.removeLayer("sfg_gongyeyuan_sym");
      MAP.addLayer({
        id: "sfg_gongyeyuan_sym",
        source: "sfg_gongyeyuan",
        "source-layer": "sfg_gongyeyuan",
        type: "symbol",
        layout: layoutO,
      });
      MAP.removeLayer("sfg_gongyeyuan-hl");
      MAP.addLayer({
        id: "sfg_gongyeyuan-hl",
        source: "sfg_gongyeyuan",
        "source-layer": "sfg_gongyeyuan",
        type: "line",
        paint: {
          "line-color": "#18ffff",
          "line-width": 3,
        },
        filter: ["in", "id", ""],
      });
    },
    mouseEvent() {
      let _this = this;
      MAP.on("click", _this.getInfo);
    },
    getInfo(e) {
      let _this = this;
      var features = MAP.queryRenderedFeatures(e.point);
      if (features[0].layer.id == "sfg_gongyeyuan") {
        var props = features[0].properties;
        workData = [
          props["work1"],
          props["work2"],
          props["work3"],
          props["work4"],
          props["work5"],
          props["work6"],
          props["work7"],
          props["work8"],
          props["work9"],
          props["work10"],
        ];
        liudongData = [
          props["flow1"],
          props["flow2"],
          props["flow3"],
          props["flow4"],
          props["flow5"],
          props["flow6"],
          props["flow7"],
          props["flow8"],
          props["flow9"],
          props["flow10"],
        ];
        MAP.setFilter("sfg_gongyeyuan-hl", [
          "in",
          "id",
          features[0].properties.id,
        ]);
      }
      _this.layerProp = {
        id: props.id,
        name: props.name,
      };
      this.getData();
    },
    getData() {
      let _this = this;
      getHuji("/shengfagai/gongyeyuan-hj/getGyyHuji", {
        indId: _this.layerProp.id,
        time: _this.timeIndex,
      }).then((res) => {
        _this.liuchuDatas = {
          workData: workData,
          liudongData: liudongData,
          hujidata: res.data.data[0],
        };
        _this.showData = true;
        _this.$refs["gongyeyuan_pan"].setChart(_this.liuchuDatas);
      });
    },
    changeData(index) {
      this.timeIndex = index;
      this.getData();
    },
    regionOptionChange(e) {
      let _this = this;
      let gyyId = e[1];
      getGyyById("/shengfagai/industry/getGyyById", {
        id: parseInt(gyyId),
      }).then((res) => {
        let gyyData = res.data.data;
        let point_center = [gyyData['lon'],gyyData['lat']];
        let geojson = gyyData["geojson"];
        if (MAP.getLayer("sfg_gyy")) {
          MAP.removeLayer("sfg_gyy");
          MAP.removeSource("sfg_gyy");
        }
        MAP.addSource("sfg_gyy", {
          type: "geojson",
          data: JSON.parse(geojson),
        });
        MAP.addLayer({
          id: "sfg_gyy",
          type: "line",
          source: "sfg_gyy",
          paint: {
            "line-color": "#18ffff",
            "line-width": 3,
          },
        });
        MAP.flyTo({
          center:point_center,
          zoom:11,
        })
        _this.getInfo();
      });
      // });
    },
  },
  destroyed() {
    let _this = this;
    removeLayers(MAP, [
      "sfg_gongyeyuan-hl",
      "sfg_gongyeyuan_sym",
      "sfg_gongyeyuan-line",
      "sfg_gongyeyuan",
    ]);
    MAP.off("click", _this.getInfo);
  },
};
</script>

<style lang='scss' scoped>
#map {
  width: 100%;
  height: 100%;
  // height:calc(100% - 80px);
}

.search {
  position: absolute;
  top: 30px;
  left: 30px;
  width: 200px;
  // height: 100px;
  z-index: 9999;
}

.legend {
  width: 100%;
  height: calc(100% - 40px);
  z-index: 999;

  .legend_item {
    width: 95%;
    height: 30px;
    margin-top: 10px;
    box-sizing: border-box;
  }

  .color {
    float: left;
    width: 25%;
    height: 100%;
    margin: 0px 10px;
    box-sizing: border-box;
  }

  .text {
    float: left;
    width: 55%;
    height: 100%;
    line-height: 30px;

    box-sizing: border-box;
    text-align: center;
    color: aliceblue;
  }
}

.timeLine {
  position: absolute;
  bottom: 30px;
  width: 40%;
  right: 50%;
  transform: translateX(50%);
  height: 60px;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6);
  padding: 5px 0px;
  border-radius: 40px;
}

.dataPan {
  position: absolute;
  display: flex;
  justify-content: center;
  top: 10px;
  right: 10px;
  width: 0px;
  height: calc(100% - 20px);
  background: linear-gradient(to left, #17c5a5, #17c5a5) left top no-repeat,
    linear-gradient(to bottom, #17c5a5, #17c5a5) left top no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) right top no-repeat,
    linear-gradient(to bottom, #17c5a5, #17c5a5) right top no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) left bottom no-repeat,
    linear-gradient(to bottom, #17c5a5, #17c5a5) left bottom no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) right bottom no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) right bottom no-repeat;
  background-size: 1px 15px, 15px 1px;
  background-color: rgba(44, 47, 48, 0.7);
  transition: width 0.25s;
  z-index: 999;
  &.active {
    width: 400px;
  }

  .item {
    height: 100%;
    flex: 1;

    .title {
      width: 100%;
      height: 50px;
      text-align: center;
      background-color: RGBA(8, 32, 52, 0.7);
      line-height: 50px;
      color: #bdbdbd;
    }
    .content {
      width: 100%;
      height: calc(100% - 90px);

      #data2019_2022 {
        width: 100%;
        height: 60%;
      }
    }
    .foot {
      display: flex;
      width: 100%;
      height: 40px;
      background-color: RGBA(8, 32, 52, 0.7);
    }

    .foot-item {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      color: #bdbdbd;
      cursor: pointer;
    }
    .active {
      background-color: yellowgreen;
      color: #2a8d8d;
      font-size: 17px;
      font-weight: 800;
    }
  }

  .changzhu {
    border-right: #003366 2px solid;
  }

  .jiuye {
    border-right: #003366 2px solid;
  }
}
</style>
