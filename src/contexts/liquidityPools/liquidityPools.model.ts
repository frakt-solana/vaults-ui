import { LiquidityPoolKeysV4 } from '@raydium-io/raydium-sdk';
import { TokenInfo } from '@solana/spl-token-registry';
import BN from 'bn.js';
import { ReactNode } from 'react';

import {
  AddLiquidityTransactionParams,
  RemoveLiquidityTransactionParams,
  SwapTransactionParams,
} from './transactions/raydiumLiquidityPools';

export interface LiquidityPoolsContextValues {
  loading: boolean;
  poolDataByMint: PoolDataByMint;
  fetchRaydiumPoolsInfo: (
    raydiumPoolConfigs: LiquidityPoolKeysV4[],
  ) => Promise<RaydiumPoolInfo[]>;
  raydiumSwap: (params: SwapTransactionParams) => Promise<boolean | void>;
  createRaydiumLiquidityPool: (params: any) => Promise<void>;
  addRaydiumLiquidity: (
    params: AddLiquidityTransactionParams,
  ) => Promise<boolean | null>;
  removeRaydiumLiquidity: (
    params: RemoveLiquidityTransactionParams,
  ) => Promise<boolean>;
}

export interface LiquidityPoolKeysV4String {
  authority: string;
  baseMint: string;
  baseVault: string;
  id: string;
  lpMint: string;
  lpVault: string;
  marketAsks: string;
  marketAuthority: string;
  marketBaseVault: string;
  marketBids: string;
  marketEventQueue: string;
  marketId: string;
  marketProgramId: string;
  marketQuoteVault: string;
  marketVersion: number;
  openOrders: string;
  programId: string;
  quoteMint: string;
  quoteVault: string;
  targetOrders: string;
  version: number;
  withdrawQueue: string;
}

export type LiquidityPoolsProviderType = ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element;

export interface RaydiumPoolInfo {
  status: BN;
  baseDecimals: number;
  quoteDecimals: number;
  lpDecimals: number;
  baseReserve: BN;
  quoteReserve: BN;
  lpSupply: BN;
}

export type RaydiumPoolInfoMap = Map<string, RaydiumPoolInfo>;

export type PoolDataByMint = Map<string, PoolData>;

export interface PoolData {
  tokenInfo: TokenInfo;
  poolConfig: LiquidityPoolKeysV4;
}

export type FetchPoolDataByMint = ({
  tokensMap,
}: {
  tokensMap: Map<string, TokenInfo>;
}) => Promise<PoolDataByMint>;

export interface RaydiumPoolInfo {
  status: BN;
  baseDecimals: number;
  quoteDecimals: number;
  lpDecimals: number;
  baseReserve: BN;
  quoteReserve: BN;
  lpSupply: BN;
}
