import { useTranslation } from "react-i18next";

interface props {
    disableSearch: boolean;
    setSearch: (search: string) => void;
}

const Search = ({ disableSearch, setSearch }: props) => {
    const { t } = useTranslation();

    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    // so the page doesn't refresh if user presses enter
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <form className="" onSubmit={handleSubmit}>
            <label className="input rounded-lg input-bordered flex items-center gap-2">
                <input
                    onChange={changeValue}
                    type="text"
                    className="w-full"
                    disabled={disableSearch}
                    placeholder={t("search")}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </label>
        </form>
    );
};

export default Search;
