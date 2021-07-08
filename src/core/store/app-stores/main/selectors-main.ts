import { BlockProps, Selectors, State } from "../../../types";

const mainSelectors: Selectors = {
    getUserInfo(state: State): BlockProps {
        return state as BlockProps;
    }
};

export default mainSelectors;
