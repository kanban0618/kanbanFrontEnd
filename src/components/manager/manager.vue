<template>
    <el-container>
        <el-header style="height:60px;">
            <manager-head username="张三"></manager-head>
        </el-header>

        <el-container>
            <el-aside style="width: auto;">
                <manager-aside :activeName.sync='activeName'></manager-aside>
            </el-aside>
            <!-- 内容部分 -->
            <el-main style="display: grid;">
                <manager-main :activeName.sync='activeName'></manager-main>
            </el-main>
        </el-container>
        <el-footer style="height: auto">
            <manager-footer></manager-footer>
        </el-footer>
    </el-container>


</template>

<script>
import ManagerHead from "@/components/manager/manager-head";
import ManagerAside from "@/components/manager/manager-aside";
import ManagerMain from "@/components/manager/manager-main";
import ManagerFooter from "@/components/manager/manager-footer";
export default {
    name: "manager",
    components: { ManagerFooter, ManagerMain, ManagerAside, ManagerHead },
    data() {
        return {
            activeName: 'qm_flow'
        }
    }

}
</script>

<style scoped>
html,
body {
    width: 100%;
    height: 100%;
}

@media screen and (max-width:1440px) {
    .el-container {
        width: 1440px;
    }
}

.el-container {
    height: 100%;
}

.el-header {
    z-index: 999;
    background-color: rgba(207, 221, 228);
    color: #333;
    text-align: center;
    position: sticky;
    top: 0px;
    /*line-height: 60px;*/

}

.el-aside {

    /* background-color: #D3DCE6; */
    color: #333;
    text-align: center;
    /*line-height: 200px;*/
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;

    /*line-height: 160px;*/
}

.el-footer {
    background-color: #333333;
    color: #e9eef3;
    text-align: left;

    /*line-height: 60px;*/
}
</style>
