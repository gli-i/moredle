interface timerProps {
    secs:number
}

export default function Timer({ secs } : timerProps) {
    return (
        <div className="flex flex-col items-center md:pt-2 text-lg md:text-3xl lg:text-4xl 2xl:text-5xl font-semibold">
        <h3 className={`
            ${secs > 10 && 'text-greenlight'} ${secs <= 10 && secs > 5 && 'text-yellowmed'} ${secs <= 5 && 'text-red-600'}
        `}>
            {Math.floor(secs/60)}:{(secs%60).toString().padStart(2,'0')}
        </h3>
        <h3 className="hidden md:block text-graydark">
            / 3:00
        </h3>
        </div>
    )
}