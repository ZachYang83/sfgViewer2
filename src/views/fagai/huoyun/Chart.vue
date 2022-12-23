<template>
  <div id="huoyun">
    <div id="bar_char"></div>
    <div id="pie_pan"></div>
  </div>
</template>

<script>
let barChart;
let pieChart;
export default {
  name: "huoyun_chart",
  props: {
    datas: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    var bar = document.getElementById("bar_char");
    barChart = echarts.init(bar);
    var pie = document.getElementById("pie_pan");
    pieChart = echarts.init(pie);
    // this.setChart(this.datas);
  },
  methods: {
    setChart(datas) {
      let _this = this;
      this.$nextTick(() => {
        barChart.resize();
        pieChart.resize();
      });
      let barData = datas.bar;
      barData.sort((a, b) => {
        return a.truck - b.truck;
      });
      let datax = [];
      let datay = [];
      let barDataTop15 = barData.slice(0, 15);
      barDataTop15.forEach((item) => {
        datay.push(item.d);
        datax.push(item.truck);
      });
      let bar_option = {
        title: {
          left: "center",
          text: "重载货车流向TOP15（辆）",
          textStyle: {
            color: "#BDBDBD",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}:{c}",
        },
        grid: {
          x: 50,
          y: 30,
          y2: 30,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.02],
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00FFFF",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "category",
          data: datay,
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#00FFFF",
            },
            interval: 0,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00FFFF",
            },
          },
        },
        color: "#00FFFF",
        series: [
          {
            type: "bar",
            data: datax,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#00FFFF",
                    fontSize: 10,
                  },
                },
              },
            },
          },
        ],
      };
      barChart.setOption(bar_option, true);

      let pieData = datas.pie;
      console.log(pieData, "pieData");
      let pie_option = {
        title: {
          left: "center",
          text: "县区重载货车流量占全市货运比例",
          textStyle: {
            color: "#BDBDBD",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}:{c}",
        },
        grid: {
          x: 50,
          y: 50,
          y2: 30,
        },
        series: [
          {
            type: "pie",
            data: pieData,
            label: {
              normal: {
                show: true,
                position: 'inside',
                fontSize:16,
                formatter: '{b}:{c}({d}%)', //自定义显示格式(b:name, c:value, d:百分比)
              }
            },
            // itemStyle: {
            //   normal: {
            //     label: {
            //       show: true, //开启显示
            //       position: "top", //在上方显示
            //       textStyle: {
            //         //数值样式
            //         color: "#00FFFF",
            //         fontSize: 10,
            //       },
            //     },
            //   },
            // },
          },
        ],
      };
      pieChart.setOption(pie_option, true);
    },
  },
};
</script>

<style lang='scss' scoped>
#huoyun {
  width: 100%;
  height: 100%;
}

#bar_char {
  width: 100%;
  height: 55%;
  padding: 5px;
}

#pie_pan {
  width: 100%;
  height: 45%;
  padding: 5px;
}
</style>