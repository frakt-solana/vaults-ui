import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Controller } from 'react-hook-form';

import { SORT_VALUES, InputControlsNames, usePoolsPage } from './hooks';
import { ControlledToggle } from '../../components/Toggle/Toggle';
import { AppLayout } from '../../components/Layout/AppLayout';
import { SearchInput } from '../../components/SearchInput';
import { Container } from '../../components/Layout';
import styles from './PoolsPage.module.scss';
import Pool from './Pool';
import FakeInfinityScroll, {
  useFakeInfinityScroll,
} from '../../components/FakeInfinityScroll';
import { Select } from '../../components/Select';

const PoolsPage: FC = () => {
  const { connected } = useWallet();
  const { itemsToShow, next } = useFakeInfinityScroll(9);
  const {
    formControl,
    loading,
    poolsData,
    raydiumPoolsInfoMap,
    searchItems,
    activePoolTokenAddress,
    onPoolCardClick,
    poolsStatsByMarketId,
  } = usePoolsPage();

  return (
    <AppLayout>
      <Container component="main" className={styles.container}>
        <h1 className={styles.title}>Earn</h1>
        <h2 className={styles.subtitle}>
          Provide NFTs and liquidity to protocol and reap the rewards
        </h2>
        <div className={styles.sortWrapper}>
          <SearchInput
            onChange={(e) => searchItems(e.target.value || '')}
            className={styles.search}
            placeholder="Filter by symbol"
          />
          <div className={styles.filters}>
            {connected && (
              <ControlledToggle
                control={formControl}
                name={InputControlsNames.SHOW_STAKED}
                label="Staked only"
                className={styles.filter}
              />
            )}
            <Controller
              control={formControl}
              name={InputControlsNames.SORT}
              render={({ field: { ref, ...field } }) => (
                <Select
                  valueContainerClassName={styles.sortingSelectContainer}
                  className={styles.sortingSelect}
                  label="Sort by"
                  name={InputControlsNames.SORT}
                  options={SORT_VALUES}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        <FakeInfinityScroll
          itemsToShow={itemsToShow}
          next={next}
          isLoading={loading}
          emptyMessage="No pools found"
        >
          {poolsData.map((poolData) => (
            <Pool
              key={poolData.tokenInfo.address}
              poolData={poolData}
              raydiumPoolInfo={raydiumPoolsInfoMap.get(
                poolData.tokenInfo.address,
              )}
              poolStats={poolsStatsByMarketId.get(
                poolData.poolConfig.marketId.toBase58(),
              )}
              isOpen={activePoolTokenAddress === poolData.tokenInfo.address}
              onPoolCardClick={() =>
                onPoolCardClick(poolData.tokenInfo.address)
              }
            />
          ))}
        </FakeInfinityScroll>
      </Container>
    </AppLayout>
  );
};

export default PoolsPage;
