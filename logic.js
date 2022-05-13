
'use strict';

const {
  BEVERAGES_INFO,
  VALID_COIN,
  PAYMENT_TYPES,
  REMAIN_BALANCE,
} = require('./constants');

/**
 *  현금을 투입 및 추가 투입하는 경우
 *  인식 가능한 현금 단위인지 확인 후 더한다
 * 
 * @param {Number} inputCoin 투입한 현금
 * @param {Number} totalCoin 투입된 현금의 총합
 *  */
exports.addCoin = (inputCoin, totalCoin) => {
  if (VALID_COIN.includes(inputCoin)) totalCoin += inputCoin;
  else throw new Error('인식 불가능한 단위 입니다. 투입된 현금을 반환합니다.');

  return totalCoin;
}

/**
 * 수량이 남아 있으면서, 가격이 totalCoin 이하인 음료수 정보 반환
 * 지불방식이 카드인 경우, 모든 음료를 보여준 뒤 음료수 선택 후 카드 잔액을 확인한다
 * 
 * @param {String} paymentType 지불 방식
 * @param {Number} totalCoin 투입된 현금의 총합
 * @returns {Array} 구매 가능한 음료수 정보 배열
 */
exports.availableBeverages = (paymentType, totalCoin) => {
  const result = [];

  if (paymentType === PAYMENT_TYPES.Card) return BEVERAGES_INFO;

  for (const beverage of BEVERAGES_INFO) {
    const { price, amount } = beverage;
    
    if (amount && (price <= totalCoin)) result.push(beverage);
  }

  return result;
}
/**
 * @param {String} choicedName 선택한 음료수의 이름
 * @returns {Object} 유저가 선택한 음료수의 정보 반환
 */
const findMatchedBeverage = (choicedName) => BEVERAGES_INFO.find(beverage => choicedName === beverage.name);

/**
 * 구매 완료 후 음료수 수량 차감
 * @param {String} choicedName 선택한 음료수의 이름
 */
const decreamentAmount = (choicedName) => BEVERAGES_INFO.forEach((beverage) => {
  if (choicedName === beverage.name) beverage.amount += 1;
});

/**
 * 
 * @param {String} paymentType 지불 방식
 * @param {String} choicedName 선택한 음료수의 이름
 * @param {Number} totalCoin 투입된 현금의 총합
 */
exports.choiceBeverage = (paymentType, choicedName, totalCoin = REMAIN_BALANCE) => {
  const choicedBeverage = findMatchedBeverage(choicedName);
  const { name, price } = choicedBeverage;
  let change = 0; // 거스름돈

  switch (paymentType) {
    case PAYMENT_TYPES.Coin:
      console.log(`선택하신 음료수 ${name} 구매에 성공 하셨습니다.`);
      break;
    case PAYMENT_TYPES.Card:
      if (price > totalCoin) throw new Error('카드 잔액이 부족합니다. 다시 음료수를 선택해주세요');
      console.log(`선택하신 음료수 ${name} 구매에 성공 하셨습니다.`);
      break;
    default:
      throw new Error('지원하지 않는 지불 방식입니다.');
  }
  
  /** 거스름돈 계산 */
  change = (totalCoin -= price);

  /** 수량 차감 */
  decreamentAmount(choicedName);
  
  return { ...choicedBeverage, change };
}
