import { render } from '@testing-library/react'

function header() {
    return <h1>Header</h1>
}

describe('demo', () => {
    it('can test equivalence between two HTML objects', () => {
        expect(<h1>Header</h1>).toEqual(<h1>Header</h1>)
        expect(<h1>Header</h1>).not.toEqual(<h2>Header</h2>)
    })
})

describe('md2html', () => {
    it.todo('can convert Markdown headings to HTML headings')
})