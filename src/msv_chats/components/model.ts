 export  default class messageModel {
 public userName: string;
 public avatar: string;
 public message: string;
 public userId: string;
 public channel_id: string;
 public msg_id: string;
 
  constructor(datas:any) {
      this.userName = datas.full_name
      this.avatar = datas.avatar
      this.message = datas.message
      this.userId = datas.userId
      this.channel_id = datas.channel_id
      this.msg_id = datas.msg_id
      return {...this}
    }
}