// このファイルをいじる
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    // コンストラクタ
    constructor(props) {
        super(props);
        this.state =
        {
            value: null,
        };
    }
    // 画面上に示した位説明書き react要素を返却
    render() {
        return (

            // <button className="square" onClick={function () {
            //     alert('click');
            // }}>
            <button
                className="square"
                onClick={() => this.setState({ value: 'X' })}
            >
                // propsはパラメタのこと
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i} />;
    } render() {
        const status = 'Next player:X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{}</div>
                    <ol>{}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);