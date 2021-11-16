import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';


class App extends React.Component {

    //no this.state, the following is equivalent to the constructor method claiming this.state
    state = { lat: null, errorMessage: '' };


    // constructor(props) {
    //     super(props);

    //     //THIS IS THE ONLY TIME WE DO DIRECT ASSIGNMENT TO  this.state
    //     this.state = { lat: null, errorMessage: '' };

    //     // window.navigator.geolocation.getCurrentPosition(
    //     //     position => {
    //     //         // we called setState!!!! to update state
    //     //         this.setState({ lat: position.coords.latitude });

    //     //         //we did not write "this.state.lat = position.coords.latitude"
    //     //     },
    //     //     err => {
    //     //         this.setState({ errorMessage: err.message });
    //     //     }
    //     // );
    // }


    componentDidMount() {
        //move codebloack from constructor to this method.
        window.navigator.geolocation.getCurrentPosition(
            //now clean up the code from earlier
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
            
        );
    }

    // componentDidMount() {
    //     console.log('my computered rendered to screen')
    // }

    // componentDidUpdate() {
    //     console.log('my component just uodated, it rerendered')
    // }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <Spinner />;
    }

    //React says we HAVE to define render!!
    render() {

        return <div className="border red">{this.renderContent()}</div>;

        // if (this.state.errorMessage && !this.state.lat) {
        //     return <div>Error: {this.state.errorMessage}</div>
        // }

        // if (!this.state.errorMessage && this.state.lat) {
        //     return <SeasonDisplay lat={this.state.lat} />
        // }

        // return <Spinner />;

        // we need to conditionally render this stuff
        // return (
        //     <div>
        //         Latitude: {this.state.lat}
        //         <br />
        //         Error: {this.state.errorMessage}
        //      </div>
        // );
    }
}

ReactDOM.render(
    <App />, document.querySelector('#root')
);