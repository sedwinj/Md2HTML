let parser = new DOMParser()

export function md2html(text) {
    const input = text.split('\n')
    let output = []

    for (let lineNo = 0; lineNo < input.length; lineNo++) {
        let line = input[lineNo]

        // Heading
        if (line[0] === '#') {
            let val = parseHeading(line)
            if (val) {
                output.push(val)
                continue
            }
        }

        // Alt Heading
        let nextLine = lineNo + 1 < input.length ? input[lineNo + 1] : null
        let nextLineTrim = nextLine ? nextLine.trim() : null
        let char = nextLineTrim[0]
        if (nextLine && indentLevel(nextLine) === indentLevel(line) && ['=', '-'].includes(char)) {
            if (findFirstNotOf(nextLineTrim, char) === -1) {
                let val = makeHeader(line, char === '=' ? 1 : 2)
                output.push(val)
                lineNo++
                continue
            }
        }
    }

    return parser.parseFromString(output.join('\n'), 'text/html').body
}

function parseHeading(string) {
    const MAX_HEADING_LEVEL = 6
    let idx = 1
    for (; idx < MAX_HEADING_LEVEL; idx++) {
        if (string[idx] !== '#') {
            break
        }
    }

    if (string) {
        let headerLevel = idx - 1
        return makeHeader(string.substring(idx + 1), headerLevel + 1)
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

function indentLevel(string) {
    const TABSIZE = 4
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
