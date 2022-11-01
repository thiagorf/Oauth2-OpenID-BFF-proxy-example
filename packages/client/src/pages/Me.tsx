export const Me = () => {
    const data = localStorage.getItem("token");

    return (
        <div>
            <h1>Me Page</h1>
            <p>{data}</p>
        </div>
    );
};
