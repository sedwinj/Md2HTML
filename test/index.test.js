import { md2html } from "../src"

function pair(input, expected) {
    input = md2html.parse(input).innerHTML
    expected = new DOMParser().parseFromString(expected, 'text/html').body.innerHTML
    return { input, expected }
}

describe('MdToHtml', () => {
    it('can convert Markdown headings to HTML headings', () => {
        let equal = [
            // Headers 1 through 6
            pair('# Header', '<h1>Header</h1>'),
            pair('## Header', '<h2>Header</h2>'),
            pair('### Header', '<h3>Header</h3>'),
            pair('#### Header', '<h4>Header</h4>'),
            pair('##### Header', '<h5>Header</h5>'),
            pair('###### Header', '<h6>Header</h6>'),
            // Alternate headings
            pair('Header\n======', '<h1>Header</h1>'),
            pair('Header\n------', '<h2>Header</h2>')
        ]

        for (let pair of equal) {
            expect(pair.input).toEqual(pair.expected)
        }

        let notEqual = [
            // No headers beyond level 6
            pair('####### Header', '<h6>Header</h6>'),
            pair('####### Header', '<h7>Header</h7>')
        ]

        for (let pair of notEqual) {
            expect(pair.input).not.toEqual(pair.expected)
        }
    })

    it.todo('can convert Markdown paragraphs into HTML paragraphs')
})
