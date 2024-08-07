import React from 'react';
import './Visualizer.css';
import { mergeSortalgo } from '../SortingAlgos/MergeSortalgo';
import { bubbleSortalgo } from '../SortingAlgos/BubbleSortalgo';
import { quicksortalgo } from '../SortingAlgos/QuickSortalgo';
import "bootstrap/dist/css/bootstrap.min.css";

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            array:[],
        };
    }
    componentDidMount(){
        this.resetArray();
    }

    resetArray() {
        const array = [];
        const len=document.getElementById("customRange2").value;
        for (let i = 0; i < len; i++) {
          array.push(randomIntFromInterval(5, 520));
        }
        this.setState({array});
      }
    
      mergeSort() {
        const animations = mergeSortalgo(this.state.array);
        for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const speed=document.getElementById("customRange3").value;
        const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const color = i % 3 === 0 ? "red" : "turquoise";
                setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = color;
                arrayBars[barTwoIdx].style.backgroundColor = color;
                },i*speed);
            } else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
            
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i*speed);
            }
        }
      }
    
      quickSort() {
        const animations = quicksortalgo(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const speed=document.getElementById("customRange3").value;
            const [barOneIdx, barTwoIdx,pivotidx,baroneidxheight,bartwoidxheight,pivotidxheight] = animations[i];
            if(i%2===0){
                setTimeout(() => {
                    arrayBars[barOneIdx].style.backgroundColor = "red";
                    arrayBars[barTwoIdx].style.backgroundColor = "red";
                    arrayBars[pivotidx].style.backgroundColor = "red";
                },i*speed);
            }
            else{
                if(bartwoidxheight<pivotidxheight){
                    setTimeout(() => {
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const bartwoStyle = arrayBars[barTwoIdx].style;
                        barOneStyle.height = `${bartwoidxheight}px`;
                        bartwoStyle.height = `${baroneidxheight}px`;
                }, i*speed);
                }
                setTimeout(() => {
                    arrayBars[barOneIdx].style.backgroundColor = "turquoise";
                    arrayBars[barTwoIdx].style.backgroundColor = "turquoise";
                },i*speed);
            }
        }
      }
    
      heapSort() {
      }
    
      bubbleSort() {
        const animations = bubbleSortalgo(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const speed=document.getElementById("customRange3").value;
            const [barOneIdx, barTwoIdx,baroneidxheight,bartwoidxheight] = animations[i];
            if(i%2===0){
                setTimeout(() => {
                    arrayBars[barOneIdx].style.backgroundColor = "red";
                    arrayBars[barTwoIdx].style.backgroundColor = "red";
                },i*speed);
            }
            else{
                if(baroneidxheight>bartwoidxheight){
                    setTimeout(() => {
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const bartwoStyle = arrayBars[barTwoIdx].style;
                        barOneStyle.height = `${bartwoidxheight}px`;
                        bartwoStyle.height = `${baroneidxheight}px`;
                    }, i*speed);
                }
                setTimeout(() => {
                    arrayBars[barOneIdx].style.backgroundColor = "turquoise";
                    arrayBars[barTwoIdx].style.backgroundColor = "turquoise";
                },i*speed);
            }
        }
      }

 

    render() {
        const {array} = this.state;
    
        return (
            <div className="array-container fixed flex flex-col w-full h-full">
                <div className='some flex justify-center pb-20'>
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{height: `${value}px`}}
                    ></div>
                ))}
                </div>
                <div className='flex justify-between p-5 footer'>
                    <div className='flex flex-wrap'>
                        <button className="bg-slate-300 border-solid border-2 border border-slate-800 rounded-lg text-center m-1 p-2 font-semibold font-serif text-slate-800 hover:shadow-lg shadow-indigo-500/40" onClick={() => this.resetArray()}>Generate New Array</button>
                        <button className="bg-slate-300 border-solid border-2 border border-slate-800 rounded-lg text-center m-1 p-2 font-semibold font-serif text-slate-800 hover:shadow-lg shadow-indigo-500/40" onClick={() => this.mergeSort()}>Merge Sort</button>
                        <button className="bg-slate-300 border-solid border-2 border border-slate-800 rounded-lg text-center m-1 p-2 font-semibold font-serif text-slate-800 hover:shadow-lg shadow-indigo-500/40" onClick={() => this.quickSort()}>Quick Sort</button>
                        <button  className="bg-slate-300 border-solid border-2 border border-slate-800 rounded-lg text-center m-1 p-2 font-semibold font-serif text-slate-800 hover:shadow-lg shadow-indigo-500/40" onClick={() => this.heapSort()}>Heap Sort</button>
                        <button className="bg-slate-300 border-solid border-2 border border-slate-800 rounded-lg text-center m-1 p-2 font-semibold font-serif text-slate-800 hover:shadow-lg shadow-indigo-500/40" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    </div>
                    <div className='flex flex-col justify-center items-center slider border-solid border-2 border border-slate-800 rounded-lg pl-3 pr-3 font-semibold font-serif text-slate-800 hover:shadow-lg shadow-indigo-500/40'>
                        <label style={{width: `200px`, margin:`3px`}} for="customRange3" class="form-label text-center font-serif">Array length</label>
                        <input type="range" class="form-range" min="10" max="220" step="10" id="customRange2"/>
                    </div>
                    <div className='flex flex-col justify-center items-center slider border-solid border-2 border border-slate-800 rounded-lg pl-3 pr-3 font-semibold font-serif text-slate-800 hover:shadow-lg shadow-indigo-500/40'>
                        <label style={{width: `200px`, margin:`5px`}} for="customRange3" class="form-label text-center font-serif">Speed Of Algo</label>
                        <input type="range" class="form-range" min="1" max="200" step="10" id="customRange3"/>
                    </div>
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}