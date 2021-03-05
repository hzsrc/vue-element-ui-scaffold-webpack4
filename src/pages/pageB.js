import { createApp } from 'vue';

require('../css/index.scss');
const main = {
    render(h) {
        return (
            <div>
                <h6>Multipage sample</h6>
                <h3>This is pageB here</h3>
                <a href="./">Back</a>
            </div>)
    },
    components: {},
};

createApp(main).mount('#app');
