<template>
	<div>
		<div @click="dialogVisible = true">
			<el-card shadow="hover" class="qm_radian">
				<i class="el-icon-plus"></i>
			</el-card>
		</div>

		<el-dialog :visible.sync="dialogVisible" title="添加任务" width="30%">
			<el-form :model="addTask" :rules="rules" ref="addTask">
				<el-form-item label="标题" prop="title">
					<el-input placeholder="请输入标题" v-model="addTask.title"></el-input>
				</el-form-item>
				<el-form-item label="负责人" prop="sponsor">
					<el-input placeholder="请输入发起人姓名" v-model="addTask.sponsor"></el-input>
				</el-form-item>
				<el-form-item label="发起人" prop="po">
					<el-input placeholder="请输入负责人姓名" v-model="addTask.po"></el-input>
				</el-form-item>

				<el-form-item label="发布时间" prop="publishtime">
					<el-date-picker placeholder="选择发布时间" style="width: 100%;" type="datetime" v-model="addTask.publishtime">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="预计时间" prop="ectime">
					<el-date-picker placeholder="选择预计完成时间" style="width: 100%;" type="datetime" v-model="addTask.ectime">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="完成时间" prop="actime">
					<el-date-picker placeholder="估算完成时间" style="width: 100%;" type="datetime" v-model="addTask.actime">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="故事归属" prop="storyid">
					<el-input placeholder="请输入故事归属id" v-model="addTask.storyid"></el-input>
				</el-form-item>
				<el-form-item label="估算点" prop="estimate">
					<el-input placeholder="请输入估算点" v-model="addTask.estimate"></el-input>
				</el-form-item>
				<el-form-item label="工作流" prop="flowid">
					<el-input placeholder="请根据标题上的数字来决定加到谁的下面" v-model="addTask.flowid"></el-input>
				</el-form-item>
				<el-form-item label="工作状态" prop="state">
					<el-radio-group v-model="addTask.state">
						<el-radio label="未开始"></el-radio>
						<el-radio label="进行中"></el-radio>
						<el-radio label="已完成"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="权重排序" prop="sort">
					<el-input placeholder="输入数字的大小决定重要程度" v-model="addTask.sort"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="content">
					<el-input placeholder="请输入内容" type="textarea" v-model="addTask.content"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="submitForm('addTask')" type="primary">添加任务</el-button>
					<el-button @click="resetForm('addTask')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import reques from "@/utils/respone";

export default {
	name: "manager-public-add-task.vue",
	data() {
		return {
			dialogVisible: false,
			addTaskList: [],
			addTask: {
				id: 0,
				title: '',
				content: '',
				po: '',
				sponsor: '',
				publishtime: '',
				ectime: '',
				actime: '',
				storyid: '',
				estimate: '',
				flowid: '',
				state: '',
				sort: ''
			},
			rules: {
				title: [{
					required: true,
					message: '请输入标题名字',
					trigger: 'blur'
				},],
				po: [{
					required: true,
					message: '请输入负责人姓名',
					trigger: 'blur'
				}],
				sponsor: [{
					required: true,
					message: '请输入发起人姓名',
					trigger: 'blur'
				}],
				publishtime: [{
					type: 'date',
					required: true,
					message: '请输入发布时间',
					trigger: 'change'
				}],
				ectime: [{
					type: 'date',
					required: true,
					message: '请选择预计时间',
					trigger: 'change'
				}],
				actime: [{
					type: 'date',
					required: true,
					message: '请选择完成时间',
					trigger: 'change'
				}],
				storyid: [{
					required: true,
					message: '请输入故事id',
					trigger: 'blur'
				}],
				estimate: [{
					required: true,
					message: '请输入估算点',
					trigger: 'blur'
				}],
				flowid: [{
					required: true,
					message: '请输入工作流id',
					trigger: 'blur'
				}],
				state: [{
					required: true,
					message: '请选择状态',
					trigger: 'change'
				}],
				sort: [{
					required: true,
					message: '请输入权重排序',
					trigger: 'blur'
				}],
				content: [{
					required: true,
					message: '请填写内容',
					trigger: 'blur'
				}]
			}
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				// 如果是true就进行数据的传出
				// console.log(valid);
				if (valid) {
					reques.post('/task/save', {
						sort: this.addTask.sort,
						title: this.addTask.title,
						content: this.addTask.content,
						po: this.addTask.po,
						sponsor: this.addTask.sponsor,
						publishtime: this.addTask.publishtime,
						ectime: this.addTask.ectime,
						actime: this.addTask.actime,
						storyid: this.addTask.storyid,
						estimate: this.addTask.estimate,
						flowid: this.addTask.flowid,
						state: this.addTask.state,
					}).then(respone => {
						// console.log(respone.data.data);
						// 将获取的数据传给父组件
						let str = this.addTask.estimate;
						this.$emit('respones', respone.data.data, str)
					})
					this.$message({
						type: 'success',
						message: '添加成功'
					});
					this.$refs[formName].resetFields();
					this.dialogVisible = false;
				} else {
					this.$message({
						type: 'error',
						message: '添加失败'
					});
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
}
</script>

<style scoped>
.qm_radian {
	border-radius: 20px;
}
</style>
