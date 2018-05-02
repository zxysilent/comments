import Reflux from 'reflux';
import superagent from 'superagent';

import firekylin from '../../common/util/firekylin';

import OptionsAction from '../action/options';

export default Reflux.createStore({

  listenables: OptionsAction,
  /**
   * save user
   * @param  {Object} data []
   * @return {Promise}      []
   */
  onSave(data) {
    let req = superagent.post('/admin/api/options?method=put');
    req.type('form').send(data);
    return firekylin.request(req).then(data => {
      this.trigger(data, 'saveOptionsSuccess');
    }).catch(err => {
      this.trigger(err, 'saveOptionsFail');
    })
  },
  onAuth(data) {
    let req = superagent.post('/admin/api/options?type=2faAuth');
    req.type('form').send(data);
    return firekylin.request(req).then(data => {
      this.trigger(data, 'Auth2FASuccess');
    }).catch(err => {
      this.trigger(err, 'Auth2FAFail');
    })
  },
  onQrcode() {
    let req = superagent.get('/admin/api/options?type=2fa');
    return firekylin.request(req).then(data => {
      this.trigger(data, 'getQrcodeSuccess');
    }).catch(err => {
      this.trigger(err, 'getQrcodeFail');
    })
  },
  onComment(data) {
    let req = superagent.post('/admin/api/options?method=put');
    req.type('form').send({'comment': JSON.stringify(data)});
    return firekylin.request(req).then(data => {
      this.trigger(data, 'saveCommentSuccess');
    }).catch(err => {
      this.trigger(err, 'saveCommentFail');
    });
  },
  onUpload(data) {
    let req = superagent.post('/admin/api/options?method=put');
    req.type('form').send({'upload': JSON.stringify(data)});
    return firekylin.request(req).then(data => {
      this.trigger(data, 'saveUploadSuccess');
    }).catch(err => {
      this.trigger(err, 'saveUploadFail');
    });
  },
  onNavigation(data) {
    let req = superagent.post('/admin/api/options?method=put');
    req.type('form').send({'navigation': JSON.stringify(data)});
    return firekylin.request(req).then(
      data => this.trigger(data, 'saveNavigationSuccess'),
      err => this.trigger(err, 'saveNavigationFailed')
    );
  },
  onDefaultCategory(id) {
    let url = '/admin/api/options?type=defaultCategory', req;
    if(id) {
      url += '&method=put';
      req = superagent.post(url).type('form').send({id});
      return firekylin.request(req)
        .then(data => this.trigger(data, 'saveDefaultCategorySuccess'))
        .catch(err => this.trigger(err, 'saveDefaultCategoryFailed'));
    } else {
      req = superagent.get(url);
      return firekylin.request(req)
        .then(data => this.trigger(data, 'getDefaultCategorySuccess'))
        .catch(err => this.trigger(err, 'getDefaultCategoryFailed'));
    }
  }
})
