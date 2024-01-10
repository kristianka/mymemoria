const InfoPage = () => {
    return (
        <div className="info-page">
            <h1>Info Page</h1>
            <p>
                The documentation folder in the GitHub repository should answer all of your
                questions. If it doesn't, you can open a request from the footer.
            </p>
            <p>This project uses Firebase auth for logging in and saving that data.</p>
            <p>
                This project uses MongoDB hosted by MongoAtlas for saving user's submitted data like
                notes.
            </p>
            <p>You can delete all of your saved info from profile.</p>
            <p>
                This project uses as a base multiple components from Flowbite, Daisy UI, Tailwind UI
                and Preline.{" "}
            </p>
        </div>
    );
};

export default InfoPage;
