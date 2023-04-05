import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import {toast} from 'react-toastify';

//Rota
import axios from "axios";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

function Form({ getUsers, onEdit, setOnEdit }){

    const ref = useRef();

    useEffect(() => {
        if(onEdit) //se for uma alteração o state "onEdit" conterá o proprio item com "nome, email, fone, data_nascimento".
        {
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
            user.data_nascimento.value = onEdit.data_nascimento;
        }
    }, [onEdit]);


    //Criar usuario (CREATE)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current; //contem os dados do formulário

        //Checar se todos os inputs do form estão preenchidos
        if(!user.nome.value || !user.email.value || !user.fone.value || !user.data_nascimento.value)
        {
            return toast.warn("Preencha todos os campos!");
        }

        if(onEdit){ //se for uma edição
            await axios.put("http://localhost:8800/" + onEdit.id, { //body da requisição passa os itens (nome, email, fone, data_nascimento)
                nome: user.nome.value,
                email: user.email.value,
                fone: user.fone.value,
                data_nascimento: user.data_nascimento.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }
        else //senão, é um inserção normal
        {
            await axios.post("http://localhost:8800", {
                nome: user.nome.value, //body da requisição
                email: user.email.value,
                fone: user.fone.value,
                data_nascimento: user.data_nascimento.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }

        //limpar o form
        user.nome.value = '';
        user.email.value = '';
        user.fone.value = '';
        user.data_nascimento.value = '';

        setOnEdit(null); //zera o state de edição
        getUsers(); //atualiza o grid
    };

    return(
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" />
            </InputArea>

            <InputArea>
                <Label>E-mail</Label>
                <Input name="email" type="email" />
            </InputArea>

            <InputArea>
                <Label>Telefone</Label>
                <Input name="fone" />
            </InputArea>

            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name="data_nascimento" type="date" />
            </InputArea>

            <Button type="submit">Salvar</Button>
        </FormContainer>
    )
}

export default Form;