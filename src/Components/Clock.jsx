import React from 'react';


export default class Clock extends React.Component {
    constructor(props) {
        super(props);  
        this.containerRef = React.createRef();    
        this.interval = null;
        this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.state = { 
            date:{
                month: null,
                day: null,
                hour: null,
                minutes: null,
                seconds: null,
            }
        };
    }

    componentDidMount = () => {
        this.updateTime();
        this.interval = setInterval(this.updateTime, 1000);
    }
    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    updateTime = () => {
        let now = new Date();
        this.setState({
            date:{
                month: this.months[now.getMonth()],
                day: now.getDate(),
                hour: now.getHours(),
                minutes: now.getMinutes(),
                seconds: now.getSeconds()
            }
        })
    }
    
    formatDate = () => {
        return `${this.state.date.day}. ${this.state.date.month}`
    }
    formatTime = () => {
        let hour = (this.state.date.hour<10?'0':'') + this.state.date.hour;
        let minutes = (this.state.date.minutes<10?'0':'') + this.state.date.minutes;
        let seconds = (this.state.date.seconds<10?'0':'') + this.state.date.seconds;
        return `${hour}:${minutes}:${seconds}`;
    }

    render() {
        return (
            <div className="taskbar-clock" ref={this.containerRef}>
                <div className="date">{this.formatDate()}</div>
                <div className="time">{this.formatTime()}</div>
            </div>
        );
    }
}