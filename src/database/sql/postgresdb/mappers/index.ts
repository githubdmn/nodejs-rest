import mapSaveLoginResponse from './old/saveLoginResponse.mapper';
import mapCreateTodoListResponse from './old/createTodoListResponse';
import mapGetUsersListResponse from './old/getUsersListsResponse';
import mapGetUsersListItemsResponse from './old/getUsersListWithItems.mapper';
import mapGetUserListResponse from './old/getUsersList.mapper';
import mapDeleteTodoListResponse from './old/deleteTodoListResponse';
import mapItem from './old/createItem.mapper';

import {
  mapUserRegisterToEntities,
  mapAdminRegisterToEntities,
} from './authRegisterReq.mapper';
import {
  mapRegisterResultToUserResponse,
  mapRegisterResultToAdminResponse,
} from './authRegisterRes.mapper';

export {
  mapSaveLoginResponse,
  mapCreateTodoListResponse,
  mapGetUsersListResponse,
  mapGetUsersListItemsResponse,
  mapGetUserListResponse,
  mapDeleteTodoListResponse,
  mapItem,
  mapUserRegisterToEntities,
  mapAdminRegisterToEntities,
  mapRegisterResultToUserResponse,
  mapRegisterResultToAdminResponse,
};
