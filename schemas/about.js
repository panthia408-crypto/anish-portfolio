export default {
  name: 'about',
  title: 'About Me',
  type: 'document',
  fields: [
    {
      name: 'mainText',
      title: 'Main Bio',
      type: 'text',
      description: 'Write your professional summary here.'
    },
    {
      name: 'roles',
      title: 'Interactive Roles',
      type: 'array',
      description: 'Add your roles (e.g., President, Researcher) and what you do in them.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Role Title', type: 'string' },
            { name: 'description', title: 'Details/Achievements', type: 'text' },
            { name: 'icon', title: 'Icon Name (e.g., fa-users, fa-microscope)', type: 'string' },
            { 
              name: 'roleImage', 
              title: 'Role Image', 
              type: 'image', 
              options: { hotspot: true } 
            }
          ]
        }
      ]
    }
  ]
}