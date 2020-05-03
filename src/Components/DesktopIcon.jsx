import React from 'react';


export default class DesktopIcon extends React.Component {
    constructor(props) {
        super(props);  
        this.containerRef = React.createRef();    
        this.state = { 
            isClicked: false
        };
    }
    onOpen = () => {
        this.props.onOpen(this.props.id);
        this.setState({
            isClicked: false
        })
        window.removeEventListener('click', this.clickOutside);
    }
    clickOutside = (evt) => {
        if (this.containerRef.current.contains(evt.target)){
            return false;
        } else{
            // Clicked outside the box
            this.setState({
                isClicked: false
            });
            window.removeEventListener('click', this.clickOutside);
        }
    }
    onClick = () => {
        if(this.state.isClicked === false){
            this.setState({
                isClicked: true
            });
            window.addEventListener('click', this.clickOutside);
        }
    }
    render() {
        let clickedClass = this.state.isClicked ? 'clicked' : '';
        return (
        
            <div className={`desktop-app ${this.props.id} ${clickedClass}`} key={this.props.id} onDoubleClick={this.onOpen} onClick={this.onClick} ref={this.containerRef}>
                <img className="icon" src={`assets/images/icons/${this.props.icon}`} alt={this.props.title}/>
                <div className="title">
                    {this.props.title}
                </div>
            </div>
        );
    }
}