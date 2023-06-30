import styles from "./List.module.css";

interface ListProps {
    taskCount: number;
    taskDone: number;
}
export function List( {taskCount, taskDone}: ListProps ) {  

    return( 
            <>
                <div className={styles.list}>
                    <div className={styles.inf}>
                        <div className={styles.created}>
                            <p>Tarefas criadas</p>
                            <span>{taskCount}</span>
                        </div>
                        <div className={styles.done}>
                            <p>Concluídas</p>
                            <span>{taskDone} de {taskCount}</span>
                        </div>
                    </div>                     
                </div>
            </>
        );
}