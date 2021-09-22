import FSelect from 'fantom-vue-components/src/components/FSelect/FSelect.vue';

export default {
    title: 'Design System/Form Inputs',
};

export const Input = () => ({
    //language=HTML
    template: `
        <div>
            <f-input field-size="large" label="Large" />
            <f-input label="Default" placeholder="placehodler" />
            <f-input field-size="small" label="Small" value="value" />
            <f-input field-size="mini" label="Mini" value="value" />
            <br />
            <f-input disabled field-size="large" label="Large" />
            <f-input disabled label="Default" placeholder="placehodler" />
            <f-input disabled field-size="small" label="Small" value="value" />
            <f-input disabled field-size="mini" label="Mini" value="value" />
            <br />
            <f-input readonly field-size="large" label="Large" />
            <f-input readonly label="Default" placeholder="placehodler" />
            <f-input readonly field-size="small" label="Small" value="value" />
            <f-input readonly field-size="mini" label="Mini" value="value" />
            <br />
            <f-input invalid field-size="large" label="Large" />
            <f-input invalid label="Default" placeholder="placehodler" />
            <f-input invalid field-size="small" label="Small" value="value" />
            <f-input invalid field-size="mini" label="Mini" value="value" />
        </div>
    `,
    data() {
        return {};
    },
});

export const Textarea = () => ({
    //language=HTML
    template: `
        <div>
            <f-input is-textarea cols="20" rows="5" field-size="large" label="Large" />
            <f-input is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
            <f-input is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <f-input is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
            <br />
            <f-input disabled is-textarea cols="20" rows="5" field-size="large" label="Large" />
            <f-input disabled is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
            <f-input disabled is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <f-input disabled is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
            <br />
            <f-input readonly is-textarea cols="20" rows="5" field-size="large" label="Large" />
            <f-input readonly is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
            <f-input readonly is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <f-input readonly is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
            <br />
            <f-input invalid is-textarea cols="20" rows="5" field-size="large" label="Large" />
            <f-input invalid is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
            <f-input invalid is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
            <f-input invalid is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
        </div>
    `,
    data() {
        return {};
    },
});

export const Select = () => ({
    components: { FSelect },
    //language=HTML
    template: `
        <div>
            <f-select label="Large" select-size="large" :data="[...fselectData]" />
            <f-select label="Default" :data="[...fselectData]" />
            <f-select label="Small" select-size="small" :data="[...fselectData]" />
            <f-select label="Mini" select-size="mini" :data="[...fselectData]" />
            <br /><br />
            <f-select disabled label="Large" select-size="large" :data="[...fselectData]" />
            <f-select disabled label="Default" :data="[...fselectData]" />
            <f-select disabled label="Small" select-size="small" :data="[...fselectData]" />
            <f-select disabled label="Mini" select-size="mini" :data="[...fselectData]" />
            <br /><br />
            <f-select invalid label="Large" select-size="large" :data="[...fselectData]" />
            <f-select invalid label="Default" :data="[...fselectData]" />
            <f-select invalid label="Small" select-size="small" :data="[...fselectData]" />
            <f-select invalid label="Mini" select-size="mini" :data="[...fselectData]" />
        </div>
    `,
    data() {
        return {
            fselectData: [
                { label: 'Select an option', value: null, disabled: true },
                { label: 'Option 1', value: 1 },
                { label: 'Option 2', value: 2 },
                { label: 'Option 3', value: 3 },
            ],
        };
    },
});

export const Checkbox = () => ({
    //language=HTML
    template: `
        <div>
            <f-option type="checkbox" option-size="large" label="Large" name="checkbox1_lg" />
            <f-option type="checkbox" label="Default" name="checkbox1" />
            <f-option type="checkbox" option-size="small" label="Small" name="checkbox1_sm" />
            <f-option type="checkbox" option-size="mini" label="Mini" name="checkbox1_xs" />
            <f-option type="checkbox" checked option-size="large" label="Large" name="checkbox1_lg" />
            <f-option type="checkbox" checked label="Default" name="checkbox1" />
            <f-option type="checkbox" checked option-size="small" label="Small" name="checkbox1_sm" />
            <f-option type="checkbox" checked option-size="mini" label="Mini" name="checkbox1_xs" />
            <br /><br />
            <f-option type="checkbox" disabled option-size="large" label="Large" name="checkbox1_lg" />
            <f-option type="checkbox" disabled label="Default" name="checkbox1" />
            <f-option type="checkbox" disabled option-size="small" label="Small" name="checkbox1_sm" />
            <f-option type="checkbox" disabled option-size="mini" label="Mini" name="checkbox1_xs" />
            <f-option type="checkbox" disabled checked option-size="large" label="Large" name="checkbox1_lg" />
            <f-option type="checkbox" disabled checked label="Default" name="checkbox1" />
            <f-option type="checkbox" disabled checked option-size="small" label="Small" name="checkbox1_sm" />
            <f-option type="checkbox" disabled checked option-size="mini" label="Mini" name="checkbox1_xs" />
        </div>
    `,
    data() {
        return {};
    },
});

export const Radio = () => ({
    //language=HTML
    template: `
        <div>
            <div class="gridauto">
                <span class="par-4">
                    Large <br />
                    <f-option checked type="radio" label="123" option-size="large" name="radio1_lg" value="10" />
                    <f-option type="radio" option-size="large" name="radio1_lg" value="20" />
                </span>
                <span class="par-4">
                    Default <br />
                    <f-option type="radio" name="radio1" value="10" />
                    <f-option checked type="radio" name="radio1" value="20" />
                </span>
                <span class="par-4">
                    Small <br />
                    <f-option checked type="radio" option-size="small" name="radio1_sm" value="10" />
                    <f-option type="radio" option-size="small" name="radio1_sm" value="20" />
                </span>
                <span class="par-4">
                    Mini <br />
                    <f-option type="radio" option-size="mini" name="radio1_xs" value="10" />
                    <f-option checked type="radio" option-size="mini" name="radio1_xs" value="20" />
                </span>
            </div>
            <br />
            <div class="gridauto">
                <span class="par-4">
                    Large <br />
                    <f-option
                        disabled
                        checked
                        type="radio"
                        label="123"
                        option-size="large"
                        name="dradio1_lg"
                        value="10"
                    />
                    <f-option disabled type="radio" option-size="large" name="dradio1_lg" value="20" />
                </span>
                <span class="par-4">
                    Default <br />
                    <f-option disabled type="radio" name="dradio1" value="10" />
                    <f-option disabled checked type="radio" name="dradio1" value="20" />
                </span>
                <span class="par-4">
                    Small <br />
                    <f-option disabled checked type="radio" option-size="small" name="dradio1_sm" value="10" />
                    <f-option disabled type="radio" option-size="small" name="dradio1_sm" value="20" />
                </span>
                <span class="par-4">
                    Mini <br />
                    <f-option disabled type="radio" option-size="mini" name="dradio1_xs" value="10" />
                    <f-option disabled checked type="radio" option-size="mini" name="dradio1_xs" value="20" />
                </span>
            </div>
        </div>
    `,
    data() {
        return {};
    },
});

export const ToggleButton = () => ({
    //language=HTML
    template: `
        <div>
            <f-toggle-button option-size="large" label="Large" name="togglebtn1_lg" />
            <f-toggle-button label="Default" name="togglebtn1" />
            <f-toggle-button option-size="small" label="Small" name="togglebtn1_sm" />
            <f-toggle-button option-size="mini" label="Mini" name="togglebtn1_xs" />
            <f-toggle-button checked option-size="large" label="Large" name="togglebtn1_lg" />
            <f-toggle-button checked label="Default" name="togglebtn1" />
            <f-toggle-button checked option-size="small" label="Small" name="togglebtn1_sm" />
            <f-toggle-button checked option-size="mini" label="Mini" name="togglebtn1_xs" />
            <br /><br />
            <f-toggle-button disabled option-size="large" label="Large" name="togglebtn1_lg" />
            <f-toggle-button disabled label="Default" name="togglebtn1" />
            <f-toggle-button disabled option-size="small" label="Small" name="togglebtn1_sm" />
            <f-toggle-button disabled option-size="mini" label="Mini" name="togglebtn1_xs" />
            <f-toggle-button disabled checked option-size="large" label="Large" name="togglebtn1_lg" />
            <f-toggle-button disabled checked label="Default" name="togglebtn1" />
            <f-toggle-button disabled checked option-size="small" label="Small" name="togglebtn1_sm" />
            <f-toggle-button disabled checked option-size="mini" label="Mini" name="togglebtn1_xs" />
        </div>
    `,
    data() {
        return {};
    },
});

export const Form = () => ({
    //language=HTML
    template: `
        <div>
        <f-form style="max-width: 600px">
            <div class="mab-5">
                <f-form-input type="text" label="text" name="text" />
                <f-form-input type="email" label="email" name="email" />
                <f-form-input type="number" label="number" name="number" />
                <f-form-input type="date" label="date" name="date" />
                <f-form-input type="time" label="time" name="time" />
            </div>
            <div class="mab-5">
                <f-form-input type="textarea" label="textarea" name="textarea" />
            </div>
            <div class="mab-5">
                <f-form-input type="passwordfield" label="passwordfield" name="passwordfield" />
            </div>
            <div class="mab-5">
                <f-form-input type="slider" label="slider" name="slider" use-lower-fill-bar step="10" />
            </div>
            <div class="mab-5">
                <f-form-input
                    type="select"
                    label="select"
                    name="select"
                    :data="[
                                { label: '---', value: '' },
                                { label: 'Option 1', value: 1 },
                                { label: 'Option 2', value: 2 },
                                { label: 'Option 3', value: 3 },
                            ]"
                />
                <f-form-input
                    type="dropdownlistbox"
                    label="dropdownlistbox"
                    name="dropdownlistbox"
                    :data="[
                                { label: '---', value: '' },
                                { label: 'Option 1', value: 1 },
                                { label: 'Option 2', value: 2 },
                                { label: 'Option 3', value: 3 },
                            ]"
                />
            </div>
            <div class="mab-5">
                <f-form-input type="checkbox" label="checkbox" name="checkbox" />
                <br />
                <f-form-input
                    type="checkboxgroup"
                    label="checkboxgroup"
                    name="checkboxgroup"
                    column
                    :data="{ '10': 'Checkbox 1', '20': 'Checkbox 2' }"
                />
            </div>
            <div class="mab-5">
                <f-form-input type="radio" label="radio" value="10" name="radio" />
                <f-form-input type="radio" label="Radio 2" value="20" name="radio" />
                <br />
                <f-form-input
                    type="radiogroup"
                    label="radiogroup"
                    name="radiogroup"
                    column
                    :data="{ '10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3' }"
                />
            </div>
            <div class="mab-5">
                <f-form-input
                    type="listbox"
                    name="listbox"
                    label="Listbox"
                    :data="[
                                { label: 'item 100', value: '100' },
                                { label: 'item 200', id: 'myid3', value: '200' },
                                { label: 'item 300 Lorem ipsum', value: '300' },
                            ]"
                />
            </div>
        </f-form>

        </div>
    `,
    data() {
        return {};
    },
});
