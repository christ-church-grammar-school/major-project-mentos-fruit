import React from "react"
import "./map.css"

class Map extends React.Component {
    render() {
        return (
            <>
            <div>
                <img src="/map.png" className="map" />
                {/* <iframe src="https://www.ccgs.wa.edu.au/interactive-map" className="map" src=""/> */}
            </div>
            </>
        )
    }
}

export default Map