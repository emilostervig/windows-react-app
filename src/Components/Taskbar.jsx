import React from 'react';
import Clock from './Clock';

export default class Taskbar extends React.Component {
    constructor(props) {
        super(props);  
        this.containerRef = React.createRef();    
        this.state = { 
            
        };
    }

    componentDidMount = () => {
    }
    componentWillUnmount = () => {
    }

    

    render() {
        return (
            <div id="taskbar" ref={this.containerRef}>
                

                <div className="inside-taskbar">
                    <img src="assets/images/start-btn.png" alt="Start"/>
                    <Clock/>
                </div>



            </div>
        );
    }
}