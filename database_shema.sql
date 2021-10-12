CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;




CREATE TABLE type_users(
    id varchar PRIMARY KEY not null,
    name_type_user varchar not null,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON type_users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


CREATE SEQUENCE type_users_id_seq OWNED BY type_users.id;
ALTER sequence type_users_id_seq INCREMENT BY 1; 
ALTER TABLE type_users ALTER COLUMN id SET DEFAULT nextval('type_users_id_seq'::regclass);

CREATE INDEX "index_type_users_name_type_user" on type_users(name_type_user);
CREATE INDEX "index_type_users_id" on type_users(id);

INSERT INTO type_users(id, name_type_user) values('1','basic_user');
INSERT INTO type_users(id, name_type_user) values('2','super_user');

CREATE TABLE users( 
  id varchar PRIMARY KEY not null,
  names varchar not null,
  surnames varchar default '',
  full_name varchar default '',
  prefix_number varchar,
  type_user_id varchar,
  active boolean DEFAULT false,
  email varchar not null,
  phone_number varchar,
  avatar varchar default '',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      FOREIGN KEY (type_user_id)
          REFERENCES type_users(id)
          ON DELETE CASCADE
);


CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE SEQUENCE users_id_seq OWNED BY users.id;
ALTER sequence users_id_seq INCREMENT BY 1; 
ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);

CREATE INDEX "index_users_on_email" on users(email);
CREATE INDEX "index_users_on_full_name" on users(full_name);
alter table users  add constraint UQ_personas_email  unique (email);
alter table users  add constraint UQ_phone_number  unique (phone_number);


CREATE TABLE authentications(
  id varchar PRIMARY KEY not null,
  user_id varchar,
  encrypted_password varchar not null default '',
  email varchar,
  token varchar DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY(user_id)
     REFERENCES users(id)
     ON DELETE CASCADE
);
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON authentications
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE SEQUENCE authentications_id_seq OWNED BY authentications.id;
ALTER sequence authentications_id_seq INCREMENT BY 1; 

ALTER TABLE authentications ALTER COLUMN id SET DEFAULT nextval('authentications_id_seq'::regclass);

CREATE INDEX "index_authentications_users_id" on authentications(user_id);
CREATE INDEX "index_authentications_email" on authentications(email);


CREATE TABLE channelchats(
  id varchar PRIMARY KEY not null,
  channel_name varchar,
  user_id varchar,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP,
    FOREIGN KEY(user_id)
     REFERENCES users(id)
      ON DELETE CASCADE
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON channelchats
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

--CREATE SEQUENCE FOR EVENTS TABLE: 
CREATE SEQUENCE channelchats_id_seq OWNED BY channelchats.id;
ALTER TABLE channelchats ALTER COLUMN id SET DEFAULT nextval('channelchats_id_seq'::regclass);
--Indexings for events Table: 
CREATE INDEX "index_channelchats_on_deleted_at" on channelchats(deleted_at);
CREATE INDEX "index_channelchats_on_user_id" on channelchats(user_id);


CREATE TABLE messages(
  id varchar PRIMARY KEY not null,
  user_id varchar not null,
  message text not null,
  channel_id varchar not null,
  file varchar,
  deleted_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY(user_id)
      REFERENCES users(id)
       ON DELETE CASCADE,
    FOREIGN KEY(channel_id)
      REFERENCES channelchats(id)
       ON DELETE CASCADE
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON messages
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


--CREATE SEQUENCE FOR EVENTS TABLE: 
CREATE SEQUENCE messages_id_seq OWNED BY messages.id;
ALTER TABLE messages ALTER COLUMN id SET DEFAULT nextval('messages_id_seq'::regclass);

CREATE INDEX "index_messages_on_deleted_at" on messages(deleted_at);
CREATE INDEX "index_messages_on_channelchats_id" on messages(channel_id);
CREATE INDEX "index_messages_on_user_id" on messages(user_id);