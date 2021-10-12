/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

const socketIO = require('socket.io');

let socket: any = {};
let thisSocket: any = {};

let users: any[] = [];
let messages: any = {};
let rooms: any[] = [];

function connect(server: any) {
  socket.io = socketIO(server);

  socket.io.on('connection', (sock: any) => {
    thisSocket.io = sock;

    console.log('User connected! new userId', thisSocket.io.id);

    thisSocket.io.on('join server', (username: string) => {
      const user = {
        username,
        id: thisSocket.io.id
      };
      users.push(user);
      thisSocket.io.emit('New User', users);
    });

    // eslint-disable-next-line prettier/prettier
thisSocket.io.on('create_room', ({channel_id, user_id, user_name}: any)=>{
        if (!rooms.find((e) => e.channel_id == channel_id)) {
          console.log('VAMOS A METER ESTE CHANNEL AQUI--->', channel_id);
          thisSocket.io.join(channel_id);
          rooms.push({
            channel_id: channel_id,
            users: [{ user_id: user_id, name: user_name }]
          });
        } else {
          console.log('This room is created before');
        }
        // eslint-disable-next-line prettier/prettier
      })

    thisSocket.io.on('join_room', ({ room, user_id, user_name }: any) => {
      if (rooms.find((e) => e.channel_id == room.channel_id)) {
        console.log('Esta sala sí está dentro-->', room.channel_id);
        thisSocket.io.join(room.channel_id);
        if (rooms.findIndex((e) => e.channel_id == room.channel_id) !== -1) {
          rooms.filter((e) => {
            if (e.channel_id == room.channel_id) {
              if (e.users.findIndex((e: any) => e.user_id == user_id) == -1) {
                e.users.push({
                  user_id: user_id,
                  user_name: user_name
                });
              }
            }
          });
        }
      } else {
        console.log('THIS ROOM DONT EXISTS ===>', room.channel_id, rooms);
        return thisSocket.io.emit('err', 'ERROR, this room dont exists');
      }
    });

    thisSocket.io.on('message', ({ channel_id, message }: any) => {
      console.log('Data Message sending SOCKETIO-->', message);
      thisSocket.io.to(channel_id).emit('message', message);
    });

    thisSocket.io.on('typing', ({ room, full_name }: any) => {
      console.log('Typing Room Fire now', room);

      thisSocket.io
        .to(room.channel_id)
        .emit('typing', { full_name: full_name });
    });

    thisSocket.io.on('stopped_typing', ({ room, full_name }: any) => {
      console.log('StoppedTyping Room Fire now', room, full_name);
      thisSocket.io
        .to(room.channel_id)
        .emit('stopped_typing', { full_name: full_name });
    });

    thisSocket.io.on('disconnect', () => {
      console.log('User disconnected!', thisSocket.io.id);
      getUsersRooms(thisSocket.io).forEach((room: any) => {
        const usr: any = rooms
          .find((e) => e.channel_id == room.channel_id)
          .users.find((e: any) => e.user_id == socket.id);
        thisSocket.io
          .to(room.channel_id)
          .broadcast.emit('user-disconnected', usr);
        return room.filter((e: any) => e !== usr);
      });
    });
  });
}

function getUsersRooms(socket: any) {
  return rooms.reduce((acc, item) => {
    if (item.users.find((e: any) => e.user_id == socket.id) != null)
      acc.push(item);
    return acc;
  }, []);
}

export default {
  connect, //exportamos la función que maneja la conexión a el servido
  socket,
  thisSocket
};
