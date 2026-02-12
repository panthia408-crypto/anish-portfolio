export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    { name: 'name', title: 'Full Name', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'description', title: 'Short Description', type: 'text' },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true }
    },
    // --- ADD THESE NEW FIELDS BELOW ---
    { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
    { name: 'facebook', title: 'Facebook URL', type: 'url' },
    { name: 'instagram', title: 'Instagram URL', type: 'url' },
    { name: 'twitter', title: 'Twitter (X) URL', type: 'url' },
    { name: 'discord', title: 'Discord URL', type: 'url' },
    {
      name: 'cvResume',
      title: 'CV/Resume File',
      type: 'file', // Changed to file so you can upload a PDF directly
      options: { accept: '.pdf' }
    },
  ],
}