let parser = new DOMParser()

const TABSIZE = 4

export const md2html = {
    parse: parse
}

class Line {
    static #constructionAllowed = false

    #indentLevel = 0
    get IndentLevel() { return this.#indentLevel }

    #content = ''
    get Content() { return this.#content }

    constructor(string) {
        if (!Line.#constructionAllowed) {
            throw new TypeError('Line is not constructable.')
        }
        this.#indentLevel = Line.#calcIndentLevel(string)
        this.#content = string.substring(this.#indentLevel * TABSIZE)
    }

    static createLines(string) {
        string = string.split('\n')
        let lines = []
        Line.#constructionAllowed = true
        for (let line of string) {
            lines.push(new Line(line))
        }
        Line.#constructionAllowed = false
        return lines
    }

    static #calcIndentLevel(string) {
        let leadingSpaces = 0
        for (let idx = 0; idx < string.length; idx++) {
            if (string[idx] === ' ') {
                leadingSpaces++
            }
            else if (string[idx] === '\t') {
                leadingSpaces = (leadingSpaces / TABSIZE + 1) * TABSIZE
            }
        }
        return Math.floor(leadingSpaces / TABSIZE)
    }
}

function parse(text) {
    const LINES = Line.createLines(text)
    let output = []

    for (let lineNo = 0; lineNo < LINES.length; lineNo++) {
        let line = LINES[lineNo]
        let nextLine = lineNo + 1 < LINES.length ? LINES[lineNo + 1] : null

        // Heading
        if (line.IndentLevel === 0 && line.Content.length > 0 && line.Content[0] === '#') {
            let val = parseHeading(line)
            if (val) {
                output.push(val)
                continue
            }
        }

        // Alt Heading
        let char = nextLine && nextLine.Content.length > 0 ? nextLine.Content[0] : null
        if (char && nextLine.IndentLevel === 0 && ['=', '-'].includes(char)) {
            if (findFirstNotOf(nextLine.Content.trim(), char) === -1) {
                let val = makeHeader(line.Content, char === '=' ? 1 : 2)
                output.push(val)
                lineNo++
                continue
            }
        }
    }

    return parser.parseFromString(output.join('\n'), 'text/html').body
}

function parseHeading(line) {
    const MAX_HEADING_LEVEL = 6
    let idx = 1
    for (; idx < MAX_HEADING_LEVEL; idx++) {
        if (line.Content[idx] !== '#') {
            break
        }
    }

    if (line.Content) {
        let headerLevel = idx - 1
        return makeHeader(line.Content.substring(idx + 1), headerLevel + 1)
    }
}

function makeHeader(content, headerLevel) {
    return `<h${headerLevel}>${content}</h${headerLevel}>`
}

function findFirstNotOf(string, charset) {
    let idx = 0
    for (; idx < string.length; idx++) {
        let char = string[idx]
        if (!(charset.includes(char))) {
            return idx
        }
    }
    return -1
}
