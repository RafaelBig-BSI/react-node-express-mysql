import GlobalStyle from './styles/global';
import styled from 'styled-components';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

//components
import Form from './components/Form';
import Grid from './components/Grid';

//Hooks
import { useState, useEffect } from 'react';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {

  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  //Obter usuarios (READ)
  const getUsers = async () => {
    try
    {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1))); //ordena os usuarios
    }
    catch(err)
    {
      toast.error(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]); //coloca o setUsers para sempre setar os usuarios no array a partir do metodo "getUsers()"

  return (
    <>
      <Container>
        <Title>Usuários</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>

      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
