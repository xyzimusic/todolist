export type TopCarsType = {
    manufacturer: string
    model: string
}

type PropsType = {
    topCars: TopCarsType[]
}
const Cars = (props: PropsType) => {
    return (
        <table>
            {props.topCars.map((el:TopCarsType) => {
                return (
                    <tr>
                        <td>{el.manufacturer}</td>
                        <td>{el.model}</td>
                    </tr>
                );
            })}
        </table>
    );
};

export default Cars;