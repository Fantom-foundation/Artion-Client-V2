import ADetails from '@/common/components/ADetails/ADetails.vue';

export default {
    title: 'Components/ADetails',
    components: ADetails,
};

export const Default = () => ({
    components: { ADetails },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <a-details label="Label">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
            </a-details>
        </div>
    `,
});
