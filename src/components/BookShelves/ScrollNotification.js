import React from "react";
import MediaQuery from "react-responsive";

export default class ScrollNotification extends React.Component {
  state = { notify: false };

  componentDidMount() {
    this.initialNotifyOpen = setTimeout(
      () => this.setInitialNotification(2000),
      2000
    );
    this.notifyInterval = setInterval(() => this.setNotifications(2000), 22000);
  }

  componentWillUnmount() {
    clearInterval(this.notifyInterval);
    clearTimeout(this.initialNotifyOpen);
    clearTimeout(this.initialNotifyClose);
    clearTimeout(this.notifyRefresh);
  }

  setInitialNotification = delay => {
    return this.setState(
      { notify: true },
      () =>
        (this.initialNotifyClose = setTimeout(
          () => this.setState({ notify: false }),
          delay
        ))
    );
  };

  setNotifications = delay => {
    return this.setState(
      { notify: true },
      () =>
        (this.notifyRefresh = setTimeout(
          () => this.setState({ notify: false }),
          delay
        ))
    );
  };

  render() {
    const { notify } = this.state;
    return (
      <MediaQuery minWidth={"62.5em"}>
        <aside className="scroll-notification">
          {notify ? (
            <div className="scroll-notification__wrapper">
              <svg className="scroll-notification__svg">
                <use xlinkHref="/images/sprite.svg#icon-chevrons-down" />
              </svg>
              <span className="scroll-notification__text">Can Scroll!</span>
            </div>
          ) : (
            ""
          )}
        </aside>
      </MediaQuery>
    );
  }
}
