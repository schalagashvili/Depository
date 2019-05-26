import React, { Component } from 'react'
import { Button, Input } from '../../styles/mixins'
import Drawer from '@material-ui/core/Drawer'
import { DatePicker, TimePicker } from '../../components'
import { Add, Container, InnerWrapper, RecordsHeader } from './styles'
import { ButtonsWrapper } from '../Header/styles'
import colors from '../../styles/colors'

class AddRecord extends Component {
  render() {
    const {
      addBottom,
      isAdd,
      addTime,
      addDate,
      addTitle,
      onAddCaloriesChange,
      saveError,
      addCalories,
      onSave,
      handleChange
    } = this.props

    return (
      <Drawer anchor="bottom" open={addBottom}>
        <Add id="edit-meal">
          <InnerWrapper>
            <Container>
              <RecordsHeader>{isAdd ? 'Add' : 'Edit'} Meal</RecordsHeader>
              <DatePicker date={addDate} onChange={e => handleChange('addDate', e.target.value)} />
              <TimePicker time={addTime} onChange={e => handleChange('addTime', e.target.value)} />
              <Input value={addTitle} onChange={e => handleChange('addTitle', e.target.value)} placeholder="Title" />
              <Input
                min={0}
                value={addCalories || ''}
                onChange={e => onAddCaloriesChange(e)}
                type="number"
                placeholder="Calories"
              />
              <div />
              <ButtonsWrapper>
                <Button onClick={() => onSave()} color={colors.green}>
                  Save
                </Button>
                <Button onClick={() => handleChange('addBottom', false)} color={colors.grey}>
                  Cancel
                </Button>
              </ButtonsWrapper>
            </Container>
          </InnerWrapper>
        </Add>
      </Drawer>
    )
  }
}

export default AddRecord
