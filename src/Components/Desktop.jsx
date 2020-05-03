import React from 'react';
import DesktopIcon from './DesktopIcon';


export default class Desktop extends React.Component {
    constructor(props) {
        super(props);    
        this.state = { 
            background: this.props.background
        };
    }
    onOpen = (window) => {
        this.props.onOpen(window);
    }
    render() {
        return (
        
            <div id="desktop" style={{background: this.state.background}}>

                {this.props.applications.map(el => {
                    return (
                        <DesktopIcon 
                            onOpen={this.onOpen}
                            id={el.id}
                            icon={el.icon}
                            title={el.title}
                            key={`desktop-icon-${el.id}`}
                        />
                    )
                })}

            </div>
        );
    }
}