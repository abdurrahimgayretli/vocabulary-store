import {Realm, createRealmContext} from '@realm/react';
import {Words} from './Words';

export class Lists extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  listName!: string;

  // the Task.generate() method creates Task objects with fields with default values
  static generate(listName: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      listName,
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'List',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      listName: 'string',
    },
  };
}

export const {useRealm, useQuery, RealmProvider} = createRealmContext({
  schema: [Words.schema, Lists.schema],
  deleteRealmIfMigrationNeeded: true,
});
