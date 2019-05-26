import React, { Component } from 'react'
import { Record, IconsWrapper, Title, Calories, DateText, Time, Icon } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { DeleteIcon, EditIcon } from '../../assets/icons'
import moment from 'moment-timezone'
import colors from '../../styles/colors'

class RecordItem extends Component {
  render() {
    const {
      totalCalories,
      expectedCalories,
      calories,
      title,
      id,
      editOpenHandler,
      handleChange,
      onDelete,
      date
    } = this.props

    return (
      <Record key={title}>
        {totalCalories > expectedCalories ? (
          <FontAwesomeIcon icon={faExclamationCircle} style={{ color: colors.pink, marginRight: 15 }} />
        ) : (
          <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#38ba8a', marginRight: 15 }} />
        )}
        <Title>{title}</Title>
        <Calories>{calories}</Calories>
        <IconsWrapper>
          <Icon
            onClick={() => {
              editOpenHandler(false, id)
              handleChange('addBottom', true)
            }}
          >
            <EditIcon width={13} height={13} color={colors.gray} />
          </Icon>
          <Icon onClick={() => onDelete(id)}>
            <DeleteIcon width={11} height={11} color={colors.tomato} />
          </Icon>
        </IconsWrapper>
      </Record>
    )
  }
}

export default RecordItem
