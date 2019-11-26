/*
 * @Author: zhaoyuyang
 * @Date: 2019-06-04 15:20:48
 * @Last Modified by: zhaoyuyang
 * @Last Modified time: 2019-06-06 15:21:25
 */

import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import classnames from 'classnames';
import styles from './style.less';

export default class Marquee extends PureComponent {
  static defaultProps = {
    step: 1,
    frequency: 20,
    loop: 0,
  }

  state = {
    ModalVisible: false,
  }

  componentDidMount() {
    this.times = 0; // 已完成滚动的次数
    this.wrapWidth = this.wrap.clientWidth;
    this.contentWidth = this.contentDiv.clientWidth;
    // 绑定鼠标事件：移入暂停，移出继续滚动
    this.wrap.onmouseover = this.pause;
    this.wrap.onmouseout = this.start;
    this.wrap.style.opacity = 1;
    setTimeout(() => {
      this.restart();
      // eslint-disable-next-line react/destructuring-assignment
      if (this.props.onStart) {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.onStart();
      }
    }, 1500); // 动画的transition时间是1.5s
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  start = () => {
    if (!this.contentDiv) {
      return;
    }
    clearTimeout(this.timer); // 如果鼠标在该组件未加载的时候就移入，加载后移出，会同时运行两个start函数
    const { step, frequency } = this.props;
    this.translateX -= step;
    this.contentDiv.style.transform = `translateX(${this.translateX}px)`;
    // 判断本次滚动是否到达尽头
    if (Math.abs(this.translateX) <= this.wrapWidth + this.contentWidth) {
      this.timer = setTimeout(this.start, frequency);
    } else {
      this.restart();
    }
  }

  pause = () => {
    clearTimeout(this.timer);
  }

  restart = () => {
    const { loop } = this.props;
    this.translateX = 0; // 重置偏移量
    this.times += 1;
    // 判断是否指定了最大循环次数
    if (loop > 0 && this.times > loop) {
      this.end();
    } else {
      this.start();
    }
  }

  end = () => {
    this.wrap.onmouseover = null;
    this.wrap.onmouseout = null;
    this.contentDiv.style.transform = 'translateX(0)';
    this.wrap.style.opacity = 0;
    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.onEnd) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onEnd();
    }
  }

  render() {
    const { ModalVisible } = this.state;
    const {
      className,
      style,
      content,
      onClick,
    } = this.props;

    return (
      <div
        className={classnames(styles.Marquee, className)}
        style={style}
        onClick={onClick}
        ref={(wrap) => { this.wrap = wrap; }}
      >
        <div
          className="Marquee-content"
          style={{ transform: 'translateX(0)' }}
          dangerouslySetInnerHTML={{ __html: content }}
          ref={(contentDiv) => { this.contentDiv = contentDiv; }}
          onClick={() => { this.setState({ ModalVisible: true }); }}
          title="查看全部"
        />
        <Modal
          visible={ModalVisible}
          centered
          footer={null}
          title="公告"
          onCancel={() => { this.setState({ ModalVisible: false }); }}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Modal>
      </div>
    );
  }
}
