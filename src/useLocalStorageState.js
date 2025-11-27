import { useState,useEffect } from "react";

export function useLocalStorageState(initialValue,key){
    let [value,setValue]=useState(()=>{
    const storedValue=localStorage.getItem(key)
    return storedValue?JSON.parse(storedValue):initialValue;
  },[]);

   useEffect(function(){
    localStorage.setItem(key,JSON.stringify(value))
    
  },[value,key])

  return [value,setValue]
}