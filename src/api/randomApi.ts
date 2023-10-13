import { RANDOM_FACT_URL } from "shared/constants";

export const fetchRandomFact = async () => {
    return fetch(RANDOM_FACT_URL)
        .then((response) => response.json())
        .then((result) => result.text)
        .catch((error) => console.log("error", error));
};
