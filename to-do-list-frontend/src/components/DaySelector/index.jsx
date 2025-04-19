import React from 'react'
import { DatesContainer, DateItem, DateButton, DayText } from './styles'

const DaySelector = ({ days, selectedDay, onSelectDay }) => {
    /*isActive: indica se aquele botão representa o dia selecionado (para mudar estilo */
    /*onClick: quando o botão é clicado, atualiza o dia selecionado.*/
    return (
        <DatesContainer>
            {
                days.map(day => (
                    <DateItem key={day.id} isActive={day.day === selectedDay} onClick={() => onSelectDay(day.day)}>
                        <DateButton isActive={day.day === selectedDay}>{day.day}</DateButton>
                         <DayText isActive={day.day === selectedDay}>{day.text}</DayText>
                    </DateItem>
                ))
            }
        </DatesContainer>
    )
}


export { DaySelector }