// import React from 'react';
// import AceEditor from 'react-ace';
// import 'brace/mode/json';
// import 'brace/mode/xml';
// import 'brace/theme/monokai';
//
// export class Editor extends React.PureComponent {
//     constructor(props, context) {
//         super(props, context);
//         this.editorRef = React.createRef();
//     }
//
//     onLoadData() {
//         if (this.content) {
//             this.editorRef.current.editor.scrollToLine(1);
//         }
//     }
//
//     componentDidMount() {
//         this.onLoadData();
//     }
//
//     componentDidUpdate() {
//         this.onLoadData();
//     }
//
//     render() {
//         // const { content, headers } = this.props.response;
//         // const isJson = headers['content-type'].indexOf('json') > -1;
//         //const isJSON = this.props.mode === 'json';
//         if (this.props.mode === 'json' && this.props.value) {
//             try {
//                 this.content = JSON.stringify(JSON.parse(this.props.value), null, '\t')
//             } catch (e) {
//                 this.content = this.props.value;
//                 console.error(e);
//             }
//         } else {
//             this.content = this.props.value;
//         }
//
//         const options = {
//             tabSize: 2,
//             readOnly: this.props.readOnly
//         };
//
//
//         return <div>
//             {
//                 this.props.readOnly ?
//                 <AceEditor
//                     mode={this.props.mode}
//                     theme="monokai"
//                     value={this.content}
//                     readOnly={this.props.readOnly}
//                     setOptions={options}
//                     width='100%'
//                     height={this.props.height || '100%'}
//                     showPrintMargin={false}
//                     ref={this.editorRef}
//                     /> :
//                 <AceEditor />
//             }
//         </div>
//     }
// }
