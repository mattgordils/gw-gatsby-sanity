import ConditionalField from 'sanity-plugin-conditional-field'

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
      inputComponent: ConditionalField,
      options: {
        hide: ({ parents }) => parents[0].mediaType !== 'image',
        hotspot: true
      }
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      description: 'Only .mp4 files are supported',
      inputComponent: ConditionalField,
      options: {
        hide: ({ parents }) => parents[0].mediaType !== 'video',
        accept: 'video/mp4',
      }
    }
  ]
}
