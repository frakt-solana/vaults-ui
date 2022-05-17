import { FC } from 'react';

import { PATHS } from './paths';
import {
  Page404,
  SwapPage,
  VaultsPage,
  VaultPage,
  WalletPage,
  PoolsPage,
  FraktionalizePage,
  CollectionsPage,
  CollectionPage,
} from '../pages';

interface Route {
  path: string;
  exact: boolean;
  component: FC;
}

export const routes: Route[] = [
  {
    exact: true,
    path: PATHS.ROOT,
    component: VaultsPage,
  },
  {
    exact: true,
    path: `${PATHS.VAULT}${PATHS.VAULT_PUBKEY}`,
    component: VaultPage,
  },
  {
    exact: true,
    path: PATHS.SWAP,
    component: SwapPage,
  },
  {
    exact: true,
    path: `${PATHS.FRAKTIONALIZE}${PATHS.VAULT_PUBKEY}?`,
    component: FraktionalizePage,
  },
  {
    exact: true,
    path: `${PATHS.WALLET}${PATHS.WALLET_PUBKEY}`,
    component: WalletPage,
  },
  {
    exact: true,
    path: PATHS.COLLECTIONS,
    component: CollectionsPage,
  },
  {
    exact: true,
    path: `${PATHS.COLLECTION}${PATHS.COLLECTION_NAME}`,
    component: CollectionPage,
  },
  {
    exact: true,
    path: PATHS.EARN,
    component: PoolsPage,
  },
  {
    exact: true,
    path: PATHS.PAGE_404,
    component: Page404,
  },
  {
    exact: true,
    path: '*',
    component: Page404,
  },
];
