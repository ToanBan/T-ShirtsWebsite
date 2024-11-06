import React from "react";

export default function BtnGroup({count, Increment, Descrement}){
    return(
        <>
            <div className="btn-group mt-4 mb-4">
                <button onClick={Descrement} className="btn btn-light border" type="button">-</button>
                <button className="btn btn-light border" type="button">{count}</button>
                <button onClick={Increment} className="btn btn-light border" type="button">+</button>
            </div>
        </>
    )
}
