//TODO load all groups

import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

//? Services
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/connection/event-bus.service'
import { boardService } from '../../../services/board/board.service.local'
import { loadBoards } from '../../../store/actions/board.actions'
//? Cmps
import { GroupPreview } from './group-preview.jsx'

export function GroupList({board}) {
  const [groups, setGroups] = useState(null)

  // const boards = useSelector((storeState) => storeState.boardModule.boards)

  useEffect(() => {
    loadGroups()
  }, [])

  async function loadGroups() {
    try {
      // const board = await boardService.get(params.boardId)
      setGroups(board.groups)
      // .push({
      //   id:9999,
      //   title: '',
      //   tasks: [],
      // }))
      
      // setGroups(board.groups.push(boardService.getEmptyGroup()))
      showSuccessMsg('Groups loaded')
    } catch (err) {
      showErrorMsg('Cannot load boards')
    }
  }

  // async function loadBoard(){
  //  try{
  //   boards =
  //  }
  // }

  // async function onRemoveGroup(groupId) {
  //   try {
  //     await removeGroup(groupId)
  //     showSuccessMsg('Group removed')
  //   } catch (err) {
  //     showErrorMsg('Cannot remove group')
  //   }
  // }

  // async function onAddGroup() {
  //   const group = boardService.getEmptyGroup()
  //   group.vendor = prompt('Vendor?')
  //   try {
  //     const savedGroup = await addGroup(group)
  //     showSuccessMsg(`Group added (id: ${savedGroup._id})`)
  //   } catch (err) {
  //     showErrorMsg('Cannot add group')
  //   }
  // }

  // async function onUpdateGroup(group) {
  //   const price = +prompt('New price?')
  //   const groupToSave = { ...group, price }
  //   try {
  //     const savedGroup = await updateGroup(groupToSave)
  //     showSuccessMsg(`Group updated, new price: ${savedGroup.price}`)
  //   } catch (err) {
  //     showErrorMsg('Cannot update group')
  //   }
  // }

  // function onAddGroupMsg(group) {
  //   console.log(`TODO Adding msg to group`)
  // }
  if (!groups) return <p>loading...</p>
  return (
    <section className="group-list-section">
        {groups.map((group) => (
          <article key={group.id} className="group-preview">
            <div className="group-preview-wrapper">
              <GroupPreview group={group} />
              {/* <button onClick={() => { onRemoveGroup(group._id)}}> x </button> */}
              {/* <button onClick={() => { onUpdateGroup(group) }}> Edit </button> */}
            </div>
            {/* <button onClick={() => { onAddGroupMsg(group) }} > Add group msg </button> */}
          </article>
        ))}
      <GroupPreview group={null} />
      {/* <button onClick={onAddGroup}>+ Add another list</button> */}
    </section>
  )
}

function getEmptyGroup() {
  return {
    id:9999,
    title: '',
    tasks: [],
  }
}