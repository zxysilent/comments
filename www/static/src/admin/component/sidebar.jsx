import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import Base from 'base';

module.exports = class extends Base {
  state = {
    routes: [
      {url: '/dashboard', icon: 'home', title:'概述'},
      {url: '/post', icon: 'topic', title: '文章管理', children: [
        {url: '/post/list', title: '文章列表'},
        {url: '/post/create', title: '添加文章'}
      ]},
      {url: '/page', icon: 'reply', title: '页面管理', type: 1, children: [
        {url: '/page/list', title: '页面列表'},
        {url: '/page/create', title: '添加页面'}
      ]},
      {url: '/cate', icon: 'report', title: '分类管理', type: 1, children: [
        {url: '/cate/list', title: '分类列表'},
        {url: '/cate/create', title: '添加分类'}
      ]},
      {url: '/tag', icon: 'report', title: '标签管理', type: 1, children: [
        {url: '/tag/list', title: '标签列表'},
        {url: '/tag/create', title: '添加标签'}
      ]},
      {url: '/user', icon: 'user', title: '用户管理', type: 1, children: [
        {url: '/user/list', title: '用户列表'},
        {url: '/user/create', title: '添加用户'},
         {url: '/user/edit_pwd', title: '修改密码'},
      ]},
      {url: '/push', icon: 'share-v', title: '推送管理', type: 1, children: [
        {url: '/push/list', title: '推送列表'},
        {url: '/push/create', title: '新增推送'}
      ]},
      {url: '/appearance', icon: 'list', title: '外观设置', type: 1, children: [
        {url: '/appearance/theme', title: '主题管理'},
        {url: '/appearance/navigation', title: '菜单管理'},
        {url: '/appearance/edit', title: '编辑主题'}
      ]},
      {url: '/options', icon: 'setting', title: '系统设置', type: 1, children: [
        {url: '/options/general', title: '基本设置'},
        {url: '/options/reading', title: '阅读设置'},
        {url: '/options/two_factor_auth', title: '两步验证'},
        {url: '/options/comment', title: '评论设置'},
        {url: '/options/upload', title: '上传设置'},
        {url: '/options/analytic', title: '统计代码'},
        {url: '/options/push', title: '推送设置'},
        {url: '/options/import', title: '导入数据'}
      ]}
    ]
  };
  /**
   * 是否是高亮状态
   * @param  {[type]}  routeUrl [description]
   * @return {Boolean}          [description]
   */
  isActive(routeUrl) {
    return this.context.router.isActive(routeUrl);
  }
  getClassName(icon, routeUrl) {
    let active = this.isActive(routeUrl);
    return classnames({
      icon: true,
      [`icon-${icon}`]: true,
      active: active
    })
  }
  // getSubUlClassName(routeUrl){
  //   if(this.isActive(routeUrl)){
  //     return 'block';
  //   }
  //   return 'hide';
  // }
  getSubLinkClassName(routeUrl) {
    return classnames({
      active: this.isActive(routeUrl)
    })
  }
  open(routeUrl) {
    this.context.router.push(routeUrl);
  }
  render() {
    let routes = this.state.routes;
    let userType = window.SysConfig.userInfo.type | 0;
    routes = routes.filter(item => {
      if(!item.type) {
        return true;
      }
      if(userType <= item.type) {
        return true;
      }
    });
    return (
      <div className="fk-side ps-container" id="fk-side">
        <div className="mod">
          <div className="mod-logo">
            <h1><a href="/">{window.SysConfig.options.title}</a></h1>
          </div>
        </div>
        <ul className="mod-bar" style={{marginTop: 10}}>
          <input type="hidden" id="hide_values" val="0" />
          {routes.map((route, i) =>
            <li key={i}>
              {route.children ?
              <a onClick={this.open.bind(this, route.children && route.children[0].url || route.url)}
                className={this.getClassName(route.icon, route.url)}><span>{route.title}</span></a>
              :
              <Link to={route.url} onClick={this.open.bind(this, route.children && route.children[0].url || route.url)}
                className={this.getClassName(route.icon, route.url)}>
                <span>{route.title}</span>
              </Link>
              }
              {route.children ?
                <ul style={{height: 49*(this.isActive(route.url) ? route.children.length : 0)}}>
                  {route.children.map((child, j) =>
                    <li key={j}>
                      <Link to={child.url} onClick={this.open.bind(this, child.url)}
                        className={this.getSubLinkClassName(child.url)}>
                        <span>{child.title}</span>
                      </Link>
                    </li>
                  )}
                </ul>
              : null}
            </li>
          )}
        </ul>
      </div>
    );
  }
}
