import { useEffect, useState } from 'react'
import Chance from 'chance'


// another custom hook that I didn't spend the time to get working
// but an easier way to see how the link generator works

const  useRandoLinkGenny = () =>  {
    const chance = new Chance()
    const [string, setString] = useState("")
    function handleGenerate(){
        setString(makeRandomStr())
    }

    useEffect(() => {
        setString(makeRandomStr())
    }, [])
    //generators to choose from
    const generators = [
        chance.syllable(),
        chance.animal(),
        chance.city(),
        chance.coin(),
        chance.word(),
        chance.cc_type(),
        chance.weekday(),
        chance.company(),
        chance.suffix()
    ]

    // console.log(randomNumber())
    function makeRandomStr(){
        const randomNumber = () => { return Math.floor(Math.random() * generators.length)}
        // hold our randomness in this array
        const randomStrArr = []
        for (let i = 0; i < 4; i++  ){
            randomStrArr[i] = generators[randomNumber()]
        }
        // smash strings together, remove characters and spaces, limit to 20, and return it
        return randomStrArr.join("").replace(/\s/g, '').replace(/[^a-z0-9]/gi, '').substring(0, 20);
        

    }
    return {string}

}

export default useRandoLinkGenny