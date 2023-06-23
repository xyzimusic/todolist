import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import Cars, {TopCarsType} from "./Cars";
import Button from "./components/Button";
import NewComponent from "./components/NewComponent";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    let [filter, setFilter] = useState<FilterValuesType>('all')
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ])

    const initTopCars = [
        {manufacturer: 'BMW', model: 'm5cs'},
        {manufacturer: 'Mercedes', model: 'e63s'},
        {manufacturer: 'Audi', model: 'rs6'}
    ]
    let [topCars, setTopCars] = useState<TopCarsType[]>(initTopCars)

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(item => item.id !== id)
        setTasks(filteredTasks)
    }

    let tasksForTodoList = tasks;

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }


    const onClickHandler = (name: string) => {
        console.log(name)
    }

    const Button1Foo = (subscriber: string, age: number, address: string) => {
        console.log(subscriber)
    }
    const Button2Foo = (subscriber: string) => {
        console.log(subscriber)
    }
    const Button3Foo = () => {
        console.log('stup button')
    }
    // const Button2Foo = () => {
    //     console.log('I`m Ivan')}


    //let a = 1;
    // let [a, setA] = useState(1)
    // const onClickHandlerBtn = () => {
    //     setA(++a)
    //     console.log(a)
    // }
    // const onClickHandlerBtnZer = () => {
    //     setA(0)
    //     console.log(a)
    // }
    const [money, setMoney] = useState([
        {banknots: 'Dollars', value: 100, number: ' a1234567890'},
        {banknots: 'Dollars', value: 50, number: ' z1234567890'},
        {banknots: 'RUBLS', value: 100, number: ' w1234567890'},
        {banknots: 'Dollars', value: 100, number: ' e1234567890'},
        {banknots: 'Dollars', value: 50, number: ' c1234567890'},
        {banknots: 'RUBLS', value: 100, number: ' r1234567890'},
        {banknots: 'Dollars', value: 50, number: ' x1234567890'},
        {banknots: 'RUBLS', value: 50, number: ' v1234567890'},
    ])

    let [nameButton, setNameButton] = useState<FilterType>('All')
    let newMoney = money;
    if (nameButton === 'Dollars') newMoney = money.filter(el => el.banknots == 'Dollars')
    if (nameButton === 'RUBLS') newMoney = money.filter(el => el.banknots == 'RUBLS')

    const filterHandler = (name: FilterType) => {
        setNameButton(name)
        console.log(name)
    }

   type FilterType = 'All' | 'RUBLS' | 'Dollars'
    return (
        <div className="App">
            {/*    <div>*/}
            {/*        <Button title ={"MyYoutubeChanel-1"} callback={()=>Button1Foo('I`m Vasya',21,'live in Minst')}/>*/}
            {/*        <Button title ={"MyYoutubeChanel-2"} callback={()=>Button2Foo('I`m Ivan')}/>*/}
            {/*        <Button title ={"Stup Button"} callback={Button3Foo}/>*/}
            {/*        /!*<button onClick={( )=>{onClickHandler('vasya')}}>*!/*/}
            {/*        /!*    MyYoutubeChanel-1-2*!/*/}
            {/*        /!*</button>*!/*/}

            {/*        /!*<button onClick={()=>{onClickHandler('ivan')} }>*!/*/}
            {/*        /!*    MyYoutubeChanel-1-3*!/*/}
            {/*        /!*</button>*!/*/}


            {/*    </div>*/}
            {/*    <Todolist title='What to learn'*/}
            {/*              tasks={tasksForTodoList}*/}
            {/*              removeTask={removeTask}*/}
            {/*              changeFilter={changeFilter}*/}
            {/*    />*/}
            {/*    <div>*/}
            {/*        <Cars topCars={topCars}/>*/}
            {/*    </div>*/}
            {/*<h1>{a}</h1>*/}
            {/*<button onClick={onClickHandlerBtn}>+</button>*/}
            {/*<button onClick={onClickHandlerBtnZer}>0</button>*/}
            <NewComponent money={newMoney} filterHandler={filterHandler}/>
            {/*<ul>*/}
            {/*    {newMoney.map((objFromMoney, index) => {*/}
            {/*        return (*/}
            {/*            <li key={index}>*/}
            {/*                <span>{objFromMoney.banknots}</span>*/}
            {/*                <span>{objFromMoney.value}</span>*/}
            {/*                <span>{objFromMoney.number}</span>*/}
            {/*            </li>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</ul>*/}
            {/*<div style={{marginLeft: '35px', backgroundColor: "red"}}>*/}
            {/*    <button onClick={() => filterHandler('All')}>all</button>*/}
            {/*    <button onClick={() => filterHandler('RUBLS')}>rubles</button>*/}
            {/*    <button onClick={() => filterHandler('Dollars')}>dollar</button>*/}
            {/*</div>*/}
        </div>
    );
}

export default App;
