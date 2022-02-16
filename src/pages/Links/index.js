import { useState, useEffect } from 'react';

import './links.css';
import {FiArrowLeft, FiLink, FiTrash} from 'react-icons/fi'
import { Link } from "react-router-dom";

import { getLinksSave, deleteLink } from '../../services/storeLinks';
import LinkItem from '../../components/LinkItem';

export default function Links() {

    const [myLinks, setMyLinks] = useState([]);

    const [data, setData] = useState({});
    // modal sempre começa FECHADA
    const [showModal, setShowModal] = useState(false);

    // falsa quando não estiver vazia
    const [emptyList, setEmptyList] = useState(false);


    useEffect(() => { 
        async function getLinks() {
            const resultado = await getLinksSave('@encurtaLink');

            if (resultado.length === 0) {
                // lista está vazia...
                setEmptyList(true);
            }

            setMyLinks(resultado);

        }

        getLinks();

    }, []);

    function handleOpenLink(link) {
        setData(link);
        setShowModal(true);
    }

    async function handleDeleteLink(id) {
        const resultado = await deleteLink(myLinks, id);
        
        if (resultado.length === 0) {
            setEmptyList(true);
        }

        setMyLinks(resultado);
    }



  return (
    <div className="links-container">
        <div className="links-header">
            <Link to="/">
                <FiArrowLeft size={38} color="#FFF"/>
            </Link>
            <h1>Meus Links</h1>  
        </div>
        
        {emptyList && (
            <div className="links-item">
                  <h2 className="empty-text">Sua lista está vazia...</h2>  
            </div>
        )}  

        {/* vai percorrer a lista de links e mostrar */}
        {myLinks.map(link => (
            <div key={link.id} className="links-item">
                <button className="link" onClick={() => handleOpenLink(link)}>
                    <FiLink size={18} color="#FFF" />
                    {link.long_url}
                </button>
                <button className="link-delete" onClick={() => handleDeleteLink(link.id)}>
                    <FiTrash size={24} color="#FF5454"/>
                </button>  
            </div> 
        ))} 
          
          {showModal && (
              <LinkItem
                  closeModal={() => setShowModal(false)}
                  content={data}
              />
          )}

    </div>

  );
}