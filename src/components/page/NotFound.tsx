import React from 'react';
import img from '../../styles/imgs/404.png';

class NotFound extends React.Component {
    state = {
        animated: '',
    };
    enter = () => {
        this.setState({ animated: 'hinge' });
    };
    render() {
        return (
            <div
                className="center"
                style={{
                    height: '100vh',
                    background: '#ececec',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={img}
                    alt="404"
                    className={`animated swing ${this.state.animated}`}
                    onMouseEnter={this.enter}
                />
            </div>
        );
    }
}

export default NotFound;
