import React from "react";
import { render } from "react-dom";
import { createStore, combineReducers } from "redux";
import App from "./components/App";
import { Provider } from "react-redux";

const mathReducer = (state = {
    result: 1,
    lastValues: []
}, action) => {
    switch (action.type) {
        case "ADD":
            state = {
                ...state,
                result: state.result + action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            break;
        case "SUBTRACT":
            state = {
                ...state,
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            break;
    }
    return state;
}

const userReducer = (state = {
    name: "Son",
    age: 29
}, action) => {
    switch (action.type) {
        case "SET_NAME":
            state = {
                ...state,
                name: action.payload
            };
            break;
        case "SET_AGE":
            state = {
                ...state,
                age: action.payload
            };
            break;
    }
    return state;
};



const store = createStore(
    combineReducers({ mathReducer: mathReducer, userReducer: userReducer }), {});

const store2 = createStore(userReducer);

store.subscribe(() => {
    console.log("Store updated !", store.getState());
});

store2.subscribe(() => {
    console.log("Store updated !", store2.getState());
});

store2.dispatch({
    type:"SET_NAME",
    payload:"Son2"
});

render(
    <Provider store={store}>
        < App />
    </Provider>
    , window.document.getElementById('app'));