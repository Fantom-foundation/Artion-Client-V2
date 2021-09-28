import ADetailsGroup from '@/common/components/ADetailsGroup/ADetailsGroup.vue';
import ADetails from '@/common/components/ADetails/ADetails.vue';

export default {
    title: 'Components/ADetailsGroup',
    components: ADetailsGroup,
};

export const Default = () => ({
    components: { ADetailsGroup, ADetails },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <a-details-group>
                <a-details label="Section 1">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                    ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
                </a-details>
                <a-details label="Section 2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                    ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
                </a-details>
                <a-details label="Section 3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                    ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
                </a-details>
            </a-details-group>
        </div>
    `,
});

export const Rounded = () => ({
    components: { ADetailsGroup, ADetails },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <a-details-group rounded>
                <a-details label="Section 1">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                    ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
                </a-details>
                <a-details label="Section 2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                    ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
                </a-details>
                <a-details label="Section 3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                    ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
                </a-details>
            </a-details-group>

            <br />
            <a-details-group rounded>
                <a-details label="Section 1">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi, at consequatur culpa,
                    ea eius ipsam magni molestias nisi officia, optio porro quam qui ratione reiciendis soluta ut!
                </a-details>
            </a-details-group>
        </div>
    `,
});
