import ProfileDataService from '../../../../modules/profile-data-service/profile-data-service';
import { BlockProps, ChatSidebarProps, Selectors, State, UserInfo } from '../../../types';

const mainSelectors: Selectors = {
    getProfileInfo(state: State): BlockProps {
        return {
            header: ProfileDataService.getHeader(state.userInfo as UserInfo),
            userData: ProfileDataService.configureMainForm(state.userInfo as UserInfo)
        };
    },
    getContacts(state: State): ChatSidebarProps {
        return {
            contacts: state.contacts,
            activeContactId: state.activeContactId
        } as ChatSidebarProps;
    }
};

export default mainSelectors;
