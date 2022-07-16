import React from 'react';
import {Link} from 'react-router-dom';


export default function LandingPage(){
    return(
        <div className='intro'>
            <h1>API FOOD</h1>
            <img src="https://x3jme3vmctf3dmlkql5tzx17-wpengine.netdna-ssl.com/wp-content/uploads/2020/12/alimentacion-saludable.gif" alt="" />
            <div>
                <Link to ='/home'>
                    <button className='boton'>HOME</button>
                </Link>
            </div>
        </div>
    )
}