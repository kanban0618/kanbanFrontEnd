<template>
	<div>
		<el-row>
			<!--第一行-->
			<el-divider></el-divider>
			<el-row>
				<el-col :span="12">
					<!--第一行第一列-->
					<el-row>
						<el-col :span="6">
							<div class="grid-content bg-purple"></div>
						</el-col>
						<el-col :span="3">
							<div class="z">关于看板墙</div>
						</el-col>
						<el-col :span="3">
							<el-tooltip content="想得美" effect="light" placement="top">
								<div>联系我们</div>
							</el-tooltip>
						</el-col>
						<el-col :span="12">
							<div>
								<el-tooltip content="滚！！！" placement="right">
									<el-link class="lss" disabled type="warning">公证举报</el-link>
								</el-tooltip>
							</div>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="12">
					<el-row>
						<!--第一行第二列-->
						<el-col :span="15">
							<div class="grid-content bg-purple"></div>
						</el-col>
						<el-col :span="6">
							<el-button @click="open" class="ls" type="text">看板墙的历史</el-button>
						</el-col>
					</el-row>
				</el-col>
			</el-row>

			<el-row>
				<!--第二行-->
				<el-col :span="24">
					<div class="grid-content bg-purple"></div>
				</el-col>
			</el-row>

			<el-row>
				<!--第三行-->
				<el-col :span="12">
					<!--第三行第一列-->
					<el-col :span="6">
						<div class="grid-content bg-purple"></div>
					</el-col>
					<el-col :span="1">
						<div class="demo-image__placeholder">
							<div class="block">
								<el-image :src="src" style="width: 20px;height: 20px"></el-image>
							</div>
						</div>
					</el-col>
					<el-col :span="7">
						<div>
							<h6>XXXXXXXXXXXXX321</h6>
						</div>
					</el-col>
					<el-col :span="10">
						<div>
							<h6>Kanban-20220618-6</h6>
						</div>
					</el-col>
				</el-col>
				<el-col :span="12">
					<!--第三行第二列-->
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple"></div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</el-row>
		<!-- <ManagerPublicAddTask></ManagerPublicAddTask> -->
	</div>

</template>

<script>
	import ManagerPublicAddTask from "./manager-public-add-task.vue";

	export default {
		name: "manager-footer",
		components: {
			ManagerPublicAddTask
		},
		data() {
			return {
				src: 'https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png',
				value: null,
				iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']
			}
		},
		methods: {
			open() {
				this.$confirm('看板墙是有由陈老师带领我们团队五个人(邱明(大佬ᕙ(`▿´)ᕗ),胡清溪(大佬ᕙ(`▿´)ᕗ),罗刚(大佬ᕙ(`▿´)ᕗ),' +
					'方浩(小佬┗|*｀0′*|┛),陈佳豪(萌新(✿◡‿◡))辛辛苦苦开发而来，大家兢兢业业cv而已来的(当然不是٩(๑•̀ω•́๑)۶)，' +
					'经历了数个月的风风雨雨、电闪雷鸣的不眠之夜，每一个代码都非常重要就像我们团队每个人都很重要，虽然我们是临时组队，' +
					'但是我们堪比专业团队，不要看不起那个没用的代码，没了它可就运行不了，就像我一样，不要看着没什么用，确实也没什么用，' +
					'哈哈哈哈哈！！！介绍OVER！！！',
					'看板墙的由来', {
						confirmButtonText: '了GAI',
						cancelButtonText: '达咩',

					}).then(() => {
					this.$message({
						type: 'success',
						message: '获得成就:看板墙的由来!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '汝以失败告终！'
					});
				});
			}
		}

	}
</script>

<style scoped>
	.bg-purple {
		background: #333333;
	}

	.grid-content {
		border-radius: 10px;
		min-height: 18px;
	}

	.ls {
		margin-top: -10px;
	}

	.lss {
		margin-top: -4px;
	}

</style>
