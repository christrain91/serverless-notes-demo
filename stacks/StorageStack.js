import * as sst from '@serverless-stack/resources'

export default class StorageStack extends sst.Stack {
  // public reference to bucket
  bucket;

  // public reference to table
  table;

  constructor (scope, id, props) {
    super(scope, id, props)

    this.bucket = new sst.Bucket(this, 'Uploads')

    this.table = new sst.Table(this, 'Notes', {
      fields: {
        userId: sst.TableFieldType.STRING,
        noteId: sst.TableFieldType.STRING
      },
      primaryIndex: { partitionKey: 'userId', sortKey: 'noteId' },
    })
  }
}