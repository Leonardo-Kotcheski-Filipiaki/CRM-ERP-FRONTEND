import React from "react";

class TableFilter extends React.Component{
    render() {
        return(
            <table className="table">
                <thead>
                    <tr>
                        {this.props.th.map(item =>{
                            return(<th scope="col">{item}</th>)
                        })}
                    </tr>
                </thead>
                <tbody id="teste">
                        {this.props.td.map(item => {
                            return(
                                <tr>
                                    {this.props.data_name.map(element => {
                                        return (<td>{item[element] && item[element] !== '' && item[element] !== ' ' ? item[element] : '-'}</td>)
                                    })}
                                    {this.props.extra ? this.props.extra()
                                     : null}
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        )
    }

}

export default TableFilter;