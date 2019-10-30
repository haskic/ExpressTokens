import React, {useEffect, useState} from 'react';

function Table(props) {
    const height = props.sizes.height;
    const colsWidth = props.sizes.width;
    const content = props.content;
    const cols = props.cols;
    const rowsMass = [];
    const firstRowHeader = props.firstRowHeader;
    const headerStyle = props.headerStyle;
    const colStyles = props.colStyles;
    let [state, setState] = useState({rows: []});

    function createTable() {
        let deltacontent = [];
        for (let i = 0; i < content.length; i++) {
            deltacontent.push(content[i]);
            if ((i + 1) % cols == 0) {
                if (firstRowHeader && (i == (cols - 1))) {
                    rowsMass.push(<Row key={i} row={{
                        sizes: {
                            width: colsWidth
                        },
                        style: {
                            display: 'flex',
                            height: height
                        },
                        content: deltacontent,
                    }} cols={cols}
                                       headerRow={true}
                                       headerStyles={headerStyle}

                    />);
                } else {
                    rowsMass.push(<Row key={i} row={{
                        sizes: {
                            width: colsWidth
                        },
                        style: {
                            display: 'flex',
                            height: height
                        },
                        content: deltacontent,
                    }} cols={cols} colStyles={colStyles}/>);
                }
                deltacontent = [];
            }
        }
    }

    useEffect(() => {
        createTable();
        setState({rows: rowsMass});
    }, [])
    return (
        <div style={props.style}>
            {state.rows}
        </div>
    );
}

function Row(props) {

    let elements = [];
    let sizes = props.row.sizes.width;
    let styleRow = props.row.style;
    let defaultStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    }

    function CreateRow() {

        if (props.headerRow) {
            let headerStyles = props.headerStyles;
            for (let i = 0; i < props.cols; i++) {
                let style = Object.assign({}, defaultStyle, {width: sizes[i].toString()}, headerStyles[i]);
                elements.push(<div key={i} style={style}>{props.row.content[i]}</div>);
            }
        } else {
            let flag;
            for (let i = 0; i < props.cols; i++) {
                flag = false;
                for (let g = 0; g < props.colStyles.length; g++) {
                    if ((i + 1) == props.colStyles[g].col) {
                        let style = Object.assign({}, defaultStyle, {'width': sizes[i].toString()}, props.colStyles[g].style);
                        elements.push(<div style={style}>{props.row.content[i]}</div>);
                        flag = true;
                        break;
                    }
                }
                if (flag) {
                    continue;
                }
                let style = Object.assign({}, defaultStyle, {'width': sizes[i].toString()});
                elements.push(<div style={style} key={i}>{props.row.content[i]}</div>);

            }
        }
        setState({elements: elements});
    }

    let [state, setState] = useState({elements: []});
    useEffect(() => {
        CreateRow()
    }, [])
    return (
        <div style={styleRow}>
            {state.elements}
        </div>
    );
}

export default Table;