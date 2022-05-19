import { PATHS } from '../../../constants';
import {
  TwitterIcon,
  DiscordIcon,
  GitHubIcon,
  MediumIcon,
  DocsIcon,
} from '../../../icons';

export const NAVIGATION_LINKS = [
  {
    to: PATHS.ROOT,
    label: 'Vaults',
    exact: true,
  },
  {
    to: PATHS.SWAP,
    label: 'Swap',
  },
  {
    to: PATHS.EARN,
    label: 'Earn',
  },
  {
    to: PATHS.COLLECTIONS,
    label: 'Collections',
  },
];

export const DROPDOWN_EXTERNAL_LINKS = [
  {
    label: 'Twitter',
    href: 'https://twitter.com/FRAKT_HQ',
    icon: TwitterIcon,
  },
  {
    label: 'Discord',
    href: 'https://tinyurl.com/zp3rx6z3',
    icon: DiscordIcon,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/frakt-solana',
    icon: GitHubIcon,
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@frakt_HQ',
    icon: MediumIcon,
  },
  {
    label: 'Docs',
    href: 'https://docs.frakt.xyz/',
    icon: DocsIcon,
  },
];
