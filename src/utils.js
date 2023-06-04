function getRandomElement(iterable) {
    const result = iterable.length ? 
        iterable[Math.floor(Math.random()*iterable.length)] :
        ""
    return result 

}

export {getRandomElement}