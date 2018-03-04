import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {authenticate} from '../actions/login';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        let {login, password} = this.state;
        let {isLoginPending, loginSuccess, loginError: loginFailure} = this.props;
        return (
            <form name="loginForm" onSubmit={this.onSubmit}>
                <div className="form-group-collection">
                    <div className="form-group">
                        <label>Login:</label>
                        <input type="text" name="login" onChange={e => this.setState({login: e.target.value})}
                               value={login}/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" name="password" onChange={e => this.setState({password: e.target.value})}
                               value={password}/>
                    </div>
                </div>

                <input type="submit" value="Login"/>

                <div className="message">
                    {isLoginPending && <div>Please wait...</div>}
                    {loginSuccess !== null && <Redirect to="/user"/>}
                    {loginFailure && <div>{loginFailure.message}</div>}
                </div>
            </form>
        )
    }

    onSubmit(e) {
        e.preventDefault();
        let {login, password} = this.state;
        this.props.authenticate(login, password);
        this.setState({
            password: ''
        });
    }
}

const mapStateToProps = (state) => {
    return {
        isLoginPending: state.login.isLoginPending,
        loginSuccess: state.login.loginSuccess,
        loginFailure: state.login.loginFailure
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (email, password) => dispatch(authenticate(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);