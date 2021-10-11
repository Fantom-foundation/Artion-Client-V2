import Vue from 'vue';

import FIconset from 'fantom-vue-components/src/components/FIconset/FIconset.vue';
import FButton from 'fantom-vue-components/src/components/FButton/FButton.vue';
// import FSvgIcon from 'fantom-vue-components/src/components/FSvgIcon/FSvgIcon.vue';

import FForm from 'fantom-vue-components/src/components/FForm/FForm.vue';
import FFormInput from 'fantom-vue-components/src/components/FFormInput/FFormInput.vue';
import FDataGrid from 'fantom-vue-components/src/components/FDataGrid/FDataGrid.vue';
import FCard from 'fantom-vue-components/src/components/FCard/FCard.vue';
import FComboBox from 'fantom-vue-components/src/components/FComboBox/FComboBox.vue';
import FErrorMessagesPopover from 'fantom-vue-components/src/components/FErrorMessagesPopover/FErrorMessagesPopover.vue';
import FInput from 'fantom-vue-components/src/components/FInput/FInput.vue';
import FOption from 'fantom-vue-components/src/components/FOption/FOption.vue';
import FToggleButton from 'fantom-vue-components/src/components/FToggleButton/FToggleButton.vue';
import FImage from 'fantom-vue-components/src/components/FImage/FImage.vue';

import AppIconset from '@/modules/app/components/AppIconset/AppIconset.vue';
import APlaceholder from '@/common/components/APlaceholder/APlaceholder.vue';
import APriceField from '@/common/components/APriceField/APriceField.vue';
import AWindow from '@/common/components/AWindow/AWindow.vue';

// install global components
Vue.component('FIconset', FIconset);
Vue.component('FButton', FButton);
// Vue.component('FSvgIcon', FSvgIcon);

Vue.component('FForm', FForm);
Vue.component('FDataGrid', FDataGrid);
// Vue.component('DataGridRowEdit', DataGridRowEdit);
// Vue.component('FSearchField', FSearchField);
Vue.component('FFormInput', FFormInput);
Vue.component('FCard', FCard);
Vue.component('FComboBox', FComboBox);
Vue.component('FInput', FInput);
Vue.component('FOption', FOption);
Vue.component('FToggleButton', FToggleButton);
Vue.component('FErrorMessagesPopover', FErrorMessagesPopover);
Vue.component('FImage', FImage);

Vue.component('AppIconset', AppIconset);
Vue.component('APlaceholder', APlaceholder);
Vue.component('APriceField', APriceField);
Vue.component('AWindow', AWindow);
