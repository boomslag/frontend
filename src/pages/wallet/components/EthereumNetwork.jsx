import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';

import TokenListSec from './TokenListSec';
import FullWidthMoonLoader from '@/components/loaders/FullWidthMoonLoader';

import ListTokenBalances from '@/api/tokens/ListBalances';

export default function EthereumNetwork({ loading, fetchTokens, count, pageSize }) {
  //   const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [searchBy, setSearchBy] = useState('');
  const tokens = useSelector((state) => state.crypto.tokens);

  const [ethTokens, setEthTokens] = useState([]);
  useEffect(() => {
    const ethTokensRes = tokens.filter((token) => token.network === 'Ethereum');
    setEthTokens(ethTokensRes);
  }, [tokens]);

  useEffect(() => {
    async function fetchBalances() {
      if (ethTokens.length > 0) {
        const ethBalances = await ListTokenBalances(ethTokens);
        setTokenBalances(ethBalances.data.results);
      }
    }
    fetchBalances();
  }, [ethTokens]);

  const onSubmit = async (e) => {
    e.preventDefault();
    fetchTokens(currentPage, searchBy);
  };
  return (
    <div>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg border dark:border-dark-second border-gray-400 px-4 py-4 text-left text-sm font-medium text-purple-900 transition duration-300 ease-in-out hover:border-gray-900 dark:hover:bg-dark-third hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span className="text-lg font-medium dark:text-dark-txt">Ethereum Network</span>
              <ChevronUpIcon
                className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-dark`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <div className=" flex gap-x-4">
                <div className="w-full ">
                  <form
                    onSubmit={(e) => onSubmit(e)}
                    className=" dark:border-dark-border flex border"
                  >
                    <div className=" flex flex-grow items-stretch ">
                      <input
                        type="text"
                        value={searchBy}
                        onChange={(e) => {
                          setSearchBy(e.target.value);
                        }}
                        className="relative w-full focus:outline-none focus:ring-none dark:text-dark-txt-secondary dark:placeholder-dark-txt-secondary -ml-px inline-flex items-center space-x-2 border-l dark:border-dark-border dark:ring-dark-border  dark:bg-dark-bg bg-black px-4 py-2 text-sm font-medium text-white"
                        placeholder="Search your tokens"
                      />
                    </div>
                    <button
                      type="submit"
                      className="relative -ml-px inline-flex items-center space-x-2 border-l dark:border-dark-border bg-black px-4 py-2 text-sm font-medium text-white"
                    >
                      <MagnifyingGlassIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </button>
                  </form>
                </div>
              </div>
              <div className="mt-4">
                {loading ? (
                  <FullWidthMoonLoader />
                ) : (
                  <TokenListSec
                    tokens={ethTokens}
                    tokenBalances={tokenBalances}
                    count={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
