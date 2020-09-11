const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')
const { section } = require('../../../common/cells/heading')

const cells = [
  md.cell`
Sok-sok munka árán végre elkészült a layout, ami majd a refaktorálással kapcsolatos írások alapját fogja szolgáltatni. A következő szekciók ennek a küllemét mutatják be.
`,
  section.cell`Szövegtörzs`,
  md.cell`
**Markdown** segítségével formázott paragrafusok hatezerrel.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum lectus orci, sed iaculis est pulvinar tempus. Suspendisse potenti. Praesent gravida iaculis eleifend. 

Cras faucibus nisi a nulla vulputate, eget iaculis est vulputate. In a justo sem. Vivamus tempor hendrerit ante sed dignissim. Integer vel faucibus orci. Pellentesque tempus justo ex. Donec eu nibh sed nibh vestibulum egestas quis nec elit. Cras aliquam erat id orci porttitor congue. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum lectus orci, sed iaculis est pulvinar tempus. Suspendisse potenti. Praesent gravida iaculis eleifend. Cras faucibus nisi a nulla vulputate, eget iaculis est vulputate. In a justo sem. Vivamus tempor hendrerit ante sed dignissim. Integer vel faucibus orci. Pellentesque tempus justo ex. Donec eu nibh sed nibh vestibulum egestas quis nec elit. Cras aliquam erat id orci porttitor congue. 
`,
]

const meta = {
  order: 1,
  layout: 'practice',
  urlTitle: 'hello-world',
  publishedAt: DateTime.local(),
  draft: false,
}

const content = {
  title: 'Hello, World!',
  excerpt: 'A short description of the post',
  cells,
}

module.exports = () => ({ meta, content })
