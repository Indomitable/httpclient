export default class JsonFormatter {
    constructor(input) {
        this.input = input;
    }

    static indent(count) {
        const ar = Array(count);
        ar.fill('\t');
        return ar.join('');
    }

    parseInput() {
        this.output = '';
        if (!this.input) {
            return;
        }
        let level = 0;
        let currentIndent = '';
        let inStr = false;
        let changeLevel = (x) => { level = level + x; currentIndent = JsonFormatter.indent(level) };
        for (let i = 0; i < this.input.length; i++) {
            const char = this.input[i];
            if (char === '"') {
                // Check if current context in string or property name
                if (i === 0 || !inStr) {
                    inStr = true;
                }
                if (i > 0 && inStr && !(this.input[i-1] === '\\')) {
                    inStr = false;
                }
            }
            if (char === ']' || char === '}') {
                if ((char === ']' && i > 0 && this.input[i - 1] === '[') ||
                    (char === '}' && i > 0 && this.input[i - 1] === '{')) {
                    // Do not change level.
                } else {
                    // Decrease level and add new line before end array or end object
                    changeLevel(-1);
                    this.output += ('\n' + currentIndent);
                }
            }
            this.output += char;
            if (char === ',' && !inStr) {
                // Add new line after comma
                this.output += ('\n' + currentIndent);
            }
            if (char === ':' && !inStr) {
                // Add space after :
                this.output += ' ';
            }
            if (char === '[' || char === '{') {
                if ((char === '[' && i < this.input.length - 1 && this.input[i + 1]  === ']') ||
                    (char === '{' && i < this.input.length - 1 && this.input[i + 1]  === '}')) {
                    // empty array or object do nothing
                    continue;
                }
                // Increase level and add new line after start array or start object
                changeLevel(1);
                this.output += ('\n' + currentIndent);
            }
        }
    }

    beautify() {
        this.parseInput();
        return this.output;
    }
}
