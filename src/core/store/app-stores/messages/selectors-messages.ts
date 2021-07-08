import { BlockProps, Selectors, State } from "../../../types";

const messagesSelectors: Selectors = {
    getUserInfo(state: State): BlockProps {
        return state as BlockProps;
    }
};

export default messagesSelectors;
