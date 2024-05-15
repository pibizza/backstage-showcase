import {
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
  createApiFactory,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { scoreCardApiRef } from './api/api';
import { ScoreCardBackendClient } from './api/RulesClient';

export const rulesPlugin = createPlugin({
  id: 'rules',
  apis: [
    createApiFactory({
      api: scoreCardApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
      },
      factory: ({ discoveryApi }) =>
        new ScoreCardBackendClient({ discoveryApi }),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const RulesPage = rulesPlugin.provide(
  createRoutableExtension({
    name: 'RulesPage',
    component: () =>
      import('./components/RulesComponent').then(m => m.RulesComponent),
    mountPoint: rootRouteRef,
  }),
);
