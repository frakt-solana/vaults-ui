import React, { useEffect, useMemo, useState } from 'react';
import { TokenInfo } from '@solana/spl-token-registry';

import { TokenListContextInterface } from './tokenList.model';
import {
  ADDITIONAL_SWAPPABLE_TOKENS_MINTS,
  VERIFIED_BY_FRAKT_TEAM_TOKENS_URL,
} from './tokenList.contants';

export const TokenListContext = React.createContext<TokenListContextInterface>({
  tokensList: [],
  tokensMap: new Map<string, TokenInfo>(),
  fraktionTokensList: [],
  fraktionTokensMap: new Map<string, TokenInfo>(),
  loading: true,
});

//? Don't use TokenListProvider because it's binded with json with 3MB+ size
const getSolanaTokens = async (): Promise<TokenInfo[]> => {
  const res = await (await fetch(process.env.SOLANA_TOKENS_LIST)).json();

  return res?.tokens?.filter(({ chainId }) => chainId === 101) || [];
};

export const TokenListContextProvider = ({
  children = null,
}: {
  children: JSX.Element | null;
}): JSX.Element => {
  const [tokensList, setTokensList] = useState<TokenInfo[]>([]);
  const [fraktionTokensList, setFraktionTokensList] = useState<TokenInfo[]>([]);

  const fraktionTokensListOnlyVault = fraktionTokensList.filter(
    ({ extensions }) => (extensions as any).vault,
  );

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      fetch(VERIFIED_BY_FRAKT_TEAM_TOKENS_URL).then((res) => res.json()),
      getSolanaTokens(),
    ])
      .then(([fraktList, solanaList]) => {
        setTokensList([...fraktList, ...solanaList]);
        setFraktionTokensList(fraktList);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //? Token map for quick lookup.
  const tokensMap = useMemo(() => {
    const tokenMap = new Map();
    tokensList.forEach((token: TokenInfo) => {
      tokenMap.set(token.address, token);
    });
    return tokenMap;
  }, [tokensList]);

  //? Fraktion map for quick lookup.
  const fraktionTokensMap = useMemo(() => {
    const fraktionTokensMap = new Map();
    fraktionTokensListOnlyVault.forEach((token: TokenInfo) => {
      fraktionTokensMap.set(token.address, token);
    });

    if (fraktionTokensMap.size) {
      ADDITIONAL_SWAPPABLE_TOKENS_MINTS.forEach((mint) => {
        const token: TokenInfo = tokensMap.get(mint);
        if (token) {
          fraktionTokensMap.set(mint, tokensMap.get(mint));
        }
      });
    }

    return fraktionTokensMap;
  }, [fraktionTokensListOnlyVault, tokensMap]);

  return (
    <TokenListContext.Provider
      value={{
        tokensMap,
        loading,
        tokensList,
        fraktionTokensList: fraktionTokensListOnlyVault,
        fraktionTokensMap,
      }}
    >
      {children}
    </TokenListContext.Provider>
  );
};
