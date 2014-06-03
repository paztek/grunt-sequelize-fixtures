# grunt-sequelize-fixtures

> Grunt task for loading some JSON fixtures with Sequelize

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sequelize-fixtures --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sequelize-fixtures');
```

## The "sequelize_fixtures" task

### Overview
In your project's Gruntfile, add a section named `sequelize_fixtures` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sequelize_fixtures: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.db
Type: `Function`
Default value: `'function() { return {}; }'`

A function returning an object with all the Sequelize models as keys.
This object is wrapped by a function to avoid problems caused by circular references when Grunt compiles the options.
I used the pattern described [here](http://sequelizejs.com/articles/express#block-3-line-0) to autoload models with Sequelize.

#### options.models
Type: `Array`
Default value: `[]`

The array of all the model names that should be loaded.

#### options.files
Type: `Array`
Default value: `[]`

The array of all the JSON files containing the fixtures.

### Usage Examples

#### Basic example
```js
grunt.initConfig({
	sequelize_fixtures: {
		options: {
			// Common options
		},
        dev: {
            options: {
                db: function() { return require('./lib/models'); },
                models: ['Customer', 'Order'],
                files: [
                    require('path').join(__dirname, 'lib', 'fixtures', 'Customers.json'),
                    require('path').join(__dirname, 'lib', 'fixtures', 'Orders.json')
                ]
            }
        }
    }
})
```

#### Combined with the "env" task
If like me your Sequelize connection requires some ENV variables, create the following Grunt task at the end of your Gruntfile:

```js
grunt.initConfig({
	...
	grunt.registerTask('fixtures', function(target) {
	        if (target == 'test') {
	                return grunt.task.run(['env:test', 'sequelize_fixtures:test']);
	        }
	        grunt.task.run(['env:dev', 'sequelize_fixtures:dev']);
	    });
})
```

And then use the task ```grunt fixtures```.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
