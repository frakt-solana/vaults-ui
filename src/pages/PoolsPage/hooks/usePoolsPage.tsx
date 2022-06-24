import { useEffect, useMemo, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import BN from 'bn.js';

import { ArrowDownSmallIcon } from '../../../icons';
import { useDebounce } from '../../../hooks';
import {
  useLiquidityPools,
  compareNumbers,
  useLazyRaydiumPoolsInfoMap,
  PoolData,
  RaydiumPoolInfoMap,
} from '../../../contexts/liquidityPools';
import { useUserTokens } from '../../../contexts/userTokens';
import styles from '../PoolsPage.module.scss';
import { useLazyPoolsStats, PoolsStatsByMarketId } from './useLazyPoolsStats';

export type LpBalanceByMint = Map<string, BN>;

export enum InputControlsNames {
  SHOW_STAKED = 'showStaked',
  SORT = 'sort',
}

export type SortValue = {
  label: JSX.Element;
  value: string;
};

export type FormFieldValues = {
  [InputControlsNames.SHOW_STAKED]: boolean;
  [InputControlsNames.SORT]: SortValue;
};

export const usePoolsPage = (): {
  formControl: Control<FormFieldValues>;
  loading: boolean;
  poolsData: PoolData[];
  raydiumPoolsInfoMap: RaydiumPoolInfoMap;
  searchItems: (value?: string) => void;
  activePoolTokenAddress: string | null;
  onPoolCardClick: (tokenAddress: string) => void;
  userLpBalanceByMint: LpBalanceByMint;
  poolsStatsByMarketId: PoolsStatsByMarketId;
} => {
  const { control, watch } = useForm({
    defaultValues: {
      [InputControlsNames.SHOW_STAKED]: false,
      [InputControlsNames.SORT]: SORT_VALUES[0],
    },
  });

  const { rawUserTokensByMint, loading: userTokensLoading } = useUserTokens();
  const {
    poolsStatsByMarketId,
    fetchPoolsStats,
    loading: poolsStatsLoading,
  } = useLazyPoolsStats();
  const [searchString, setSearchString] = useState<string>('');
  const sort = watch(InputControlsNames.SORT);
  const showStaked = watch(InputControlsNames.SHOW_STAKED);

  const { poolDataByMint, loading: poolDataByMintLoading } =
    useLiquidityPools();

  const rawPoolsData = useMemo(() => {
    return poolDataByMint.size
      ? Array.from(poolDataByMint.values()).filter(
          ({ tokenInfo }) => tokenInfo.address !== process.env.FRKT_MINT,
        ) //? Filter out SOL/FRKT pool
      : [];
  }, [poolDataByMint]);

  const searchItems = useDebounce((search: string) => {
    setSearchString(search?.toUpperCase());
  }, 300);

  const {
    loading: poolsInfoMapLoading,
    raydiumPoolsInfoMap,
    fetchPoolsInfoMap,
  } = useLazyRaydiumPoolsInfoMap();

  const userLpBalanceByMint: LpBalanceByMint = useMemo(() => {
    if (rawPoolsData.length && !userTokensLoading) {
      return rawPoolsData.reduce((lpBalanceByMint, { poolConfig }) => {
        const lpMint = poolConfig.lpMint.toBase58();

        const tokenAccountInfo = rawUserTokensByMint[lpMint];

        if (tokenAccountInfo && tokenAccountInfo.amountBN.gt(new BN(0))) {
          lpBalanceByMint.set(lpMint, tokenAccountInfo.amountBN);
        }

        return lpBalanceByMint;
      }, new Map<string, BN>());
    }

    return new Map<string, BN>();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawPoolsData, userTokensLoading]);

  useEffect(() => {
    if (rawPoolsData.length) {
      const poolConfigs = rawPoolsData.map(({ poolConfig }) => poolConfig);

      fetchPoolsInfoMap(poolConfigs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawPoolsData]);

  const loading =
    poolsInfoMapLoading || poolDataByMintLoading || poolsStatsLoading;

  useEffect(() => {
    if (rawPoolsData.length) {
      const marketIds = rawPoolsData.map(({ poolConfig }) =>
        poolConfig.marketId.toBase58(),
      );

      fetchPoolsStats(marketIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawPoolsData]);

  const poolsData = useMemo(() => {
    if (
      !rawPoolsData.length ||
      !raydiumPoolsInfoMap.size ||
      !poolsStatsByMarketId.size
    ) {
      return [];
    }

    const [sortField, sortOrder] = sort.value.split('_');

    return rawPoolsData
      .filter(({ tokenInfo, poolConfig }) => {
        const userStakesInPool = !!userLpBalanceByMint.has(
          poolConfig.lpMint.toBase58(),
        );

        const removeBecauseUserDoesntStake = showStaked && !userStakesInPool;

        if (removeBecauseUserDoesntStake) return false;

        return tokenInfo.symbol?.toUpperCase().includes(searchString);
      })
      .sort(({ poolConfig: poolConfigA }, { poolConfig: poolConfigB }) => {
        if (sortField === 'liquidity') {
          return compareNumbers(
            poolsStatsByMarketId.get(poolConfigA.marketId.toBase58())
              ?.liquidity,
            poolsStatsByMarketId.get(poolConfigB.marketId.toBase58())
              ?.liquidity,
            sortOrder === 'desc',
          );
        }
        if (sortField === 'apr') {
          return compareNumbers(
            poolsStatsByMarketId.get(poolConfigA.marketId.toBase58())?.apr,
            poolsStatsByMarketId.get(poolConfigB.marketId.toBase58())?.apr,
            sortOrder === 'desc',
          );
        }
        return 0;
      });
  }, [
    rawPoolsData,
    searchString,
    sort,
    showStaked,
    poolsStatsByMarketId,
    raydiumPoolsInfoMap,
    userLpBalanceByMint,
  ]);

  const [activePoolTokenAddress, setActivePoolTokenAddress] = useState<
    string | null
  >();

  const onPoolCardClick = (tokenAddress: string) => {
    if (tokenAddress === activePoolTokenAddress) {
      setActivePoolTokenAddress(null);
    } else {
      setActivePoolTokenAddress(tokenAddress);
    }
  };

  return {
    formControl: control,
    loading,
    poolsData,
    raydiumPoolsInfoMap,
    searchItems,
    activePoolTokenAddress,
    onPoolCardClick,
    userLpBalanceByMint,
    poolsStatsByMarketId,
  };
};

export const SORT_VALUES: SortValue[] = [
  {
    label: (
      <span>
        Liquidity <ArrowDownSmallIcon className={styles.arrowDown} />
      </span>
    ),
    value: 'liquidity_desc',
  },
  {
    label: (
      <span>
        Liquidity <ArrowDownSmallIcon className={styles.arrowUp} />
      </span>
    ),
    value: 'liquidity_asc',
  },
  // {
  //   label: (
  //     <span>
  //       Trading Vol. <ArrowDownSmallIcon className={styles.arrowDown} />
  //     </span>
  //   ),
  //   value: 'trading_desc',
  // },
  // {
  //   label: (
  //     <span>
  //       Trading Vol. <ArrowDownSmallIcon className={styles.arrowUp} />
  //     </span>
  //   ),
  //   value: 'trading_asc',
  // },
  //TODO Caclulate APR
  {
    label: (
      <span>
        APY <ArrowDownSmallIcon className={styles.arrowDown} />
      </span>
    ),
    value: 'apr_desc',
  },
  {
    label: (
      <span>
        APY <ArrowDownSmallIcon className={styles.arrowUp} />
      </span>
    ),
    value: 'apr_asc',
  },
];
