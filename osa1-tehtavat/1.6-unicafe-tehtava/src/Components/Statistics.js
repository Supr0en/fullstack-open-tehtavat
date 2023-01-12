import StatisticLine from './StatisticLine';

const Statistics = ({goodCount, neutralCount, badCount}) => {
    let currentCount = goodCount + neutralCount + badCount;
    let currentAverage = ((currentCount) / 3).toFixed(2);
    let currentPositive = ((goodCount / currentCount) * 100).toFixed(2);
    return (
        <table>
        <h1>Statistics</h1>
            {currentCount > 0 ? (
                <>
                    <tr><StatisticLine text='Good' value={goodCount} /></tr>
                    <tr><StatisticLine text='Neutral' value={neutralCount} /></tr>
                    <tr><StatisticLine text='Bad' value={badCount} /></tr>
                    <tr><StatisticLine text='All' value={currentCount} /></tr>
                    <tr><StatisticLine text='Average' value={currentAverage} /></tr>
                    <tr><StatisticLine text='Positive' value={`${currentPositive} %`} /></tr>
                </>
            ) : 'No feedback given'}
        </table>
    )
}
export default Statistics;