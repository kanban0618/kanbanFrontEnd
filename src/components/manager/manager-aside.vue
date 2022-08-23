<template>
    <div>
        <el-container>
            <el-aside style="width: auto">

                <!-- el-scrollbar标签去除下边框的滚动条 -->
                <el-scrollbar style="width: 100%">

                    <el-button class="fold" @click="isCollapse = !isCollapse">
                        <i class="el-icon-s-unfold" v-if="isCollapse"></i>
                        <i class="el-icon-s-fold" v-else></i>
                    </el-button>
                    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen"
                        @close="handleClose" :collapse="isCollapse">
                        <el-menu-item index="2" @click="$emit('update:activeName', 'qm_flow')">
                            <i class="el-icon-s-home"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>

                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span slot="title">功能区</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1" @click="$emit('update:activeName', 'user')">用户管理
                                </el-menu-item>
                                <el-menu-item index="2-2" @click="$emit('update:activeName', 'rule')">规则管理
                                </el-menu-item>
                                <el-menu-item index="2-3" @click="$emit('update:activeName', 'story')">故事管理
                                </el-menu-item>
                                <el-menu-item index="2-4" @click="$emit('update:activeName', 'task')">任务管理
                                </el-menu-item>
                                <el-menu-item index="2-4" @click="$emit('update:activeName', 'flow')">工作流管理
                                </el-menu-item>

                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item index="4" @click="$emit('update:activeName', 'burnoutChart')">
                            <i class="el-icon-s-data"></i>
                            <span slot="title">燃尽图</span>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <i class="el-icon-setting"></i>
                            <span slot="title">待开发......</span>
                        </el-menu-item>
                    </el-menu>
                </el-scrollbar>

            </el-aside>
        </el-container>

    </div>

</template>

<script>

import ManagerFlowFrom from "@/components/manager/manager-flow-from"
import managerpublicflow from './manager-flow-from.vue'
export default {
    props: ['activeName'],
    name: "manager-aside",
    components: {
        ManagerFlowFrom,
        managerpublicflow
    },

    data() {
        return {
            dialogContoller: {
                visible: false
            },//控制添加工作流隐藏或显示
            isCollapse: true,

            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                type: [],
            },
            formLabelWidth: '120px'
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
    }
}

</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu--collapse {
    width: 100px;
    min-height: 400px;
}

.el-menu {
    border: 0px solid;
}

.fold {
    border: 0;
}
</style>
