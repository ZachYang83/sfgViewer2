<template>
  <div id="map">
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
          <h2>常驻人口</h2>
        </div>
        <div class="content">
          <keep-alive>
            <component
              :is="isChangzhu"
              ref="changzhu_pan"
              :datas="changzhu"
            ></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Legend from "components/common/Legend.vue";
import Timeline from "./Timeline.vue";
import { init_map } from "utils/initMap.js";
import {
  add_tms,
  add_wms,
  addgeojson_S,
  addgeojson_L,
} from "utils/loadLayer.js";
import { removeLayers } from "utils/removeLayers.js";
import { getChangzhu } from "api/fagai/changzhu.js";
import Chart from "../resident/dataPan/Chart.vue";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

let monthData;
let MAP;
export default {
  data() {
    return {
      layerProp: {
        city: "广州",
        month: 202201,
        county:"",
      },
      changzhu: {},
      showData: false,
      isChangzhu: "Chart",
      title: "常驻人口（万人）",
      items: [
        {
          index: 1,
          text: "0 - 25",
          style: "backgroundColor:rgb(255,247,242)",
        },
        {
          index: 2,
          text: "25 - 50",
          style: "backgroundColor:rgb(252,206,202)",
        },
        {
          index: 3,
          text: "50 - 100",
          style: "backgroundColor:rgb(250,150,178)",
        },
        {
          index: 4,
          text: "100 - 250",
          style: "backgroundColor:rgb(227,64,153)",
        },
        {
          index: 5,
          text: "250 - 500",
          style: "backgroundColor:rgb(153,0,122)",
        },
      ],
    };
  },
  components: {
    Legend,
    Timeline,
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
      MAP.addSource("sfg_changzhu", {
        type: "vector",
        scheme: "tms",
        tiles: [
          "https://zwfw.credit.gdgov.cn/geoserver/gwc/service/tms/1.0.0/gpzi%3Asfg_changzhu@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
        ],
      });
      MAP.addLayer({
        id: "sfg_changzhu",
        source: "sfg_changzhu",
        "source-layer": "sfg_changzhu",
        type: "fill",
        paint: {
          "fill-outline-color": "#455a64",
          "fill-color": [
            "case",
            ["<", ["get", "1mon"], 25.0],
            "rgb(255,247,242)",
            ["<", ["get", "1mon"], 50.0],
            "rgb(252,206,202)",
            ["<", ["get", "1mon"], 100.0],
            "rgb(250,150,178)",
            ["<", ["get", "1mon"], 250.0],
            "rgb(227,64,153)",
            ["<", ["get", "1mon"], 500.0],
            "rgb(153,0,122)",
            "rgb(73,0,107)",
          ],
        },
      });
      MAP.addLayer({
        id: "sfg_changzhu_sym",
        source: "sfg_changzhu",
        "source-layer": "sfg_changzhu",
        type: "symbol",
        layout: {
          "icon-image": "",
          "text-field": "{county}\n{1mon}", //此属性为需要显示的字段
          "text-size": 12,
          "text-anchor": "top",
        },
      });
      MAP.addLayer({
        id: "sfg_changzhu-hl",
        type: "line",
        source: "sfg_changzhu",
        "source-layer": "sfg_changzhu",
        paint: {
          "line-color": "#18ffff",
          "line-width": 3,
        },
        filter: ["in", "county", ""],
      });
      })
    },
    changeLayer(index,time) {
      var field;
      var text;
      switch (index) {
        case 0:
          field = "1mon";
          text = "{county}\n{1mon}";
          break;
        case 1:
          field = "2mon";
          text = "{county}\n{2mon}";
          break;
        case 2:
          field = "3mon";
          text = "{county}\n{3mon}";
          break;
        case 3:
          field = "4mon";
          text = "{county}\n{4mon}";
          break;
        case 4:
          field = "5mon";
          text = "{county}\n{5mon}";
          break;
        case 5:
          field = "6mon";
          text = "{county}\n{6mon}";
          break;
        case 6:
          field = "7mon";
          text = "{county}\n{7mon}";
          break;
        case 7:
          field = "8mon";
          text = "{county}\n{8mon}";
          break;
        case 8:
          field = "9mon";
          text = "{county}\n{9mon}";
          break;
        case 9:
          field = "10mon";
          text = "{county}\n{10mon}";
          break;
      }
      var paintO = {
        "fill-outline-color": "#455a64",
        "fill-color": [
          "case",
          ["<", ["get", field], 25],
          "rgb(255,247,242)", //<10.8
          ["<", ["get", field], 50],
          "rgb(252,206,202)", //>=10.8 & <17.2
          ["<", ["get", field], 100],
          "rgb(250,150,178)",
          ["<", ["get", field], 250],
          "rgb(227,64,153)",
          ["<", ["get", field], 500],
          "rgb(153,0,122)",
          "rgb(73,0,107)", // 默认值, >=50.1
        ],
      };
      var layoutO = {
        "icon-image": "",
        "text-field": text, //此属性为需要显示的字段
        "text-size": 12,
        "text-anchor": "top",
      };
      MAP.removeLayer("sfg_changzhu");
      MAP.addLayer({
        id: "sfg_changzhu",
        source: "sfg_changzhu",
        "source-layer": "sfg_changzhu",
        type: "fill",
        paint: paintO,
      });
      MAP.removeLayer("sfg_changzhu_sym");
      MAP.addLayer({
        id: "sfg_changzhu_sym",
        source: "sfg_changzhu",
        "source-layer": "sfg_changzhu",
        type: "symbol",
        layout: layoutO,
      });
      MAP.removeLayer("sfg_changzhu-hl");
      MAP.addLayer({
        id: "sfg_changzhu-hl",
        source: "sfg_changzhu",
        "source-layer": "sfg_changzhu",
        type: "line",
        paint: {
          "line-color": "#18ffff",
          "line-width": 3,
        },
        filter: ["in", "county", ""],
      });
      this.layerProp.month = time;
      this.getData();

    },
    mouseEvent() {
      let _this = this;
      MAP.on("click", _this.getInfo);
    },
    getInfo(e) {
      let _this = this;
      var features = MAP.queryRenderedFeatures(e.point);
      if (features[0].layer.id == "sfg_changzhu") {
        var props = features[0].properties;
        monthData = [
          props["1mon"],
          props["2mon"],
          props["3mon"],
          props["4mon"],
          props["5mon"],
          props["6mon"],
          props["7mon"],
          props["8mon"],
          props["9mon"],
          props["10mon"],
        ];
        _this.changzhu.monthdata = monthData;
        MAP.setFilter("sfg_changzhu-hl", [
          "in",
          "county",
          features[0].properties.county,
        ]);
      }
      _this.layerProp.city = props.city;
      _this.layerProp.county = props.county;
      this.getData();
    },
    getData() {
      let _this = this;
      getChangzhu("/shengfagai/changzhu-shi/getChangzhu", {
        month: _this.layerProp.month,
      }).then((res) => {
        _this.changzhu.shiData = res.data.data;
        _this.changzhu.month = _this.layerProp.month;
        _this.changzhu.county = _this.layerProp.county;
        _this.showData = true;
        _this.$refs["changzhu_pan"].setChart(_this.changzhu);
      });
    },
  },
  destroyed() {
    let _this = this;
    removeLayers(MAP, [
      "sfg_changzhu-hl",
      "sfg_changzhu_sym",
      "sfg_changzhu",
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
      height: calc(100% - 60px);

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

  .changzhu {
    border-right: #003366 2px solid;
  }

  .jiuye {
    border-right: #003366 2px solid;
  }
}
</style>