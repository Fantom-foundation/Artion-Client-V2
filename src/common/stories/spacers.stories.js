export default {
    title: 'Design System/Spacers',
};

export const Spacers = () => ({
    //language=HTML
    template: `
        <div class="grid">
            <div class="col-6">
                <h3>Vertical spacers</h3>

                <div class="spacer-row">
                    <span class="v-spacer v-spacer-1"></span> <code>--f-spacer-1</code>
                </div>
                <div class="spacer-row">
                    <span class="v-spacer v-spacer-2"></span> <code>--f-spacer-2</code>
                </div>
                <div class="spacer-row">
                    <span class="v-spacer v-spacer-3"></span> <code>--f-spacer-3</code>
                </div>
                <div class="spacer-row">
                    <span class="v-spacer v-spacer-4"></span> <code>--f-spacer-4</code>
                </div>
                <div class="spacer-row">
                    <span class="v-spacer v-spacer-5"></span> <code>--f-spacer-5</code>
                </div>
                <div class="spacer-row">
                    <span class="v-spacer v-spacer-6"></span> <code>--f-spacer-6</code>
                </div>
                <div class="spacer-row">
                    <span class="v-spacer v-spacer-7"></span> <code>--f-spacer-7</code>
                </div>
                <div class="spacer-row">
                    <span class="v-spacer v-spacer-8"></span> <code>--f-spacer-8</code>
                </div>
                <div class="spacer-row">
                    <span class="v-spacer v-spacer-9"></span> <code>--f-spacer-9</code>
                </div>
            </div>

            <div class="col-6">
                <h3>Horizontal spacers</h3>

                <div class="spacer-row">
                    <span class="h-spacer h-spacer-1"></span> <code>--f-spacer-1</code>
                </div>
                <div class="spacer-row">
                    <span class="h-spacer h-spacer-2"></span> <code>--f-spacer-2</code>
                </div>
                <div class="spacer-row">
                    <span class="h-spacer h-spacer-3"></span> <code>--f-spacer-3</code>
                </div>
                <div class="spacer-row">
                    <span class="h-spacer h-spacer-4"></span> <code>--f-spacer-4</code>
                </div>
                <div class="spacer-row">
                    <span class="h-spacer h-spacer-5"></span> <code>--f-spacer-5</code>
                </div>
                <div class="spacer-row">
                    <span class="h-spacer h-spacer-6"></span> <code>--f-spacer-6</code>
                </div>
                <div class="spacer-row">
                    <span class="h-spacer h-spacer-7"></span> <code>--f-spacer-7</code>
                </div>
                <div class="spacer-row">
                    <span class="h-spacer h-spacer-8"></span> <code>--f-spacer-8</code>
                </div>
                <div class="spacer-row">
                    <span class="h-spacer h-spacer-9"></span> <code>--f-spacer-9</code>
                </div>
            </div>
        </div>
    `,
    data() {
        return {};
    },
});

export const Paddings = () => ({
    //language=HTML
    template: `
        <div>
            <h3><code>padding</code></h3>
            <div class="gridauto fos-4">
                <div v-for="i in 10">
                    <div :class="'pa-' + (i - 1) + ' bac-grey-4'"><div class="bac-grey-1" style=""><code>.pa-{{ i - 1 }}</code></div></div>
                </div>
            </div>

            <h3><code>padding-top</code></h3>
            <div class="gridauto fos-4">
                <div v-for="i in 10">
                    <div :class="'pat-' + (i - 1) + ' bac-grey-4'"><div class="bac-grey-1" style=""><code>.pat-{{ i - 1 }}</code></div></div>
                </div>
            </div>

            <h3><code>padding-right</code></h3>
            <div class="gridauto fos-4">
                <div v-for="i in 10">
                    <div :class="'par-' + (i - 1) + ' bac-grey-4'"><div class="bac-grey-1" style=""><code>.par-{{ i - 1 }}</code></div></div>
                </div>
            </div>

            <h3><code>padding-bottom</code></h3>
            <div class="gridauto fos-4">
                <div v-for="i in 10">
                    <div :class="'pab-' + (i - 1) + ' bac-grey-4'"><div class="bac-grey-1" style=""><code>.pab-{{ i - 1 }}</code></div></div>
                </div>
            </div>

            <h3><code>padding-left</code></h3>
            <div class="gridauto fos-4">
                <div v-for="i in 10">
                    <div :class="'pal-' + (i - 1) + ' bac-grey-4'"><div class="bac-grey-1" style=""><code>.pal-{{ i - 1 }}</code></div></div>
                </div>
            </div>
        </div>
    `,
});

export const Margins = () => ({
    //language=HTML
    template: `
        <div>
            <h3><code>margin</code></h3>
            <div class="gridauto fos-4">
                <div v-for="i in 10">
                    <div :class="'pa-' + (i - 1) + ' bac-grey-4'"><div class="bac-grey-1" style=""><code>.ma-{{ i - 1 }}</code></div></div>
                </div>
            </div>

            <h3><code>margin-top</code></h3>
            <div class="gridauto fos-4">
                <div v-for="i in 10">
                    <div :class="'pat-' + (i - 1) + ' bac-grey-4'"><div class="bac-grey-1" style=""><code>.mat-{{ i - 1 }}</code></div></div>
                </div>
            </div>

            <h3><code>margin-right</code></h3>
            <div class="gridauto fos-4">
                <div v-for="i in 10">
                    <div :class="'par-' + (i - 1) + ' bac-grey-4'"><div class="bac-grey-1" style=""><code>.mar-{{ i - 1 }}</code></div></div>
                </div>
            </div>

            <h3><code>margin-bottom</code></h3>
            <div class="gridauto fos-4">
                <div v-for="i in 10">
                    <div :class="'pab-' + (i - 1) + ' bac-grey-4'"><div class="bac-grey-1" style=""><code>.mab-{{ i - 1 }}</code></div></div>
                </div>
            </div>

            <h3><code>margin-left</code></h3>
            <div class="gridauto fos-4">
                <div v-for="i in 10">
                    <div :class="'pal-' + (i - 1) + ' bac-grey-4'"><div class="bac-grey-1" style=""><code>.mal-{{ i - 1 }}</code></div></div>
                </div>
            </div>
        </div>
    `,
});
