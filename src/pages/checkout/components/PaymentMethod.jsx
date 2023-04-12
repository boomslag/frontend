import React, { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
// import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { ToastSuccess } from '@/components/ToastSuccess';

// const plans = [
//   { name: 'Cryptocurrency', ram: '', value: 'ethereum', disk: '160 GB SSD disk', url: eth_icon },
//   { name: 'Credit card', ram: '', value: 'credit_card', disk: '256 GB SSD disk', url: creditcard_icon },
//   { name: 'Paypal', ram: '', value: 'paypal', disk: '256 GB SSD disk', url: paypal_icon  },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PaymentMethod({
  ethPayment,
  setEthPayment,
  handleEthPayment,
  maticBalance,
  adaPayment,
  setAdaPayment,
  handleAdaPayment,
  // creditPayment,
  // setCreditPayment,
  // handleCreditPayment,
  // amount,
  // compare_amount,
  // shipping_estimate,
  // tax_estimate,
  // stripe,
  // elements,
  // handleChange,
  // CARD_ELEMENT_OPTIONS,
  // onSubmit,
  // agreed,
  // setAgreed,
  // agreedCard,
  // setAgreedCard,
  // stripe_payment_id,
  // status,
  // newCreditCard,
  // setNewCreditCard,
  // eth_price,
  ethBalance,
  ethereumWallet,
  // totalAmount,
  totalAmountEth,
  maticCost,
  // user,
  // handleSubmitSub
}) {
  const [effectETH, setEffectETH] = useState(false);
  return (
    <>
      {/* Ethereum Payment */}
      <RadioGroup
        onClick={() => {
          handleEthPayment();
        }}
        value={ethPayment}
        onChange={setEthPayment}
      >
        <RadioGroup.Label className="sr-only"> Server size </RadioGroup.Label>
        <div className="space-y-4">
          <RadioGroup.Option
            value="ethereum"
            onMouseDown={() => {
              setEffectETH(true);
            }}
            onMouseUp={() => setEffectETH(false)}
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : ' dark:border-dark-border border-gray-900',
                active ? 'border-gray-900 dark:border-dark-border  ring-gray-900' : '',
                effectETH
                  ? 'duration-400 animate-click hover:translate-x-0.5  hover:translate-y-0.5 hover:shadow-neubrutalism-sm'
                  : '',
                'relative mb-1.5 block cursor-pointer  border-2 dark:bg-dark-second bg-white px-6 py-4 dark:shadow-none shadow-neubrutalism-sm transition duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neubrutalism-md focus:outline-none sm:flex sm:justify-between',
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span className="flex items-center">
                  <span className="flex flex-col text-sm">
                    <RadioGroup.Label
                      as="span"
                      className="text-base font-bold dark:text-dark-txt text-gray-900"
                    >
                      Polygon
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span" className="text-gray-500">
                      <span className="block sm:inline" />
                    </RadioGroup.Description>
                  </span>
                </span>
                <RadioGroup.Description
                  as="span"
                  className="mt-2 flex text-sm sm:mt-0 sm:ml-4 sm:flex-col sm:text-right"
                >
                  <img
                    width={40}
                    height={40}
                    className="h-5 w-5"
                    src="/assets/img/polygon.png"
                    alt=""
                  />
                  <span className="ml-1 sm:ml-0" />
                </RadioGroup.Description>
                <span
                  className={classNames(
                    active ? 'border ' : 'border-2',
                    checked ? 'border-gray-900 dark:border-dark-border' : 'border-transparent',
                    'pointer-events-none absolute -inset-px dark:text-dark-txt',
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        </div>
      </RadioGroup>
      {ethPayment !== null ? (
        <div className="my-4   ">
          <div className="  px-4  sm:px-6">
            <div className=" flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className=" ">
                <p className="mt-1 text-lg font-bold leading-6 dark:text-dark-txt text-gray-600">
                  Transaction Information
                </p>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <span className="font-regular mr-2 inline-flex text-sm dark:text-dark-txt-secondary text-gray-500">
                  {maticBalance > maticCost ? 'Sufficient funds' : 'Insufficient funds'}
                </span>
                {maticBalance > maticCost ? (
                  <CheckCircleIcon className="relative inline-flex h-5 w-5 text-forest-green-300" />
                ) : (
                  <XCircleIcon className="relative inline-flex h-5 w-5 text-rose-500" />
                )}
              </div>
            </div>
          </div>

          {/* Your wallet info */}
          <div className=" px-4  sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <p className="font-regular text-base leading-6 dark:text-dark-txt text-gray-900">
                  Your Wallet
                </p>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <CopyToClipboard text={ethereumWallet && ethereumWallet.polygon_address}>
                  <button
                    type="button"
                    onClick={() => {
                      ToastSuccess('Copiado');
                    }}
                    className="relative inline-flex w-full cursor-pointer items-center py-2 text-sm font-medium dark:text-dark-txt-secondary text-gray-600"
                  >
                    {ethereumWallet.polygon_address}
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
          <div className=" px-4  sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <p className="font-regular text-base leading-6 dark:text-dark-txt text-gray-900">
                  Available MATIC
                </p>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <div className="relative inline-flex cursor-pointer items-center dark:text-dark-txt-secondary py-2 text-sm font-medium text-gray-600">
                  {maticBalance}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}

      {/* Cardano Payment */}
      {/* <RadioGroup
        onClick={() => {
          handleAdaPayment();
        }}
        value={adaPayment}
        onChange={setAdaPayment}
      >
        <RadioGroup.Label className="sr-only"> Server size </RadioGroup.Label>
        <div className="space-y-4">
          <RadioGroup.Option
            value="cardano"
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'border-gray-900 ring-2 ring-gray-900' : '',
                'relative mb-1.5 block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between',
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span className="flex items-center">
                  <span className="flex flex-col text-sm">
                    <RadioGroup.Label as="span" className="text-base font-bold text-gray-900">
                      Cardano
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span" className="text-gray-500">
                      <span className="block sm:inline" />
                    </RadioGroup.Description>
                  </span>
                </span>
                <RadioGroup.Description
                  as="span"
                  className="mt-2 flex text-sm sm:mt-0 sm:ml-4 sm:flex-col sm:text-right"
                >
                  <img
                    width={40}
                    height={40}
                    className="h-5 w-5"
                    src="/assets/img/cardano_blue.png"
                    alt=""
                  />
                  <span className="ml-1 text-gray-500 sm:ml-0" />
                </RadioGroup.Description>
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-gray-900' : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-lg',
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        </div>
      </RadioGroup>
      {adaPayment !== null ? (
        <div className="mb-2 rounded-b-lg border-b border-gray-200 bg-gray-50">
          <div className="border-b border-gray-100 px-4  sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="mt-1 text-lg font-bold leading-6 text-gray-600">
                  Transaction Information
                </h3>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <span className="font-regular mr-2 inline-flex text-sm text-gray-500">
                  {(ethBalance && ethBalance.balance) > totalAmountEth
                    ? 'Sufficient funds'
                    : 'Insufficient funds'}
                </span>
                {(ethBalance && ethBalance.balance) > totalAmountEth ? (
                  <CheckCircleIcon className="text-green-500 relative inline-flex h-5 w-5" />
                ) : (
                  <XCircleIcon className="relative inline-flex h-5 w-5 text-rose-500" />
                )}
              </div>
            </div>
          </div>

          <div className=" px-4  sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="font-regular text-base leading-6 text-gray-900">Your Wallet</h3>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <CopyToClipboard text={ethereumWallet && ethereumWallet.address}>
                  <button
                    type="button"
                    onClick={() => {
                      ToastSuccess('Copiado');
                    }}
                    className="relative inline-flex w-full cursor-pointer items-center rounded-md  py-2 text-sm font-medium text-gray-600"
                  >
                    {ethereumWallet.address}
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
          <div className=" px-4  sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="font-regular text-base leading-6 text-gray-900">Available ADA</h3>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <div className="relative inline-flex cursor-pointer items-center rounded-md  py-2 text-sm font-medium text-gray-600">
                  {ethBalance && ethBalance.balance}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )} */}

      {/* Credit card payment */}
      {/*       
      <RadioGroup onClick={()=>{handleCreditPayment()}} value={creditPayment} onChange={setCreditPayment}>
        <RadioGroup.Label className="sr-only"> Server size </RadioGroup.Label>
        <div className="space-y-4">
        <RadioGroup.Option
              value='credit_card'
              className={({ checked, active }) =>
                classNames(
                  checked ? 'border-transparent' : 'border-gray-300',
                  active ? 'border-gray-900 ring-2 ring-gray-900' : '',
                  'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span className="flex items-center">
                    <span className="flex flex-col text-sm">
                      <RadioGroup.Label as="span" className="font-bold text-base text-gray-900">
                        Credit Card
                      </RadioGroup.Label>
                      <RadioGroup.Description as="span" className="text-gray-500">
                        <span className="block sm:inline">
                          
                        </span>
                      </RadioGroup.Description>
                    </span>
                  </span>
                  <RadioGroup.Description
                    as="span"
                    className="mt-2  text-sm sm:mt-0 sm:ml-4 inline-flex sm:text-right"
                  >
                    <img 
                    width={40}
                    height={40}
                    className='w-5 h-5 inline-flex mx-1' src='/assets/img/amex.png' alt=''/>
                    <img 
                    width={40}
                    height={40}
                    className='w-5 h-5 inline-flex mx-1' src='/assets/img/discover_card.png' alt=''/>
                    <img 
                    width={40}
                    height={40}
                    className='w-5 h-5 inline-flex mx-1' src='/assets/img/mastercard.png' alt=''/>
                    <img 
                    width={40}
                    height={40}
                    className='w-5 h-5 inline-flex mx-1' src='/assets/img/visa.png' alt=''/>
                    <span className="ml-1 text-gray-500 sm:ml-0"></span>
                  </RadioGroup.Description>
                  <span
                    className={classNames(
                      active ? 'border' : 'border-2',
                      checked ? 'border-gray-900' : 'border-transparent',
                      'pointer-events-none absolute -inset-px rounded-lg'
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
        </div>
      </RadioGroup>
      {
        creditPayment!==null ? 
        <div className='bg-gray-50 mb-2 border rounded-b-lg border-gray-200'>
                <>
                  {
                    user && user.stripe_payment_id === null ?
                    <CardElement 
                      className="my-2 mx-2 p-4 border bg-white rounded-lg border-gray-900" 
                      options={CARD_ELEMENT_OPTIONS} onChange={handleChange}
                    />
                    : newCreditCard ?
                    <CardElement 
                      className="my-2 mx-2 p-4 border bg-white rounded-lg border-gray-900" 
                      options={CARD_ELEMENT_OPTIONS} onChange={handleChange}
                    />
                    :
                    <></>
                  }

                  {
                    newCreditCard ?
                    <div className="p-2">
                      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                        {
                          user && user.stripe_payment_id === null ?
                          <div className="ml-4 mt-2">
                            <p className="text-base m-2 text-gray-500">
                              <Switch 
                                checked={agreedCard}
                                onChange={setAgreedCard}
                                className={classNames(
                                  agreedCard ? 'bg-iris-600' : 'bg-gray-200 dark:bg-dark-main',
                                  'relative inline-flex flex-shrink-0 mr-2 h-6 w-11 border-2 dark:text-dark-txt border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-iris-500'
                                  )}
                              >
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                      agreedCard ? 'translate-x-5 ' : 'translate-x-0',
                                      'inline-block h-5 w-5 rounded-full bg-white  shadow transform ring-0 transition ease-in-out duration-200'
                                  )}
                                  />
                                  
                              </Switch>
                                  Save card for future purchases?
                            </p>
                          </div>
                          :
                          <>
                            <div className="ml-4 mt-2">
                              <p className="text-base m-2 text-gray-500">
                                <Switch 
                                  checked={agreedCard}
                                  onChange={setAgreedCard}
                                  className={classNames(
                                    agreedCard ? 'bg-iris-600' : 'bg-gray-200 dark:bg-dark-main',
                                    'relative inline-flex flex-shrink-0 mr-2 h-5 w-11 border-2 dark:text-dark-txt border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-iris-500'
                                    )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                        agreedCard ? 'translate-x-6 ' : 'translate-x-0',
                                        'inline-block h-4 w-4 rounded-full bg-white  shadow transform ring-0 transition ease-in-out duration-200'
                                    )}
                                    />
                                    
                                </Switch>
                                    Save card for future purchases?
                              </p>
                            </div>
                            {
                              user && user.stripe_payment_id !== null &&
                              <div className="ml-4 mt-2 flex-shrink-0">
                                  <button
                                    onClick={()=>{setNewCreditCard(false)}}
                                    className="relative inline-flex items-center rounded-md border border-transparent underline underline-offset-2 px-4 py-2 text-sm font-medium text-iris-600 "
                                  >
                                    Use Saved Card
                                  </button>
                              </div>
                            }
                          </>
                        }
                      </div>
                    </div>
                    :
                    <div className="p-2">
                      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                        <div className="ml-4 mt-2">
                          <p className="text-base m-2 text-gray-500">
                                Using Saved Card on File
                          </p>
                        </div>
                        <div className="ml-4 mt-2 flex-shrink-0">
                            <button
                              onClick={()=>{setNewCreditCard(true)}}
                              className="relative inline-flex items-center rounded-md border border-transparent underline underline-offset-2 px-4 py-2 text-sm font-medium text-iris-600 "
                            >
                              New Credit Card
                            </button>
                        </div>
                      </div>
                    </div>
                  }
                  


                  
                </>

        </div>
        :
        <></>
      } */}
    </>
  );
}
