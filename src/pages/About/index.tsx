import React from 'react'
import NextPageButton from '../../components/NextPageButton'
import PreviousPageButton from '../../components/PreviousPageButton'

function About() {
    return(
        <div className="flex flex-col justify-center max-w-md 2xl:max-w-xl items-center m-auto py-6 px-9 rounded-3xl" >
            <h2 className="text-white text-2xl font-bold">Sobre</h2>
            <div className="border-brandPurple-300 border-2 w-full p-5 my-3 rounded-2xl bg-white">
                <p>
                    Autor: Rafael Bays Weiler <br />

                    <br />Este projeto foi desenvolvido em parceria com a MDC Projetos e em conjunto com um trabalho de conclusão de curso para a obtenção do título de Engenheiro Civil pela Universidade do Vale do Rio dos Sinos - UNISINOS.<br />

                    <br />O site verifica a estabilidade de pilares de concreto armado submetidos à flexo-compressão oblíqua.<br />

                    <br />Principais bibliografias utilizadas na elaboração do projeto: <br />

                    <br /> ABNT. NBR 6118: Projeto de estruturas de concreto — Procedimento. Rio de Janeiro, 2014.<br />
                    
                    <br />ARAÚJO, J. M. Pilares Esbeltos de Concreto Armado - Algoritmos para análise e dimensionamento. Ed. da FURG, Rio Grande, 1993.<br />
                    
                    <br />ARAÚJO, J. M. Pilares esbeltos de concreto armado. Parte 1: Um modelo não linear para análise e dimensionamento. Revista Teoria e Prática na Engenharia Civil, n. 18, p.81-93, Dunas, Rio Grande, 2011.<br />

                    <br />ARAÚJO, J. M. Curso de concreto armado – Volume 3. 4. ed. Dunas, Rio Grande, 2014b.<br />

                    <br />CARDOSO JÚNIOR, S. D. Sistema computacional para análise não linear de pilares de concreto armado. Monografia (Especialização em Gestão de Projetos de 76 Sistemas Estruturais). Escola Politécnica da Universidade de São Paulo, São Paulo, 2014.<br />

                </p>
            </div>
            <footer className="w-full flex flex-row justify-between items-center">
                <div>
                    <PreviousPageButton to='results'  />
                </div>
                <div>
                    <NextPageButton to='#' disabled/>
                </div>
            </footer>
        </div>
        
    )
}

export default About