<template>
    <div id="echarts">
        <div :id=ids :style="{ height:eachegh +'px' }"></div>  
    </div>
</template>
 
<script>
import Echarts from 'echarts'
export default { 
    data() {
        return{
            myChart: {},
            ids:''
        }
    },
    props: {
        option:Object,
        id:String,
        eachegh:Number,
    },
    created() {
        this.ids = this.id;
        this.$nextTick(()=> {
            this.loadEchart()
        })
    },
    mounted(){
        let _this = this;
        window.onresize = function() {
            _this.myChart.resize()
        }
    },
    methods: {
        loadEchart() {
           
            const o = this.option;
            this.myChart = Echarts.init(document.getElementById(this.id));
            this.myChart.setOption(o);
        }
    }
}
</script>
 
<style>
/* #echart {
    width: 100%;
    height: 300px;
} */
</style> 