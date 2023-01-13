const Total = ({ course }) => {
    const total = course.parts.reduce((prevValue, currValue) => {
        return prevValue + currValue.exercises;
    }, 0)

    return (
        <div>
            <p><strong>Number of exercises {total}</strong></p>
        </div>
    )

}

export default Total;