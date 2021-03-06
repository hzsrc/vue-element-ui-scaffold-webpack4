import pageInit from '../js/pageInit';

var page = {
    render(h) {
        return (
            <div>
                <h6>Multipage sample</h6>
                <h3>This is pageB here</h3>
                <a href="./">Back</a>
            </div>)
    },
    components: {},
}
pageInit(page).mount('#app');
