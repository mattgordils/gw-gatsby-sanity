module.exports = function (plop) {
	// migration generator
	plop.setGenerator('contentful-migration', {
		description: 'Contentful migration generator',
		prompts: [
			{
				type: 'input',
				name: 'migrationName',
				message: 'input the name of the migration ex "04-create-nav-content-type"'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'migrations/contentful/{{migrationName}}.js',
				templateFile: 'plop-templates/migration/EmptyMigration.js.hbs'
			}
		]
	})
	// component generator
	plop.setGenerator('component-contentful', {
		description: 'React component generator with contentful bindings',
		prompts: [
			{
				type: 'input',
				name: 'componentName',
				message: 'component name please'
			},
			// {
			// 	type: 'input',
			// 	name: 'path',
			// 	message: 'absolute path please. ex "src/components"'
			// },
			{
				type: 'input',
				name: 'migrationName',
				message: 'input the name of the migration ex "04-create-nav-content-type"'
			},
			{
				type: 'input',
				name: 'graphqlName',
				message: 'input the graphql query title ex "contentfulText"'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{componentName}}/{{componentName}}.jsx',
				templateFile: 'plop-templates/component/Component.jsx.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{componentName}}/{{componentName}}.stories.js',
				templateFile: 'plop-templates/component/Component.stories.js.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{componentName}}/{{componentName}}.test.js',
				templateFile: 'plop-templates/component/Component.test.js.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{componentName}}/index.js',
				templateFile: 'plop-templates/export.js.hbs'
			},
			{
				type: 'add',
				path: 'migrations/contentful/{{migrationName}}.js',
				templateFile: 'plop-templates/migration/Migration.js.hbs'
			},
			{
				type: 'add',
				path: 'src/graphql/components/{{graphqlName}}.js',
				templateFile: 'plop-templates/graphql/Graphql.js.hbs'
			}
		]
	})
	// component generator
	plop.setGenerator('component', {
		description: 'React component generator',
		prompts: [
			{
				type: 'input',
				name: 'componentName',
				message: 'component name please'
			},
			// {
			// 	type: 'input',
			// 	name: 'path',
			// 	message: 'absolute path please. ex "src/components"'
			// }
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{componentName}}/{{componentName}}.jsx',
				templateFile: 'plop-templates/component/Component.jsx.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{componentName}}/{{componentName}}.stories.js',
				templateFile: 'plop-templates/component/Component.stories.js.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{componentName}}/{{componentName}}.test.js',
				templateFile: 'plop-templates/component/Component.test.js.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{componentName}}/index.js',
				templateFile: 'plop-templates/export.js.hbs'
			}
		]
	})
	// component generator without stories
	plop.setGenerator('component-no-stories', {
		description: 'React component generator',
		prompts: [
			{
				type: 'input',
				name: 'componentName',
				message: 'component name please'
			},
			// {
			// 	type: 'input',
			// 	name: 'path',
			// 	message: 'absolute path please. ex "src/components"'
			// }
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{componentName}}/{{componentName}}.jsx',
				templateFile: 'plop-templates/component/Component.jsx.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{componentName}}/{{componentName}}.test.js',
				templateFile: 'plop-templates/component/Component.test.js.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{componentName}}/index.js',
				templateFile: 'plop-templates/export.js.hbs'
			}
		]
	})
	plop.setHelper('toLowerCase', str => str.toLowerCase())
	plop.setHelper('titleCase', str => {
		if (typeof str === 'undefined') {
			return ''
		}

		return (
			str.replace(
				/\w\S*/g,
				txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
			)
		)
	})
}
