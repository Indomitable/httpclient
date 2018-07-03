import * as React from "react";
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

import JsonFormat from '../../services/json-formatter';

import './editor.scss';

export default class Editor extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.container = React.createRef();
    }

    tryFormatValue() {
        let content = this.props.value;
        if (this.props.language === 'application/json' && this.props.value) {
            try {
                content =  (new JsonFormat(this.props.value)).beautify(); //JSON.stringify(JSON.parse(this.props.value), null, '\t')
            } catch (e) {
                content = this.props.value;
                console.error(e);
            }
        }
        return content;
    }

    componentDidMount() {
        const content = this.tryFormatValue();
        this.editor =  CodeMirror(this.container.current, {
            mode: this.props.language,
            value: content,
            readOnly: this.props.readOnly,
            theme: 'dracula'
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
        return <div className="hc-codemirror-container">
            {/*readOnly={true} value={this.props.value} */}
            <div ref={this.container} />
        </div>
    }
}
