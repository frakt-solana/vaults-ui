import styles from './styles.module.scss';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../../../constants';
import { ArrowLeftIcon } from '../../../icons';
import classNames from 'classnames';

interface BackToSearchButtonProps {
  className?: string;
}

export const BackToVaultsListButton = ({
  className,
}: BackToSearchButtonProps): JSX.Element => {
  return (
    <NavLink className={classNames(className, styles.backLink)} to={PATHS.ROOT}>
      <ArrowLeftIcon className={styles.arrowIcon} />
      Back to Vaults list
    </NavLink>
  );
};
