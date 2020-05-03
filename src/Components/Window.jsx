import React from 'react';
import {debounce} from '../Helpers/Helpers'

export default class Window extends React.Component {
    constructor(props) {
        super(props);
        this.windowRef = React.createRef();    
        this.state = { 
           isFullscreen: false,
           isDragging: false,
           isMinimized: this.props.isMinimized,
           dragStart: {
               x: 0,
               y: 0,
           },
           startPos: {
               x: 0,
               y: 0,
           },
           pos: {
               x: 0,
               y: 0,
           },
           oldPos: {
               x: 0,
               y: 0,
           },
        };
        this.debounceDrag = debounce(this.onWindowDrag, 5, true);
    }
    componentDidMount = () => {
        let x = (window.innerWidth / 2) - (700 / 2);
        this.setState({
            pos: {
                x: x,
                y: 200
            }
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        console.log(prevState, snapshot)
        if(prevState.isMinimized === true && this.props.isActive === true){
            this.setState({
                isMinimized: false
            })
        }
    }
    joinClasses = () => {
        let classes = ["window", this.props.id];
        
        classes.push(this.state.isFullscreen ? 'isfullscreen' : '');
        classes.push(this.state.isMinimized ? 'minimized' : '');
        classes.push(this.state.isDragging ? 'dragging' : '');


        return classes.join(' ');
    }

    close = () => {
        this.props.onClose(this.props.id);
    }

    minimize = () => {
        this.setState({
            isMinimized: true,
        })
    }
    toggleFullscreen = () => {
        if(this.state.isFullscreen === true){
            this.setState({
                isFullscreen: false,
                pos: this.state.oldPos
            })
        } else{
            let oldPos = this.state.pos;
            this.setState({
                isFullscreen: true,
                oldPos: oldPos,
                pos: {
                    x: 0,
                    y: 0
                }
            })
        }

        
    }
    getImagePath = () => {
        let path = process.env.NODE_ENV == 'development' ? '' : '' ;
        return path+"/assets/images/icons/"+this.props.icon;
    }
    fullscreenBtn = () => {
        let btn;
        if(this.state.isFullscreen){
            btn = (<div className="maximize isfullscreen bar-btn" onClick={this.toggleFullscreen}>{"[]"}</div>)
        } else{
            btn = (<div className="maximize bar-btn" onClick={this.toggleFullscreen}>{"[]"}</div>)
        }
        return btn;
    }
    disableSelect = (evt) => {
        evt.preventDefault();
    }
    onDragStart = (evt) => {
        document.addEventListener('mousemove', this.onWindowDrag);
        document.addEventListener('mouseup', this.onDragEnd);
        window.addEventListener('selectstart', this.disableSelect);
        if (evt.button !== 0) return
        var pos = this.windowRef.current.getBoundingClientRect();
        this.setState({
            isDragging: true,
            dragStart: {
                x: evt.pageX,
                y: evt.pageY
            },
            startPos: {
                x: this.state.pos.x,
                y: this.state.pos.y
            }
            
        })
    }
    onDragEnd = (evt) => {
        document.removeEventListener('mousemove', this.onWindowDrag);
        document.removeEventListener('mouseup', this.onDragEnd);
        window.removeEventListener('selectstart', this.disableSelect);
        this.setState({
            isDragging: false
        })
    }
    onWindowDrag = (evt) => {
        this.setState({
            pos: {
                x: this.state.startPos.x + (evt.pageX - this.state.dragStart.x),
                y: this.state.startPos.y + (evt.pageY - this.state.dragStart.y),
            }
        })
    }

    getWindowStyle = () => {
        
        return { 
            left: this.state.pos.x + 'px',
            top: this.state.pos.y + 'px'
        }
    }
    render() {
        return (

            <React.Fragment>
                <div className={this.joinClasses()}  ref={this.windowRef} style={this.getWindowStyle()}>
                    <div className="window-bar" onMouseDown={this.onDragStart}>
                        <img className="bar-icon" src={this.getImagePath()} alt={this.props.title}/>
                        <div className="bar-name">
                            {this.props.title}
                        </div>
                        <div className="bar-controls">
                            <div className="minimize bar-btn" onClick={this.minimize}>-</div>
                            {this.fullscreenBtn()}
                            <div className="close bar-btn" onClick={this.close}>x</div>
                        </div>
                    </div>
                    {this.props.children}
                </div>
            </React.Fragment>

        )
    }
}