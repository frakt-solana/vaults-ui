import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

interface NavigationLinkProps {
  to: string;
  children?: null | JSX.Element | JSX.Element[] | string;
  isActive?: (match?: any, location?: any) => boolean;
  exact?: boolean;
}

const NavigationLink = ({
  to,
  isActive,
  children,
  exact,
}: NavigationLinkProps): JSX.Element => {
  return (
    <NavLink
      to={to}
      className={styles.link}
      activeClassName={styles.activeLink}
      isActive={isActive}
      exact={exact}
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;
