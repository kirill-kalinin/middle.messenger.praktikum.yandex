import { BlockProps } from '../../../core/types';

export const popupAddSelectorPreset: BlockProps = {
    typeIsSelect: true,
    isCloseable: true,
    title: 'Добавить',
    description: 'Создать новый чат или добавить участника в активный чат?',
    buttonText: 'Чат',
    buttonSecondaryText: 'Участник'
};

export const popupRemoveSelectorPreset: BlockProps = {
    typeIsSelect: true,
    isCloseable: true,
    title: 'Удалить',
    description: 'Выбрать чат для удаления или удалить участника из активного чата?',
    buttonText: 'Чат',
    buttonSecondaryText: 'Участник'
};

export const popupAddChatPreset: BlockProps = {
    typeIsInput: true,
    isCloseable: true,
    title: 'Добавить чат',
    label: 'Название нового чата',
    placeholder: 'От 3 до 20 букв или цифр',
    validator: '^[a-zA-Zа-яёА-ЯЁ0-9 ]{3,20}$',
    buttonText: 'Добавить'
};

export const popupPromptChatPreset: BlockProps = {
    typeIsWarning: true,
    isCloseable: false,
    title: 'Удаление чата',
    warningMessage: 'Теперь кликните на чат из списка',
    buttonText: 'Понятно'
};

export const popupRemoveChatPreset: BlockProps = {
    typeIsConfirm: true,
    isCloseable: true,
    title: 'Удалить чат',
    description: 'Подтвердите удаление чата',
    buttonText: 'Удалить'
};

export const popupWarningChatPreset: BlockProps = {
    typeIsWarning: true,
    isCloseable: false,
    title: 'Ошибка',
    warningMessage: 'Нужно указать на один из чатов в списке',
    buttonText: 'Понятно'
};

export const popupAddUserPreset: BlockProps = {
    typeIsInput: true,
    isCloseable: true,
    title: 'Добавить в чат',
    label: 'Логин добавляемого участника',
    placeholder: 'Введите логин',
    validator: '^[a-zA-Z][a-zA-Z0-9]{4,20}$',
    buttonText: 'Добавить'
};

export const popupRemoveUserPreset: BlockProps = {
    typeIsInput: true,
    isCloseable: true,
    title: 'Удалить из чата',
    label: 'Логин удаляемого участника',
    placeholder: 'Введите логин',
    validator: '^[a-zA-Z][a-zA-Z0-9]{4,20}$',
    buttonText: 'Удалить'
};

export const popupUsersListPreset: BlockProps = {
    typeIsList: true,
    isCloseable: true,
    title: 'Участники чата',
    list: [],
    buttonText: 'Закрыть'
};
