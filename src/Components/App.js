import React from 'react';
import logo from '../logo.svg';
import Window from './Window';
import Desktop from './Desktop';
import Taskbar from './Taskbar';
import '../App.scss';


import applications from '../Store/Applications';

const defaultActive = applications.filter(el => {
    return el.defaultActive
})
class App extends React.Component {
    constructor(props) {
        super(props);    
        this.state = { 
            isOn: true,
            applications: applications,
            activeWindows: defaultActive,
            minimizedWindows: [],
            background: "#3a6ea5"
        };
    }

    isWindowActive = (window) => {
        return this.state.applications.find((el) => {
            return el.id === window && el.isActive === true;
        });
    }

    isWindowMinimized = (window) => {
        return this.state.applications.find((el) => {
            return el.id === window && el.minimized === true;
        });
    }

    isWindowMaximized = (window) => {
        return this.state.applications.find((el) => {
            return el.id === window && el.minimized === false;
        });
    }

    openWindow = (window) => {
        console.log('trying to open')
        let windows = [...this.state.applications];

        for (let i = 0; i < windows.length; i++) {
            const element = windows[i];
            if(element.id === window){
                windows[i].isActive = true;
                windows[i].isMinimized = false;
                this.setState({
                    applications: windows
                });
                return;
            }
        }
    }
    closeWindow = (window) => {
        let defaultApp = applications.find(el => el.id === window);
        if(!defaultApp) {
            // app not found, abort
            return;
        };
        defaultApp.isActive = false;
        let windows = [...this.state.applications];
        for (let i = 0; i < windows.length; i++) {
            const element = windows[i];
            if(element.id === window){
                windows[i] = defaultApp;
                this.setState({
                    applications: windows
                });
                return;
            }
        }
    }
   
    render() {
        let activeApplications = this.state.applications.filter(el => {
            return el.isActive === true;
        });
        let comp = this;
        return ( 

            <div className="App">

                <Desktop
                    applications={applications}
                    onOpen={this.openWindow}
                    background={this.state.background}
                />
                <Taskbar></Taskbar>
                {activeApplications.map( (application) => {
                    return(
                        <Window key={`window-${application.id}`}
                            {...application}
                            onClose={comp.closeWindow} 
                        >
                        </Window>
                        
                    )
                })}
                
            </div>
        );
    }

}

export default App;
