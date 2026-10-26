export default {
  name: 'timeline',
  title: 'Timeline / Experience',
  type: 'document',
  fields: [
    { name: 'year', title: 'Year/Date', type: 'string' },
    { name: 'title', title: 'Achievement/Role', type: 'string' },
    { name: 'institution', title: 'Company/University', type: 'string' },
    { name: 'description', title: 'Details', type: 'text' },
    { name: 'order', title: 'Sort Order', type: 'number', description: 'Higher numbers show up first' }
  ]
}