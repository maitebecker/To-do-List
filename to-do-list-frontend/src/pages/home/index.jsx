import React, { useState, useEffect } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { Container, Content, Title } from './styles'
import { TaskList } from '../../components/TaskList'
import { DaySelector } from '../../components/DaySelector'
import { SearchBar } from '../../components/SearchBar'
import { TaskModal } from '../../components/TaskModal'
import { api } from '../../services/api';

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

function generateDays() {
  const today = new Date()
  const days = []

  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(today.getDate() + i)

    days.push({
      id: i + 1,
      text: daysOfWeek[date.getDay()],
      day: date.getDate(),
      fullDate: date
    })
  }

  return days
}

const Home = () => {
  const [tasks, setTasks] = useState([])
  const [days, setDays] = useState(generateDays())
  const [selectedDay, setSelectedDay] = useState(new Date().getDate()) // Guarda o dia selecionado pelo usuário
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddTask = async (newTask) => {
    setIsModalOpen(false)
    try {
      const dateTimeString = `${newTask.date}T${newTask.time}:00`
      const taskToSend = {
        description: newTask.description,
        dateAndTime: dateTimeString,
        status: newTask.status,
      }

      if (newTask.id) {
        // editar tarefa
        await api.put(`/Task/${newTask.id}`, taskToSend)
      } else {
        // criar nova tarefa
       await api.post('/Task', taskToSend)
      }
        const tasksResponse = await api.get('/Task')
        setTasks(tasksResponse.data)
        setEditingTask(null)
      
    } catch (e) {
      console.error(`Erro ao buscar tarefas: `, e)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/Task/${id}`);
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks)

    } catch (e) {
      console.error('Erro ao deletar tarefa: ', e)
    }
  }

  const handleEditTask = (task) => {
    // Extrair os campos para preencher o modal
    setEditingTask({
      id: task.id,
      description: task.description,
      time: task.time,
      date: task.date,
    })
    setIsModalOpen(true)
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = searchTerm
          ? await api.get(`/Task/GetDescription/${searchTerm}`)
          : await api.get('/Task')
  
        setTasks(response.data)
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error)
      }
    }
    fetchTasks()
  }, [searchTerm, isModalOpen])

  /*DaySelector passa o dia a serem mostrados, o dia que está atualmente selecionado e a função que atualiza o dia selecionado.*/
  return (
    <Container>
      <Sidebar onAddTask={() => setIsModalOpen(true)} />
      <Content>
        <DaySelector days={days} selectedDay={selectedDay} onSelectDay={setSelectedDay} />
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <Title>Suas tarefas:</Title>
        <TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
      </Content>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTask} // essa função adiciona a tarefa
        editingTask={editingTask}
      />
    </Container>
  )
}

export { Home }
