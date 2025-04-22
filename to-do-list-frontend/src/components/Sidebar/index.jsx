import React from 'react'
import userImage from '../../assets/user.png';
import calendar from '../../assets/calendar.png';

import {Container, User, UserText, Item, TaskText, Button} from './styles'

const Sidebar = ({onAddTask, onOpenCalendar}) => {
  return (
    <Container>
        <User>
            <img src={userImage} alt="user" />
            <UserText>Maitê Becker</UserText>
        </User>
        <Item>
            <Button onClick={onOpenCalendar}><img src={calendar} alt="calendário" /></Button>
            <TaskText>Abrir Calendário</TaskText>
        </Item>
        <Item>
            <Button onClick={onAddTask}>+</Button>
            <TaskText>Adicionar Tarefas</TaskText>
        </Item>
    </Container>
  )
}

export {Sidebar}