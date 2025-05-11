import React, { useState, useEffect } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { Container, Content, Title } from './styles'
import { TaskList } from '../../components/TaskList'
import { DaySelector } from '../../components/DaySelector'
import { SearchBar } from '../../components/SearchBar'
import { TaskModal } from '../../components/TaskModal'
import { api } from '../../services/api';
import CalendarModal from '../../components/CalendarModal'

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

function generateDays(baseDate = new Date()) {
  const days = [];

  const dayOfWeek = baseDate.getDay();
  const sunday = new Date(baseDate);
  sunday.setDate(baseDate.getDate() - dayOfWeek);

  for (let i = 0; i < 7; i++) {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + i);

    days.push({
      id: i + 1,
      text: daysOfWeek[(sunday.getDay() + i) % 7], // pega o nome do dia também sem depender do objeto alterado
      day: date.getDate(),
      fullDate: date,
      formattedDate: date.toISOString().split('T')[0]
    });
  }
  return days;
}

const Home = () => {
  const [tasks, setTasks] = useState([])
  const [days, setDays] = useState(generateDays())
  const [selectedDay, setSelectedDay] = useState(new Date().toISOString().split('T')[0]) // Guarda o dia selecionado pelo usuário
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [userName, setUserName] = useState('');


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
      const response = searchTerm
        ? await api.get(`/Task/GetDescription/${searchTerm}`)
        : await api.get(`/Task/GetDate`, {
          params: { dateAndTime: selectedDay }
        })

      setTasks(response.data)
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

  const handleToggleTask = async (task) => {
    try {
      const updated = {
        ...task,
        status: task.status === 'Completed' ? 'Pending' : 'Completed', // ou true/false
      }

      await api.put(`/Task/${task.id}`, updated)
      const updatedTasks = tasks.map(t =>
        t.id === task.id ? { ...t, status: updated.status } : t
      )
      setTasks(updatedTasks)
    } catch (e) {
      console.error('Erro ao atualizar status:', e)
    }
  }

  useEffect(() => {
    //ajuste por causa do fuso horário
    const [year, month, day] = selectedDay.split('-').map(Number);
    const newBaseDate = new Date(year, month - 1, day); //subtrair um, pois no JS o mês começa em zero

    setDays(generateDays(newBaseDate));
  }, [selectedDay]);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let response

        if (searchTerm) {
          response = await api.get(`/Task/GetDescription/${searchTerm}`)
        }
        else if (selectedDay) {
          response = await api.get('/Task/GetDate', {
            params: { dateAndTime: selectedDay }
          })
        }
        else {
          response = await api.get('/Task')
        }


        setTasks(response.data)
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error)
      }
    }
    fetchTasks()
  }, [searchTerm, selectedDay])

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await api.get('/user/me'); // faz GET com token já incluso via axios
        console.log(response)
        setUserName(response.data.name); // depende do campo que seu back está retornando
      } catch (error) {
        console.error('Erro ao buscar nome do usuário:', error);
      }
    }

    fetchUserName();
  }, []);



  /*DaySelector passa o dia a serem mostrados, o dia que está atualmente selecionado e a função que atualiza o dia selecionado.*/
  return (
    <Container>
      <Sidebar onAddTask={() => setIsModalOpen(true)} onOpenCalendar={() => setIsCalendarModalOpen(true)} userName={userName} />
      <Content>
        <DaySelector days={days} selectedDay={selectedDay} onSelectDay={setSelectedDay} />
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <Title>Suas tarefas:</Title>
        <TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} onToggle={handleToggleTask} />
      </Content>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTask} // essa função adiciona a tarefa
        editingTask={editingTask}
      />
      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        selectedDate={selectedDay}
        onSelectDate={setSelectedDay} />
    </Container>
  )
}

export { Home }
