//为element-ui的Message添加默认参数
import { Loading, Message, MessageBox } from 'element-ui'

function toastCtor(key, options) {
    const defaultOptions = {
        showClose: true,
        duration: 4000,
        message: options,
    }
    const fn = key ? Message[key] : Message;
    return fn(Object.assign(defaultOptions, options))
}

const toast = Object.assign(toastCtor.bind(null, null), Message);
['success', 'warning', 'info', 'error'].forEach(key => {
    toast[key] = toastCtor.bind(null, key)
})

//为element-ui的MessageBox添加默认参数
MessageBox.setDefaults({ closeOnClickModal: false, closeOnPressEscape: true });

export default {
    msgBox: MessageBox,
    alert: MessageBox.alert,
    confirm: MessageBox.confirm,
    prompt: MessageBox.prompt,
    toast: toast,
    loading: Loading.service
}
