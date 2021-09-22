export default {
    title: 'Design System',
};

export const Buttons = () => ({
    //language=HTML
    template: `
        <div>
        <h3>Primary (default)</h3>
        <f-button size="large" label="Large" />
        <f-button label="Default" />
        <f-button size="small" label="Small" />
        <f-button size="mini" label="Mini" />
        <br />
        <f-button disabled size="large" label="Large" />
        <f-button disabled label="Default" />
        <f-button disabled size="small" label="Small" />
        <f-button disabled size="mini" label="Mini" />
        <h3>Secondary</h3>
        <f-button secondary size="large" label="Large" />
        <f-button secondary label="Default" />
        <f-button secondary size="small" label="Small" />
        <f-button secondary size="mini" label="Mini" />
        <br />
        <f-button disabled secondary size="large" label="Large" />
        <f-button disabled secondary label="Default" />
        <f-button disabled secondary size="small" label="Small" />
        <f-button disabled secondary size="mini" label="Mini" />
        <h3>Tertiary</h3>
        <f-button tertiary size="large" label="Large" />
        <f-button tertiary label="Default" />
        <f-button tertiary size="small" label="Small" />
        <f-button tertiary size="mini" label="Mini" />
        <br />
        <f-button disabled tertiary size="large" label="Large" />
        <f-button disabled tertiary label="Default" />
        <f-button disabled tertiary size="small" label="Small" />
        <f-button disabled tertiary size="mini" label="Mini" />
        <h3>Round</h3>
        <f-button round>
            <f-iconset icon="times" />
        </f-button>
        <f-button round secondary>
            <f-iconset icon="times" />
        </f-button>
        <f-button round tertiary>
            <f-iconset icon="times" />
        </f-button>
        <h3>Color variants</h3>
<!--
        <f-button label="Default" class="btn-red" />
        <f-button secondary label="Default" class="btn-red" />
        <f-button tertiary label="Default" class="btn-red" />
        <br />
        <f-button disabled label="Default" class="btn-red" />
        <f-button disabled secondary label="Default" class="btn-red" />
        <f-button disabled tertiary label="Default" class="btn-red" />
        <br /><br />
        <f-button label="Default" class="btn-green" />
        <f-button secondary label="Default" class="btn-green" />
        <f-button tertiary label="Default" class="btn-green" />
        <br />
        <f-button disabled label="Default" class="btn-green" />
        <f-button disabled secondary label="Default" class="btn-green" />
        <f-button disabled tertiary label="Default" class="btn-green" />
        <br /><br />
        <f-button label="Default" class="btn-orange" />
        <f-button secondary label="Default" class="btn-orange" />
        <f-button tertiary label="Default" class="btn-orange" />
        <br />
        <f-button disabled label="Default" class="btn-orange" />
        <f-button disabled secondary label="Default" class="btn-orange" />
        <f-button disabled tertiary label="Default" class="btn-orange" />
        <br /><br />
-->
        <!--<f-button label="Default" class="btn-grey" />-->
            <h4>Secondary</h4>
        <f-button secondary label="Default" class="btn-grey" />
        <!--<f-button tertiary label="Default" class="btn-grey" />-->
<!--
        <br />
        <f-button disabled label="Default" class="btn-grey" />
        <f-button disabled secondary label="Default" class="btn-grey" />
        <f-button disabled tertiary label="Default" class="btn-grey" />
        <br /><br />
        <div class="bac-grey-8 pa-5 darktheme">
            <f-button label="Default" />
            <f-button secondary label="Default" class="btn-light" />
            <f-button tertiary label="Default" class="btn-light" />
            <br />
            <f-button disabled label="Default" />
            <f-button disabled secondary label="Default" class="btn-light" />
            <f-button disabled tertiary label="Default" class="btn-light" />
        </div>
-->
        <br /><br />
        </div>
    `,
    data() {
        return {};
    },
});
