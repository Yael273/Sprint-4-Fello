//? Icon
import { AiOutlineEye } from 'react-icons/ai'
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs'

export function SetTitle({ onUpdateTask, type, group, task, mode }) {
  function onUpdateTitle({ value }) {
    onUpdateTask('title', value)
  }
  switch (type) {
    //* Task Preview
    case 'preview':
      return (
        <article className="task-preview-title">
          {mode!=='quick-edit' &&<p>{task.title}</p>}
          {mode==='quick-edit'&& 
        <input className='task-preview-quick-edit-title' type="text-area" value={task.title}/>
        }
        </article>
      )
      break

    default:
      //* Task Details
      return (
        <article
          className="task-details-title"
          onClick={(ev) => ev.stopPropagation()}
        >
          <BsReverseLayoutTextWindowReverse className="task-details-title-icon" />
          <textarea
            className="task-details-title-input"
            type="text"
            name="task-title"
            id="task-title"
            placeholder="Enter a name for the task.."
            onKeyDown={(ev) =>
              ev.key === 'Enter' ? onUpdateTitle(ev.target) : ev
            }
            defaultValue={task.title}
            // onChange={onUpdateTask}
          />

          <div className="task-details-title-description">
            <h2 className="task-details-title-description-title">
              In the list
            </h2>
            <a
              className="task-details-title-description-link"
              title={group.title}
              href="#"
            >
              {' ' + group.title}
            </a>
            {task.priority === 'high' && (
              <AiOutlineEye
                title="You are receiving notifications for updates on this card"
                className="task-details-title-description-icon"
              />
            )}
          </div>
        </article>
      )
      break
  }
}
