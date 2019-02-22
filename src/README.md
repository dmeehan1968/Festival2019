# Use of node_modules

Source files are located in src/node_modules so that we can leverage
Node's module resolver to locate both application modules (app, models, styles)
and project level (third-party) modules (e.g. express, React)

Project level modules are require()'d or 'import'ed in the normal way.

Application level modules are required/imported using the package prefix
located under src/node_modules, e.g. 'app'.  So for React modules, importing
a component becomes import xx from 'app/component/MyComponent'.

This removes the need for relative imports ('../../app/component/MyComponent')
for source modules and makes it easier to relocate source modules during
development.
