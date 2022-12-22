<template>
  <div id="map">
    <div class="dropdown">
      <el-select v-model="value" placeholder="请选择季度">
        <el-option
          v-for="item in timeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <Legend
      :title="title"
      :items="items"
      style="bottom: 20px; left: 10px; width: 200px; height: auto"
    >
    </Legend>
    <div class="dataPan" v-show="showData" v-bind:class="{ active: showData }">
      <div class="item changzhu">
        <!-- <div class="title">
          <h2>货运流向TOP15</h2>
        </div> -->
        <div class="content">
          <keep-alive>
            <component
              :is="isChart"
              ref="huoyun_pan"
              :datas="chartData"
            ></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Legend from "components/common/Legend.vue";
import Chart from "../huoyun/Chart.vue";
import { init_map } from "utils/initMap.js";
import {
  add_tms,
  add_wms,
  addgeojson_S,
  addgeojson_L,
} from "utils/loadLayer.js";
import { removeLayers } from "utils/removeLayers.js";
import { getDesData, getCity } from "api/fagai/huoyun.js";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import HUOYUN from "./HUOYUN.js";

let MAP;

export default {
  data() {
    return {
      showData: false,
      isChart: "Chart",
      title: "货车流量（万次）",
      items: [
        {
          index: 6,
          text: "800以上",
          style: "backgroundColor:rgb(73,0,107)",
        },
        {
          index: 5,
          text: "400 - 800",
          style: "backgroundColor:rgb(153,0,122)",
        },
        {
          index: 4,
          text: "100 - 400",
          style: "backgroundColor:rgb(227,64,153)",
        },
        {
          index: 3,
          text: "50 - 100",
          style: "backgroundColor:rgb(250,150,178)",
        },
        {
          index: 2,
          text: "10 - 50",
          style: "backgroundColor:rgb(252,206,202)",
        },
        {
          index: 1,
          text: "0 - 10",
          style: "backgroundColor:rgb(255,247,242)",
        },
      ],
      chartData: {},
      desLonLats: [],
      timeOptions:[
        {
          value:'choose1',
          label:'2022年第四季度'
        },
      ],
      value:'',
    };
  },
  components: {
    Legend,
    Chart,
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
        MAP.addSource("sfg_huoyun", {
          type: "geojson",
          data: HUOYUN,
        });
        MAP.addLayer({
          id: "sfg_huoyun",
          type: "fill",
          source: "sfg_huoyun",
          paint: {
            "fill-outline-color": "#455a64",
            "fill-color": [
              "case",
              ["<", ["get", "truck"], 10.0],
              "rgb(255,247,242)",
              ["<", ["get", "truck"], 50.0],
              "rgb(252,206,202)",
              ["<", ["get", "truck"], 100.0],
              "rgb(250,150,178)",
              ["<", ["get", "truck"], 400.0],
              "rgb(227,64,153)",
              ["<", ["get", "truck"], 800.0],
              "rgb(153,0,122)",
              "rgb(73,0,107)",
            ],
          },
        });

        MAP.addLayer({
          id: "sfg_huoyun_sym",
          source: "sfg_huoyun",
          // "source-layer": "sfg_huoyun_sym",
          type: "symbol",
          layout: {
            "icon-image": "",
            "text-field": "{县级}\n{truck}", //此属性为需要显示的字段
            "text-size": 12,
            "text-anchor": "top",
          },
        });

        MAP.addLayer({
          id: "sfg_huoyun-hl",
          type: "line",
          source: "sfg_huoyun",
          paint: {
            "line-color": "#18ffff",
            "line-width": 3,
          },
          filter: ["in", "countyId", ""],
        });
      });
    },
    mouseEvent() {
      let _this = this;
      MAP.on("click", _this.getInfo);
    },
    getInfo(e) {
      let _this = this;
      var features = MAP.queryRenderedFeatures(e.point);
      let countyId;
      let city;
      if (features[0].layer.id == "sfg_huoyun") {
        var props = features[0].properties;
        countyId = props.countyId;
        city = props.city;
        console.log(props.city, "props");
        MAP.setFilter("sfg_huoyun-hl", [
          "in",
          "countyId",
          features[0].properties.countyId,
        ]);

        getCity("/shengfagai/huoyun/getCity", { city: city }).then((res) => {
          console.log(res.data.data[0]);
          let pieData = [
            { value: props.truck, name: props.county },
            {
              value: (res.data.data[0].sum2 / 10000 - props.truck).toFixed(1),
              name: "其他",
            },
          ];
          _this.chartData.pie = pieData;
        });

        getDesData("/shengfagai/huoyun/getDesData", {
          countyId: countyId,
        }).then((res) => {
          let data = res.data.data;
          let barData = [];
          if (data) {
            _this.showData = true;
            data.forEach((element) => {
              var item = {
                d: element.d,
                truck: element.sum2,
              };
              barData.push(item);
              _this.desLonLats.push(element.dlonlat);
            });
          }
          _this.chartData.bar = barData;
          console.log(_this.desLonLats, "_this.desLonLats");

          _this.$refs["huoyun_pan"].setChart(_this.chartData);
        });
      }
    },
  },
  destroyed() {},
};
</script>

<style lang='scss' scoped>
#map {
  width: 100%;
  height: 100%;
  // height:calc(100% - 80px);
}

.dropdown {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 999;
  width:150px;
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
      background-color: RGBA(8, 32, 52, 0.8);
      line-height: 50px;
      color: #bdbdbd;
    }
    .content {
      width: 100%;
      height: calc(100% - 10px);

      #data2019_2022 {
        width: 100%;
        height: 60%;
      }
    }
    .foot {
      display: flex;
      width: 100%;
      height: 10px;
      background-color: RGBA(8, 32, 52, 0.8);
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
}
</style>