import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import author from './author'

export const schemaTypes = [post, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, author],
}
