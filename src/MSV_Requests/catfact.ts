/* eslint-disable prefer-const */
import fetch from 'cross-fetch';
let apiBase = 'https://catfact.ninja/fact';

const getCuriousFact = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(apiBase);
      const RandonCuriousFact = await res.json();
      console.log('this is the catFact fetch--->', RandonCuriousFact);
      resolve(RandonCuriousFact);
    } catch (error) {
      console.log('error trying to fetch corius fact!', error);
      reject({ msg: error, statusCode: 400 });
    }
  });
};

export { getCuriousFact };
