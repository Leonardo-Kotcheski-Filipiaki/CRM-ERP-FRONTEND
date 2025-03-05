import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import { UserCircle, MagnifyingGlass, NotePencil } from "@phosphor-icons/react";
import '../assets/css/home.css'
import { getServiceOrders } from "../hooks/osHook";


function Home(){ 
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



    const user = sessionStorage.getItem('user');   
    return (
        <Container className="m-0 w-100" id="container" style={{maxWidth:"100%"}}>
            <div className="navbar-nav p-4 w-100">
                <div className="right-side d-flex flex-row-reverse align-items-center">
                    <UserCircle className="user-icon" size={45}></UserCircle>
                    <label className="user-name">{user}</label>
                    
                </div>
            </div>
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
                    <input className="form-control ms-1" id="filterVal" onChange={(e) => setFilterData({...filterData, value: e.target.value})}></input>
                </form>
                <button className="btn btn-dark me-2"> Criar solicitação</button>
            </div>
            <div className="list-div" id="list-render">
                <div className="os-list">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">OS</th>
                                <th scope="col">Solicitação</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody id="teste">
                            {
                            Object.keys(filterData).length < 1 ? 
                                osData.map(item => {
                                    return(
                                        <tr key={item.OS}>
                                            <td key={item.OS}>{item.OS}</td>
                                            <td>{item.toDo}</td>
                                            <td>{item.description}</td>
                                            <td>{item.status}</td>
                                            <td className="btn-td">
                                                <button className="btn btn-primary">Ver<MagnifyingGlass weight="bold"/></button>
                                                <button className="btn btn-secondary">Editar<NotePencil weight="fill"/></button>
                                            </td>
                                        </tr>
                                    )
                            }) :
                                osData.filter(item => {
                                    return Object.keys(filterData).includes('config') === false || Object.keys(filterData).includes('value') === false ? item : item[filterData.config].includes(filterData.value.trim());
                                    }).map(item => {
                                        return(
                                            <tr key={item.OS}>
                                                <td key={item.OS}>{item.OS}</td>
                                                <td>{item.toDo}</td>
                                                <td>{item.description}</td>
                                                <td>{item.status}</td>
                                                <td className="btn-td">
                                                    <button className="btn btn-primary">Ver<MagnifyingGlass weight="bold"/></button>
                                                    <button className="btn btn-secondary">Editar<NotePencil weight="fill"/></button>
                                                </td>
                                            </tr>
                                        )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    )
}

export default Home;