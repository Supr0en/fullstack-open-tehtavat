interface ExersiceTypes {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}


const exersiceCalculator = (exersices: number[], dailyTarget: number) => {
    const exersicedDays = exersices.reduce((total: number, hours: number) => {
        if (hours > 0) total++;
        return total;
    }, 0);
    
    const totalHours = exersices.reduce((total: number, hours: number) => (total += hours), 0);
    const avgHours = totalHours / exersices.length;
    const targetGoalReached = avgHours >= dailyTarget;

    const overallRating = () => {
        let rating = 1;
        let description = '';
        
        if (avgHours >= dailyTarget) {
            rating = 3;
            description = 'Execelent job, keep going';
        }
        if (avgHours == dailyTarget) {
            rating = 2;
            description = 'good';
        }
        if (avgHours <= dailyTarget) {
            rating = 1;
            description = 'not too bad not too bad but could be better';
        }
        return { rating, description };
    };
    
    const {rating, description} = overallRating();

    const results: ExersiceTypes = {
        periodLength: exersices.length,
        trainingDays: exersicedDays,
        success: targetGoalReached,
        rating: rating,
        ratingDescription: description,
        target: dailyTarget,
        average: avgHours
    };
    
    return results;
};

const toNumber = (value: string) => {
    return Number(value);
};
const dailyTarget = Number(process.argv[2]);
const arr = process.argv.slice(3);
const exersices = arr.map(toNumber);
console.log(exersiceCalculator(exersices, dailyTarget));

export default exersiceCalculator;