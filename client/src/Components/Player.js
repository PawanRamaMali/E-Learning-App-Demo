import React from 'react'
import ReactPlayer from 'react-player/youtube'
import { useDispatch, useSelector } from 'react-redux'
import "../App.css"


export default function Player() {
    const [url] = useSelector((gState) =>[
      gState.url
    ])


    return (

    <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          url={url}
          width='100%'
          height='100%'
          controls= {true}
        />
    </div>
    )
}
