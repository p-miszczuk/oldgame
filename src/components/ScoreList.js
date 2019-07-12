import React from "react";

const ScoreList = (props) => {
    
    let list = [];

    Object.values(props.listItem).map(item => (
        list.push({id: item.id, nick: item.nick, score: item.score})
    ))

    list.sort(function(a,b){
        return ((a.score < b.score) ? -1 : ((a.score === b.score) ? 0 : 1));
        // return (a.score > b.score) it's the same
    });

    return (
        <div className="my-2">
            <h5 className="mb-3">Najlepsi gracze:</h5>
            <table className="time-list d-inline">
            <tbody>
            {   
                list.map( (item,i) => (
                    <tr key={item.id}>
                        <td>{i+1}.</td>
                        <td>{item.nick}</td>
                        <td>{item.score}</td>
                    </tr>
                ))
            }
            </tbody> 
        </table>
        </div>
    )
}

export default ScoreList;