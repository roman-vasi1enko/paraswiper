function Alert(type) {

    let alertType = `alert alert-${type.type} shadow-lg w-2/4 mx-auto mt-8`
    if (!type) {
        alertType = 'alert shadow-lg';
    }

    return (
        <>
            <div className={alertType}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Wohoo! No spam found!</span>
                </div>
            </div>
        </>
    )
}

export default Alert;