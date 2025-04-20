import React from 'react'
import { TaskItem } from '../TaskItem'
import { Container } from './styles'

 const TaskList = ({tasks, onDelete, onEdit, onToggle}) => {

  return (
    <>
    <Container>
      {
          tasks.map(task => (
                <TaskItem key={task.id} task={task} date={task.date} time={task.time} description={task.description} onDelete={() => onDelete(task.id)} onEdit={() => onEdit(task)} onToggle={() => onToggle(task)}/>
          ))
      }
    </Container>
    </>
  )
}

export {TaskList}