interface SDProps {
    score:number;
    topScore:number;
}

export default function ScoreDisplay({ score, topScore }:SDProps){
    return (
        <div className="flex md:gap-3 xl:gap-6 md:flex-col md:pt-2 md:text-xl lg:text-2xl 2xl:text-3xl font-semibold">
            <div className="flex md:flex-col items-center gap-1 lg:gap-2">
                <h3>Current Score: </h3>
                <h3 className="text-red-600">{score}</h3>
            </div>
            <div className="hidden md:flex flex-col items-center lg:gap-2">
                <h3>Top Score: </h3>
                <h3 className="text-greenlight">{topScore}</h3>
            </div>
        </div>
    )
}