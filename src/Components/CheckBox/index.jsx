function CheckBox({ checkIcon, unCheckIcon, value, action }) {
    return (
        <div
            onClick={action}
            className={`cursor-pointer ${
                value && "bg-gray-300"
            }  w-[2rem] h-[2rem] rounded text-[1rem] flex justify-center items-center`}
        >
            {unCheckIcon ? (
                value ? (
                    <i className={`${checkIcon} `} />
                ) : (
                    <i className={`${unCheckIcon}`} />
                )
            ) : (
                <i className={`${checkIcon} `} />
            )}
        </div>
    );
}

export default CheckBox;
