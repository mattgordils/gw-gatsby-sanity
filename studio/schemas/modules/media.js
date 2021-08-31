export default {
  title: 'Media',
  name: 'media',
  type: 'object',
  fields: [
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        list: ['image', 'video']
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({ parent }) => parent.mediaType !== 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      description: 'Only .mp4 files are supported',
      hidden: ({ parent }) => parent.mediaType !== 'video',
      options: {
        accept: 'video/mp4',
      }
    }
  ]
}
