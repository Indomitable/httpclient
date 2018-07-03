import * as React from "react";
import 'codemirror/lib/codemirror.css';
import codemirror from 'codemirror/src/codemirror';


export default class CodeMirrorEditor extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.container = React.createRef();
    }

    tryFormatValue() {
        let content = this.props.value;
        if (this.props.language === 'json' && this.props.value) {
            try {
                content = JSON.stringify(JSON.parse(this.props.value), null, '\t')
            } catch (e) {
                content = this.props.value;
                console.error(e);
            }
        }
        return content;
    }

    componentDidMount() {
        const content = this.tryFormatValue();
        this.editor = codemirror.fromTextArea(this.container.current, {
            mode: this.props.language,
        });
        // this.editor = monaco.editor.create(this.container.current, {
        //     value: content,
        //     language: this.props.language,
        //     readOnly: this.props.readOnly,
        //     minimap: {
        //         enabled: false
        //     }
        // });
    }

    componentWillUnmount() {
      //  this.editor.dispose();
    }

    render() {
        return <div><textarea ref={this.container} readOnly={true} value={this.props.value} /></div>
    }
}
