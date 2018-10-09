import React from 'react'  
import Storejs from 'storejs'

export default class Store extends React.Component {

    static set(key, str){
        Storejs(key, str);
    } 

    static get(key){
        return Storejs(key);
    } 
 
    static setData(key, data){
        Storejs(key, JSON.stringify(data));
    } 

    static getData(key){
        return JSON.parse(Storejs(key)||{});
    } 

    static remove(key){
        Storejs.remove(key);
    }

}
 