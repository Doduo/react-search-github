import React, { Component } from "react";
import PubSub from "pubsub-js";
import "./index.css";

class List extends Component {
  // 初始化状态，
  state = {
    users: [], // users 初始值为数组
    isFirst: true, // 是否为第一次打开页面
    isLoading: false, // 标识是否处于加载中
    err: "", //存储请求相关的错误信息
  };

  componentDidMount() {
    // _下划线标识个占位，因为必须要传该参数，所以添加个占位
    this.token = PubSub.subscribe("searchData", (_, stateObj) => {
      this.setState(stateObj);
    });
  }

  componentWillUnmount() {
    // 组件卸载时取消订阅
    PubSub.unsubscribe("this.token");
  }

  render() {
    const { users, isFirst, isLoading, err } = this.state;
    return (
      <div className="row">
        {isFirst ? (
          <h2>欢迎使用，输入关键字，随后点击搜索</h2>
        ) : isLoading ? (
          <h2>Loading......</h2>
        ) : err ? (
          <h2 style={{ color: "red" }}>{err}</h2>
        ) : (
          users.map((userObj) => {
            return (
              <div className="card" key={userObj.id}>
                <a
                  rel="noreferrer"
                  href="https://github.com/reactjs"
                  target="_blank"
                >
                  <img
                    alt="avator"
                    src={userObj.avatar_url}
                    style={{ width: "100px" }}
                  />
                </a>
                <p className="card-text">{userObj.login}</p>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default List;
