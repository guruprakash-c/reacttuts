import React from 'react'

function BrandLogo({ brandLogo, widthVal, heightVal, altText, titleText }) {   
    return(
        <a href='/' aria-label='Movieraves Home page'>
            <img src={brandLogo} alt={altText} width={widthVal} height={heightVal} title={titleText} />
        </a>
    )
}

export default BrandLogo
