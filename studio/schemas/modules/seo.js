export default {
  title: 'SEO',
  name: 'seo',
  type: 'object',
  fields: [
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'string'
    },
    {
      name: 'shareImage',
      title: 'Share Image',
      type: 'image',
      description: 'Ideal size for open graph images is 1200 x 600',
      options: {
        hotspot: true
      }
    },
    {
      name: 'shareTitle',
      title: 'Share Title',
      type: 'string'
    },
    {
      name: 'shareDescription',
      title: 'Share Description',
      type: 'text'
    }
  ]
}
