import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import { MagnifyingGlass, NotePencil } from "@phosphor-icons/react";
import '../assets/css/home.css'
import { getServiceOrders } from "../hooks/osHook";
import Navbar from "../components/navbar";
import Table from "../components/tableList";
function OSList(){ 
    const navigate = useNavigate();    
    const [osData, setOsData] = useState([]);
    const [filterData, setFilterData] = useState({}); 
    
    useEffect(() => {
        if(sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === undefined){
            navigate('/login');
        }
        getServiceOrders().then(res => {
            setOsData(res)
        })
    }, [])
   
    return (
        <Container className="m-0 w-100" id="container" style={{maxWidth:"100%"}}>
            <Navbar></Navbar>
            <div className="actions m-2 d-flex">
                <form>
                    <MagnifyingGlass className="MagnifyingGlass-search-logo me-2" size={45} weight="fill"></MagnifyingGlass><span className="search-text-span me-2" >Pesquisar</span>
                    <select className="form-select w-100" defaultValue={"default"} id="filterConfig" onChange={(event => {
                        setFilterData({...filterData, config: event.target.selectedOptions[0].value})
                    })} key={'filter-selection'}>
                        <option value={"default"} disabled>Selecione uma opção</option>
                        <option value={'OS'}>Número da OS</option>
                        <option value={'toDo'}>Solicitação</option>
                        <option value={'status'}>Status</option>
                    </select>
                    <input className="form-control ms-1" id="filterVal" onChange={(e) => {
                            if(Object.keys(filterData).length < 1){
                                e.target.value = '';
                            }else{
                                setFilterData({...filterData, value: e.target.value})
                            }
                        }} ></input>
                </form>
                <button className="btn btn-dark me-2" onClick={() => {navigate('/create/os')}}> Criar solicitação</button>
            </div>
            <div className="list-div" id="list-render">
                <div className="os-list">
                    
                        {
                            Object.keys(filterData).length < 1 ? 
                                <Table th={["OS", "Solicitação", "Descrição", "Status", ""]} data_name={['OS', 'toDo', 'description', 'status']} td={osData} 
                                extra={() => {return (<td className="btn-td"> <button className="btn btn-primary">Ver<MagnifyingGlass weight="bold"/></button> <button className="btn btn-secondary">Editar<NotePencil weight="fill"/></button></td>)}}></Table>
                            :
                            <Table th={["OS", "Solicitação", "Descrição", "Status", ""]} data_name={['OS', 'toDo', 'description', 'status']} td={osData.filter(item => {
                                return Object.keys(filterData).includes('config') === false || Object.keys(filterData).includes('value') === false ? item : item[filterData.config].includes(filterData.value.trim());
                         })} 
                            extra={() => {return (<td className="btn-td"> <button className="btn btn-primary">Ver<MagnifyingGlass weight="bold"/></button> <button className="btn btn-secondary">Editar<NotePencil weight="fill"/></button></td>)}}></Table>
                        }
                    
                </div>
            </div>
        </Container>
    )
}

export default OSList;