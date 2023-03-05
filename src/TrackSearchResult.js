import React from "react";

export default function TrackSearchResult({track}){
    return (
        <div className = "d-flex m-2 align-items-center">

            <img src = {track.albumUrl} style = {{height: '65px', width : '65px'}}/>

        </div>
    )
}