import { BlockProps, Selectors, State } from "../../../types";

const selectors: Selectors = {
    getUserInfo(state: State): BlockProps {
        return state as BlockProps;
    }
};

export default selectors;
