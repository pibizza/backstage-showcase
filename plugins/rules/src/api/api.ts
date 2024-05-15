import { createApiRef } from '@backstage/core-plugin-api';
import { JsonObject } from '@backstage/types';
import { ScoreCard } from './types';

export interface ScoreCardApi {
  getHealth(): Promise<{ status: string }>;

  listScoreCards(): Promise<{ results: ScoreCard[] }>;
}

export const scoreCardApiRef = createApiRef<ScoreCardApi>({
  id: 'plugin.rules.service',
});
