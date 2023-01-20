const Notification = ({ notification }) => {
    if (!notification) return;
    return <div className={notification.type}>{notification.message}</div>;
}

export default Notification;