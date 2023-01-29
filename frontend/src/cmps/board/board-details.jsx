//TODO: board name
//TODO: board starred
//TODO: board change status visability - SELECT
//TODO: Filter
import { useSelector } from 'react-redux'

import { GroupList } from '../../cmps/board/group/group-list.jsx'
import { removeBoard } from '../../store/actions/board.actions.js'
import { Loader } from '../helpers/loader.jsx'
import { BoardHeader } from './board-header'

export function BoardDetails({ board }) {

  if (!board) return <Loader />
  return (
    <section className="board-details-section">
      <BoardHeader board={board}/>
      <GroupList  board={board} />
    </section>
  )
}
