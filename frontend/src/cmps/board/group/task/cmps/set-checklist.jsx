import { useRef, useState } from 'react'
import { BsCheck2Square } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { updateTask } from '../../../../../store/actions/board.actions'
import { TodoAdd } from './checklist/todo-add'

import { TodoList } from './checklist/todo-list'

export function SetChecklist({ task, checklist, group }) {
  const contentRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditOn, setIsEditOn] = useState(false)
  const [editChecklist, onEditChecklist] = useState(checklist)

  function onCloseModal() {
    setIsModalOpen(!isModalOpen)
  }

  function onRemoveTodo(todoId) {
    console.log('todoId', todoId)
    const { todos } = checklist

    const idx = todos.findIndex((todo) => todo.id === todoId)
    // if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${todoId}`)
    todos.splice(idx, 1)

    updateTask(group, task)
  }

  function onDoneTodo(todo) {
    todo.isDone = !todo.isDone
    updateTask(group, task)
    // console.log('updated task isDone', task);
  }

  function getUserProgress() {
    const { todos } = checklist
    if (todos.length) {
      let doneTodos = todos.filter((todo) => todo.isDone === true)
      let toPrecentage = Math.ceil((doneTodos.length / todos.length) * 100)
      return toPrecentage
    }
  }

  function handleChange({ target }) {
    let { value, name: field } = target
    onEditChecklist((prevTitle) => {
      return { ...prevTitle, [field]: value }
    })
  }

  function onChangeTitle(ev) {
    ev.preventDefault()
    // if (contentRef.current.value === '') return
    checklist.title = editChecklist.title
    updateTask(group, task)
    setIsEditOn(!isEditOn)
  }

  function onEditTodo(ev) {
    ev.preventDefault()

    // const { checklists } = task

    // const checklist = checklists.find(checklist => {
    //     const checklistId = checklist.id
    //     if (checklistId === checklist.id) return checklist
    // })

    // const { todos } = checklist

    // const updatedTask = { ...task, ...checklists, ...todos, todo: todoToAdd }
    // console.log('updatedTask', task);
    // updateTask(group, task)
    // inputRef.current.value = ''
  }

  function onRemoveChecklist(checklistId) {
    const { checklists } = task
    const idx = checklists.findIndex(
      (checklist) => checklist.id === checklistId
    )
    // if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${todoId}`)
    checklists.splice(idx, 1)
    updateTask(group, task)
  }

  return (
    <section className="task-details-main-checklist">
      <BsCheck2Square className="task-details-main-checklist-icon" />
      {!isEditOn && (
        <>
          <h3
            ref={contentRef}
            onClick={() => setIsEditOn(!isEditOn)}
            className="task-details-main-checklist-title"
          >
            {checklist.title}
          </h3>
          <button
            className="task-details-main-checklist-remove-btn"
            onClick={() => onRemoveChecklist(checklist.id)}
          >
            Delete
          </button>
        </>
      )}

      {isEditOn && (
        <form
          onSubmit={(ev) => onChangeTitle(ev)}
          className="task-details-main-checklist-title-input"
        >
          <textarea
            name="title"
            id="title"
            cols="30"
            rows="10"
            placeholder={checklist.title}
            value={editChecklist.title}
            onChange={handleChange}
            // ref={inputRef}
            // onBlur={() => onCloseModal()}
            style={{
              overflow: 'hidden',
              overflowWrap: 'break-word',
              height: '56px',
            }}
          ></textarea>

          <div className="todo-btns">
            <button className="todo-btn">Save</button>
            <button
              className="cancel-btn"
              onClick={() => setIsEditOn(!isEditOn)}
            >
              <AiOutlineClose />
            </button>
          </div>
        </form>
      )}

      <span className="task-details-main-checklist-progress-bar-percentage">
        {getUserProgress()}%
      </span>
      <div className="task-details-main-checklist-progress-bar-advancement">
        <div
          className="task-details-main-checklist-progress-bar-advancement-transition"
          style={{
            height: 'inherit',
            width: getUserProgress() + '%',
            background: getUserProgress() === 100 ? '#61bd4f' : '#5ba4cf',
          }}
        ></div>
      </div>

      <TodoList
        todos={checklist.todos}
        onRemoveTodo={onRemoveTodo}
        onDoneTodo={onDoneTodo}
        // onEditTodo={onEditTodo}
      />

      {!isModalOpen && (
        <button
          className="task-details-main-checklist-add-todo-btn"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Add an item
        </button>
      )}

      {isModalOpen && (
        <TodoAdd
          task={task}
          group={group}
          checklist={checklist}
          onCloseModal={onCloseModal}
        />
      )}
    </section>
  )
}
