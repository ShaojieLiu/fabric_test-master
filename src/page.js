/**
 * Created by liushaojie on 2017/6/3.
 */

import React from 'react';
import Fabric from './fabric';
import './page.css';

let fabricArr = (function() {
    let fabric = window.fabric

    let text = new fabric.IText('hello world', {
        left: 100,
        top: 100
    });

    let rect = new fabric.Rect({
        top : 100,
        left : 100,
        width : 60,
        height : 70,
        fill : 'red'
    });

    let circ = new fabric.Circle({
        top : 50,
        left : 50,
        radius : 30,
        fill : 'blue'
    });

    let items = [rect, text, circ]

    return items
})()

//console.log(fabricArr.shift())

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: []
        }
    }

    render() {
        return (
            <div className="page">
                <btn className="btn btn-prev" onClick={this.handlePrev}>PREV BTN</btn>
                <btn className="btn btn-next" onClick={this.handleNext}>NEXT BTN</btn>
                <div className="window">
                    <ul className="list">
                        {this.state.path.map(t => (
                            <li key={Math.random()}> {t.type} </li>
                        ))}
                    </ul>

                    <Fabric className="dis" ref="fabric" />
                </div>
            </div>
        );
    }

    handleNext = (e) => {
        let item = fabricArr.shift()
        if (item) {
            this.setState((prevState) => {
                let path = prevState.path.concat(item)
                this.refs.fabric.add(item)
                return {path}
            })
        }

    }

    handlePrev = (e) => {
        let path = this.state.path
        let item = path[path.length-1]
        fabricArr.unshift(item)
        if (item) {
            this.setState((prevState) => {
                prevState.path.pop()
                return {path: prevState.path}
            })
            this.refs.fabric.del(item)
        }
    }

    componentDidUpdate = () => {
        console.log(this.state.path, 'fabricArr', fabricArr.map((e) => e.type))
    }
}

module.exports = Page;