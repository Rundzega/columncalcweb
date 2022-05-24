import React from 'react'
import NextPageButton from '../../components/NextPageButton';
import PreviousPageButton from '../../components/PreviousPageButton';
import { DiscretizationInput } from './DiscretizationInput';


function Discretization() {

    return(
        <div className="flex flex-col justify-center max-w-3xl items-center m-auto py-6 px-9 rounded-3xl">
            <h2 className="text-brandPurple-300 text-2xl font-bold">Discretização</h2>
            <DiscretizationInput />
            <footer className="w-full flex flex-row justify-between items-center">
                <div>
                    <PreviousPageButton to='cross-section' />
                </div>
                <div>
                    <NextPageButton to='results'/>
                </div>
            </footer>
        </div>
    )
}

export default Discretization