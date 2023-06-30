import styles from "./NewTask.module.css";
import { v4 as uuidv4 } from 'uuid';
import plus from '../assets/plus.svg';
import { Task } from "./Task";
import { List } from "./List";
import { useState } from "react";
import { ClipboardText } from "@phosphor-icons/react";

interface Todo {
    id: string;
    title: string;
    isCompleted: boolean;
}

export function NewTask() {
    const [todos, setTodos] = useState<Array<Todo>>([])

    const [newTaskText, setNewTaskText] = useState<string>('')



    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setTodos([...todos, {
            id: uuidv4(),
            title: newTaskText,
            isCompleted: false,
        }]);
        setNewTaskText('');
    }
    function handleNewTaskTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewTaskText(event.target.value);
    }

    function deleteTask(taskToDelete: string) {
        const taskWithoutDeletedOne = todos.filter((tasktTo) => {
            return tasktTo.id !== taskToDelete
        })
        setTodos(taskWithoutDeletedOne);
    }

    function handleCheckTask(id: string, checked: boolean) {
        const newTodos =
            todos.map((todo) => {
                if (todo.id === id) {
                    return ({
                        ...todo,
                        isCompleted: checked
                    })
                }
                return todo
            })
        setTodos(newTodos)
    }

    const isNewTaskEmpty = newTaskText.length == 0;

    return (
        <>
            <form onSubmit={handleCreateNewTask} className={styles.inputAdd}>
                <input
                    name="task"
                    placeholder="Adicione uma nova tarefa"
                    value={newTaskText}
                    onChange={handleNewTaskTextChange}
                    required
                >


                </input>
                <button type='submit' disabled={isNewTaskEmpty}>
                    Criar
                    <img src={plus} />
                </button>
            </form>

            <List
                taskCount={todos.length}
                taskDone={todos.filter((taskDoneTo) => {
                    return taskDoneTo.isCompleted
                }).length}
            />

            {todos.length > 0 && todos.map((task, id) => {
                return (
                    <Task
                        key={id}
                        id={task.id}
                        title={task.title}
                        isCompleted={task.isCompleted}
                        onDeleteTask={deleteTask}
                        onIsCompleted={handleCheckTask}
                    />
                )
            })}
            {todos.length === 0 && 
                <div className={styles.done}>
                    <ClipboardText/>
                    <text className={styles.lineA}>Você ainda não tem tarefas cadastradas </text>
                    <text className={styles.lineB}>Crie tarefas e organize seus itens a fazer</text>
                </div>
            }
        </>


    );
}

