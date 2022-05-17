import React, { useEffect, useState } from 'react';
import { TokenInfo } from '@solana/spl-token-registry';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import { useTokenListContext } from '../TokenList';
import {
  fetchRaydiumPoolsInfo,
  addRaydiumLiquidity,
  removeRaydiumLiquidity,
  raydiumSwap,
  createRaydiumLiquidityPool,
} from './liquidityPools';
import { fetchPoolDataByMint } from './liquidityPools.helpers';
import {
  LiquidityPoolsContextValues,
  LiquidityPoolsProviderType,
  PoolDataByMint,
} from './liquidityPools.model';

export const LiquidityPoolsContext =
  React.createContext<LiquidityPoolsContextValues>({
    loading: true,
    poolDataByMint: new Map(),
    fetchRaydiumPoolsInfo: () => Promise.resolve(null),
    raydiumSwap: () => Promise.resolve(null),
    createRaydiumLiquidityPool: () => Promise.resolve(null),
    addRaydiumLiquidity: () => Promise.resolve(null),
    removeRaydiumLiquidity: () => Promise.resolve(null),
  });

export const LiquidityPoolsProvider: LiquidityPoolsProviderType = ({
  children,
}) => {
  const { fraktionTokensMap } = useTokenListContext();
  const { connection } = useConnection();
  const wallet = useWallet();

  const [loading, setLoading] = useState<boolean>(true);
  const [poolDataByMint, setPoolDataByMint] = useState<PoolDataByMint>(
    new Map(),
  );

  const fetchPoolData = async (fraktionTokensMap: Map<string, TokenInfo>) => {
    try {
      const poolDataByMint = await fetchPoolDataByMint({
        tokensMap: fraktionTokensMap,
      });

      setPoolDataByMint(poolDataByMint);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fraktionTokensMap.size && fetchPoolData(fraktionTokensMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fraktionTokensMap.size]);

  return (
    <LiquidityPoolsContext.Provider
      value={{
        loading,
        poolDataByMint,
        fetchRaydiumPoolsInfo: fetchRaydiumPoolsInfo(connection),
        raydiumSwap: raydiumSwap({
          connection,
          wallet,
        }),
        createRaydiumLiquidityPool: createRaydiumLiquidityPool({
          connection,
          wallet,
        }),
        removeRaydiumLiquidity: removeRaydiumLiquidity({
          connection,
          wallet,
        }),
        addRaydiumLiquidity: addRaydiumLiquidity({
          connection,
          wallet,
        }),
      }}
    >
      {children}
    </LiquidityPoolsContext.Provider>
  );
};
