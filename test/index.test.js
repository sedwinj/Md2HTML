import { md2html } from "../src"

function pair(input, expected) {
    input = md2html.parse(input).innerHTML
    expected = new DOMParser().parseFromString(expected, 'text/html').body.innerHTML
    return { input, expected }
}

describe('MdToHtml', () => {
    it('can convert Markdown headings to HTML headings', () => {
        let eq = [
            // Headings 1-6
            pair('# Heading 1', '<h1>Heading 1</h1>'),
            pair('## Heading 2', '<h2>Heading 2</h2>'),
            pair('### Heading 3', '<h3>Heading 3</h3>'),
            pair('#### Heading 4', '<h4>Heading 4</h4>'),
            pair('##### Heading 5', '<h5>Heading 5</h5>'),
            pair('###### Heading 6', '<h6>Heading 6</h6>'),

            // Alternate headings
            pair('Alt Heading 1\n======', '<h1>Alt Heading 1</h1>'),
            pair('Alt Heading 2\n------', '<h2>Alt Heading 2</h2>'),
        ]

        let neq = [
            // No headings beyond level 6
            pair('####### Heading 7', '<h7>Heading 7</h7>'),
            pair('######## Heading 8', '<h8>Heading 8</h8>'),

            // No space no heading
            pair('#nospacenoheading', '<h1>nospacenoheading</h1>'),
        ]

        for (let pair of eq) {
            expect(pair.input).toEqual(pair.expected)
        }

        for (let pair of neq) {
            expect(pair.input).not.toEqual(pair.expected)
        }
    })

    it.todo('can convert Markdown paragraphs into HTML paragraphs', () => {
        let eq = [
            // Basic paragraph
            pair('basic paragraph', '<p>basic paragraph</p>'),

            // Trim whitespace
            pair(' whitespace trimmed ', '<p>whitespace trimmed</p>'),
            pair('\twhitespace trimmed\t', '<p>whitespace trimmed</p>'),

            // Line break behavior
            pair('single\nbreak', '<p>singlebreak</p>'),
            pair('double\n\nbreaks', '<p>double</p><p>breaks</p>'),
            pair('extra\n\n\nbreaks', '<p>extra</p><p>breaks</p>'),
            pair('extra\n\n\n\nbreaks', '<p>extra</p><p>breaks</p>'),
            pair('\n\nignore leading breaks', '<p>ignore leading breaks</p'),
            pair('ignore trailing breaks\n\n', '<p>ignore trailing breaks</p>')
        ]

        for (let pair of eq) {
            expect(pair.input).toEqual(pair.expected)
        }
    })
})
