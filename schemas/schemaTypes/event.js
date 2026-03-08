export default {
  name: 'event',
  title: 'SOIES Events',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Event Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'photos',
      title: 'Event Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    }
  ],
  orderings: [
    {
      title: 'Event Date (Latest First)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'photos.0'
    },
    prepare({ title, date, media }) {
      return {
        title: title || 'Untitled Event',
        subtitle: date || 'No date',
        media
      }
    }
  }
}
