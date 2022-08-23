<template>
  <el-tabs :value="activeName" @tab-click="handleClick" class="mainDiv">
    <el-tab-pane name="qm_flow">
      <ManagerMainFlow></ManagerMainFlow>
    </el-tab-pane>
    <el-tab-pane name="flow">
      <ManagerFlow></ManagerFlow>
    </el-tab-pane>
    <el-tab-pane name="task">
      <manager-main-task></manager-main-task>
    </el-tab-pane>
    <el-tab-pane name="rule">
      <manager-main-rule></manager-main-rule>
    </el-tab-pane>
    <el-tab-pane name="story">
      <managerMainStoryVue></managerMainStoryVue>
    </el-tab-pane>
    <el-tab-pane name="user">
      <ManagerMainUserVue></ManagerMainUserVue>
    </el-tab-pane>
    <el-tab-pane name="burnoutChart">
      <managerBurnoutChart></managerBurnoutChart>
    </el-tab-pane>
  </el-tabs>
</template>
<script>

import ManagerMainFlow from "./manager-main-flow.vue";
import ManagerMainUserVue from "./manager-main-user.vue";
import managerMainStoryVue from "./manager-main-story.vue";
import ManagerFlow from './manager-flow';
import managerBurnoutChart from './manager-main-burn-down.vue'
export default {
  props: ['activeName'],
  name: "manager-main",
  components: {
    ManagerMainFlow,
    ManagerMainUserVue,
    managerMainStoryVue,
    ManagerFlow,
    managerBurnoutChart,
    ManagerMainTask: () => import('./manager-main-task.vue'),
    ManagerMainRule: () => import('./manager-main-rule.vue')
  },
  data() {
    return {
      // activeName: 'flow'
    };
  },
  methods: {
    handleClick(tab, event) {

    }
  }
}
</script>


<style scoped>
.mainDiv>>>.el-tabs__header {
  margin: 0px;
}

.mainDiv>>>.el-tabs__nav-scroll {
  overflow: hidden;
  display: none;
  height: 0px;
}
</style>
