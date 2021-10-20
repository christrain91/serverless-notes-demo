import handler from './util/handler'
import dynamoDb from './util/dynamoDb'

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // the id of the author
      noteId: event.pathParameters.id
    }
  }

  const result = await dynamoDb.get(params)

  if (!result.Item) {
    throw new Error('Item not found.')
  }

  return result.Item
})