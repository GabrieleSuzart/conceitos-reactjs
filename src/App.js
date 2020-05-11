import React, { useEffect, useState } from 'react'
import api from './services/api'
import styled from 'styled-components'

import './styles.css'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  padding: 2rem;
`;

const Button = styled.button`
  border: 1px solid #7159c1;
  color: #7159c1;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  border-radius: 4px;

  &:hover {
    background: #7159c1;
    color: #fff;
  }
`;

const ButtonRemove = styled.button`
  margin-left: 1rem;
  border: 1px solid #ca4949;
  color: #ca4949;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  border-radius: 4px;

  &:hover {
    background: #ca4949;
    color: #fff;
  }
`;


const App = () => {
  const [repositories, setRepositories] = useState([])
  const [count, setCount] = useState(1)

  useEffect(() => {
    api.get('repositories')
      .then(response => setRepositories(response.data))    
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repository ${count}`,
      url: 'https://github.com/GabrieleSuzart/be-the-hero',
      techs: ['ReactJS', 'Node.js']
    })

    const respository = response.data
    setRepositories([...repositories, respository])
    setCount(count + 1)
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <Content>
      <Header>
        <h1>Meus repositórios - POC</h1>
        <Button onClick={handleAddRepository}>Adicionar</Button>
      </Header>
      <ul data-testid='repository-list'>
        { 
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <ButtonRemove onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </ButtonRemove>
            </li>
          ))
        }
      </ul>
    </Content>
  )
}

export default App
