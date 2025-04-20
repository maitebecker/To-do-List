import React, { useState, useEffect } from 'react'
import { ModalOverlay, ModalContent, Title, Input, Button} from './styles'

const TaskModal = ({ isOpen, onClose, onSave, editingTask }) => {
    const [description, setDescription] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')

    // Preencher os campos se for edição
    useEffect(() => {
        if (editingTask) {
            setDescription(editingTask.description)
            setTime(editingTask.time)
            setDate(editingTask.date)
        } else {
            setDescription('')
            setTime('')
            setDate('')
        }
    }, [editingTask])

    const handleSubmit = () => {
        if (!description || !time || !date) return

        const taskData = {
            id: editingTask?.id,
            description,
            time,
            date,
            status: 'Pending',
        }

        onSave(taskData)
        setDescription('')
        setTime('')
        setDate('')
    }

    if (!isOpen) return null

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}> {/**Clicar dentro do modal → não fecha o modal  */}
                <Title>{editingTask ? 'Editar Tarefa' : 'Adicionar Tarefa'}</Title>
                <Input
                    type="text"
                    placeholder="Descrição da tarefa"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <Button onClick={handleSubmit}>Salvar</Button>
                <Button onClick={onClose}>Cancelar</Button>
            </ModalContent>
        </ModalOverlay>
    )
}

export { TaskModal }