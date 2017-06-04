import React from 'react';
import './fabric.css';

class Fabric extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          //item: props.fabric,
          fabric: '',
          canvas: ''
        };
    }

    render() {
        return (
            <div className="canvas-dad">
                <canvas id="canvas" width="1024" height="768"></canvas>
            </div>
        );
    }

    init() {
        let fabric = window.fabric
        let canvas = new fabric.Canvas('canvas')
        this.setState({
            fabric,
            canvas
        })
        //console.log('Fabric', this.props.path)
        //canvas.add(this.props.path[0]);
    }

    componentDidMount() {
        console.log('你加载了一个Fabric组件')
        this.init()
    }

    //componentWillReceiveProps = (nextProps) => {
    //    let arr = nextProps.path
    //    let last = arr[arr.length-1]
    //    console.log('Fabric刷新', last, nextProps.path)
    //    this.state.canvas.add(last)
    //}

    add = (item) => {
        this.state.canvas.add(item)
    }

    del = (item) => {
        this.state.canvas.remove(item)
    }
}

module.exports = Fabric