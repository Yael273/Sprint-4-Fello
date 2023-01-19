
import { useEffect, useRef } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import { RiUserSharedLine } from "react-icons/ri";
import { loadBoard, updateBoard } from "../../store/actions/board.actions";
import { useSelector } from 'react-redux'


export function BoardHeader() {

    const board = useSelector((storeState) => storeState.boardModule.board)
    const contentRef = useRef(null)

    console.log('board from board header', board);

    useEffect(() => {

    }, [board.isStarred])


    function changeContent(ev) {

        board.title = contentRef.current.innerText

        if (ev.key === 'Enter' && !ev.shiftKey) ev.target.blur()
        if (ev.key === 'Enter' || ev.type === 'blur') {
            ev.preventDefault()
            updateBoard(board)
            contentRef.current.contentEditable = false
        }
        contentRef.current.contentEditable = true
    }

    function onStarredBoard() {
        board.isStarred = !board.isStarred
        updateBoard(board)
        console.log('board from board-header', board);
    }

    return <section className="board-header">
        <div className="title-container btn-color">
            <h1 ref={contentRef} style={{ wordBreak: 'keep-all' }} onKeyDown={(ev) => changeContent(ev)} onBlur={(ev) => changeContent(ev)} contentEditable={true} suppressContentEditableWarning={true}>{board.title}</h1>
            {board.isStarred ? <button onClick={onStarredBoard}><AiFillStar className="starred" /></button> : <button onClick={onStarredBoard}><AiOutlineStar className="star" /></button>}
            {/* { <button onClick={onStarredBoard}>{board.isStarred ? <AiFillStar className="starred"/> : <AiOutlineStar className="star" />}</button>} */}
        </div>

        <div className="btns-container">
            <button><BsFilter /> Filter</button>
            <span className="board-header-btn-divider"></span>
            <div className="members-container">
                {board.members?.map((member, index) => {
                    return <div key={index} className="member-img" style={{ zIndex: index }}>
                        <img src={member.imgUrl} alt="" />
                    </div>
                })}

            </div>

            <button className="share-btn"><RiUserSharedLine /> Share</button>
        </div>

    </section>
}