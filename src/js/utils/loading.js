import { Loading } from 'element-ui';

//const MASK_DELAY = 5000;
const DefaultMaskOptions = { customClass: 'global-mask', target: 'html > body' }

const loading = {
    show(options) {
        if (!this.unique) {
            this.unique = Loading.service(options);
        }
    },
    showMask() {
        const mask = document.querySelector('.global-mask');
        if (mask) {
            mask.classList.remove('global-mask');
        }
    },
    close() {
        setTimeout(() => {
            if (this.unique) {
                this.unique.close();
                this.unique = null;
            }
        }, 100)
    },
}

export default {
    //计数器，防止出现多个
    count: 0,
    show(options) {
        if (options !== false) {
            options = Object.assign({}, DefaultMaskOptions, options)
            try {
                this.count++;
                loading.show(options);
                //延时显示loading蒙板
                //if (this.timer) clearTimeout(this.timer);
                //this.timer = setTimeout(() => loading.showMask(), MASK_DELAY);
            } catch (e) {
            }
        }
    },
    close(options) {
        try {
            if (options !== false) {
                if (this.count > 0) this.count--;
                if (this.count === 0) {
                    //if (this.timer) clearTimeout(this.timer)
                    loading.close()
                }
            }
        }
        catch (e) {
        }
    }
}
