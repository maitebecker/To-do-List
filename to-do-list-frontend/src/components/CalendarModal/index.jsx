import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { ModalContent, ModalOverlay, Button} from './styles'

const CalendarModal = ({ isOpen, onClose, selectedDate, onSelectDate}) => {
    
    if (!isOpen) return null

  return (
    <ModalOverlay>
        <ModalContent>
        <Calendar
          onChange={(date) => {
            console.log(date)
            const formattedDate = date.toISOString().split('T')[0]
            onSelectDate(formattedDate)
            onClose()
          }}
          value={new Date()}
        />
        <Button onClick={onClose}>Fechar</Button>
        </ModalContent>
    </ModalOverlay>
  )
}

export default CalendarModal
