import './App.css';

import React, { Component } from 'react';

const RATIO = 5;

type PageType = "home" | "todos" | "converter";

type Todo = {
  text: string;
  isDone: boolean;
}

interface AppStateType {
  currPage: PageType;
  todos: Todo[];
  gameHours: number;
  gameMinutes: number;
}

class App extends Component<{}, AppStateType> {
  initialState: Readonly<AppStateType>;
  /** Constructor for class, sets initial state
   *
   * @param {Object} props the props passed in by parent component
   */
  constructor(props: Object) {
    super(props);
    this.state = {
      currPage: 'home',
      todos: [
        // {text: "do my hw", isDone: false},
        // {text: "clean my room", isDone: true},
        // {text: "clean my room", isDone: true},
      ],
      gameHours: 0,
      gameMinutes:0,
    };
  }

  homePage() {
    return (
      <div className="home-page">
        <div className='main'>
          <p id='welcome'>Welcome!</p>
          <p>Want to earn points from Nintendo and save energy at the same time?</p>

          <img src='energy.png' alt='energy saving logo'/>

          <p>This app will help you achieve and reach your energy saving goals!</p>

          <p>Press 'next' to continue...</p>
        </div>

        <div className='button-div'>
          <button
            onClick = {() => {this.setState({currPage: 'todos'})}}
          >
            Next &#8680;
          </button>
        </div>
      </div>
    );
  }

  renderToDos() {
    const todos: JSX.Element[] = [];
    for(let i = 0; i < this.state.todos.length; i++){
      const todo = this.state.todos[i];
      todos.push(
        <div className="todo">
          <input 
            type="checkbox" 
            defaultChecked={todo.isDone} 
            onChange = {(e) => {
              const todos = this.state.todos;
              todos[i].isDone = !todo.isDone;
              this.setState({todos});
            }}
          />
          <input 
            type="text" 
            defaultValue = {todo.text}
            onChange = {(e) => {
              const todos = this.state.todos;
              todos[i].text = e.target.value;
              this.setState({todos});
            }}
          />
        </div>
      )
    }

    todos.push(
      <div className="todo">
          <input type="checkbox" />
          <input type="text" onChange = {
            (e) => {
              const todos = this.state.todos;
              const todo = {text: e.target.value, isDone: false};
              todos.push(todo);
              this.setState({todos});
            }
          }/>
        </div>
    )
    
    return (
      <div id='todos'>
        {
          todos
        }
      </div>
    )
  }

  todosPage() {
    return (
      <div className='main'>
        <p id="todo-header">Enter Your To-Do List</p>
        <p> to-do list for today:</p>

        {this.renderToDos()}

        <div className='button-div'>
          <button
            onClick = {() => {this.setState({currPage: 'converter'})}}
          >
            Next &#8680;
          </button>
          <button
            onClick = {() => {this.setState({currPage: 'home'})}}
          >
            &#8678; Back
          </button>
          
        </div>
      </div>
    );
  }

  converterPage() {
    return (
      <div className='main'>
        <p id="converter-header">Energy Converter</p>
        <p>How many hours a day do you play video games?</p>

        <p>Enter your average times</p>

        <div id="time-input">
          <input type="number" placeholder='hours' 
            onChange={(e) => {
              const hours = e.target.valueAsNumber ? e.target.valueAsNumber : 0;
              this.setState({
                gameHours: hours
              })
            }}
          />
          <input type="number" placeholder='minutes'
            onChange={(e) => {
              const minutes = e.target.valueAsNumber ? e.target.valueAsNumber : 0;
              this.setState({
                gameMinutes: minutes
              })
            }}
          />
        </div>

        <p id="converter-equals">=</p>

        <div>
          <p id="converter-money">$ {
          (this.state.gameHours * 60 + this.state.gameMinutes) * RATIO
          }</p>
        </div>

        <div className='button-div'>
          <button className="next-button"
            onClick = {() => {this.setState({currPage: 'converter'})}}
          >
            Next &#8680;
          </button>
          <button
              onClick = {() => {this.setState({currPage: 'todos'})}}
            >
            &#8678; Back
          </button>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.currPage === 'home') {
      return this.homePage();
    }
    else if(this.state.currPage == 'todos') {
      return this.todosPage();
    }
    else if(this.state.currPage == 'converter') {
      return this.converterPage();
    }
    return this.state.currPage;
  }
}



export default App;
