import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';



type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask:(title: string) => void
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
 const addTask = () =>{
     props.addTask(newTaskTitle);
     setNewTaskTitle("");
 }
 const setAllFilter = ()=>props.changeFilter ("all")
 const setActiveFilter = ()=>props.changeFilter ("active")
 const setCompletedFilter = ()=>props.changeFilter ("completed")
 const onKeyPress = (e:KeyboardEvent<HTMLInputElement>)=>{
     if (e.key === "Enter") {
         addTask()
     }
 }
 const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={(e) =>{

                setNewTaskTitle(e.currentTarget.value)
            } }
            onKeyPress={onKeyPress}
            />

            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={ (e) => { props.removeTask(t.id) } }>x</button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={ setActiveFilter }>
                All
            </button>
            <button onClick={ setActiveFilter }>
                Active
            </button>
            <button onClick={ setCompletedFilter}>
                Completed
            </button>
        </div>
    </div>
}
