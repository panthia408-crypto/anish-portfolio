export default {
  name: 'blog',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    { name: 'title',       title: 'Title',       type: 'string' },
    { name: 'slug',        title: 'Slug',        type: 'slug', options: { source: 'title' } },
    { name: 'mainImage',   title: 'Main Image',  type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'excerpt',     title: 'Short Excerpt (shown on blog card)', type: 'text' }, // ← ADD
    { name: 'body',        title: 'Content',     type: 'text' },
  ],
}