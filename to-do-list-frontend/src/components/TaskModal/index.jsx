import React, { useState, useEffect } from 'react'
import { ModalOverlay, ModalContent } from './styles'

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
                <h2>{editingTask ? 'Editar Tarefa' : 'Adicionar Tarefa'}</h2>
                <input
                    type="text"
                    placeholder="Descrição da tarefa"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button onClick={handleSubmit}>Salvar</button>
                <button onClick={onClose}>Cancelar</button>
            </ModalContent>
        </ModalOverlay>
    )
}

export { TaskModal }