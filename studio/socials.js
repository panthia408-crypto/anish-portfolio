export default {
  name: 'socials',
  title: 'Social Links',
  type: 'document',
  fields: [
    { name: 'platform', title: 'Platform Name', type: 'string', description: 'e.g. LinkedIn, GitHub' },
    { name: 'url', title: 'URL', type: 'url' },
    { name: 'icon', title: 'FontAwesome Class', type: 'string', description: 'e.g. fa-linkedin' }
  ]
}