export default class userModel {
  hum = 0;
  temp = 0;
  pm2_5 = 0;
  pm_10 = 0;
  nh3 = 0;
  co = 0;
  co2 = 0;
  constructor(datas: userModel) {
    (this.hum = datas.hum), (this.temp = datas.temp);
    this.pm2_5 = datas.pm2_5;
    this.pm_10 = datas.pm_10;
    this.nh3 = datas.nh3;
    this.co = datas.co;
    this.co2 = datas.co2;
    return { ...this };
  }
}
