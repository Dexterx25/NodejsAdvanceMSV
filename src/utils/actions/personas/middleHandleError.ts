import * as store from '../../../store/postgres';
export async function midlleHandleError(
  e: any,
  table: string,
  data: any,
  resolve: any,
  reject: any
) {
  if (e.code == '23505' && e.constraint == 'uq_personas_email') {
    reject({ msg: 'Corro electronico ya registrado, intente con otro' });
    return false;
  }
  if (e.code == '23505' && e.constraint == 'uq_phone_number') {
    reject({ msg: 'Numero telefonico ya regiestrado previamente' });
    return false;
  }
}
