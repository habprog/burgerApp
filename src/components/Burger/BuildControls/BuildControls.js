import React from 'react';
import Classes from  './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
];

const buildControls = (props) =>(

   

    <div className={Classes.BuildControls}>
        <p>Current price = <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(
            <BuildControl
             key={ctrl.label} 
             label={ctrl.label}
             added={() => props.ingredientAdded(ctrl.type)}
             removed={() => props.ingredeintRemoved(ctrl.type)}
             disabled={props.disabled[ctrl.type]}
              />
        ))}
        <button 
            className={Classes.OrderButton}
            onClick={props.ordered}
            disabled={!props.purchaseable}
            >ORDER NOW</button>
        
    </div>
);

export default buildControls;