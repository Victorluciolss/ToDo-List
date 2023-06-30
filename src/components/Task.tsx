import { Trash } from '@phosphor-icons/react';
import styles from './Task.module.css';

interface TaskProps {
    id: string,
    title: string,
    isCompleted: boolean;
    onDeleteTask(id: string): void,
    onIsCompleted(id: string, checked: boolean): void,

}

export function Task({ id, title, isCompleted, onDeleteTask, onIsCompleted }: TaskProps) {


    function handleDeleteTask() {
        onDeleteTask(id);
    }

    function handleIsCompleted(event: React.ChangeEvent<HTMLInputElement>) {
        const checked = event.target.checked;
        onIsCompleted(id, checked);
    }



    return (
        <ul className={styles.task}>
            <li>
                <input className={styles.check} type='checkbox' onChange={handleIsCompleted} />

                <p className={isCompleted ? styles.lineThrough : undefined}>{title}</p>

                <button onClick={handleDeleteTask} title='Deletar tarefa' className={styles.trash}>
                    <Trash />
                </button>
            </li>
        </ul>
    );
}