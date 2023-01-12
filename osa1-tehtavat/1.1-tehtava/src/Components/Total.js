const Total = ({ course }) => {
    return (
        <div>
            <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
        </div>
    )

}

export default Total;