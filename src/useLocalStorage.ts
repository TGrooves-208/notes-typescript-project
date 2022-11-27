import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    // This will take in a generic type, a label and an id
    const [value, setValue] = useState<T>(() => {
        // We want to check to see if any data is stored locally
        // We want to use the initial value to store the data locally
        const jsonValue = localStorage.getItem(key)
        if(jsonValue == null) {
            if(typeof initialValue === "function") {
                // We are casting this initialValue to the generic type
                return (initialValue as () => T)()
            } else {
                return initialValue
            }
        } else {
            return JSON.parse(jsonValue)
        }
    })

    // We will useEffect to save our data locally everytime our value changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    // This array will be the type of T and the setValue for TS to know
    return [value, setValue] as [T, typeof setValue]
}