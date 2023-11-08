import { md2html } from "../src"

describe('MdToHtml', () => {

    it('can convert Markdown headings to HTML headings', () => {
        // Headers 1 through 6
        expect(md2html.parse('# Header').innerHTML).toEqual('<h1>Header</h1>')
        expect(md2html.parse('## Header').innerHTML).toEqual('<h2>Header</h2>')
        expect(md2html.parse('### Header').innerHTML).toEqual('<h3>Header</h3>')
        expect(md2html.parse('#### Header').innerHTML).toEqual('<h4>Header</h4>')
        expect(md2html.parse('##### Header').innerHTML).toEqual('<h5>Header</h5>')
        expect(md2html.parse('###### Header').innerHTML).toEqual('<h6>Header</h6>')

        // No headers beyond level 6
        expect(['<h6>Header</h6>', '<h7>Header</h7>']).not.toContain(md2html.parse('####### Header').innerHTML)

        // // Alternate headings
        expect(md2html.parse('Header\n======').innerHTML).toEqual('<h1>Header</h1>')
        expect(md2html.parse('Header\n------').innerHTML).toEqual('<h2>Header</h2>')
    })

    it.todo('can convert Markdown paragraphs into HTML paragraphs')
})
