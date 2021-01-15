import * as React from "react";
import { useEffect, useState } from "react";

interface ISearchProps {
    onChangeSearchQuery: (searchQuery: string) => void;
}

export default function SearchInput(props: ISearchProps) {
    const [searchQuery, setSearchQuery] = useState<string | undefined>();
    const { onChangeSearchQuery } = props;

    useEffect(() => {
        if (searchQuery !== undefined) {
            onChangeSearchQuery(searchQuery);
        }
    }, [searchQuery, onChangeSearchQuery]);

    return (
        <>
            <label htmlFor="search" className="mt-3">
                Search Markets
                <input
                    id="search"
                    className="form-control full-width"
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
            </label>
        </>
    );
}
