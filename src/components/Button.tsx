import React from 'react';

type PropsType = {
    title:string
    callback:()=>void
}

const Button = (props:PropsType) => {
    const onclickHandler = ()=>{
        props.callback()
    }
    return (
        <button onClick={onclickHandler}>
            {props.title}
        </button>
    );
};

export default Button;