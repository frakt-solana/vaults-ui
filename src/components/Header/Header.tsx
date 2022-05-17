import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { Container } from '../Layout';
import { AppNavigation, DropdownMenuMore } from './AppNavigation';
import BurgerMenu from '../BurgerMenu';
import { PATHS } from '../../constants';
import ConnectButton from '../ConnectButton';
import ConnectedButton from '../ConnectedButton';
import WalletContent from '../WalletContent';
import { useWalletModal } from '../../contexts/WalletModal';
import NavigationLink from './NavigationLink';

interface HeaderProps {
  className?: string;
  customHeader?: JSX.Element;
}

const Header: FC<HeaderProps> = ({ className, customHeader }) => {
  const { connected } = useWallet();
  const { visible } = useWalletModal();

  return (
    <header className={classNames(styles.root, styles.header, className)}>
      {visible && <WalletContent />}
      <Container component="nav" className={styles.container}>
        <a href={PATHS.FRAKT} className={styles.logo}>
          Frakt
        </a>
        <AppNavigation>
          <DropdownMenuMore />
        </AppNavigation>
        <ul className={styles.buttons}>
          <li className={styles.bgAccent}>
            <NavigationLink to={PATHS.FRAKTIONALIZE}>
              Fraktionalize
            </NavigationLink>
          </li>
          <li>
            <div className={styles.profileWrapper}>
              {connected ? (
                <ConnectedButton
                  className={classNames(
                    styles.walletBtn,
                    styles.walletConnectedBtn,
                  )}
                />
              ) : (
                <ConnectButton className={styles.walletBtn} />
              )}
            </div>
          </li>
        </ul>
        <BurgerMenu />
      </Container>
      {customHeader}
    </header>
  );
};

export default Header;
