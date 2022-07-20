import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const gold: AppRouteModule = {
  path: '/gold',
  name: 'Gold',
  component: LAYOUT,
  redirect: '/gold/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:money-collect-outlined',
    title: t('routes.dashboard.gold'),
    orderNo: 11,
  },
  children: [
    {
      path: 'index',
      name: 'goldPage',
      component: () => import('/@/views/gold/index.vue'),
      meta: {
        title: t('routes.dashboard.gold'),
        icon: 'ant-design:money-collect-outlined'
        ,
        hideMenu: true,
      },
    },
  ],
};

export default gold;
