import React from 'react'
import { Container, Checkbox, Text, TextArea, Time, ActionArea, ButtonIcon } from './styles'
import { MdDelete, MdEdit } from 'react-icons/md'


 const TaskItem = ({task, date, time, description, onDelete, onEdit, onToggle}) => {
  return (
    <Container>
        <Checkbox type="checkbox" onChange={() => onToggle(task)}/>
        <TextArea>
            <Time>{date} {time}</Time>
            <Text isDone={task.status === 'Completed'}>{description}</Text>
        </TextArea>
        <ActionArea>
            <ButtonIcon onClick={onEdit}><MdEdit color='#A3B18A'/></ButtonIcon>
            <ButtonIcon onClick={onDelete}><MdDelete color='#A3B18A'/></ButtonIcon>
        </ActionArea>
    </Container>
  )
}

export {TaskItem}