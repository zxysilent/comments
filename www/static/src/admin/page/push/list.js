module.exports = {
  path: 'list',
  getComponent(nextState, callback) {
    callback(null, require('../../component/push_list'));
  }
}
