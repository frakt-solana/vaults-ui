import classNames from 'classnames/bind';
import { FC } from 'react';

import Button from '../../../../../components/Button';
import { Loader } from '../../../../../components/Loader';
import {
  PoolData,
  RaydiumPoolInfo,
} from '../../../../../contexts/liquidityPools';
import { useUserTokens } from '../../../../../contexts/userTokens';
import { AccountInfoParsed } from '../../../../../utils/accounts';
import Withdraw from '../../../Withdraw';
import styles from './PoolDetailsWalletConnected.module.scss';

interface PoolDetailsWalletConnectedProps {
  setDepositModalVisible: (depositModalVisible: boolean) => void;
  poolData: PoolData;
  raydiumPoolInfo: RaydiumPoolInfo;
  lpTokenAccountInfo?: AccountInfoParsed;
  className?: string;
}

export const PoolDetailsWalletConnected: FC<PoolDetailsWalletConnectedProps> =
  ({
    setDepositModalVisible,
    poolData,
    raydiumPoolInfo,
    lpTokenAccountInfo,
    className,
  }) => {
    const { tokenInfo, poolConfig } = poolData;

    const { loading } = useUserTokens();

    return (
      <div className={classNames(styles.root, className)}>
        {loading ? (
          <Loader size="default" />
        ) : (
          <>
            <Withdraw
              baseToken={tokenInfo}
              poolConfig={poolConfig}
              raydiumPoolInfo={raydiumPoolInfo}
              lpTokenAccountInfo={lpTokenAccountInfo}
            />
            <Button
              onClick={() => setDepositModalVisible(true)}
              className={styles.depositBtn}
              type="alternative"
            >
              Deposit
            </Button>
          </>
        )}
      </div>
    );
  };
