import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Anish Portfolio',
  projectId: 'e7hia29y',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // This turns Hero into a single "Click to Edit" button
            S.listItem()
              .title('Hero Section')
              .id('hero')
              .child(
                S.document()
                  .schemaType('hero')
                  .documentId('hero')
              ),
            // This keeps everything else normal
            ...S.documentTypeListItems().filter(
              (listItem) => !['hero'].includes(listItem.getId())
            ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})