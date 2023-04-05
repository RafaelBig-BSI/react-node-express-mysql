import React from "react";
import styled from "styled-components";

//Icons
import {FaTrash, FaEdit} from 'react-icons/fa';

import {toast} from 'react-toastify';
import axios from 'axios';

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
    `;
    
export const Thead = styled.thead``;

export const Tbody = styled.tbody``;
    
export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding: 5px;

    @media (max-width: 500px){
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Td = styled.td`
    padding: 10px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")}

    @media (max-width: 500px){
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

function Grid({users, setUsers, setOnEdit}){

    //Atualizar usuario (UPDATE)
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    //Deletar usuario (DELETE)
    const handleDelete = async (id) => {
        await axios.delete("http://localhost:8800/" + id)
            .then(({ data }) => {
                const newArray = users.filter((user) => user.id !== id);

                setUsers(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    };

    return(
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th onlyWeb>Fone</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    users.map((item, i) => (
                        <Tr key={i}>
                            <Td width="30%">{item.nome}</Td>
                            <Td width="30%">{item.email}</Td>
                            <Td width="20%" onlyWeb>{item.fone}</Td>
                            <Td alignCenter width="5%">
                                <FaEdit onClick={() => handleEdit(item)} />
                            </Td>
                            <Td alignCenter width="5%">
                                <FaTrash onClick={() => handleDelete(item.id)} />
                            </Td>
                        </Tr>
                    ))
                }
            </Tbody>
        </Table>
    )
}

export default Grid;