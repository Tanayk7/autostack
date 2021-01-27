import React from 'react';
import './Datatable.css';

const Datatable = ({data,column_names,...props}) => {
    return (
        <table className='table'> 
            <thead className='thead'> 
                <tr className='table-row'>
                    {
                        column_names !== null ? column_names.map(val =>(
                            <th className='table-val table-head-val'> 
                                {val}
                            </th>
                        )) : null
                    }
                    <th className='table-val table-head-val'>       
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className='tbody'>
                {
                    data !== null ? data.map(row => (
                        <tr className='table-row'> 
                            {column_names.map(val => <td className='table-val'>{row[val]}</td>)}
                            <td className='table-val'>
                                <button data-edit={row.id} onClick={(e) => props.actionHandler(e)} className='edit-btn'>edit</button>
                                <button data-delete={row.id} onClick={(e) => props.actionHandler(e)} className='delete-btn'>delete</button>
                            </td>
                        </tr>
                    )) : null
                }
            </tbody>
        </table>
    );
}

export default Datatable;
