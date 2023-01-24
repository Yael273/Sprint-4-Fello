//? Libraries
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CgMenuGridR } from 'react-icons/cg';
import { FiChevronDown } from 'react-icons/fi';

//? Routes
import routes from '../../routes'
import { useState } from 'react';
import { BoardAdd } from '../workspace/board-add';

export function AppHeader() {

  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // console.log('isModalOpen', isModalOpen);

  // console.log('board', board);

  function onCloseModal() {
    setIsModalOpen(!isModalOpen)
  }

  const starredBoards = boards.filter((board) => board.isStarred)

  return (
    // <header className="app-header-section full" style={board?.style?.backgroundImg && {background: `url(${board.style.backgroundImg}) center center / cover`} || board?.style?.bgColor && { background: board.style.bgColor }}>
    <header className="app-header-section full" >
      <Link to="/" ><CgMenuGridR className="header-links" /></Link>
      <Link to="/board" className='logo' />
      <nav>
        {routes.map((route) => (
          <NavLink key={route.path} to={route.path}>
            {route.label}
            <FiChevronDown className='down-arrow-nav' />
          </NavLink>
        ))}
      </nav>

      {/* <div className='starred-dropdown'>
        <h3 className='' onClick={() => { setIsModalOpen(!isModalOpen) }}>Starred <FiChevronDown className='down-arrow-nav' /></h3>
        {isModalOpen && starredBoards.map(starredBoard => {
          console.log('starredBoard', starredBoard);
          return <div>
            <div style={starredBoard?.style?.backgroundImg && { background: `url(${board.style.backgroundImg}) center center / cover` } || board?.style?.bgColor && { background: board.style.bgColor }}></div>
            <h3>{starredBoard.title}</h3>
          </div>
        })
        }
      </div> */}

      <div className='create-dropdown'>
        <button onClick={() => { setIsModalOpen(!isModalOpen) }}>Create</button>
        {isModalOpen && <BoardAdd onCloseModal={onCloseModal} />}
      </div>


    </header>
  )
}
