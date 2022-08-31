import { use } from 'echarts/core';

// import ECharts modules manually to reduce bundle size
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, TreeChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  AxisPointerComponent,
} from 'echarts/components';

import VChart from 'vue-echarts';

export default defineNuxtPlugin((nuxtApp) => {
  use([
    CanvasRenderer,
    LineChart,
    TreeChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    ToolboxComponent,
    GridComponent,
    AxisPointerComponent,
  ]);
  // @ts-ignore
  nuxtApp.vueApp.component('v-chart', VChart);
});
