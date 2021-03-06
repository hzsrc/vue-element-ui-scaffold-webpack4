//为element-plus的Message添加默认参数
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus';

function toastCtor(key, options) {
    if (typeof options === 'string') options = { message: options }
    const defaultOptions = {
        showClose: true,
        duration: 4000,
    };
    const fn = key ? ElMessage[key] : ElMessage;
    return fn(Object.assign(defaultOptions, options));
}

const toast = Object.assign(toastCtor.bind(null, null), ElMessage);
['success', 'warning', 'info', 'error'].forEach((key) => {
    toast[key] = toastCtor.bind(null, key);
});

//为element-plus的MessageBox添加默认参数
//ElMessageBox.setDefaults({ closeOnClickModal: false, closeOnPressEscape: true });

export default {
    msgBox: ElMessageBox,
    alert: ElMessageBox.alert,
    confirm: ElMessageBox.confirm,
    prompt: ElMessageBox.prompt,
    toast: toast,
    loading: ElLoading.service,
};
