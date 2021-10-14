export default class messageModel {
  public message: string;
  public user_id: string;
  public topic: string;
  constructor(datas: any) {
    this.message = datas.message;
    this.user_id = datas.id;
    this.topic = datas.topic;
    return { ...this };
  }
}
