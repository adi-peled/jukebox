import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './BoxPlayList.scss'
import SongPreview from '../SongPreview/SongPreview'
function BoxPlayList({box, playSong, deleteSong, reorder}) {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)
  
    useEffect(() => {
        window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
        if (screenWidth < 850) {
            setIsMobile(true)
        }
        return () => {
            window.removeEventListener('resize', () => setScreenWidth(window.innerWidth))
        }
    }, [])
   
    function onDragEnd(e){
        const startPoint = e.source.index
        const endPoint = e.destination
        if(!endPoint) return
        reorder(box.playList, startPoint, endPoint)
    }
    return (
    <DragDropContext
                onDragEnd={(e)=>onDragEnd(e)}
            >
        <Droppable droppableId={'songPick'}>
        {(provided) => (
                <ul 
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="playlist">
                {provided.placeholder}
                {box&& box.playList.map((song, idx)=>{
                    return(
                            <Draggable
                            key={song.id}
                            draggableId={song.videoId} 
                            index={idx}
                            isDragDisabled={isMobile}
                            >
                                {provided =>(
                                <li 
                                key={idx}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                    <SongPreview  idx={idx} song={song} playSong={playSong} deleteSong={deleteSong} />
                                </li>
                                )}
                    </Draggable>
                    )
                })}
            </ul>)
            }
        </Droppable>
    </DragDropContext >

    )
}

export default BoxPlayList
