import {Realm} from '@realm/react';

export class Words extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  word!: string;
  transWord!: string;
  soruce!: string;
  target!: string;

  static generate(
    word: string,
    transWord: string,
    soruce: string,
    target: string,
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      word,
      transWord,
      soruce,
      target,
    };
  }
  static schema = {
    name: 'Word',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      word: 'string',
      transWord: 'string',
      soruce: 'string',
      target: 'string',
      list: {type: 'linkingObjects', objectType: 'List', property: 'words'},
    },
  };
}
