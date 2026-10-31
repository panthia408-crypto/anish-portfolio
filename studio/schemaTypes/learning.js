const learning = {
  name: 'learningEntry',
  title: 'MEP Learning Log',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'What I learned',
      type: 'string',
      description: 'One line, e.g. "Sizing supply ducts with the equal friction method"',
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: Rule => Rule.required()
    },
    {
      name: 'area',
      title: 'Area',
      type: 'string',
      options: {
        list: ['HVAC', 'Plumbing', 'Electrical', 'Fire protection', 'AutoCAD MEP', 'General']
      }
    },
    {
      name: 'source',
      title: 'Tool or source',
      type: 'string',
      description: 'e.g. AutoCAD MEP, a course, a book, a site visit'
    },
    {
      name: 'note',
      title: 'Note',
      type: 'text',
      rows: 3,
      description: '1 to 3 sentences in your own words: what clicked, or what you built.'
    },
    {
      name: 'image',
      title: 'Image (optional)',
      type: 'image',
      options: { hotspot: true },
      description: 'A screenshot or photo of the work. Landscape works best.'
    },
    {
      name: 'link',
      title: 'Link (optional)',
      type: 'url'
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
      date: 'date',
      area: 'area',
      media: 'image'
    },
    prepare({ title, date, area, media }) {
      return {
        title: title || 'Untitled entry',
        subtitle: [date, area].filter(Boolean).join(' · '),
        media
      }
    }
  }
}

export default learning
