import { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { DROPDOWN_EXTERNAL_LINKS, NAVIGATION_LINKS } from './constants';
import styles from './AppNavigation.module.scss';
import NavigationLink from '../NavigationLink';
import { PATHS } from '../../../constants';
import { Dropdown } from '../../Dropdown';

interface AppNavigationProps {
  className?: string;
  withoutLinks?: boolean;
  children: ReactElement;
}

export const DropdownMenuMore: FC = () => {
  return (
    <Dropdown title="More">
      <ul>
        <li>
          <NavLink className={styles.dropdownLink} to={PATHS.COLLECTIONS}>
            Collections
          </NavLink>
        </li>
        {DROPDOWN_EXTERNAL_LINKS.map(({ label, href, icon: Icon }, idx) => (
          <li key={idx}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.dropdownLink}
            >
              <Icon width={24} />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};

export const AppNavigation: FC<AppNavigationProps> = ({
  className,
  withoutLinks,
  children,
}) => {
  return (
    <ul
      className={classNames(
        styles.navigation,
        styles.navigation_left,
        className,
      )}
    >
      {!withoutLinks &&
        NAVIGATION_LINKS.map(({ label, to }, idx) => (
          <li key={idx} className={styles.navigationItem}>
            <NavigationLink to={to}>{label}</NavigationLink>
          </li>
        ))}
      {children}
    </ul>
  );
};
