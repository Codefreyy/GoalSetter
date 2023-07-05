import { useState } from "react"
import { useDispatch} from 'react-redux'
import {createGoal, getGoals} from '../features/goals/goalSlice'

function GoalForm() {
    const dispatch = useDispatch()
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createGoal({text}))
        setText('')
    }
    const [text, setText] = useState('')
  return <section className="form">
    <form onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor="text">Goal</label>
            <input id='text' 
            type='text' 
            name='text'
            onChange={(e) => setText(e.target.value)}
            value={text}>
            </input>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-block">Add Goal</button>
        </div>
    </form>
  </section>
}

export default GoalForm