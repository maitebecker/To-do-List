import React from 'react'
import calendar from '../../assets/calendar.png';
import logo from '../../assets/logo.png'

import {Container, User, UserText, Item, TaskText, Button, Img} from './styles'

const Sidebar = ({onAddTask, onOpenCalendar, userName}) => {
  return (
    <Container>
        <User>
          <Img src={logo} alt="logo" />
            <UserText>{} Olá! {userName}</UserText>
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