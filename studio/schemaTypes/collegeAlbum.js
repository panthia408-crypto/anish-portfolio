// A batch of college photos for the home page "College gallery".
// Make one batch per upload: pick the category, then drag all the files onto "Photos" at once.

const CATEGORIES = [
  { title: 'Academic', value: 'academic' },
  { title: 'Extracurricular', value: 'extracurricular' },
  { title: 'Visits and tours', value: 'visits' },
]

const collegeAlbum = {
  name: 'collegeAlbum',
  title: 'College gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Batch name',
      type: 'string',
      description: 'e.g. "Industrial visit, Hetauda" or "Lab sessions, 5th semester". Used as the caption for photos that have none.',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Every photo in this batch is filed under this, unless a photo picks its own.',
      options: { list: CATEGORIES, layout: 'radio' },
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Date (optional)',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' }
    },
    {
      name: 'photos',
      title: 'Photos',
      type: 'array',
      description: 'Drag many files here at once to upload them together. Click a photo to add its caption.',
      options: { layout: 'grid' },
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'What is happening, e.g. "Testing the turbine model in the fluids lab"'
            },
            {
              name: 'category',
              title: 'Category (only if different from the batch)',
              type: 'string',
              options: { list: CATEGORIES }
            }
          ]
        }
      ]
    }
  ],
  orderings: [
    {
      title: 'Date (Latest First)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      photos: 'photos',
      media: 'photos.0'
    },
    prepare({ title, category, photos, media }) {
      const label = CATEGORIES.find(c => c.value === category)?.title
      const count = Array.isArray(photos) ? photos.length : 0
      return {
        title: title || 'Untitled batch',
        subtitle: [label, `${count} photo${count === 1 ? '' : 's'}`].filter(Boolean).join(' · '),
        media
      }
    }
  }
}

export default collegeAlbum
