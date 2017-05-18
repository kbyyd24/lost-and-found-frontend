import User from './model/User'

let user = new User();

let lostItems = [];

let lostItemPage = {
  state: {msg: null, state: 0},
  page: 1,
  listSize: 8,
  sort: 'createTime',
  lostItems
};

export default {user, lostItemPage}