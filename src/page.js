/**
 * Created by liushaojie on 2017/6/3.
 */

import React from 'react';
import Fabric from './fabric';
import logo from './svg/112.svg';
import './page.css';
let svgLoader = null
let fabricArr = null;

( () => {
    let fabric = window.fabric

    let asyncSvgLoader = () => {
        return new Promise(function (resolve, reject){
            fabric.loadSVGFromURL(logo, function(objects, options) {
                resolve(objects)
            })
        })
    }
    svgLoader = asyncSvgLoader()
    console.log(svgLoader)

    let rect = new fabric.Rect({
        top : 100,
        left : 100,
        width : 60,
        height : 70,
        fill : 'red'
    });

    let text = new fabric.IText('hello world', {
        left: 100,
        top: 100
    });

    let circ = new fabric.Circle({
        top : 50,
        left : 50,
        radius : 30,
        fill : 'blue'
    });

    let items = [rect, text, circ]
    fabricArr = items

} )()

class Page extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
            debug: true,
            path: [],
            future: fabricArr
        }
    }

    render() {
        let template =
            <ul className="list">
                {this.state.path.map(t => (
                    <li key={Math.random()}> {t.type} </li>
                ))}
            </ul>;
        let debug = this.state.debug ? template : ''
        return (
            <div className="page">
                <btn className="btn btn-prev" onClick={this.handlePrev}>PREV BTN</btn>
                <btn className="btn btn-next" onClick={this.handleNext}>NEXT BTN</btn>
                <div className="window">
                    { debug }

                    <Fabric className="dis" ref="fabric" />
                </div>
            </div>
        );
    }

    handleNext = (e) => {
        let f = this.state.future
        //console.log(f, item)
        let item = f[0]
        if (item) {
            this.setState((prevState) => {
                let future = prevState.future.slice(1)
                let path = prevState.path.concat(item)
                this.refs.fabric.add(item)
                return {path, future}
            })
        }

    }

    handlePrev = (e) => {
        let path = this.state.path
        let item = path[path.length-1]
        this.state.future.unshift(item)
        if (item) {
            this.setState((prevState) => {
                prevState.path.pop()
                return {path: prevState.path}
            })
            this.refs.fabric.del(item)
        }
    }

    componentDidUpdate = () => {
        console.log(this.state.path, 'fabricArr', this.state.future.map((e) => e.type))
    }
}

module.exports = Page;

//console.log(fabricArr.shift())



