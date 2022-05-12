'use strict';

exports.VALID_COIN = [
  100,
  500,
  1000,
  5000,
  10000,
];

/**
 * 구매 가능한 음료수 정보.
 * 수량은 임의로 100개로 셋팅
 */
exports.BEVERAGES_INFO = [
  {
    name: 'coke',
    price: 1100,
    amount: 100,
  },
  {
    name: 'water',
    price: 600,
    amount: 100,
  },
  {
    name: 'coffee',
    price: 700,
    amount: 100,
  },
];

exports.PAYMENT_TYPES = {
  Coin: 'COIN',
  Card: 'CARD',
}

exports.REMAIN_BALANCE = 10000;