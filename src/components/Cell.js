import React, {PropTypes} from 'react';

const player1Style = {minHeight:"65px",backgroundColor:"green",margin:"5px",borderRadius:"50%",border:"1px green solid"};
const player2Style = {minHeight:"65px",backgroundColor:"black",margin:"5px",borderRadius:"50%"};
const emptyStyle = {minHeight:"65px",margin:"5px"};

export const Cell = (props) => {

    return (<div style={{flex:1,minHeight:"75px",float:"left",border:"1px solid black",margin:"0px"}} onClick={props.clicked.bind(props.cell.row,props.cell.column)}
                 onMouseOver={props.hover.bind(null,props.cell.row, props.cell.column)}>

            <div style={props.cell.player == 0 ? emptyStyle : (props.cell.player == 1 || props.cell.player==10) ? player1Style : player2Style} />
            </div>
           );
};

Cell.propTypes = {
  cell: PropTypes.object,



};
