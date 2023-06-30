export enum sseResponseEventEnum {
  error = 'error',
  answer = 'answer',
  chatResponse = 'chatResponse'
}

export enum ChatRoleEnum {
  System = 'System',
  Human = 'Human',
  AI = 'AI'
}

export const ChatRoleMap = {
  [ChatRoleEnum.System]: {
    name: '系统提示词'
  },
  [ChatRoleEnum.Human]: {
    name: '用户'
  },
  [ChatRoleEnum.AI]: {
    name: 'AI'
  }
};

export const HUMAN_ICON = `https://docs.lumverse.com/f/a285a482b12846e7b270/?dl=1`;
export const LOGO_ICON = `https://docs.lumverse.com/f/728df2efe2a948e49ff2/?dl=1`;
