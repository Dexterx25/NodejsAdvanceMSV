export default class userModel {
  public names: string;
  public surnames: string;
  public full_name: string;
  public prefix_number: string;
  public phone_number: number;
  public email: string;
  public type_user_id: string;
  public avatar: string;
  public active: boolean;

  constructor(datas: any) {
    (this.names = datas.names),
      (this.surnames = datas.surnames),
      (this.full_name = `${datas.names} ${
        datas.surnames ? datas.surnames : ''
      }`.trim()),
      (this.prefix_number = datas.prefix_number),
      (this.phone_number = datas.phone_number),
      (this.email = datas.email),
      (this.type_user_id = '2'),
      (this.active = true);
    this.avatar = datas.avatar;
    return { ...this };
  }
}
