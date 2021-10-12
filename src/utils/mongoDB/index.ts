/* eslint-disable no-var */
/* eslint-disable prefer-const */
import '../../store/db';
import { UserMongoModel, AuthMongoModel } from './schemas/index';

export const insertTionDatas = (data: any, type: string) => {
  let $data: any = {};
  for (var k in data) {
    if (data[k]) {
      $data[k] = data[k];
    }
  }
  switch (type) {
    case 'email_register':
    case 'facebook_register':
    case 'ios_register':
      const userCreate = new UserMongoModel($data);
      return userCreate;
    case 'insert_auth_users':
      const authCreated = new AuthMongoModel($data);
      return authCreated;
      break;

    default:
      break;
  }
};

export const queryDatas = async (table: string, typequery: any, joins: any) => {
  console.log('queryAction!', table, typequery, joins);
  let query: any = Object.keys(typequery);
  let queryValues: any = Object.values(typequery);
  let theJoinQuery = '';
  let theQuery = '';
  switch (table) {
    case 'authentications':
      // if (joins) {
      //   theJoinQuery = `INNER JOIN ${joins[0]} ON ${table}.${query[0]} = ${joins[0]}.${query[0]}`;
      // }
      // theQuery = `WHERE ${table}.${query[0]} = '${queryValues[0]}'`;
      // console.log('datasFilter--->', theJoinQuery, 'query-->', theQuery);
      const { _id, ...res } = await (await AuthMongoModel.findOne(typequery))
        ._doc;
      return Object.assign(res, { id: _id.toString() });
      break;

    default:
      break;
  }
};

export const updateDatas = async (data: any, type: string) => {
  console.log('Updata Mock', data, type);
  let $data: any = {};
  for (var k in data) {
    if (data[k]) {
      $data[k] = data[k];
    }
  }
  let { id, ...dataToUpdate } = $data;
  console.log('this is the IDDDDDD--->', id, dataToUpdate);
  switch (type) {
    case 'user_update':
    case 'update_user_forAdmin':
      return await UserMongoModel.findOneAndUpdate({ _id: id }, dataToUpdate, {
        new: true
      });
    case 'update_auth_users':
      return await AuthMongoModel.findOneAndUpdate({ _id: id }, dataToUpdate, {
        new: true
      });
    case 'logout_auth_users':
      return await AuthMongoModel.findOneAndUpdate(
        { _id: id },
        { token: '' },
        {
          new: true
        }
      );
    default:
      break;
  }
};

export const getData = async (querys: any, type: string) => {
  console.log('this is the querys GET--->', querys);
  let $data: any = {};
  for (var k in querys) {
    if (querys[k] != null) $data[k] = querys[k];
  }
  console.log('this is the dataFormating GET--->', $data);
  let { id, ...rest } = $data;
  switch (type) {
    case 'getUser':
      return await UserMongoModel.findOne({ _id: id, active: true });
    default:
      break;
  }
};

export const listDatas = async (table: any, type: any) => {
  switch (table) {
    case 'users':
      const listDatas = await UserMongoModel.find({ active: true });
      return listDatas;
      break;

    default:
      break;
  }
};

export const patchDatas = async (data: any, type: string) => {
  console.log('Updata Mock', data, type);
  let $data: any = {};
  for (var k in data) {
    if (data[k]) {
      $data[k] = data[k];
    }
  }
  console.log('DATASSSS_-', $data);
  switch (type) {
    case 'user_patch_active':
      const { id, active, ...rest } = $data;
      console.log('this is the active--->', active);
      return await UserMongoModel.findOneAndUpdate(
        { _id: id },
        { active: true },
        { new: true }
      );
    default:
      break;
  }
};
