export default function Banner({ title, sub }){
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-muted-foreground text-sm">
                    {sub}
                </p>
            </div>
        </div>
    )
}