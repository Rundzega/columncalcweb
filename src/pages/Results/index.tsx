import CalculateButton from '../../components/CalculateButton';
import PreviousPageButton from '../../components/PreviousPageButton';
import NextPageButton from '../../components/NextPageButton';
import { ResultsSVG } from './ResultsSVG';
import { LongitudinalResults } from './LongitudinalResults';
import { TransversalResults } from './TransversalResults';

function Results() {
    return(
        <>
            <div className="flex flex-col justify-center max-w-3xl items-center m-auto py-6 px-9 rounded-3xl">
                <h2 className="text-brandPurple-300 text-2xl font-bold">Results</h2>
                <ResultsSVG />
                <div className="w-full mb-3">
                    <CalculateButton />
                </div>        
                <LongitudinalResults />
                <TransversalResults />
                <footer className="w-full flex flex-row justify-between items-center">
                    <div>
                        <PreviousPageButton to='discretization'  />
                    </div>
                    <div>
                        <NextPageButton to='#' disabled/>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Results