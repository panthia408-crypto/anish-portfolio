// about.js — Sanity schema
export default {
  name: 'about',
  title: 'About Me',
  type: 'document',
  fields: [
    {
      name: 'mainBio',
      title: 'Main Bio',
      type: 'text',
      description: 'Short paragraph shown on the card before any role is clicked.',
    },
    {
      name: 'aboutImage',
      title: 'Default Profile Image',
      type: 'image',
      options: { hotspot: true },
      description: 'The image shown on the About card by default.',
    },
    {
      name: 'roles',
      title: 'Roles & Expertise',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Role Title',
              type: 'string',
              description: 'e.g. "President" — shown on the button and as the magazine headline.',
            },
            {
              name: 'description',
              title: 'Detailed Description',
              type: 'text',
              description: 'Full text shown in the magazine layout. Write complete sentences separated by ". " for best paragraph splitting.',
            },
            {
              name: 'roleImage',
              title: 'Role Image',
              type: 'image',
              options: { hotspot: true },
              description: 'Image shown in the left column when this role is expanded. Falls back to the default profile image if left empty.',
            },
            {
              name: 'link',
              title: 'Project / Organisation URL',
              type: 'url',
              description: 'Optional external link shown at the bottom of the magazine page.',
            },
            {
              name: 'linkText',
              title: 'Link Label',
              type: 'string',
              description: 'e.g. "Visit SOIES Nepal" — defaults to "Learn More" if left blank.',
            },
          ],
          preview: {
            select: { title: 'title', media: 'roleImage' },
          },
        },
      ],
    },
  ],
}