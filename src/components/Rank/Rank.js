import React from "react";
import "./Rank.css";


const Rank =({name,entries}) => {
    return(
        <div>
            <div className="container" >
                {`${name}, you are entry count is ...`}
        </div>
        <div className="rank-position">
            {`# ${entries}`}
        </div>
        </div>

    )
}

export default Rank;