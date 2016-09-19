import React, {PropTypes} from "react";
import {Cell} from "./Cell";



const flexContainer = {display:"flex",flexDirection:"row",flexWrap:"no-wrap",justifyContent:"space-between",alignContent:"stretch"};

export const Board = (props) => {
      let rowCount = 0;
      let columnCount = 0;
      console.log("Board props", props);

      return (<div>{props.board.map((row)=>{
                                      rowCount = rowCount + 1;
                                      columnCount = columnCount = 0;
                                      return (<div style={flexContainer} key={rowCount}>
                                        {row.map((c)=>{
                                            columnCount = columnCount + 1;
                                           return (
                                           <Cell key={`${rowCount}-${columnCount}`} cell={{player:c, row:rowCount, column:columnCount}} clicked={props.clicked}
                                                 hover={props.hover}
                                           />);
                                        })}
                                    </div>);
                                  }
                            )
             }</div>);

};

Board.propTypes = {
    row: PropTypes.array,
    column: PropTypes.array
};
