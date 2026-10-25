export default {
  name: 'downloadable',
  title: 'Downloads',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'File Title',
      type: 'string', 
    },
    {
      name: 'file',
      title: 'Upload PDF',
      type: 'file',
      options: { accept: '.pdf' }
    }
  ]
}