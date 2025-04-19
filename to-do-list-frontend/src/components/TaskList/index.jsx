import React from 'react'
import { TaskItem } from '../TaskItem'
import { Container } from './styles'

 const TaskList = ({tasks, onDelete, onEdit}) => {

  return (
    <>
    <Container>
      {
          tasks.map(task => (
                <TaskItem key={task.id} time={task.time} description={task.description} onDelete={() => onDelete(task.id)} onEdit={() => onEdit(task)}/>
          ))
      }
    </Container>
    </>
  )
}

export {TaskList}