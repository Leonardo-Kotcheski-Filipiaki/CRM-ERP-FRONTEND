import React from "react";

class Table extends React.Component{
    render() {
        return(
            <div className="list-div">
            <div className="list">
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
                                        <td>{item.fullName}</td>
                                        <td>{item.cpf}</td>
                                        <td>{item.business_name ? item.business_name : '-'}</td>
                                        <td>{item.cnpj ? item.cnpj : '-'}</td>
                                        <td>{item.email}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}

export default Table