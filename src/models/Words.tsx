import {Realm} from '@realm/react';

export class Words extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  word!: string;
  transWord!: string;
  from!: string;
  to!: string;
  listName!: string;

  // the Task.generate() method creates Task objects with fields with default values
  static generate(
    word: string,
    transWord: string,
    from: string,
    to: string,
    listName: string,
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      word,
      transWord,
      from,
      to,
      listName,
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Word',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      word: 'string',
      transWord: 'string',
      from: 'string',
      to: 'string',
      listName: 'string',
    },
  };
}

// const config = {
//   schema: [Words],
// };
// export default createRealmContext(config);

// export const {useRealm, useQuery, useObject, RealmProvider} =
//   createRealmContext({schema: [Words]});
