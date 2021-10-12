export default function mailValidator(data: any, reject: any, datas?: any) {
  if (data.email) {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (data.email.length > 300)
      return reject({ msg: 'El correo no debe superar los 300 caracteres!' });
    if (emailRegex.test(data.email) == false)
      return reject({
        msg: 'El Correo no presenta un formato valido de correo'
      });
  } else {
    return 'El email debe ser introducido';
  }
}
