export default {
    title: 'Design System/Colors',
    /*decorators: [
        Story => ({
            components: [Story],
            template: `
                <div><story /></div>
            `,
        }),
    ],*/
};

export const Text = () => ({
    //language=HTML
    template: `
        <div>
            <div v-for="(color, i) in colors" :key="'clr_' + i" class="pab-5">
                <div class="gridauto gridauto-miw-128 fos-4">
                    <div v-for="i in 9" :class="color.classPrefix + i">
                        <b><code>.{{ color.classPrefix }}{{ i }}</code></b><br>
                        <code class="fos-2">({{ color.customPropertyPrefix }}{{ i }})</code>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            colors: [
                {
                    label: 'Primary',
                    classPrefix: 'co-primary-',
                    customPropertyPrefix: '--f-color-primary-',
                },
                {
                    label: 'Grey',
                    classPrefix: 'co-grey-',
                    customPropertyPrefix: '--f-color-grey-',
                },
                {
                    label: 'Blue',
                    classPrefix: 'co-blue-',
                    customPropertyPrefix: '--f-color-blue-',
                },
                {
                    label: 'Red',
                    classPrefix: 'co-red-',
                    customPropertyPrefix: '--f-color-red-',
                },
                {
                    label: 'Green',
                    classPrefix: 'co-green-',
                    customPropertyPrefix: '--f-color-green-',
                },
                {
                    label: 'Orange',
                    classPrefix: 'co-orange-',
                    customPropertyPrefix: '--f-color-orange-',
                },
                {
                    label: 'Yellow',
                    classPrefix: 'co-yellow-',
                    customPropertyPrefix: '--f-color-yellow-',
                },
            ],
        };
    },
});

export const Background = () => ({
    //language=HTML
    template: `
        <div>
            <div v-for="(color, i) in colors" :key="'clr_' + i" class="pab-5">
                <div class="gridauto gridauto-miw-128">
                    <div v-for="i in 9">
                        <div :class="color.classPrefix + i" style="height: 48px;"></div>
                        <code class="fos-4 co-grey-9">.{{ color.classPrefix }}{{ i }}</code>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            colors: [
                {
                    label: 'Primary',
                    classPrefix: 'bac-primary-',
                },
                {
                    label: 'Grey',
                    classPrefix: 'bac-grey-',
                },
                {
                    label: 'Blue',
                    classPrefix: 'bac-blue-',
                },
                {
                    label: 'Red',
                    classPrefix: 'bac-red-',
                },
                {
                    label: 'Green',
                    classPrefix: 'bac-green-',
                },
                {
                    label: 'Orange',
                    classPrefix: 'bac-orange-',
                },
                {
                    label: 'Yellow',
                    classPrefix: 'bac-yellow-',
                },
            ],
        };
    },
});
