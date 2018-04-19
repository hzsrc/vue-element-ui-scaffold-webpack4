import CONST from './CONST.js';

export default {
    SAVE_SUCC: '保存成功',
    //SAVE_FAIL: '保存失败',
    ISDETELE: '是否删除',
    TIP: '提示',
    OK: '确定',
    CANCEL: '取消',
    DELETE: '删除',
    DELETESUCCESS: '删除成功',
    DELETEDEPSUCCESS: '部门删除成功',
    DELETEDEPERROR: '部门删除失败',
    DELETEERROR: '删除失败',
    ISENTDETELE: '请先删除部门及以下所有成员后再删除该公司',
    ISDEPDETELE: '请先删除部门下所有成员后再删除该部门',
    MORE: '更多',
    STOP: '收起',
    ADJUSETMENT: '调整部门',
    ADJUSETMENTMSG: '调整部门操作成功',
    NOSELECTMEMBER: '未选择成员',
    MEMBERADD: '成员添加成功',
    MEMBEREDIT: '成员修改成功',
    UPLOADERROR: '上传文件格式错误',
    EXPORTSUCCESS: '导出成功',
    TOPSUCCESS: '置顶操作成功',
    TOPERROR: '置顶操作失败',
    SORTSUCCESS: '排序操作成功',
    SORTERROR: '排序操作失败',
    PHONEERROR: '该手机号码已存在',
    ACCOUNTERROR: '账号已存在',
    NAMEERROR: '姓名已存在',
    USERCENTERROR: '次手机号码已存在企业通讯录中，无法添加',
    ORGNAMEERROR: '请输入部门名称',
    NOSELECTDEP: '未选中任何部门',

    //FORM_:
    ADDDEPARTEMT: '添加部门',
    EDITDEPARTEMT: '修改部门',
    DEPARTEMTNAME: '部门名称',
    MEMBER: '成员信息',
    SLELETDEP: '选择部门',
    SELETMEMBER: '选择成员',
    SELETDEPEPORMEMBER: '选择部门、成员',
    SELECTEDDEPORMEMBER: '已选择部门、成员',
    SELECTEDDEP: '已选择部门',
    SELECTEDMEMBER: '已选择成员',

    //OPERATE_:
    ADDCHILDDEPARTEMT: '添加子部门',
    EDITDEPARTEMTNAME: '修改名称',
    MOVE: '上移',
    DOWN: '下移',
    ADDMEMBER: '添加成员',
    EXPORTORIMPORT: '批量导入/导出',
    STICK: '置顶',
    SORT: '排序',
    SHIFOUT: '移除',
    COMPLETEDELTE: '彻底删除',
    COMPLETE: '完成',

    //VALIDATE:
    NO_VALICODE: '请输入验证码',
    ERR_VALICODE: '验证码有误，请输入' + CONST.SMS_VALI_CODE_LENGTH + '位短信验证码',
    NO_MDN: '请输入手机号码',
    ERR_MDN: '手机号码输入有误',
    UPLOADTYPE: '上传图片只能是 {format} 格式!',
    UPLOADSIZE: '上传图片大小不能超过 {sizeM}MB',
    EMAILERROR: '邮箱地址格式有误，请重新输入',

    //APP_:
    VISIBLE_SCOPE_ALL: '全部人员',
    VISIBLE_SCOPE_PART: '部分人员',
    VISIBLE_SCOPE_ADMIN: '仅管理员',
    // PROMPT: function (visualRange = '全部人员', appName = '') {
    //     return '你当前应用名:"' + appName +
    //         '",可见范围设置为' + visualRange +
    //         ',将对(' + visualRange +
    //         ')可见,请确认';
    // },
    REUSE: '启用成功',
    STOPSUCC: '停用成功',
}
