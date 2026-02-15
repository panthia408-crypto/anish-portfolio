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
          ],
          // This ensures the individual subjects in the list also show their titles
          preview: {
            select: { title: 'title' }
          }
        }
      ]
    }
  ],
  // THIS FIXES THE "SEMESTER" NAME CONFUSION IN THE SIDEBAR
  preview: {
    select: {
      title: 'semesterName',
      cat: 'category',
      subjectList: 'subjects'
    },
    prepare(selection) {
      const {title, cat, subjectList} = selection;
      const count = subjectList ? subjectList.length : 0;
      return {
        title: title || 'Unnamed Bundle',
        subtitle: `${cat.toUpperCase()} — (${count} Subjects)`,
        media: () => '📚'
      }
    }
  }
}