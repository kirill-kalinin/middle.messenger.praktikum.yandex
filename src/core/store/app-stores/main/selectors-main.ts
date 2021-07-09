import ProfileDataService from '../../../../modules/profile-data-service/profile-data-service';
import { BlockProps, Selectors, State, UserInfo } from '../../../types';

const mainSelectors: Selectors = {
    getProfileInfo(state: State): BlockProps {
        return {
            header: ProfileDataService.getHeader(state.userInfo as UserInfo),
            userData: ProfileDataService.configureMainForm(state.userInfo as UserInfo)
        };
    }
};

export default mainSelectors;
