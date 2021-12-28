import React from "react";
import Model from "../../components/UI/Model/Model";
import Aux from "../Auxilary";
import useHttpErrorHandler from '../../hooks/http-error-handler'


const withErrorHandler = (WrappedComponent,axios) => {
    return props => {
        
        const [error, clearError] = useHttpErrorHandler(axios)
            return (
                <Aux>
                    <Model 
                    show={error}
                    modelClosed={clearError}>
                        {error ? error.message : null}
                    </Model>
                <WrappedComponent {...props}/>
                </Aux>
            );
        
    }
}

export default withErrorHandler;