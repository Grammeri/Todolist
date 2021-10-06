import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function changeCheckBoxStatus(Id: string, isDone: boolean) {

        //Функция find (callback) вызывается для каждого эл-та в tasks,
        //который будет приходить как параметр t
        //Если функция возвращает true, то нужная task будет найдена и
        //запишится в переменную task. Функция говорит, я в tasks ищу task
        //у которой id равна taskId (Id task, которую надо поменять:
        // (поставить/убрать галочку), как найду запишу в let task и перестану искать.
        let task = tasks.find(t => t.id === Id)

        if (task) {//если task существует, тогда
            task.isDone = isDone; // вводим 2-й параметр isDone: boolean, чтобы указать на какое значение поменять
            //т.е. на то, которое придет в параметре
        }
        //Мы поменяли tasks, надо реакту сказать, что одна из tasks в массиве изменилась (считаем, что изменился весь массив)
        // Надо сделать копию, чтобы реакт понял let copy = []
        /*let copy = [...tasks]
        setTasks(copy); можно заменить на*/

        setTasks([...tasks])

    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeCheckBoxStatus={changeCheckBoxStatus}
                      filter={filter}
            />
        </div>
    );
}


export default App;
