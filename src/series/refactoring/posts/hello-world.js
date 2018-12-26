const { html } = require('common-tags');
const md = require('../../../common/cells/markdown');
const { codeBlockWithNumbering, codeBlockWithoutNumbering } = require('../../../common/cells/code');
const diffBlock = require('../../../common/cells/diff');
const twoColumn = require('../../../common/cells/two-column');

const post = {
    title: 'Hello, World!',
    urlTitle: 'hello-world',
    publishedAt: new Date(2018, 12, 25),
    draft: false,
    excerpt: 'A short description of the post',
    layout: 'post',

    content() {
        const cells = [
            md.cell`# Hello, World!`,
            md.cell`A paragraph of **markdown**.`,
            twoColumn.cell({
                options: {
                    sticky: true,
                    oversize: true
                },
                left: md`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum lectus orci, sed iaculis est pulvinar tempus. Suspendisse potenti. Praesent gravida iaculis eleifend. 

Cras faucibus nisi a nulla vulputate, eget iaculis est vulputate. In a justo sem. Vivamus tempor hendrerit ante sed dignissim. Integer vel faucibus orci. 

Pellentesque tempus justo ex. Donec eu nibh sed nibh vestibulum egestas quis nec elit. Cras aliquam erat id orci porttitor congue.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum lectus orci, sed iaculis est pulvinar tempus. Suspendisse potenti. Praesent gravida iaculis eleifend. 

Cras faucibus nisi a nulla vulputate, eget iaculis est vulputate. In a justo sem. Vivamus tempor hendrerit ante sed dignissim. Integer vel faucibus orci. 

Pellentesque tempus justo ex. Donec eu nibh sed nibh vestibulum egestas quis nec elit. Cras aliquam erat id orci porttitor congue.`,
                right: codeBlockWithNumbering('javascript')`
                function main() {
                    console.log('hello, world');
                ${"Here, we are printing hello!"}
                }`
            }),
            twoColumn.cell({
                options: {
                    sticky: true
                },
                right: md`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum lectus orci, sed iaculis est pulvinar tempus. Suspendisse potenti. Praesent gravida iaculis eleifend. 

Cras faucibus nisi a nulla vulputate, eget iaculis est vulputate. In a justo sem. Vivamus tempor hendrerit ante sed dignissim. Integer vel faucibus orci. 

Pellentesque tempus justo ex. Donec eu nibh sed nibh vestibulum egestas quis nec elit. Cras aliquam erat id orci porttitor congue.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum lectus orci, sed iaculis est pulvinar tempus. Suspendisse potenti. Praesent gravida iaculis eleifend. 

Cras faucibus nisi a nulla vulputate, eget iaculis est vulputate. In a justo sem. Vivamus tempor hendrerit ante sed dignissim. Integer vel faucibus orci. 

Pellentesque tempus justo ex. Donec eu nibh sed nibh vestibulum egestas quis nec elit. Cras aliquam erat id orci porttitor congue.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum lectus orci, sed iaculis est pulvinar tempus. Suspendisse potenti. Praesent gravida iaculis eleifend. 

Cras faucibus nisi a nulla vulputate, eget iaculis est vulputate. In a justo sem. Vivamus tempor hendrerit ante sed dignissim. Integer vel faucibus orci. 

Pellentesque tempus justo ex. Donec eu nibh sed nibh vestibulum egestas quis nec elit. Cras aliquam erat id orci porttitor congue.`,
                left: md`asd`
            })
        ];

        return cells.join('\n');
    }
};

module.exports = post;
