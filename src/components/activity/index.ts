import { App } from 'vue';
import Button from './vButton/component/index.vue';
import ButtonConfig from './vButton/config/index.vue';
import Text from './vText/component/index.vue';
import TextConfig from './vText/config/index.vue';
import Image from './vImage/component/index.vue';
import ImageConfig from './vImage/config/index.vue';
import Carrier from './carrier/component/index.vue';
import CarrierConfig from './carrier/config/index.vue';

const registerCustomComponents = (Vue:App<Element>) => {
  Vue.component('vButton', Button);
  Vue.component('vButtonConfig', ButtonConfig);
  Vue.component('vText', Text);
  Vue.component('vTextConfig', TextConfig);
  Vue.component('vImage', Image);
  Vue.component('vImageConfig', ImageConfig);
  Vue.component('Carrier', Carrier);
  Vue.component('CarrierConfig', CarrierConfig);
};

export default registerCustomComponents;
