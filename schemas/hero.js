// hero.js — Sanity schema
export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'e.g. "Anish Panthi"',
    },
    {
      name: 'tagline',
      title: 'Tagline / Role Label',
      type: 'string',
      description: 'e.g. "RESEARCHER | STUDENT"',
    },
    {
      name: 'description',
      title: 'Short Bio',
      type: 'text',
      description: 'The one-liner shown beneath the tagline in the hero.',
    },
    {
      name: 'profileImage',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}