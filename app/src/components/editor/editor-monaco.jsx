import * as React from "react";
import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import 'monaco-editor/esm/vs/editor/contrib/format/formatActions.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import 'monaco-editor/esm/vs/language/json/monaco.contribution';
import 'monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution.js';

export default class MonacoEditor extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.container = React.createRef();
    }

    componentDidMount() {
        this.editor = monaco.editor.create(this.container.current, {
            value: this.props.value,
            language: this.props.language,
            readOnly: this.props.readOnly,
          //   autoIndent: true,
            minimap: {
                enabled: false
            },
            formatOnType: true
        });
    }

    componentWillUnmount() {
        this.editor.dispose();
    }

    render() {
        return <div ref={this.container} />
    }
}
