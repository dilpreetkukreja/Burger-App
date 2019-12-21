import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';
//why we are not setting/registering interceptors in componentDidMount but instead doing it in constructor
/*x  It has to do with the order lifecycle methods resolve.

If you register the Axios interceptors in withErrorHandler's

initialization area,  these interceptors are "good to go"

when the child components finally mount.

The child components (that fetch data) rely on the interceptors

to be ready.
We learned in earlier lectures;  the parent component's

componentDidMount invokes after its child componentDidMount

invokes.   This is the problem.

The interceptors are being set up after the child component

attempts to fetch data. */

const withErrorHandler = (WrappedComponent, axios) => {
    return (class extends React.Component{
            state = {
                error: null
            }
            errorConfirmedHandler = () => {
                this.setState({error:null});
            }
            reqInterceptor = axios.interceptors.request.use(
                req => {
                    this.setState({error: null});
                    return req;
                }
            );
            resInterceptor = axios.interceptors.response.use(
                res => res,
                error => this.setState({error})
            );
            componentWillUnmount () {
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor);
            }
            /*componentDidMount(){
                console.log("[withErrorHandler.js] componentDidMount");
                axios.interceptors.request.use(req => {
                    this.setState({error: null});
                    return req;
                });
                axios.interceptors.response.use(res => res, error => {
                    this.setState({error: error});
                });
            }*/
            render(){
                return (
                    <Aux>
                        <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                            {this.state.error?this.state.error.message:null}
                        </Modal>
                        <WrappedComponent {...this.props}/>
                    </Aux>
                );
            }
        }
    );
}

export default withErrorHandler;