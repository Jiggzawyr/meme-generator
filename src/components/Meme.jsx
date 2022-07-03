import React from "react";
import memesData from "../memesData"


export default function Meme(){

    const [meme, setMeme] = React.useState(
        {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg"
        }
    )

    const [allMemeImages, setAllMemeImages] = React.useState(memesData)

    React.useEffect( () => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json() 
            setAllMemeImages(data)
        } 
        getMemes()
        return () => {

        }
    }, [])

    function getMemeImage(){
        const memesArray = allMemeImages.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme( (prevMeme) => ({
                ...prevMeme, 
                randomImage: url   
        }))
    }

    function hangdleChange(event) {
        const {name, value} = event.target
        setMeme( prevMeme => ({
                ...prevMeme, 
                [name]: value
            })
        )
    }

    return(
        <main>
            <div className="form">
                <input 
                    className="form-input" 
                    type="text" 
                    placeholder="Top text" 
                    name="topText" 
                    onChange={hangdleChange}
                    value={meme.topText} 
                />
                <input 
                    className="form-input" 
                    type="text" 
                    placeholder="Bottom text"
                    name="bottomText" 
                    onChange={hangdleChange}
                    value={meme.bottomText} 
                />
                <button 
                    className="form-button" 
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img className="meme-image" src={meme.randomImage} alt="Meme" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}