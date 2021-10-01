import themes from '../../../web/src/styles/themes'

const themeOptions = Object.entries(themes).map(theme => ( { title: theme[0], value: theme[1].background } ));
// console.log('themeOptions', themeOptions[0])

export default {
  title: 'Theme',
  name: 'theme',
  type: 'colorlist',
  // initialValue: themeOptions[0],
  // validation: (Rule) => Rule.required(),
  options: {
    list: themeOptions
  }
}
