import Navbar from "../components/navbar";
import Table from "../components/tableList";
import TableFilter from "../components/tableListFiltered";
import { Container } from "react-bootstrap";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { getCustomers } from '../hooks/customerHook';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerSelection(){
    const [dataCustomers, setdataCustomers] = useState([]);
    const [filterData, setFilterData] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        getCustomers().then(res => {
            setdataCustomers(res);
        })
    }, [])


    return (
        <Container className="w-100 mw-100" >
            <Navbar></Navbar>

            <div className="actions m-2 d-flex">
            <button className="btn btn-dark me-2" onClick={() => navigate('/os')}> Retornar</button>
                <form className="me-2">
                    <MagnifyingGlass className="MagnifyingGlass-search-logo me-2" size={45} weight="fill"></MagnifyingGlass><span className="search-text-span me-2" >Pesquisar</span>
                    <select className="form-select w-100" defaultValue={"default"} id="filterConfig" key={'filter-selection'} onChange={(event => {
                        setFilterData({...filterData, config: event.target.selectedOptions[0].value})
                    })}>
                        <option value={"default"} disabled>Selecione uma opção</option>
                        <option value={'fullName'}>Nome</option>
                        <option value={'cpf'}>CPF</option>
                        <option value={'business_name'}>Razão Social</option>
                        <option value={'cnpj'}>CNPJ</option>
                        <option value={'email'}>Email</option>
                    </select>
                    <input className="form-control ms-1" id="filterVal" onChange={(e) => {
                            if(Object.keys(filterData).length < 1){
                                e.target.value = '';
                            }else{
                                setFilterData({...filterData, value: e.target.value})
                            }
                        }}></input>
                </form>
                
            </div>
            <div className="list-div" id="list-render">
                <div className="os-list">
                    {
                        Object.keys(filterData).length < 1 ? 
                            <Table th={['Nome', 'CPF', 'Razão Social', 'CNPJ', 'Email', "Ações"]} data_name={['fullName', 'cpf', 'business_name', 'cnpj', 'email']} td={dataCustomers} 
                            extra={() => {return (<td className="btn-td"> <button className="btn btn-primary" onClick={(e) => {
                                dataCustomers.forEach((i) => {
                                    if(i['_id'] === e.currentTarget.parentElement.parentElement.getAttribute('id')){
                                        navigate(i['_id']);
                                    }
                                })
                        }}>Selecionar</button></td>)}}/>
                        :
                        <TableFilter th={['Nome', 'CPF', 'Razão Social', 'CNPJ', 'Email', "Ações"]} data_name={['fullName', 'cpf', 'business_name', 'cnpj', 'email']} td={dataCustomers.filter(item => {
                                return Object.keys(filterData).includes('config') === false || Object.keys(filterData).includes('value') === false ? 
                                item : item[filterData.config].includes(filterData.value.trim());
                        })} extra={() => {return (<td className="btn-td"> <button className="btn btn-primary" onClick={(e) => {
                                console.log(e.currentTarget.parentElement.getAttributeNames())
                        }}>Selecionar</button></td>)}}/>
                    }
                </div>
            </div>
            
        </Container>
    )
}

export default CustomerSelection;