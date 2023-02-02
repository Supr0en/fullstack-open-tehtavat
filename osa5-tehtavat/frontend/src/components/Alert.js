const Alert = ({ alert }) => {
    return <div className={alert.type}>{alert.message}</div>
}

export default Alert;