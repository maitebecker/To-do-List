import React from 'react'
import userImage from '../../assets/user.png';

import {Container, User, UserText, Task, TaskText, Button} from './styles'

const Sidebar = ({onAddTask}) => {
  return (
    <Container>
        <User>
            <img src={userImage} alt="user" />
            <UserText>Maitê Becker</UserText>
        </User>
        <Task>
            <Button onClick={onAddTask}>+</Button>
            <TaskText>Adicionar Tarefas</TaskText>
        </Task>
    </Container>
  )
}

export {Sidebar}