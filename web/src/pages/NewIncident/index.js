import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom'

import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api'

export default function NewIncident() {

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');


    async function handleNewIncident(event) {

        event.preventDefault();

        const data = { title, description, value };

        try {

            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            history.push('/profile');
        } catch (erro) {
            alert('Erro ao cadastrar o caso, tente novamente')
        }
    }


    return (

        <div className="new-incident-container">

            <div className="content">
                <section>

                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cdastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input type="text" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Título do caso"  />
                    <textarea type="text" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição"  />
                    <input type="text" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor em Reais"  />
                   
                    <button className="button">Cadastrar</button>
                </form>
            </div>

        </div>
    );
}


