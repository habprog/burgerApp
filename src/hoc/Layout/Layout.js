import React, {Component} from 'react';
import Aux from '../Auxx/Wraper';
import Classess from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer:false
    }

    SideDrawerCloseHandler = () =>{
        this.setState({showSideDrawer:false});
    }

    sideDrawerToogleHandler = () => {
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render(){
        return (
            <Aux>
                <SideDrawer open={this.state.showSideDrawer}  closed={this.SideDrawerCloseHandler}/>
                <Toolbar  drawerToogleClicked = {this.sideDrawerToogleHandler} />
                <main className={Classess.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
