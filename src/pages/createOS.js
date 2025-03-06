import Navbar from "../components/navbar";
import Table from "../components/tableList";
import { Container } from "react-bootstrap";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { getCustomers } from '../hooks/customerHook';
import { useEffect, useState } from "react";

function CreateOs(){
    const [dataCustomers, setdataCustomers] = useState([]);
    useEffect(() => {
        getCustomers().then(res => {
            setdataCustomers(res);
        })
    }, [])
    return (
        <Container className="w-100 mw-100" >
            <Navbar></Navbar>

            <div className="actions m-2 d-flex">
                <form>
                    <MagnifyingGlass className="MagnifyingGlass-search-logo me-2" size={45} weight="fill"></MagnifyingGlass><span className="search-text-span me-2" >Pesquisar</span>
                    <select className="form-select w-100" defaultValue={"default"} id="filterConfig" key={'filter-selection'}>
                        <option value={"default"} disabled>Selecione uma opção</option>
                        <option value={'OS'}>Número da OS</option>
                        <option value={'toDo'}>Solicitação</option>
                        <option value={'status'}>Status</option>
                    </select>
                    <input className="form-control ms-1" id="filterVal"></input>
                </form>
                <button className="btn btn-dark me-2"> Criar solicitação</button>
            </div>

            <Table th={['Nome', 'CPF', 'Razão Social', 'CNPJ', 'E-mail']} td={dataCustomers}></Table>
        </Container>
    )
}

export default CreateOs;