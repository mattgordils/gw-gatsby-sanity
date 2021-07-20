export default {
  title: 'Theme',
  name: 'theme',
  type: 'string',
  initialValue: 'default',
  validation: (Rule) => Rule.required(),
  options: {
  	list: ['default', 'lightGrey'],
  	layout: 'dropdown'
  },
}
