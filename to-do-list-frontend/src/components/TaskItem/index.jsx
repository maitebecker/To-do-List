import React from 'react'
import { Container, Checkbox, Text, TextArea, Time, ActionArea, ButtonIcon } from './styles'
import { MdDelete, MdEdit } from 'react-icons/md'


 const TaskItem = ({time, description, onDelete, onEdit, onToggle}) => {
  return (
    <Container>
        <Checkbox type="checkbox" onChange={onToggle}/>
        <TextArea>
            <Time>{time}</Time>
            <Text>{description}</Text>
        </TextArea>
        <ActionArea>
            <ButtonIcon onClick={onEdit}><MdEdit color='#A3B18A'/></ButtonIcon>
            <ButtonIcon onClick={onDelete}><MdDelete color='#A3B18A'/></ButtonIcon>
        </ActionArea>
    </Container>
  )
}

export {TaskItem}