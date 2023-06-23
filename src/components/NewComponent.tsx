import React from 'react';
type MoneyType = {
    banknots: string,
    value: number,
    number: string,
    filterHandler:(name: FilterType)=>{}
}
type FilterType = 'All' | 'RUBLS' | 'Dollars'
const NewComponent = (props:any) => {
    return (
        <div>
            <ul>
                {props.money.map((objFromMoney:MoneyType, index:number) => {
                    return (
                        <li key={index}>
                            <span>{objFromMoney.banknots}</span>
                            <span>{objFromMoney.value}</span>
                            <span>{objFromMoney.number}</span>
                        </li>
                    )
                })}
            </ul>
            <div style={{marginLeft: '35px', backgroundColor: "red"}}>
                <button onClick={() => props.filterHandler('All')}>all</button>
                <button onClick={() => props.filterHandler('RUBLS')}>rubles</button>
                <button onClick={() => props.filterHandler('Dollars')}>dollar</button>
            </div>
        </div>
    );
};

export default NewComponent;