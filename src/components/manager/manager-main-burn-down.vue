<template>
    <div ref="burnoutChart" id="burnoutChart"></div>
</template>

<script>
    import * as echarts from 'echarts';

    export default {
        name: "manager-main-burn-down",

        mounted() {
            let init = echarts.init(this.$refs.burnoutChart);
            //设置参数
            init.setOption({
                title: {
                    text: 'BurnOut Chart'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['启动的待办任务', '已完成任务', '任务开发速率', '完成估算点任务', '剩余任务']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '启动的待办任务',
                        type: 'line',
                        stack: 'Total',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '已完成任务',
                        type: 'line',
                        stack: 'Total',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '任务开发速率',
                        type: 'line',
                        stack: 'Total',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '完成估算点任务',
                        type: 'line',
                        stack: 'Total',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '剩余任务',
                        type: 'line',
                        stack: 'Total',
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]

            })
        }
    }
</script>

<style scoped>
    #burnoutChart{
        width: 1000px;
        height: 500px;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
    }
</style>
