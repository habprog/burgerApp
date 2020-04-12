import React, { Component } from 'react';
import Aux from '../../hoc//Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControl from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Axios from '../../Axios-Order';
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0,

        },
        totalPrice : 4,
        purchaseable:false,
        purchasing:false,
        loading:false
    }


    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey];
        })
        .reduce((sum,el)=>{
            return sum + el
        },0);
        this.setState({purchaseable: sum > 0});
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceAddittion = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddittion;
        this.setState({totalPrice : newPrice, ingredients:updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice : newPrice, ingredients:updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading:true})
        // alert('you Continue!');
        const headerSet={
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Test': 'testing',
                'Access-Control-Allow-Origin':'*',
                "cors": true
            }
        }
       const order = {
           ingredients: this.state.ingredients,
           price:this.state.totalPrice,
            customer:{
                name:'Habeeb',
                address:{
                    street:'Sobi road',
                    zipCode:'+123',
                    country:'Nigeria'
                },
                email:'afolabi@text.com'

            },
            deliveryMethod:'Fastest'
        }
        Axios.post('/orders.json',order,headerSet
        )
        .then(response => {
            this.setState({loading:false, purchasing:false});
            console.log(response);
        }).catch(error =>{
            this.setState({loading:false, purchasing:false});
            console.log(error);

        } )
    }

    render(){
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}/>;
        if(this.state.loading) {

            orderSummary = <Spinner />;
        }
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed= {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients ={this.state.ingredients}/>
                <BuildControl
                ingredientAdded = {this.addIngredientHandler}
                ingredeintRemoved = {this.removeIngredientHandler}
                disabled={disableInfo}
                purchaseable = {this.state.purchaseable}
                ordered = {this.purchaseHandler}
                price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
