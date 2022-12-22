<template>
  <div id="map">
    <div class="search">
      <el-cascader
        placeholder="搜索商圈"
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
    <div class="timeLine" @changeData="changeData">
      <Timeline @changeData="changeLayer"></Timeline>
    </div>
    <div class="dataPan" v-show="showData" v-bind:class="{ active: showData }">
      <div class="item changzhu">
        <div class="title">
          <h2>商圈客流</h2>
        </div>
        <div class="content">
          <keep-alive>
            <component
              :is="idGongyeyuan"
              ref="shangquan_pan"
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
            客流人口户籍
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
import shangquan from "./option.js";
import {
  add_tms,
  add_wms,
  addgeojson_S,
  addgeojson_L,
} from "utils/loadLayer.js";
import { removeLayers } from "utils/removeLayers.js";
import { getHuji, getSqById } from "api/fagai/shangquan.js";
import gyy_hj from "../business/dataPan/Huji.vue";
import gyy_pop from "@/views/fagai/business/dataPan/Chart.vue";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
window.mapbox = mapboxgl;

let workData;
let liudongData;
let MAP;
export default {
  data() {
    return {
      map: null,
      showData: false,
      idGongyeyuan: "gyy_pop",
      liuchuDatas: {},
      title: "客流人口（万人）",
      items: [
        {
          index: 1,
          text: "0 - 10",
          style: "backgroundColor:RGBA(225,225,225)",
        },
        {
          index: 2,
          text: "10 - 20",
          style: "backgroundColor:RGBA(224,250,242)",
        },
        {
          index: 3,
          text: "20 - 30",
          style: "backgroundColor:RGBA(220,240,229)",
        },
        {
          index: 4,
          text: "30 - 50",
          style: "backgroundColor:RGBA(132,196,214)",
        },
        {
          index: 5,
          text: "50 - 100",
          style: "backgroundColor:RGBA(50,107,171)",
        },
        {
          index: 6,
          text: "100以上",
          style: "backgroundColor:RGBA(6,51,154)",
        },
      ],
      timeIndex: 202201,
      layerProp: {
        name: "天河城",
        busId: 356,
      },
      options: shangquan,
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
        MAP.addSource("sfg_shangquan", {
          type: "vector",
          scheme: "tms",
          tiles: [
            // "http://8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3Asfg_shangquan@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
            "https://zwfw.credit.gdgov.cn/geoserver/gwc/service/tms/1.0.0/gpzi%3Asfg_shangquan@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
          ],
        });
        MAP.addLayer({
          id: "sfg_shangquan",
          source: "sfg_shangquan",
          "source-layer": "sfg_shangquan",
          type: "fill",
          paint: {
            "fill-outline-color": "#455a64",
            "fill-color": [
              "case",
              ["<", ["get", "mon1"], 10],
              "RGBA(225,225,225,0.7)",
              ["<", ["get", "mon1"], 20],
              "RGBA(224,250,242,0.7)",
              ["<", ["get", "mon1"], 30],
              "RGBA(220,240,229,0.7)",
              ["<", ["get", "mon1"], 50],
              "RGBA(132,196,214,0.7)",
              ["<", ["get", "mon1"], 100],
              "RGBA(50,107,171,0.7)",
              "RGBA(6,51,154,0.7)",
            ],
          },
        });
        MAP.addLayer({
          id: "sfg_shangquan_sym",
          source: "sfg_shangquan",
          "source-layer": "sfg_shangquan",
          type: "symbol",
          layout: {
            "icon-image": "",
            "text-field": "{Name}\n{mon1}", //此属性为需要显示的字段
            "text-size": 12,
            "text-anchor": "top",
          },
          paint: {
            "text-color": "#ffffff",
          },
        });
        MAP.addLayer({
          id: "sfg_shangquan-line",
          type: "line",
          source: "sfg_shangquan",
          "source-layer": "sfg_shangquan",
          paint: {
            "line-color": "#ff4081",
            "line-width": 1,
          },
        });
        MAP.addLayer({
          id: "sfg_shangquan-hl",
          type: "line",
          source: "sfg_shangquan",
          "source-layer": "sfg_shangquan",
          paint: {
            "line-color": "#18ffff",
            "line-width": 3,
          },
          filter: ["in", "id", ""],
        });
      });
    },
    changeLayer(index) {
      var field;
      var text;
      switch (index) {
        case 0:
          field = "mon1";
          text = "{Name}\n{mon1}";
          break;
        case 1:
          field = "mon2";
          text = "{Name}\n{mon2}";
          break;
        case 2:
          field = "mon3";
          text = "{Name}\n{mon3}";
          break;
        case 3:
          field = "mon4";
          text = "{Name}\n{mon4}";
          break;
        case 4:
          field = "mon5";
          text = "{Name}\n{mon5}";
          break;
        case 5:
          field = "mon6";
          text = "{Name}\n{mon6}";
          break;
        case 6:
          field = "mon7";
          text = "{Name}\n{mon7}";
          break;
        case 7:
          field = "mon8";
          text = "{Name}\n{mon8}";
          break;
        case 8:
          field = "mon9";
          text = "{Name}\n{mon9}";
          break;
        case 9:
          field = "mon10";
          text = "{Name}\n{mon10}";
          break;
      }
      var paintO = {
        "fill-outline-color": "#455a64",
        "fill-color": [
          "case",
          ["<", ["get", field], 10],
          "RGBA(225,225,225,0.7)", //<10.8
          ["<", ["get", field], 20],
          "RGBA(224,250,242,0.7)", //>=10.8 & <17.2
          ["<", ["get", field], 30],
          "RGBA(220,240,229,0.7)",
          ["<", ["get", field], 50],
          "RGBA(132,196,214,0.7)",
          ["<", ["get", field], 100],
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
      MAP.removeLayer("sfg_shangquan");
      MAP.addLayer({
        id: "sfg_shangquan",
        source: "sfg_shangquan",
        "source-layer": "sfg_shangquan",
        type: "fill",
        paint: paintO,
      });
      MAP.removeLayer("sfg_gongyeyuan_sym");
      MAP.addLayer({
        id: "sfg_gongyeyuan_sym",
        source: "sfg_shangquan",
        "source-layer": "sfg_shangquan",
        type: "symbol",
        layout: layoutO,
      });
      MAP.removeLayer("sfg_shangquan-hl");
      MAP.addLayer({
        id: "sfg_shangquan-hl",
        source: "sfg_shangquan",
        "source-layer": "sfg_shangquan",
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
      if (features[0].layer.id == "sfg_shangquan") {
        var props = features[0].properties;
        workData = [
          props["mon1"],
          props["mon2"],
          props["mon3"],
          props["mon4"],
          props["mon5"],
          props["mon6"],
          props["mon7"],
          props["mon8"],
          props["mon9"],
          props["mon10"],
        ];
        MAP.setFilter("sfg_shangquan-hl", [
          "in",
          "id",
          features[0].properties.id,
        ]);
      }
      _this.layerProp = {
        busId: props.id,
        name: props.name,
      };
      this.getData();
    },
    getData() {
      let _this = this;
      getHuji("/shengfagai/shangquan-hj/getSqHuji", {
        busId: _this.layerProp.busId,
        time: _this.timeIndex,
      }).then((res) => {
        _this.liuchuDatas = {
          workData: workData,
          hujidata: res.data.data[0],
        };
        _this.showData = true;
        _this.$refs["shangquan_pan"].setChart(_this.liuchuDatas);
      });
    },
    changeData(index) {
      this.timeIndex = index;
      this.getData();
    },
    regionOptionChange(e) {
      console.log(e,'eeeeeeeeeee');
      let _this = this;
      let sqId = e[1];
      getSqById("/shengfagai/shangquan/getSqById", {
        id: parseInt(sqId),
      }).then((res) => {
        console.log(res,'res');
        let sqData = res.data.data;
        console.log(sqData, "sqData");
        let point_center = [sqData["lon"], sqData["lat"]];
        let geojson = sqData["geojson"];
        if (MAP.getLayer("sfg_sq")) {
          MAP.removeLayer("sfg_sq");
          MAP.removeSource("sfg_sq");
        }
        MAP.addSource("sfg_sq", {
          type: "geojson",
          data: JSON.parse(geojson),
        });
        MAP.addLayer({
          id: "sfg_sq",
          type: "line",
          source: "sfg_sq",
          paint: {
            "line-color": "#18ffff",
            "line-width": 3,
          },
        });
        MAP.flyTo({
          center: point_center,
          zoom: 13,
        });
        _this.getInfo();
      });
      // });
    },
  },
  destroyed() {
    let _this = this;
    removeLayers(MAP, [
      "sfg_shangquan-hl",
      "sfg_shangquan_sym",
      "sfg_shangquan-line",
      "sfg_shangquan",
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



