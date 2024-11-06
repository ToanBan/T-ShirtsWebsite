import React from "react";
import BackgroundImageTitle from "./BackgroundImageTitle";
import PopularShirt from "./PopularTshirts";
import BgImageMovation from "./BackgroundImageMovation";
import SaleShirt from "./SaleShirts";
function ContentArea(){
    return (
        <>
            <BackgroundImageTitle/>
            <PopularShirt/>
            <BgImageMovation/> 
           <SaleShirt/>
        </>
    )
}

export default ContentArea;