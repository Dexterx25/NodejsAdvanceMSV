import request from 'request';
require('dotenv').config();
export default function createRemoteDB(host: any, port: any) {
  const URL = 'http://' + host + ':' + port;

  function list(table: any) {
    return req('GET', table);
  }

  function get(table: string, id: any) {
    return req('GET', table, id);
  }

  function insert(table: string, data: any) {
    return req('POST', table, data);
  }

  function update(table: string, data: any) {
    return req('PUT', table, data);
  }

  function upsert(table: string, data: any) {
    if (data.id) {
      return update(table, data);
    }

    return insert(table, data);
  }

  function query(table: string, query: any, join: any) {
    return req('POST', table + '/query', { query, join });
  }

  function req(method: any, table: string, data?: any) {
    let url = URL + '/' + table;
    let body = '';

    if (method === 'GET' && data) {
      url += '/' + data;
    } else if (data) {
      body = JSON.stringify(data);
    }

    return new Promise((resolve, reject) => {
      request(
        {
          method,
          headers: {
            'content-type': 'application/json'
          },
          url,
          body
        },
        (err, req, body) => {
          if (err) {
            console.error('Error con la base de datos remota', err);
            return reject(err.message);
          }

          const resp = JSON.parse(body);
          return resolve(resp.body);
        }
      );
    });
  }

  return {
    list
  };
}
