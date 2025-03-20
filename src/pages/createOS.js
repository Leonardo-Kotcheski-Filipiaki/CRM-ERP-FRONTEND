import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/navbar";
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import customerSearchHook from '../hooks/customerSearchHook';
import '../assets/css/createOS.css'
function CreateOS(){
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [customerData, setCustomerData] = useState({});
    const {customerId} = useParams();
    
     async function handleCreateOS(data){
        console.log(data)
               
    }

    useEffect(() => {
        if(sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === undefined){
            navigate('/login');
        }
        customerSearchHook(customerId).then(res => {
            setCustomerData(res)
        })
    }, [])

    return (
        <Container className="m-0 w-100" id="container" style={{maxWidth:"100%"}}>
            <Navbar/>

            <div className='d-flex justify-content-center align-items-center justify-content-center'>
                <button className="btn btn-dark me-2" style={{height: 3 +'rem'}} onClick={() => navigate('/create/os')}> Retornar</button>
                <ul className='d-flex list-group flex-row mt-3 gap-3 w-100 ms-5 align-items-center'>
                    <div className='mb-6'>
                        <li className='list-group-item border-top fs-6'><strong>Nome completo:</strong> {customerData['fullName']}</li>
                        <li className='list-group-item border-top'><strong>CPF:</strong> {customerData['cpf']}</li>
                    </div>
                    <div className='mb-6 d-flex'>
                    <li className='list-group-item border-top' style={{height: 3 +'rem'}}><strong>Razão social:</strong> {customerData['business_name'] === undefined ? '-' : customerData['business_name']}</li>
                    <li className='list-group-item border-top' style={{height: 3 +'rem'}}><strong>CNPJ:</strong> {customerData['cnpj']}</li>
                    <li className='list-group-item border-top' style={{height: 3 +'rem'}}><strong>Email:</strong> {customerData['email']}</li>
                    </div>
                </ul>
            </div>
            <div className='w-100 border-3 border-bottom  my-3 border-success'></div>
            <div className='d-flex w-100 input-div'>
                <form onSubmit={handleSubmit(handleCreateOS)} className='os-data-input-form w-100 d-flex flex-wrap justify-content-center'>
                    <div className='row w-25 solicition-data' style={{marginRight: 2 + 'rem'}}>
                    <span className='fs-3 fw-bolder'>Dados da Solicitação</span>
                        <div className="mb-3 solicition_type_select">
                            <label htmlFor="solicitation_type" className="form-label fw-bolder">Tipo de solicitação</label>
                            <select className='form-select' required={true} defaultValue={'noUse'} id='solicitation_type' {...register('solicition_type')}>
                                <option value='noUse' disabled={true}>Selecione o tipo da solicitação</option>
                                <option value='Instalação'>Instalação</option>
                                <option value='Manutenção/Troca'>Manutenção/Troca</option>
                                <option value='Retirar'>Retirar</option>
                            </select>
                            <div id="solicitation-type-help" className="form-text">Escolha a solicitação que será realizada.</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="product_type" className="form-label fw-bolder">Produto a ser atendido</label>
                            <select className='form-select' required={true} defaultValue={'noUse'} id='product_type' {...register('product')}>
                                <option value='noUse' disabled={true}>Qual o produto a ser prestado serviço?</option>
                                <option value='Ar-condicionado'>Ar-condicionado</option>
                                <option value='Refrigeradores'>Refrigeradores</option>
                                <option value='Eletronicos em geral'>Eletronicos em geral</option>
                            </select>
                            <div id="solicitation-product-help" className="form-text">Escolha qual produto será prestado serviço.</div>
                        </div>
                    </div>
                    <div className='row d-flex adress-div'>
                        <span className='fs-3 fw-bolder'>Confirmar endereço:</span>
                        <div className="mb-3 adress adress-left">
                            <label htmlFor="adress" className="form-label fw-bold">Logradouro (Rua/Avenida)</label>
                            <input type="text" className="form-control" id="adress" {...register('adress')}/>
                            <div id="adress-exemple" className="form-text">Exemplo: Rua Faustino Rissi</div>
                            
                            <label htmlFor="adress_number" className="form-label fw-bold mt-3">Número de endereço</label>
                            <input type="Number"  className="form-control" id="adress_number" onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() } {...register('adress_number')}/>
                            <div id="adress-number-exemple" className="form-text">Exemplo: 834</div>
                        </div>
                        <div className="mb-3 adress adress-middle" >
                            <label htmlFor="adress_neighborhood" className="form-label fw-bold">Bairro/Habitação</label>
                            <input type="text" className="form-control" id="adress_neighborhood" {...register('adress_neighborhood')}/>
                            <div id="adress-neighborhood-exemple" className="form-text">Exemplo: Várzea Grande</div>
                            
                            <label htmlFor="adress_city" className="form-label fw-bold mt-3">Cidade</label>
                            <input type="text"  className="form-control" id="adress_city" {...register('adress_city')}/>
                            <div id="adress-city-exemple" className="form-text">Exemplo: Gramado</div>
                        </div>
                        <div className="mb-3 w-10 adress-right" >
                            <label className="form-label fw-bold">UF</label>
                            <select className='form-select' required={true} defaultValue={'noUse'} {...register('adress_uf')}>
                                <option value='noUse' disabled={true}></option>
                                <option value='Instalação'>RS</option>
                                <option value='Manutenção/Troca'>SC</option>
                                <option value='Retirar'>PR</option>
                            </select>
                            <div id="adress-state-exemple" className="form-text">Exemplo: RS</div>
                            <label htmlFor="adress_reference" className="form-label fw-bold mt-3">Ponto de Ref.:</label>
                            <input type="text"  className="form-control" id="adress_reference" {...register('adress_ref')}/>
                            <div id="adress-reference-point-exemple" className="form-text">Exemplo: RBT Internet</div>
                        </div>
                    </div>

                    <div className='mb-3 row d-flex w-100'>
                        <label htmlFor="service_description" className="form-label fw-bolder">Descrição do serviço:</label>
                        <textarea className='form-control w-50' id='service_description' {...register('description')}></textarea>
                        <div id="service_description_help" className="form-text">Descreva o que deve ser feito no local</div>
                    </div>
                    <div className='row w-100 d-flex flex-row-reverse'>
                        <button className='btn btn-light p-2 btn-create align-self-center form-submit-button' >Criar</button>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default CreateOS;