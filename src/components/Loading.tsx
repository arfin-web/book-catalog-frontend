const Loading = () => {
    return (
        <>
            <div className="container mx-auto h-screen">
                <div className="grid grid-cols-1 place-items-center">
                    <div className="mt-72 lg:w-60">
                        <span className="loading loading-ring loading-xs text-primary"></span>
                        <span className="loading loading-ring loading-sm text-primary"></span>
                        <span className="loading loading-ring loading-md text-primary"></span>
                        <span className="loading loading-ring loading-lg text-primary"></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loading