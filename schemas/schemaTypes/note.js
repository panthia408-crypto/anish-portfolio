export default {
  name: 'note',
  title: 'E-Library & Work',
  type: 'document',
  fields: [
    { 
      name: 'category', 
      title: 'Category', 
      type: 'string',
      options: {
        list: [
          {title: 'Semester Note', value: 'semester'},
          {title: 'Research', value: 'research'},
          {title: 'Visit/Project', value: 'work'}
        ]
      }
    },
    { 
      name: 'semesterName', 
      title: 'Semester/Group Name', 
      type: 'string',
      description: 'e.g., 6th Semester' 
    },
    {
      name: 'subjects',
      title: 'Subjects List',
      type: 'array',
      description: 'Add all subjects for this semester here',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Subject Title', type: 'string' },
            { name: 'externalLink', title: 'Link (Drive/PDF)', type: 'url' },
          ]
        }
      ]
    }
  ]
}