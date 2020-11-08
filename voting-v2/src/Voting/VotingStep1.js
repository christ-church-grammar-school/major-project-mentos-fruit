import React from 'react'
import placeholder from '../Navigation/na.png'
import "./VotingStep1.css"

function VotingStepOne() {
    //testing purposes
    const testCandidates = [
        {name: "Jian Yang", house: "Hill", bio: "Question for you: What is better than Octopus recipe? Answer for you: 8 different ways to make a tradition Chinese recipe.", image: placeholder},
        {name: "Roman", house: "Hill", bio: "I buy a star wars", image: placeholder},
        {name: "Joshua", house: "Wolsey", bio: "I love informatics", image: placeholder},
        {name: "Kenneth", house: "Hill", bio: "The conjoined triangles of success", image: placeholder},
    ]

    testCandidates.sort((a, b) => (a.name > b.name) ? 1 : -1)

    return (
        <div>
            <h1 className="status">Step One: See the candidates.</h1>
            {testCandidates.map((el) => 
            <div className="candidateContainer" key={el.name}>
                <img className="candPic" src={el.image}/>
                <div className="candTextArea">
                    <h1 className="candName">{el.name}</h1>
                    <p className="candBio">{el.house}</p>
                    <p className="candBio">{el.bio}</p>
                </div>
            </div>
            )}
        </div>
    )
}

export default VotingStepOne